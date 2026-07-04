"use client";

import {
  User,
  Phone,
  Mail,
  MapPin,
  Building2,
  Calendar,
  Briefcase,
  LocateFixed,
} from "lucide-react";

import { CustomerInfoProps } from "./types";
import { formatDate } from "./utils";

export default function CustomerInfo({
  lead,
}: CustomerInfoProps) {
  if (!lead) return null;

  return (
    <div className="bg-white rounded-3xl border shadow-sm p-6">
      {/* Header */}

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Customer Information
        </h2>

        <p className="text-slate-500 text-sm mt-1">
          Basic customer details
        </p>
      </div>

      {/* Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <InfoRow
          icon={<User className="w-5 h-5 text-blue-600" />}
          label="Customer Name"
          value={lead.customer_name}
        />

        <InfoRow
          icon={<Phone className="w-5 h-5 text-green-600" />}
          label="Phone Number"
          value={lead.phone_number}
        />

        <InfoRow
          icon={<Mail className="w-5 h-5 text-red-500" />}
          label="Email"
          value={lead.email}
        />

        <InfoRow
          icon={<MapPin className="w-5 h-5 text-orange-500" />}
          label="City"
          value={lead.city}
        />

        <InfoRow
          icon={<Building2 className="w-5 h-5 text-violet-600" />}
          label="Area"
          value={lead.area}
        />

        <InfoRow
          icon={<LocateFixed className="w-5 h-5 text-cyan-600" />}
          label="Location"
          value={lead.location_detail}
        />

        <InfoRow
          icon={<Briefcase className="w-5 h-5 text-indigo-600" />}
          label="Lead Stage"
          value={lead.stage}
        />

        <InfoRow
          icon={<User className="w-5 h-5 text-pink-600" />}
          label="Assigned Employee"
          value={lead.assignedTo?.name}
        />

        <InfoRow
          icon={<Calendar className="w-5 h-5 text-slate-600" />}
          label="Created"
          value={
            lead.createdAt
              ? formatDate(lead.createdAt)
              : "-"
          }
        />

      </div>
    </div>
  );
}

interface RowProps {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
}

function InfoRow({
  icon,
  label,
  value,
}: RowProps) {
  return (
    <div className="rounded-2xl border bg-slate-50 p-4">

      <div className="flex items-center gap-3 mb-2">
        {icon}

        <span className="text-sm text-slate-500">
          {label}
        </span>
      </div>

      <p className="font-semibold text-slate-800 break-words">
        {value || "-"}
      </p>

    </div>
  );
}