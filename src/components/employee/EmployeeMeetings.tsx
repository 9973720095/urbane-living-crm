"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import MeetingHeader from "./meetings/MeetingHeader";
import MeetingFilters from "./meetings/MeetingFilters";
import MeetingCard from "./meetings/MeetingCard";

interface Lead {
  customer_name?: string;
  phone_number?: string;
  city?: string;
}

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  type: "MEETING";
  status: "PENDING" | "ACCEPTED" | "COMPLETED" | "REJECTED";
  scheduledAt?: string;
  lead?: Lead;
}

export default function EmployeeMeetings() {
  const searchParams = useSearchParams();

  const employeeId =
    searchParams.get("employeeId") || searchParams.get("id");

  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    if (employeeId) {
      fetchMeetings();
    }
  }, [employeeId]);

  const fetchMeetings = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/tasks?employeeId=${employeeId}`
      );

      const json = await res.json();

      if (json.success) {
        const meetingTasks = json.data.filter(
          (item: Meeting) => item.type === "MEETING"
        );

        setMeetings(meetingTasks);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredMeetings = useMemo(() => {
    let data = [...meetings];

    if (search) {
      data = data.filter(
        (m) =>
          m.title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          m.lead?.customer_name
            ?.toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    if (status !== "ALL") {
      data = data.filter((m) => m.status === status);
    }

    switch (sortBy) {
      case "oldest":
        data.sort(
          (a, b) =>
            new Date(a.scheduledAt || "").getTime() -
            new Date(b.scheduledAt || "").getTime()
        );
        break;

      case "customer":
        data.sort((a, b) =>
          (a.lead?.customer_name || "").localeCompare(
            b.lead?.customer_name || ""
          )
        );
        break;

      default:
        data.sort(
          (a, b) =>
            new Date(b.scheduledAt || "").getTime() -
            new Date(a.scheduledAt || "").getTime()
        );
    }

    return data;
  }, [meetings, search, status, sortBy]);

  const updateStatus = async (
    id: string,
    action: "accept" | "reject"
  ) => {
    await fetch(`/api/tasks/${id}/${action}`, {
      method: "PATCH",
    });

    fetchMeetings();
  };

  const completeMeeting = async (
    id: string,
    remarks: string,
    leadStage: string
  ) => {
    await fetch(`/api/tasks/${id}/complete`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        remarks,
        leadStage,
      }),
    });

    fetchMeetings();
  };

  return (
    <div className="space-y-6">

      <MeetingHeader
  total={meetings.length}
  pending={
    meetings.filter((m) => m.status === "PENDING").length
  }
  accepted={
    meetings.filter((m) => m.status === "ACCEPTED").length
  }
  completed={
    meetings.filter((m) => m.status === "COMPLETED").length
  }
/>

      <MeetingFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onRefresh={fetchMeetings}
      />

      {loading ? (
        <div className="bg-white rounded-3xl p-16 text-center border">
          Loading meetings...
        </div>
      ) : filteredMeetings.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border">
          No meetings found.
        </div>
      ) : (
        <div className="space-y-5">
          {filteredMeetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
              onAccept={() =>
                updateStatus(meeting.id, "accept")
              }
              onReject={() =>
                updateStatus(meeting.id, "reject")
              }
              onComplete={completeMeeting}
            />
          ))}
        </div>
      )}
    </div>
  );
}