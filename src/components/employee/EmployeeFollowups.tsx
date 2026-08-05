"use client";

import { useState } from "react";
import {
  Phone,
  MessageCircle,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock3,
  MapPin,
} from "lucide-react";

interface FollowUp {
  id: string;
  followupDate: string | Date;
  remarks?: string |null;
  status: "PENDING" | "COMPLETED" | "MISSED";

  lead: {
    id: string;
    customer_name: string;
    phone_number: string;
    city?: string;
  };
}

interface Props {
  followups: FollowUp[];

  onComplete: (
    id: string,
    remarks: string,
    stage: string
  ) => void;

  onReschedule: (
    id: string,
    date: string
  ) => void;
}

export default function EmployeeFollowups({
  followups,
  onComplete,
  onReschedule,
}: Props) {
  const [remarks, setRemarks] = useState<Record<string, string>>({});
  const [date, setDate] = useState<Record<string, string>>({});

  const badge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "MISSED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-bold">
          Today's Followups
        </h2>

        <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-xl text-sm font-semibold">
          {followups.length} Followups
        </span>

      </div>

      {followups.length === 0 && (
        <div className="bg-white rounded-3xl border p-12 text-center">

          <Clock3
            className="mx-auto text-slate-400"
            size={42}
          />

          <p className="mt-4 text-slate-500">
            No Followups Assigned
          </p>

        </div>
      )}

      {followups.map((item) => (
        <div
          key={item.id}
          className="bg-white border rounded-3xl p-6 shadow-sm space-y-5"
        >
          <div className="flex justify-between">

            <div>

              <h3 className="font-bold text-xl">
                {item.lead.customer_name}
              </h3>

              <p className="text-slate-500">
                {item.lead.phone_number}
              </p>

              <p className="text-sm text-slate-400 mt-1">
                {item.lead.city}
              </p>

            </div>

            <span
              className={`px-4 py-2 rounded-xl text-sm font-semibold ${badge(
                item.status
              )}`}
            >
              {item.status}
            </span>

          </div>

          <div className="bg-slate-50 rounded-2xl p-4">

            <div className="text-xs text-slate-500">
              Last Remarks
            </div>

            <p className="mt-2">
              {item.remarks || "No Remarks"}
            </p>

          </div>

          <div className="flex flex-wrap gap-3">

            <a
              href={`tel:${item.lead.phone_number}`}
              className="bg-green-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
            >
              <Phone size={16} />
              Call
            </a>

            <a
              href={`https://wa.me/91${item.lead.phone_number}`}
              target="_blank"
              className="bg-emerald-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>

          </div>

          {item.status === "PENDING" && (
            <>
              <textarea
                placeholder="Enter Followup Remarks..."
                value={remarks[item.id] || ""}
                onChange={(e) =>
                  setRemarks({
                    ...remarks,
                    [item.id]: e.target.value,
                  })
                }
                className="w-full border rounded-2xl p-3"
              />

              <input
                type="datetime-local"
                value={date[item.id] || ""}
                onChange={(e) =>
                  setDate({
                    ...date,
                    [item.id]: e.target.value,
                  })
                }
                className="border rounded-xl px-4 py-3"
              />

              <div className="flex flex-wrap gap-3">

                <button
                  onClick={() =>
                    onComplete(
                      item.id,
                      remarks[item.id] || "",
                      "FOLLOWUP"
                    )
                  }
                  className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
                >
                  <CheckCircle2 size={18} />
                  Followup Done
                </button>

                <button
                  onClick={() =>
                    onComplete(
                      item.id,
                      remarks[item.id] || "",
                      "SITE_VISIT"
                    )
                  }
                  className="bg-orange-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
                >
                  <MapPin size={18} />
                  Site Visit
                </button>

                <button
                  onClick={() =>
                    onComplete(
                      item.id,
                      remarks[item.id] || "",
                      "CONFIRMED"
                    )
                  }
                  className="bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
                >
                  <CheckCircle2 size={18} />
                  Booking Done
                </button>

                <button
                  onClick={() =>
                    onComplete(
                      item.id,
                      remarks[item.id] || "",
                      "REJECTED"
                    )
                  }
                  className="bg-red-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
                >
                  <XCircle size={18} />
                  Not Interested
                </button>

                <button
                  onClick={() =>
                    onReschedule(
                      item.id,
                      date[item.id]
                    )
                  }
                  className="bg-indigo-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
                >
                  <Calendar size={18} />
                  Reschedule
                </button>

              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}