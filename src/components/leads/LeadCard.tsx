"use client";

import {
  Phone,
 MessageCircle,
  MapPin,
  Calendar,
  User,
  Clock3,
  Home,
} from "lucide-react";

interface LeadCardProps {
  lead: any;
  onOpenDetails?: (lead: any) => void;
}

export default function LeadCard({
  lead,
  onOpenDetails,
}: LeadCardProps) {
  const whatsappLink = `https://wa.me/${lead.phone_number?.replace(
    /\D/g,
    ""
  )}`;

  const callLink = `tel:${lead.phone_number}`;

  const getPriorityColor = () => {
    switch (lead.priority) {
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

  const getStageColor = () => {
    switch (lead.stage) {
      case "NEW":
        return "bg-slate-100 text-slate-700";

      case "CALL_SCHEDULED":
        return "bg-yellow-100 text-yellow-700";

      case "FOLLOWUP":
        return "bg-orange-100 text-orange-700";

      case "MEETING_FIXED":
        return "bg-blue-100 text-blue-700";

      case "SITE_VISIT":
        return "bg-purple-100 text-purple-700";

      case "CONFIRMED":
        return "bg-green-100 text-green-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div
      onClick={() => onOpenDetails?.(lead)}
      className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer space-y-4"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-slate-800 text-lg">
            {lead.customer_name}
          </h3>

          <p className="text-xs text-slate-500 mt-1">
            {lead.email || "No Email"}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor()}`}
        >
          {lead.priority || "NORMAL"}
        </span>
      </div>

      {/* Stage */}
      <div>
        <span
          className={`px-3 py-1 rounded-xl text-xs font-semibold ${getStageColor()}`}
        >
          {lead.stage}
        </span>
      </div>

      {/* Phone */}
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <Phone size={15} />
        {lead.phone_number}
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <MapPin size={15} />

        <span>
          {lead.city || "-"}
          {lead.area ? ` • ${lead.area}` : ""}
        </span>
      </div>

      {/* Timeline */}
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <Clock3 size={15} />
        {lead.timeline || "No Timeline"}
      </div>

      {/* Assigned Employee */}
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <User size={15} />
        {lead.assignedTo?.name || "Unassigned"}
      </div>

      {/* Next Followup */}
      {lead.nextFollowUp && (
        <div className="flex items-center gap-2 text-sm text-blue-600">
          <Calendar size={15} />

          {new Date(
            lead.nextFollowUp
          ).toLocaleDateString()}
        </div>
      )}

      {/* Site Visit */}
      {lead.siteVisitDate && (
        <div className="flex items-center gap-2 text-sm text-purple-700">
          <Home size={15} />

          Site Visit :
          {" "}
          {new Date(
            lead.siteVisitDate
          ).toLocaleDateString()}
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t">
        <a
          href={whatsappLink}
          target="_blank"
          onClick={(e) => e.stopPropagation()}
          className="bg-green-600 hover:bg-green-700 text-white rounded-xl py-2 flex items-center justify-center gap-2 text-sm font-medium"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>

        <a
          href={callLink}
          onClick={(e) => e.stopPropagation()}
          className="bg-slate-900 hover:bg-black text-white rounded-xl py-2 flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Phone size={16} />
          Call
        </a>
      </div>

      {/* Footer */}
      <div className="flex justify-between text-xs text-slate-400 pt-2">
        <span>
          Created
        </span>

        <span>
          {lead.createdAt
            ? new Date(
                lead.createdAt
              ).toLocaleDateString()
            : "-"}
        </span>
      </div>
    </div>
  );
}