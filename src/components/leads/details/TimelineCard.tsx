"use client";

import {
  CalendarDays,
  Clock3,
  User,
  MessageSquare,
} from "lucide-react";

import { TimelineActivity } from "@/components/leads/details/types";

interface TimelineCardProps {
  activity: TimelineActivity;
}

const stageColors: Record<string, string> = {
  NEW: "bg-blue-500",
  CALL_SCHEDULED: "bg-yellow-500",
  FOLLOWUP: "bg-orange-500",
  MEETING_FIXED: "bg-purple-500",
  SITE_VISIT: "bg-indigo-500",
  CONFIRMED: "bg-green-600",
  REJECTED: "bg-red-600",
};

function formatDate(date: string) {
  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TimelineCard({
  activity,
}: TimelineCardProps) {
  const color =
    stageColors[activity.newStatus || "NEW"] ??
    "bg-slate-500";

  return (
    <div className="relative flex gap-5">

      {/* Timeline */}

      <div className="flex flex-col items-center">

        <div
          className={`w-4 h-4 rounded-full ${color}`}
        />

        <div className="w-[2px] flex-1 bg-slate-200" />

      </div>

      {/* Card */}

      <div className="flex-1 rounded-2xl border bg-white p-5 shadow-sm">

        <div className="flex items-center justify-between">

          <h3 className="font-semibold text-lg">

            {activity.type}

          </h3>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${color}`}
          >
            {activity.newStatus || "-"}
          </span>

        </div>

        {(activity.oldStatus || activity.newStatus) && (
          <div className="mt-4 flex items-center gap-2 text-sm">

            <span className="font-medium">
              Stage
            </span>

            <span className="text-slate-500">
              {activity.oldStatus || "-"}
            </span>

            <span>→</span>

            <span className="font-semibold">
              {activity.newStatus || "-"}
            </span>

          </div>
        )}

        {activity.note && (
          <div className="mt-4 flex items-start gap-2">

            <MessageSquare
              size={18}
              className="mt-1 text-blue-600"
            />

            <p className="text-sm text-slate-700">
              {activity.note}
            </p>

          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-5 text-sm text-slate-500">

          <div className="flex items-center gap-2">

            <User size={16} />

            {activity.performedBy || "System"}

          </div>

          <div className="flex items-center gap-2">

            <CalendarDays size={16} />

            {formatDate(activity.createdAt)}

          </div>

          <div className="flex items-center gap-2">

            <Clock3 size={16} />

            Activity Logged

          </div>

        </div>

      </div>

    </div>
  );
}