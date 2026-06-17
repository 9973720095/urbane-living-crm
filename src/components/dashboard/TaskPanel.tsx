"use client";

import {
  Phone,
  PhoneCall,
  CalendarDays,
  Home,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface Props {
  leads: any[];
}

export default function TaskPanel({
  leads,
}: Props) {
  const today = new Date();

  const todayFollowups = leads.filter(
    (lead) =>
      lead.nextFollowUp &&
      new Date(lead.nextFollowUp).toDateString() ===
        today.toDateString()
  );

  const calls = leads.filter(
    (lead) => lead.stage === "CALL_SCHEDULED"
  );

  const meetings = leads.filter(
    (lead) => lead.stage === "MEETING_FIXED"
  );

  const siteVisits = leads.filter(
    (lead) => lead.stage === "SITE_VISIT"
  );

  const confirmedDeals = leads.filter(
    (lead) => lead.stage === "CONFIRMED"
  );

  const rejectedLeads = leads.filter(
    (lead) => lead.stage === "REJECTED"
  );

  const cards = [
    {
      title: "Today's Followups",
      value: todayFollowups.length,
      icon: Phone,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      progressColor: "from-yellow-400 to-yellow-500",
    },
    {
      title: "Calls Scheduled",
      value: calls.length,
      icon: PhoneCall,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      progressColor: "from-blue-500 to-indigo-500",
    },
    {
      title: "Meetings",
      value: meetings.length,
      icon: CalendarDays,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      progressColor: "from-indigo-500 to-violet-600",
    },
    {
      title: "Site Visits",
      value: siteVisits.length,
      icon: Home,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      progressColor: "from-purple-500 to-fuchsia-600",
    },
    {
      title: "Confirmed Deals",
      value: confirmedDeals.length,
      icon: CheckCircle2,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      progressColor: "from-green-500 to-emerald-600",
    },
    {
      title: "Rejected Leads",
      value: rejectedLeads.length,
      icon: XCircle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      progressColor: "from-red-500 to-rose-600",
    },
  ];

  const maxValue =
    Math.max(...cards.map((c) => c.value), 1);

  return (
    <div className="bg-white rounded-3xl border shadow-sm p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Task Center
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Daily CRM Activities & Performance
          </p>
        </div>

        <div className="bg-indigo-50 px-5 py-4 rounded-2xl">

          <div className="text-xs text-slate-500">
            Total Activities
          </div>

          <div className="text-3xl font-bold text-indigo-600">
            {cards.reduce(
              (sum, card) => sum + card.value,
              0
            )}
          </div>

        </div>

      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

        {cards.map((card) => {
          const percentage =
            (card.value / maxValue) * 100;

          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-slate-50 hover:bg-slate-100 rounded-3xl border p-5 transition-all duration-300"
            >

              <div className="flex items-center justify-between mb-5">

                <div>

                  <p className="text-sm text-slate-500">
                    {card.title}
                  </p>

                  <h3 className="text-4xl font-bold text-slate-800 mt-2">
                    {card.value}
                  </h3>

                </div>

                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.iconBg}`}
                >
                  <Icon
                    className={card.iconColor}
                    size={26}
                  />
                </div>

              </div>

              {/* Progress */}
              <div className="space-y-2">

                <div className="flex justify-between text-xs text-slate-400">
                  <span>Activity Level</span>

                  <span>
                    {percentage.toFixed(0)}%
                  </span>
                </div>

                <div className="h-3 bg-white rounded-full overflow-hidden">

                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${card.progressColor}`}
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}