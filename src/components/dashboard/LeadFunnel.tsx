"use client";

import {
  Phone,
  Users,
  Handshake,
  Home,
  CheckCircle,
  XCircle,
  RefreshCcw,
} from "lucide-react";

interface Props {
  leads: any[];
}

export default function LeadFunnel({
  leads = [],
}: Props) {
  const total = leads.length;

  const stages = [
    {
      key: "NEW",
      label: "New Leads",
      icon: <Users size={18} />,
      color: "bg-slate-500",
    },
    {
      key: "CALL_SCHEDULED",
      label: "Calls Scheduled",
      icon: <Phone size={18} />,
      color: "bg-yellow-500",
    },
    {
      key: "FOLLOWUP",
      label: "Follow Ups",
      icon: <RefreshCcw size={18} />,
      color: "bg-orange-500",
    },
    {
      key: "MEETING_FIXED",
      label: "Meetings",
      icon: <Handshake size={18} />,
      color: "bg-blue-500",
    },
    {
      key: "SITE_VISIT",
      label: "Site Visits",
      icon: <Home size={18} />,
      color: "bg-purple-500",
    },
    {
      key: "CONFIRMED",
      label: "Won Deals",
      icon: <CheckCircle size={18} />,
      color: "bg-green-500",
    },
    {
      key: "REJECTED",
      label: "Rejected",
      icon: <XCircle size={18} />,
      color: "bg-red-500",
    },
  ];

  const confirmed = leads.filter(
    (l) => l.stage === "CONFIRMED"
  ).length;

  const rejected = leads.filter(
    (l) => l.stage === "REJECTED"
  ).length;

  const activePipeline =
    total - confirmed - rejected;

  const conversionRate =
    total === 0
      ? 0
      : (
          (confirmed / total) *
          100
        ).toFixed(1);

  return (
    <div className="bg-white rounded-3xl border shadow-sm p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Lead Funnel
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Complete sales pipeline overview
          </p>
        </div>

        <div className="bg-indigo-50 rounded-2xl px-5 py-4">

          <div className="text-xs text-slate-500">
            Total Leads
          </div>

          <div className="text-3xl font-bold text-indigo-600">
            {total}
          </div>

        </div>

      </div>

      {/* Funnel */}
      <div className="space-y-6">

        {stages.map((stage) => {

          const count = leads.filter(
            (lead) => lead.stage === stage.key
          ).length;

          const percentage =
            total === 0
              ? 0
              : (
                  (count / total) *
                  100
                );

          return (
            <div key={stage.key}>

              <div className="flex items-center justify-between mb-3">

                <div className="flex items-center gap-3">

                  <div
                    className={`${stage.color} w-11 h-11 rounded-xl flex items-center justify-center text-white`}
                  >
                    {stage.icon}
                  </div>

                  <div>

                    <div className="font-semibold text-slate-800">
                      {stage.label}
                    </div>

                    <div className="text-xs text-slate-400">
                      {percentage.toFixed(1)}%
                    </div>

                  </div>

                </div>

                <div className="text-2xl font-bold text-slate-700">
                  {count}
                </div>

              </div>

              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">

                <div
                  className={`${stage.color} h-3 rounded-full transition-all duration-700`}
                  style={{
                    width: `${percentage}%`,
                  }}
                />

              </div>

            </div>
          );
        })}

      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mt-10">

        <div className="bg-indigo-50 rounded-3xl p-5">

          <div className="text-sm text-slate-500">
            Active Pipeline
          </div>

          <div className="text-3xl font-bold text-indigo-600 mt-2">
            {activePipeline}
          </div>

        </div>

        <div className="bg-green-50 rounded-3xl p-5">

          <div className="text-sm text-slate-500">
            Conversion Rate
          </div>

          <div className="text-3xl font-bold text-green-600 mt-2">
            {conversionRate}%
          </div>

        </div>

        <div className="bg-red-50 rounded-3xl p-5">

          <div className="text-sm text-slate-500">
            Lost Leads
          </div>

          <div className="text-3xl font-bold text-red-600 mt-2">
            {rejected}
          </div>

        </div>

        <div className="bg-amber-50 rounded-3xl p-5">

          <div className="text-sm text-slate-500">
            Success Ratio
          </div>

          <div className="text-3xl font-bold text-amber-600 mt-2">
            {confirmed}/{total}
          </div>

        </div>

      </div>

    </div>
  );
}