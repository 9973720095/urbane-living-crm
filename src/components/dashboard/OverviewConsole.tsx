"use client";

import {
  Activity,
  BarChart3,
  Handshake,
  Home,
  PhoneCall,
  Sparkles,
  Trophy,
  XCircle,
} from "lucide-react";

interface Lead {
  id: string;
  customer_name?: string;
  city?: string;
  stage: string;
}

interface Props {
  leads: Lead[];
}

export default function OverviewConsole({
  leads = [],
}: Props) {
  if (!Array.isArray(leads)) {
    return (
      <div className="text-red-500">
        Invalid Leads Data
      </div>
    );
  }

  const total = leads.length;

  const stageCounts = {
    new: 0,
    calls: 0,
    meetings: 0,
    visits: 0,
    confirmed: 0,
    rejected: 0,
  };

  const cityMap: Record<string, number> = {};

  leads.forEach((lead) => {
    switch (lead.stage) {
      case "NEW":
        stageCounts.new++;
        break;

      case "CALL_SCHEDULED":
        stageCounts.calls++;
        break;

      case "MEETING_FIXED":
        stageCounts.meetings++;
        break;

      case "SITE_VISIT":
        stageCounts.visits++;
        break;

      case "CONFIRMED":
        stageCounts.confirmed++;
        break;

      case "REJECTED":
        stageCounts.rejected++;
        break;
    }

    const city = lead.city || "Unknown";

    cityMap[city] = (cityMap[city] || 0) + 1;
  });

  const activeLeads =
    total - stageCounts.rejected;

  const conversionRate =
    total === 0
      ? 0
      : Number(
          (
            (stageCounts.confirmed / total) *
            100
          ).toFixed(1)
        );

  const topCity =
    Object.entries(cityMap).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || "-";

  const stats = [
    {
      title: "Total Leads",
      value: total,
      icon: <BarChart3 size={20} />,
      color: "from-slate-700 to-slate-900",
    },

    {
      title: "Calls Scheduled",
      value: stageCounts.calls,
      icon: <PhoneCall size={20} />,
      color: "from-yellow-500 to-orange-500",
    },

    {
      title: "Meetings",
      value: stageCounts.meetings,
      icon: <Handshake size={20} />,
      color: "from-blue-500 to-indigo-600",
    },

    {
      title: "Site Visits",
      value: stageCounts.visits,
      icon: <Home size={20} />,
      color: "from-purple-500 to-violet-600",
    },

    {
      title: "Won Deals",
      value: stageCounts.confirmed,
      icon: <Trophy size={20} />,
      color: "from-green-500 to-emerald-600",
    },

    {
      title: "Rejected",
      value: stageCounts.rejected,
      icon: <XCircle size={20} />,
      color: "from-red-500 to-rose-600",
    },
  ];

  if (total === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 border shadow-sm text-center">
        <h2 className="text-2xl font-bold text-slate-700">
          No Leads Available
        </h2>

        <p className="text-slate-500 mt-2">
          Add leads to see analytics and pipeline insights.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-6 gap-5">

        {stats.map((item) => (
          <div
            key={item.title}
            className={`
              bg-gradient-to-r
              ${item.color}
              rounded-3xl
              p-5
              text-white
              shadow-lg
              hover:-translate-y-1
              duration-300
            `}
          >
            <div className="flex items-center justify-between mb-6">

              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                {item.icon}
              </div>

              <h2 className="text-3xl font-bold">
                {item.value}
              </h2>

            </div>

            <p className="text-sm text-white/80">
              {item.title}
            </p>

          </div>
        ))}

      </div>

      {/* Insights */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-3xl p-6 lg:p-8 text-white shadow-xl">

        <div className="flex items-center gap-3">

          <Sparkles />

          <div>

            <h2 className="text-2xl font-bold">
              Today's Pipeline Insights
            </h2>

            <p className="text-white/80 mt-1">
              Real-time CRM analytics and sales performance overview.
            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">

          <div className="bg-white/10 rounded-2xl p-5">

            <div className="text-sm text-white/70">
              Top City
            </div>

            <div className="text-2xl font-bold mt-2">
              {topCity}
            </div>

          </div>

          <div className="bg-white/10 rounded-2xl p-5">

            <div className="text-sm text-white/70">
              Conversion Rate
            </div>

            <div className="text-2xl font-bold mt-2">
              {conversionRate}%
            </div>

          </div>

          <div className="bg-white/10 rounded-2xl p-5">

            <div className="text-sm text-white/70">
              Active Leads
            </div>

            <div className="text-2xl font-bold mt-2">
              {activeLeads}
            </div>

          </div>

          <div className="bg-white/10 rounded-2xl p-5">

            <div className="flex items-center gap-2 text-white/70">
              <Activity size={16} />
              New Leads
            </div>

            <div className="text-2xl font-bold mt-2">
              {stageCounts.new}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}