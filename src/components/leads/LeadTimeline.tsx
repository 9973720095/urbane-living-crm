"use client";

interface Props {
  activities: any[];
}

export function LeadTimeline({ activities }: Props) {
  const getColor = (status?: string) => {
    switch (status) {
      case "NEW":
        return "bg-slate-500";

      case "CALL_SCHEDULED":
        return "bg-yellow-500";

      case "FOLLOWUP":
        return "bg-orange-500";

      case "MEETING_FIXED":
        return "bg-blue-500";

      case "SITE_VISIT":
        return "bg-purple-500";

      case "CONFIRMED":
        return "bg-green-500";

      case "REJECTED":
        return "bg-red-500";

      default:
        return "bg-slate-400";
    }
  };

  const getBadge = (status?: string) => {
    switch (status) {
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
        return "bg-slate-100 text-slate-600";
    }
  };

  if (!activities.length) {
    return (
      <div className="bg-white rounded-2xl border p-8 text-center text-slate-400">
        No activity found.
      </div>
    );
  }

  return (
    <div className="relative space-y-6">

      {activities.map((activity, index) => (
        <div
          key={activity.id}
          className="relative flex gap-5"
        >
          {/* Vertical Line */}
          {index !== activities.length - 1 && (
            <div className="absolute left-3 top-8 h-full w-[2px] bg-slate-200" />
          )}

          {/* Dot */}
          <div
            className={`w-6 h-6 rounded-full mt-1 flex-shrink-0 shadow ${getColor(
              activity.newStatus
            )}`}
          />

          {/* Card */}
          <div className="flex-1 rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition">

            <div className="flex items-start justify-between gap-4">

              <div className="space-y-3">

                <h3 className="font-semibold text-slate-800">
                  {activity.type || "Lead Updated"}
                </h3>

                <div className="flex items-center gap-2 flex-wrap">

                  {activity.oldStatus && (
                    <>
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-xs text-slate-700">
                        {activity.oldStatus}
                      </span>

                      <span className="text-slate-400">
                        →
                      </span>
                    </>
                  )}

                  {activity.newStatus && (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getBadge(
                        activity.newStatus
                      )}`}
                    >
                      {activity.newStatus}
                    </span>
                  )}
                </div>

                {activity.note && (
                  <p className="text-sm text-slate-600 leading-6">
                    {activity.note}
                  </p>
                )}

                {activity.performedBy && (
                  <div className="text-xs text-slate-400">
                    Updated by <span className="font-medium">{activity.performedBy}</span>
                  </div>
                )}
              </div>

              <div className="text-xs text-slate-400 whitespace-nowrap">
                {new Date(activity.createdAt).toLocaleString()}
              </div>

            </div>

          </div>
        </div>
      ))}
    </div>
  );
}