"use client";

import { useEffect, useState } from "react";
import {
  Phone,
  MessageCircle,
  Eye,
  MapPin,
  User,
  CalendarDays,
  BadgeCheck,
} from "lucide-react";

interface Lead {
  id: string;
  customer_name: string;
  phone_number?: string;
  city?: string;
  project?: string;
  status?: string;
  priority?: string;
  assignedToId?: string;
  nextFollowup?: string;
}

interface Props {
  employeeId: string;
}

export default function EmployeeLeads({ employeeId }: Props) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, [employeeId]);

  async function fetchLeads() {
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();

      if (data.success) {
        setLeads(
          data.data.filter(
            (lead: Lead) => lead.assignedToId === employeeId
          )
        );
      }
    } finally {
      setLoading(false);
    }
  }

  const statusColor = (status?: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700";
      case "SITE_VISIT":
        return "bg-purple-100 text-purple-700";
      case "FOLLOWUP":
        return "bg-yellow-100 text-yellow-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const priorityColor = (priority?: string) => {
    switch (priority) {
      case "HIGH":
        return "text-red-600";
      case "MEDIUM":
        return "text-orange-600";
      case "LOW":
        return "text-green-600";
      default:
        return "text-slate-500";
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border">
        Loading Leads...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            My Leads
          </h1>

          <p className="text-slate-500 mt-1">
            Assigned customer leads
          </p>
        </div>

        <div className="bg-indigo-50 px-5 py-3 rounded-2xl">
          <div className="text-sm text-slate-500">
            Total Leads
          </div>

          <div className="text-3xl font-bold text-indigo-600">
            {leads.length}
          </div>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="bg-white border rounded-3xl p-16 text-center">
          <User
            size={45}
            className="mx-auto text-slate-300 mb-4"
          />

          <h2 className="text-2xl font-bold">
            No Leads Assigned
          </h2>

          <p className="text-slate-500 mt-2">
            Admin assigned leads will appear here.
          </p>
        </div>
      ) : (
        <div className="grid xl:grid-cols-2 gap-6">

          {leads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white rounded-3xl border shadow-sm p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between">

                <div>
                  <h2 className="text-xl font-bold">
                    {lead.customer_name}
                  </h2>

                  <div className="text-slate-500 text-sm mt-1">
                    {lead.phone_number}
                  </div>
                </div>

                <div className="text-right">

                  <div
                    className={`inline-block px-3 py-1 rounded-xl text-xs font-semibold ${statusColor(
                      lead.status
                    )}`}
                  >
                    {lead.status || "NEW"}
                  </div>

                  <div
                    className={`mt-2 text-sm font-bold ${priorityColor(
                      lead.priority
                    )}`}
                  >
                    {lead.priority || "NORMAL"}
                  </div>

                </div>

              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">

                <div className="bg-slate-50 rounded-2xl p-4">
                  <div className="text-xs text-slate-500">
                    City
                  </div>

                  <div className="font-semibold mt-2 flex items-center gap-2">
                    <MapPin size={15} />
                    {lead.city || "-"}
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4">
                  <div className="text-xs text-slate-500">
                    Project
                  </div>

                  <div className="font-semibold mt-2">
                    {lead.project || "-"}
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4">
                  <div className="text-xs text-slate-500">
                    Next Follow-up
                  </div>

                  <div className="font-semibold mt-2 flex items-center gap-2">
                    <CalendarDays size={15} />

                    {lead.nextFollowup
                      ? new Date(
                          lead.nextFollowup
                        ).toLocaleDateString()
                      : "-"}
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4">
                  <div className="text-xs text-slate-500">
                    Stage
                  </div>

                  <div className="font-semibold mt-2 flex items-center gap-2">
                    <BadgeCheck size={15} />
                    {lead.status || "NEW"}
                  </div>
                </div>

              </div>

              <div className="flex flex-wrap gap-3 mt-6">

                <a
                  href={`tel:${lead.phone_number}`}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-2xl hover:bg-blue-700"
                >
                  <Phone size={17} />
                  Call
                </a>

                <a
                  href={`https://wa.me/91${lead.phone_number}`}
                  target="_blank"
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-2xl hover:bg-green-700"
                >
                  <MessageCircle size={17} />
                  WhatsApp
                </a>

                <button
                  className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-3 rounded-2xl hover:bg-indigo-700"
                >
                  <Eye size={17} />
                  View
                </button>

                <button
                  className="bg-orange-500 text-white px-4 py-3 rounded-2xl hover:bg-orange-600"
                >
                  Follow-up
                </button>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}