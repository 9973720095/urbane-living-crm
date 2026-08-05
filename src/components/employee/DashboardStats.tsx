"use client";

import {
  ClipboardList,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  CalendarDays,
  Phone,
} from "lucide-react";

interface DashboardStatsProps {
  pending: number;
  accepted: number;
  completed: number;
  overdue: number;
  meetings: number;
  followups: number;
}

const stats = [
  {
    key: "pending",
    title: "Pending Tasks",
    icon: ClipboardList,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    key: "accepted",
    title: "Accepted Tasks",
    icon: Clock3,
    color: "bg-blue-100 text-blue-700",
  },
  {
    key: "completed",
    title: "Completed",
    icon: CheckCircle2,
    color: "bg-green-100 text-green-700",
  },
  {
    key: "overdue",
    title: "Overdue",
    icon: AlertTriangle,
    color: "bg-red-100 text-red-700",
  },
  {
    key: "meetings",
    title: "Today's Meetings",
    icon: CalendarDays,
    color: "bg-purple-100 text-purple-700",
  },
  {
    key: "followups",
    title: "Today's Followups",
    icon: Phone,
    color: "bg-indigo-100 text-indigo-700",
  },
];

export default function DashboardStats({
  pending,
  accepted,
  completed,
  overdue,
  meetings,
  followups,
}: DashboardStatsProps) {
  const values = {
    pending,
    accepted,
    completed,
    overdue,
    meetings,
    followups,
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.key}
            className="rounded-2xl border bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {values[item.key as keyof typeof values]}
                </h2>
              </div>

              <div className={`rounded-xl p-3 ${item.color}`}>
                <Icon size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}