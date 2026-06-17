"use client";

import {
  Phone,
  MapPin,
  Clock3,
  User2,
  MessageCircle,
} from "lucide-react";

interface Props {
  leads: any[];
}

export default function RecentLeads({
  leads,
}: Props) {

  const recentLeads = [...leads]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 8);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      case "MEETING_FIXED":
        return "bg-blue-100 text-blue-700";

      case "SITE_VISIT":
        return "bg-purple-100 text-purple-700";

      case "FOLLOWUP":
        return "bg-orange-100 text-orange-700";

      case "CALL_SCHEDULED":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-700";

      case "MEDIUM":
        return "bg-yellow-100 text-yellow-700";

      case "LOW":
        return "bg-green-100 text-green-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="bg-white rounded-3xl border shadow-sm">

      {/* Header */}
      <div className="border-b p-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Recent Leads
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Latest customer enquiries
          </p>
        </div>

        <div className="bg-indigo-50 rounded-2xl px-5 py-3">
          <div className="text-xs text-slate-500">
            Total
          </div>

          <div className="text-2xl font-bold text-indigo-600">
            {recentLeads.length}
          </div>
        </div>

      </div>

      {/* Body */}
      <div className="divide-y">

        {recentLeads.map((lead) => {

          const whatsappLink = `https://wa.me/${lead.phone_number?.replace(
            /\D/g,
            ""
          )}`;

          return (
            <div
              key={lead.id}
              className="p-5 hover:bg-slate-50 transition"
            >

              <div className="flex justify-between gap-5">

                {/* Left */}
                <div className="flex gap-4">

                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-lg font-bold text-indigo-700">
                    {lead.customer_name?.charAt(0)}
                  </div>

                  <div>

                    <h3 className="font-semibold text-slate-800">
                      {lead.customer_name}
                    </h3>

                    <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                      <Phone size={14} />
                      {lead.phone_number}
                    </div>

                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-500">

                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        {lead.city || "Unknown"}
                      </div>

                      <div className="flex items-center gap-1">
                        <User2 size={14} />
                        {lead.assignedTo?.name ||
                          "Unassigned"}
                      </div>

                      <div className="flex items-center gap-1">
                        <Clock3 size={14} />
                        {new Date(
                          lead.createdAt
                        ).toLocaleDateString()}
                      </div>

                    </div>

                  </div>

                </div>

                {/* Right */}
                <div className="flex flex-col items-end gap-3">

                  {/* Stage */}
                  <span
                    className={`px-3 py-2 rounded-xl text-xs font-semibold ${getStageColor(
                      lead.stage
                    )}`}
                  >
                    {lead.stage.replaceAll("_", " ")}
                  </span>

                  {/* Priority */}
                  <span
                    className={`px-3 py-1 rounded-xl text-xs font-semibold ${getPriorityColor(
                      lead.priority
                    )}`}
                  >
                    {lead.priority || "NORMAL"}
                  </span>

                  {/* Actions */}
                  <div className="flex gap-2">

                    <a
                      href={`tel:${lead.phone_number}`}
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
                    >
                      <Phone size={16} />
                    </a>

                    <a
                      href={whatsappLink}
                      target="_blank"
                      className="w-10 h-10 rounded-xl bg-green-100 hover:bg-green-200 text-green-700 flex items-center justify-center"
                    >
                      <MessageCircle size={16} />
                    </a>

                  </div>

                </div>

              </div>

            </div>
          );
        })}

        {recentLeads.length === 0 && (
          <div className="py-20 text-center text-slate-400">
            No recent leads available
          </div>
        )}

      </div>

    </div>
  );
}