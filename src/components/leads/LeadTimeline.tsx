import React from "react";

interface Activity {
  id: string;
  type: string;
  oldStatus?: string | null;
  newStatus?: string | null;
  note?: string | null;
  performedBy?: string | null;
  createdAt: string | Date;
}

interface LeadTimelineProps {
  activities: Activity[];
}

export const LeadTimeline: React.FC<LeadTimelineProps> = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 bg-white rounded-xl border border-gray-100">
        No recent activities tracked for this lead yet.
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
      <h3 className="mb-6 text-lg font-bold text-gray-800">Lead Activity Trail</h3>
      <div className="relative pl-6 border-l-2 border-blue-100 space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="relative group">
            {/* Timeline Icon Node */}
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-sm group-hover:bg-blue-600 transition-colors" />
            
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between items-start md:items-center">
                <span className="font-semibold text-sm text-gray-900 bg-blue-50 px-2 py-0.5 rounded text-blue-700">
                  {activity.type}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(activity.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>

              {/* Status Change Badge Indicator */}
              {(activity.oldStatus || activity.newStatus) && (
                <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <span className="line-through text-gray-400">{activity.oldStatus || "NONE"}</span>
                  <span className="text-gray-400">➔</span>
                  <span className="text-green-600 font-medium">{activity.newStatus}</span>
                </div>
              )}

              {/* Custom Remarks/Notes matching schema 'note' field */}
              {activity.note && (
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100 mt-2 italic">
                  "{activity.note}"
                </p>
              )}

              {activity.performedBy && (
                <span className="text-xs text-gray-400 mt-1">
                  Logged by: <strong className="text-gray-500">{activity.performedBy}</strong>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};