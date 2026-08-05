"use client";

import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  CalendarDays,
  MessageSquare,
  Building2,
  ClipboardList,
} from "lucide-react";

export interface LeadDetails {
  id: string;
  customer_name: string;
  phone_number?: string;
  email?: string;
  city?: string;
  address?: string;
  source?: string;
  project?: string;
  budget?: string;
  status?: string;
  assignedTo?: string;
  notes?: string;
  createdAt?: string;
}

interface LeadDrawerProps {
  open: boolean;
  lead: LeadDetails | null;
  onClose: () => void;
}

export default function LeadDrawer({
  open,
  lead,
  onClose,
}: LeadDrawerProps) {
  if (!open || !lead) return null;

  const InfoCard = ({
    icon,
    title,
    value,
  }: {
    icon: React.ReactNode;
    title: string;
    value?: string;
  }) => (
    <div className="bg-slate-50 rounded-xl p-3 border">
      <div className="flex items-center gap-2 text-slate-500 text-xs uppercase font-semibold">
        {icon}
        {title}
      </div>

      <div className="mt-2 text-sm font-semibold text-slate-800 break-words">
        {value || "-"}
      </div>
    </div>
  );

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40"
      />

      {/* Drawer */}

      <div className="fixed right-0 top-0 h-screen w-full sm:w-[450px] bg-white shadow-2xl z-50 overflow-y-auto">

        {/* Header */}

        <div className="sticky top-0 bg-white border-b px-6 py-5 flex justify-between items-center">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Lead Details
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Customer Information
            </p>

          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
          >
            <X size={18} />
          </button>

        </div>

        {/* Body */}

        <div className="p-6 space-y-6">

          {/* Customer */}

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-2xl">
              {lead.customer_name?.charAt(0)}
            </div>

            <div>

              <h3 className="text-xl font-bold">
                {lead.customer_name}
              </h3>

              <p className="text-slate-500 text-sm">
                {lead.status || "NEW LEAD"}
              </p>

            </div>

          </div>

          {/* Quick Actions */}

          <div className="grid grid-cols-2 gap-3">

            <a
              href={`tel:${lead.phone_number}`}
              className="bg-green-600 text-white rounded-xl py-3 text-center font-semibold hover:bg-green-700"
            >
              Call
            </a>

            <a
              href={`https://wa.me/${lead.phone_number}`}
              target="_blank"
              className="bg-emerald-500 text-white rounded-xl py-3 text-center font-semibold hover:bg-emerald-600"
            >
              WhatsApp
            </a>

          </div>

          {/* Info */}

          <div className="grid grid-cols-2 gap-4">

            <InfoCard
              icon={<Phone size={14} />}
              title="Phone"
              value={lead.phone_number}
            />

            <InfoCard
              icon={<Mail size={14} />}
              title="Email"
              value={lead.email}
            />

            <InfoCard
              icon={<MapPin size={14} />}
              title="City"
              value={lead.city}
            />

            <InfoCard
              icon={<Building2 size={14} />}
              title="Project"
              value={lead.project}
            />

            <InfoCard
              icon={<ClipboardList size={14} />}
              title="Source"
              value={lead.source}
            />

            <InfoCard
              icon={<User size={14} />}
              title="Assigned"
              value={lead.assignedTo}
            />

          </div>

          {/* Address */}

          <div className="bg-slate-50 border rounded-2xl p-4">

            <div className="font-semibold mb-2">
              Address
            </div>

            <p className="text-sm text-slate-600">
              {lead.address || "-"}
            </p>

          </div>

          {/* Notes */}

          <div className="bg-slate-50 border rounded-2xl p-4">

            <div className="flex items-center gap-2 font-semibold mb-3">
              <MessageSquare size={18} />
              Notes
            </div>

            <p className="text-sm text-slate-600 whitespace-pre-wrap">
              {lead.notes || "No Notes Available"}
            </p>

          </div>

          {/* Created */}

          <div className="bg-indigo-50 rounded-2xl border border-indigo-100 p-4 flex items-center gap-3">

            <CalendarDays
              className="text-indigo-600"
              size={22}
            />

            <div>

              <div className="text-xs text-indigo-500 uppercase font-semibold">
                Created On
              </div>

              <div className="font-semibold text-indigo-800">
                {lead.createdAt
                  ? new Date(
                      lead.createdAt
                    ).toLocaleString()
                  : "-"}
              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}