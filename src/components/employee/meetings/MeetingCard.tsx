"use client";

import {
  CalendarDays,
  Clock,
  Users,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

interface Meeting {
  id: string;
  title: string;
  description?: string;
  status: "PENDING" | "ACCEPTED" | "COMPLETED" | "REJECTED";
  scheduledAt?: string;
  lead?: {
    customer_name?: string;
  };
}

interface Props {
  meeting: Meeting;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onComplete: (
    id: string,
    remarks: string,
    leadStage: string
  ) => void;
}

export default function MeetingCard({
  meeting,
  onAccept,
  onReject,
  onComplete,
}: Props) {
  const [open, setOpen] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [leadStage, setLeadStage] =
    useState("FOLLOWUP");

  const badge = {
    PENDING:
      "bg-yellow-100 text-yellow-700 border-yellow-200",
    ACCEPTED:
      "bg-blue-100 text-blue-700 border-blue-200",
    COMPLETED:
      "bg-green-100 text-green-700 border-green-200",
    REJECTED:
      "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div className="bg-white border rounded-3xl shadow-sm p-6 hover:shadow-md transition">

      {/* Header */}
      <div className="flex justify-between items-start gap-4">

        <div className="space-y-2 flex-1">

          <div className="flex items-center gap-2">

            <CalendarDays
              size={16}
              className="text-indigo-600"
            />

            <span className="text-xs font-semibold text-indigo-600 uppercase">
              Meeting
            </span>

          </div>

          <h2 className="text-xl font-bold text-slate-800">
            {meeting.title}
          </h2>

          <p className="text-slate-500 text-sm">
            {meeting.description ||
              "No description available."}
          </p>

        </div>

        <span
          className={`px-3 py-1 rounded-xl text-xs font-bold border ${badge[meeting.status]}`}
        >
          {meeting.status}
        </span>

      </div>

      {/* Details */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">

        <div className="bg-slate-50 rounded-2xl p-4">

          <div className="flex items-center gap-2 text-slate-500 text-sm">

            <Users size={15} />

            Customer

          </div>

          <div className="font-semibold mt-2">
            {meeting.lead?.customer_name || "-"}
          </div>

        </div>

        <div className="bg-slate-50 rounded-2xl p-4">

          <div className="flex items-center gap-2 text-slate-500 text-sm">

            <Clock size={15} />

            Meeting Time

          </div>

          <div className="font-semibold mt-2">
            {meeting.scheduledAt
              ? new Date(
                  meeting.scheduledAt
                ).toLocaleString()
              : "-"}
          </div>

        </div>

      </div>

      {/* Buttons */}
      <div className="mt-6">

        {meeting.status === "PENDING" && (

          <div className="flex gap-3">

            <button
              onClick={() => onAccept(meeting.id)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl font-semibold"
            >
              Accept
            </button>

            <button
              onClick={() => onReject(meeting.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-2xl font-semibold"
            >
              Reject
            </button>

          </div>

        )}

        {meeting.status === "ACCEPTED" && !open && (

          <button
            onClick={() => setOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2 font-semibold"
          >
            <MessageSquare size={18} />
            Complete Meeting
          </button>

        )}

      </div>

      {/* Completion Form */}

      {open && (

        <div className="mt-6 bg-slate-50 border rounded-2xl p-5 space-y-4">

          <div className="flex items-center gap-2">

            <TrendingUp
              size={16}
              className="text-indigo-600"
            />

            <h4 className="font-semibold">
              Meeting Outcome
            </h4>

          </div>

          <textarea
            rows={4}
            value={remarks}
            onChange={(e) =>
              setRemarks(e.target.value)
            }
            placeholder="Meeting discussion..."
            className="w-full rounded-xl border p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
          />

          <select
            value={leadStage}
            onChange={(e) =>
              setLeadStage(e.target.value)
            }
            className="w-full rounded-xl border p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <option value="FOLLOWUP">
              Follow Up
            </option>

            <option value="SITE_VISIT">
              Site Visit
            </option>

            <option value="CONFIRMED">
              Confirmed
            </option>

            <option value="REJECTED">
              Rejected
            </option>

          </select>

          <div className="flex gap-3">

            <button
              onClick={() => {
                onComplete(
                  meeting.id,
                  remarks,
                  leadStage
                );
                setOpen(false);
              }}
              disabled={!remarks.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white px-5 py-3 rounded-xl font-semibold"
            >
              Save
            </button>

            <button
              onClick={() => setOpen(false)}
              className="bg-slate-200 hover:bg-slate-300 px-5 py-3 rounded-xl font-semibold"
            >
              Cancel
            </button>

          </div>

        </div>

      )}

    </div>
  );
}