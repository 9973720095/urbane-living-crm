"use client";

import {
  CalendarDays,
  PhoneCall,
  MapPin,
  Clock,
  CheckCircle2,
} from "lucide-react";

import type { Task } from "@/types/employee";

interface TodayScheduleProps {
  tasks?: Task[];
}

export default function TodaySchedule({
  tasks = [],
}: TodayScheduleProps) {
  const getIcon = (type?: string) => {
    switch (type) {
      case "CALL":
        return (
          <PhoneCall
            size={18}
            className="text-blue-600"
          />
        );

      case "FOLLOWUP":
        return (
          <Clock
            size={18}
            className="text-yellow-600"
          />
        );

      case "MEETING":
        return (
          <CalendarDays
            size={18}
            className="text-indigo-600"
          />
        );

      case "SITE_VISIT":
        return (
          <MapPin
            size={18}
            className="text-rose-600"
          />
        );

      default:
        return (
          <CalendarDays
            size={18}
            className="text-slate-600"
          />
        );
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "ACCEPTED":
        return "bg-blue-100 text-blue-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm">
      {/* Header */}

      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Today's Schedule
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Calls, Meetings & Site Visits
          </p>
        </div>

        <div className="bg-indigo-50 px-4 py-2 rounded-xl">
          <span className="text-indigo-700 font-bold">
            {tasks.length}
          </span>
        </div>
      </div>

      {/* List */}

      <div className="divide-y">
        {tasks.length === 0 ? (
          <div className="py-14 text-center">
            <CalendarDays
              className="mx-auto text-slate-300 mb-3"
              size={42}
            />

            <h3 className="font-semibold text-slate-700">
              No Schedule Today
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              You're free for today.
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-5 hover:bg-slate-50 transition"
            >
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">
                  {getIcon(task.type)}
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800">
                    {task.title}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {task.lead?.customer_name ??
                      "No Customer"}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-semibold text-slate-700">
                  {task.scheduledAt
                    ? new Date(
                        task.scheduledAt
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "--:--"}
                </div>

                <span
                  className={`inline-flex mt-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status ?? "PENDING"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}

      {tasks.length > 0 && (
        <div className="p-4 border-t bg-slate-50 rounded-b-3xl flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <CheckCircle2
              size={16}
              className="text-green-600"
            />

            Stay on schedule
          </div>

          <span className="text-xs text-slate-400">
            Updated Live
          </span>
        </div>
      )}
    </div>
  );
}