"use client";

import { useMemo, useState } from "react";
import ActivityModal from "../leads/ActivityModal";
import {
  Phone,
  MapPin,
  Mail,
  User2,
  CalendarDays,
  Clock3,
} from "lucide-react";

interface Props {
  leads: any[];
  refresh: () => void;
}

export default function CeilingLeads({
  leads,
  refresh,
}: Props) {
  const [loadingId, setLoadingId] =
    useState<string | null>(null);

  const [showModal, setShowModal] =
    useState(false);

  const [selectedLead, setSelectedLead] =
    useState<any>(null);

  const [activities, setActivities] =
    useState<any[]>([]);

  const [search, setSearch] = useState("");

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      return (
        lead.customer_name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        lead.phone_number?.includes(search) ||
        lead.city
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [leads, search]);

  const updateStage = async (
    id: string,
    stage: string
  ) => {
    try {
      setLoadingId(id);

      await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({ stage }),
      });

      refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  const openHistory = async (lead: any) => {
    setSelectedLead(lead);

    const res = await fetch(
      `/api/leads/${lead.id}/activities`
    );

    const data = await res.json();

    setActivities(data.data || []);

    setShowModal(true);
  };

  const badgeColor = (stage: string) => {
    switch (stage) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      case "MEETING_FIXED":
        return "bg-blue-100 text-blue-700";

      case "SITE_VISIT":
        return "bg-purple-100 text-purple-700";

      case "CALL_SCHEDULED":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <>
      <div className="space-y-6">

        {/* Header */}

        <div className="bg-white rounded-3xl p-6 shadow-sm border">

          <div className="flex flex-col lg:flex-row gap-5 justify-between">

            <div>

              <h2 className="text-3xl font-bold text-slate-800">
                Ceiling Leads
              </h2>

              <p className="text-slate-500 mt-1">
                Total Leads : {filteredLeads.length}
              </p>

            </div>

            <input
              type="text"
              placeholder="Search Name, Phone or City..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full lg:w-96 border rounded-2xl px-5 py-3 outline-none"
            />

          </div>

        </div>

        {/* Cards */}

        <div className="grid gap-5">

          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white rounded-3xl border p-6 shadow-sm"
            >
              <div className="flex flex-col xl:flex-row justify-between gap-6">

                {/* LEFT */}

                <div className="space-y-3">

                  <div className="flex items-center gap-3">

                    <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                      {lead.customer_name?.charAt(0)}
                    </div>

                    <div>

                      <h3 className="text-xl font-bold">
                        {lead.customer_name}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-xl text-xs font-semibold ${badgeColor(
                          lead.stage
                        )}`}
                      >
                        {lead.stage.replaceAll(
                          "_",
                          " "
                        )}
                      </span>

                    </div>

                  </div>

                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <Phone size={15} />
                    {lead.phone_number}
                  </div>

                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <Mail size={15} />
                    {lead.email || "N/A"}
                  </div>

                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <MapPin size={15} />
                    {lead.city || "N/A"}
                  </div>

                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <User2 size={15} />
                    {lead.assignedTo?.name ||
                      "Unassigned"}
                  </div>

                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <CalendarDays size={15} />
                    Next Followup :
                    {lead.nextFollowUp
                      ? new Date(
                          lead.nextFollowUp
                        ).toLocaleDateString()
                      : " N/A"}
                  </div>

                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Clock3 size={15} />
                    Created :
                    {new Date(
                      lead.createdAt
                    ).toLocaleDateString()}
                  </div>

                </div>

                {/* RIGHT */}

                <div className="flex flex-wrap gap-3 h-fit">

                  <button
                    onClick={() =>
                      openHistory(lead)
                    }
                    className="px-4 py-2 rounded-xl bg-slate-100"
                  >
                    History
                  </button>

                  <button
                    onClick={() =>
                      updateStage(
                        lead.id,
                        "CALL_SCHEDULED"
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-yellow-500 text-white"
                  >
                    Call
                  </button>

                  <button
                    onClick={() =>
                      updateStage(
                        lead.id,
                        "MEETING_FIXED"
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white"
                  >
                    Meeting
                  </button>

                  <button
                    onClick={() =>
                      updateStage(
                        lead.id,
                        "SITE_VISIT"
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-purple-600 text-white"
                  >
                    Visit
                  </button>

                  <button
                    onClick={() =>
                      updateStage(
                        lead.id,
                        "CONFIRMED"
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-green-600 text-white"
                  >
                    Confirm
                  </button>

                  <button
                    onClick={() =>
                      updateStage(
                        lead.id,
                        "REJECTED"
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-red-600 text-white"
                  >
                    Reject
                  </button>

                </div>

              </div>

              {loadingId === lead.id && (
                <div className="mt-4 text-indigo-600 text-sm">
                  Updating...
                </div>
              )}
            </div>
          ))}

          {filteredLeads.length === 0 && (
            <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border">
              No Leads Found
            </div>
          )}

        </div>

      </div>

      <ActivityModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        activities={activities}
        customerName={
          selectedLead?.customer_name
        }
      />
    </>
  );
}