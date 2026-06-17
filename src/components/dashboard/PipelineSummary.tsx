"use client";

interface Props {
  leads: any[];
}

export default function PipelineSummary({ leads }: Props) {
  const total = leads.length;

  const pipeline = [
    {
      title: "New Leads",
      count: leads.filter((l) => l.stage === "NEW").length,
      color: "from-blue-500 to-blue-600",
      icon: "🆕",
    },
    {
      title: "Follow Ups",
      count: leads.filter(
        (l) =>
          l.stage === "CALL_SCHEDULED" ||
          l.stage === "FOLLOWUP"
      ).length,
      color: "from-yellow-400 to-yellow-500",
      icon: "📞",
    },
    {
      title: "Meetings",
      count: leads.filter(
        (l) => l.stage === "MEETING_FIXED"
      ).length,
      color: "from-indigo-500 to-indigo-600",
      icon: "🤝",
    },
    {
      title: "Site Visits",
      count: leads.filter(
        (l) => l.stage === "SITE_VISIT"
      ).length,
      color: "from-purple-500 to-purple-600",
      icon: "🏠",
    },
    {
      title: "Confirmed",
      count: leads.filter(
        (l) => l.stage === "CONFIRMED"
      ).length,
      color: "from-green-500 to-green-600",
      icon: "✅",
    },
    {
      title: "Rejected",
      count: leads.filter(
        (l) => l.stage === "REJECTED"
      ).length,
      color: "from-red-500 to-red-600",
      icon: "❌",
    },
  ];

  const conversionRate =
    total > 0
      ? ((pipeline[4].count / total) * 100).toFixed(1)
      : "0";

  return (
    <div className="bg-white rounded-3xl border shadow-sm p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Pipeline Summary
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Total Leads : {total}
          </p>
        </div>

        <div className="bg-green-50 px-4 py-2 rounded-2xl">
          <p className="text-xs text-slate-500">
            Conversion Rate
          </p>

          <h3 className="text-lg font-bold text-green-600">
            {conversionRate}%
          </h3>
        </div>
      </div>

      {/* Pipeline */}
      <div className="space-y-6">

        {pipeline.map((item, index) => {
          const percentage =
            total > 0
              ? (item.count / total) * 100
              : 0;

          return (
            <div key={index}>

              <div className="flex justify-between items-center mb-2">

                <div className="flex items-center gap-2">
                  <span>{item.icon}</span>

                  <span className="font-medium text-slate-700">
                    {item.title}
                  </span>
                </div>

                <div className="text-right">
                  <div className="font-bold text-slate-800">
                    {item.count}
                  </div>

                  <div className="text-xs text-slate-400">
                    {percentage.toFixed(1)}%
                  </div>
                </div>

              </div>

              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">

                <div
                  className={`h-3 rounded-full bg-gradient-to-r ${item.color}`}
                  style={{
                    width: `${percentage}%`,
                  }}
                />

              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}