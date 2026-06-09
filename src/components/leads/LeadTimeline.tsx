"use client";

interface Activity {
  id: string;
  type: string;
  note: string;
  createdAt: string;
}

export const LeadTimeline = ({ activities }: { activities: Activity[] }) => {
  if (activities.length === 0) return <p className="text-sm text-gray-500">No activity logs found.</p>;

  return (
    <div className="space-y-4 p-2">
      {activities.map((act) => (
        <div key={act.id} className="relative border-l-2 border-indigo-200 pl-4 py-2">
          <div className="absolute -left-[5px] top-3 w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
          <p className="text-xs font-bold text-indigo-700">{act.type}</p>
          <p className="text-sm text-gray-700">{act.note}</p>
          <p className="text-[10px] text-gray-400 mt-1">
            {new Date(act.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};