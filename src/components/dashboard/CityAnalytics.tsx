"use client";

import {
  MapPinned,
  Trophy,
  Building2,
  Globe,
} from "lucide-react";

interface Lead {
  id: string;
  city?: string;
}

interface Props {
  leads: Lead[];
}

export default function CityAnalytics({
  leads = [],
}: Props) {
  const cityMap: Record<string, number> = {};

  leads.forEach((lead) => {
    const city = lead.city?.trim() || "Unknown";

    cityMap[city] = (cityMap[city] || 0) + 1;
  });

  const cities = Object.entries(cityMap)
    .map(([city, count]) => ({
      city,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const totalLeads = leads.length;

  const topCity = cities[0];

  const marketCoverage =
    totalLeads === 0
      ? 0
      : (
          (Object.keys(cityMap).length /
            totalLeads) *
          100
        ).toFixed(1);

  const getGradient = (index: number) => {
    switch (index) {
      case 0:
        return "from-indigo-500 to-violet-600";

      case 1:
        return "from-emerald-500 to-green-600";

      case 2:
        return "from-amber-500 to-orange-500";

      case 3:
        return "from-pink-500 to-rose-500";

      default:
        return "from-slate-400 to-slate-500";
    }
  };

  return (
    <div className="bg-white rounded-3xl border shadow-sm p-4 md:p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            City Analytics
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Top Performing Locations
          </p>
        </div>

        <div className="bg-indigo-50 px-5 py-4 rounded-2xl">
          <div className="text-xs text-slate-500">
            Cities Covered
          </div>

          <div className="text-3xl font-bold text-indigo-600">
            {Object.keys(cityMap).length}
          </div>
        </div>
      </div>

      {/* Cities */}
      <div className="space-y-5">

        {cities.length > 0 ? (
          cities.map((item, index) => {

            const percentage =
              totalLeads === 0
                ? 0
                : (item.count / totalLeads) * 100;

            return (
              <div
                key={item.city}
                className="bg-slate-50 rounded-3xl p-5 hover:bg-slate-100 transition"
              >
                <div className="flex items-center justify-between mb-4">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center font-bold text-slate-700">
                      #{index + 1}
                    </div>

                    <div>

                      <div className="flex items-center gap-2">

                        <MapPinned
                          size={17}
                          className="text-indigo-500"
                        />

                        <h3 className="font-semibold text-slate-800">
                          {item.city}
                        </h3>

                      </div>

                      <p className="text-xs text-slate-500 mt-1">
                        {percentage.toFixed(1)}% of total leads
                      </p>

                    </div>

                  </div>

                  <div className="text-right">

                    <div className="text-2xl font-bold text-slate-800">
                      {item.count}
                    </div>

                    <div className="text-xs text-slate-400">
                      Leads
                    </div>

                  </div>

                </div>

                {/* Progress */}
                <div className="h-3 bg-white rounded-full overflow-hidden">

                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${getGradient(
                      index
                    )} transition-all duration-700`}
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>

              </div>
            );
          })
        ) : (
          <div className="text-center py-16 text-slate-400">
            No city data available
          </div>
        )}

      </div>

      {/* Footer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">

        {/* Top City */}
        <div className="bg-emerald-50 rounded-3xl p-5">

          <div className="flex items-center gap-2 mb-3">

            <Trophy
              size={18}
              className="text-emerald-600"
            />

            <span className="text-sm text-slate-500">
              Top City
            </span>

          </div>

          <div className="text-2xl font-bold text-emerald-600">
            {topCity?.city || "-"}
          </div>

          <div className="text-sm text-slate-500 mt-2">
            {topCity?.count || 0} Leads
          </div>

        </div>

        {/* Total Leads */}
        <div className="bg-indigo-50 rounded-3xl p-5">

          <div className="flex items-center gap-2 mb-3">

            <Building2
              size={18}
              className="text-indigo-600"
            />

            <span className="text-sm text-slate-500">
              Total Leads
            </span>

          </div>

          <div className="text-3xl font-bold text-indigo-600">
            {totalLeads}
          </div>

          <div className="text-sm text-slate-500 mt-2">
            Across all cities
          </div>

        </div>

        {/* Coverage */}
        <div className="bg-purple-50 rounded-3xl p-5">

          <div className="flex items-center gap-2 mb-3">

            <Globe
              size={18}
              className="text-purple-600"
            />

            <span className="text-sm text-slate-500">
              Market Coverage
            </span>

          </div>

          <div className="text-3xl font-bold text-purple-600">
            {marketCoverage}%
          </div>

          <div className="text-sm text-slate-500 mt-2">
            City distribution ratio
          </div>

        </div>

      </div>

    </div>
  );
}