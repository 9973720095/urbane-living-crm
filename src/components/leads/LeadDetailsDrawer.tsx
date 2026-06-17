"use client";

import {
  X,
  User,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Calendar,
  Clock3,
  BadgeCheck,
} from "lucide-react";

interface Props {
  lead: any;
  onClose: () => void;
}

export default function LeadDetailsDrawer({
  lead,
  onClose,
}: Props) {
  if (!lead) return null;

  const whatsappUrl = `https://wa.me/${lead.phone_number?.replace(
    /\D/g,
    ""
  )}`;

  const getStageColor = () => {
    switch (lead.stage) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      case "SITE_VISIT":
        return "bg-purple-100 text-purple-700";

      case "MEETING_FIXED":
        return "bg-blue-100 text-blue-700";

      case "FOLLOWUP":
        return "bg-orange-100 text-orange-700";

      case "CALL_SCHEDULED":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-screen w-full md:w-[550px] bg-white z-50 overflow-y-auto shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-5 flex justify-between items-center">

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Lead Details
            </h2>

            <p className="text-sm text-slate-500">
              Customer Profile
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center"
          >
            <X />
          </button>
        </div>

        <div className="p-6 space-y-6">

          {/* Customer */}
          <div className="bg-slate-50 rounded-3xl p-5">

            <div className="flex gap-4 items-center">

              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                <User className="text-indigo-600" />
              </div>

              <div>

                <h2 className="text-xl font-bold text-slate-800">
                  {lead.customer_name}
                </h2>

                <div className="flex gap-2 mt-2">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStageColor()}`}
                  >
                    {lead.stage}
                  </span>

                  {lead.priority && (
                    <span className="px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold">
                      {lead.priority}
                    </span>
                  )}

                </div>

              </div>

            </div>

          </div>

          {/* Actions */}
          <div>

            <h3 className="font-semibold mb-3">
              Quick Actions
            </h3>

            <div className="grid grid-cols-3 gap-3">

              <a
                href={`tel:${lead.phone_number}`}
                className="bg-green-50 rounded-2xl p-4 text-center hover:bg-green-100"
              >
                <Phone className="mx-auto text-green-600" />

                <div className="text-sm mt-2">
                  Call
                </div>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                className="bg-emerald-50 rounded-2xl p-4 text-center hover:bg-emerald-100"
              >
                <MessageCircle className="mx-auto text-emerald-600" />

                <div className="text-sm mt-2">
                  WhatsApp
                </div>
              </a>

              <a
                href={`mailto:${lead.email}`}
                className="bg-blue-50 rounded-2xl p-4 text-center hover:bg-blue-100"
              >
                <Mail className="mx-auto text-blue-600" />

                <div className="text-sm mt-2">
                  Email
                </div>
              </a>

            </div>

          </div>

          {/* Information */}
          <div className="border rounded-3xl p-5 space-y-5">

            <h3 className="font-bold text-slate-800">
              Customer Information
            </h3>

            <InfoItem
              icon={<Phone size={17} />}
              label="Phone"
              value={lead.phone_number}
            />

            <InfoItem
              icon={<Mail size={17} />}
              label="Email"
              value={lead.email}
            />

            <InfoItem
              icon={<MapPin size={17} />}
              label="City"
              value={`${lead.city || "-"} ${lead.area || ""}`}
            />

            <InfoItem
              icon={<Clock3 size={17} />}
              label="Timeline"
              value={lead.timeline}
            />

            <InfoItem
              icon={<User size={17} />}
              label="Assigned Employee"
              value={lead.assignedTo?.name}
            />

            <InfoItem
              icon={<Calendar size={17} />}
              label="Next Followup"
              value={
                lead.nextFollowUp
                  ? new Date(
                      lead.nextFollowUp
                    ).toLocaleString()
                  : "-"
              }
            />

            <InfoItem
              icon={<BadgeCheck size={17} />}
              label="Site Visit"
              value={
                lead.siteVisitDate
                  ? new Date(
                      lead.siteVisitDate
                    ).toLocaleString()
                  : "-"
              }
            />

            <InfoItem
              icon={<BadgeCheck size={17} />}
              label="Tags"
              value={lead.tags}
            />

            <InfoItem
              icon={<BadgeCheck size={17} />}
              label="Remarks"
              value={lead.remarks}
            />

          </div>

          {/* Created */}
          <div className="bg-slate-50 rounded-3xl p-5">

            <div className="text-sm text-slate-500">
              Created At
            </div>

            <div className="font-semibold mt-1">
              {new Date(
                lead.createdAt
              ).toLocaleString()}
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

function InfoItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: any;
  icon: React.ReactNode;
}) {
  return (
    <div className="border-b pb-4">

      <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
        {icon}
        {label}
      </div>

      <div className="font-medium text-slate-800 break-words">
        {value || "-"}
      </div>

    </div>
  );
}