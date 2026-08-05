"use client";

import {
  CalendarDays,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface MeetingHeaderProps {
  total: number;
  pending: number;
  accepted: number;
  completed: number;
}

export default function MeetingHeader({
  total,
  pending,
  accepted,
  completed,
}: MeetingHeaderProps) {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        {/* Left */}
        <div>

          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">

            <CalendarDays size={14} />

            Meetings Workspace

          </div>

          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            Client Meetings
          </h1>

          <p className="mt-2 text-slate-500 max-w-xl">
            Manage scheduled meetings, accept requests, update meeting
            outcomes, and move leads through the CRM pipeline.
          </p>

        </div>

        {/* Right */}
        <div className="bg-slate-50 rounded-2xl px-5 py-4 border border-slate-200 min-w-[260px]">

          <div className="flex items-center gap-2 text-slate-500 text-sm">

            <Clock size={16} />

            {today}

          </div>

          <div className="mt-3 flex items-center gap-2">

            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />

            <span className="text-sm font-semibold text-green-700">
              Employee Online
            </span>

          </div>

        </div>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

        {/* Total */}
        <div className="bg-slate-50 rounded-2xl p-5 border">

          <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
            Total Meetings
          </p>

          <h2 className="text-3xl font-bold mt-3 text-slate-900">
            {total}
          </h2>

        </div>

        {/* Pending */}
        <div className="bg-yellow-50 rounded-2xl p-5 border border-yellow-100">

          <div className="flex justify-between">

            <div>

              <p className="text-xs uppercase tracking-wider text-yellow-700 font-semibold">
                Pending
              </p>

              <h2 className="text-3xl font-bold mt-3 text-yellow-700">
                {pending}
              </h2>

            </div>

            <AlertCircle className="text-yellow-600" size={24} />

          </div>

        </div>

        {/* Accepted */}
        <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">

          <div className="flex justify-between">

            <div>

              <p className="text-xs uppercase tracking-wider text-blue-700 font-semibold">
                Accepted
              </p>

              <h2 className="text-3xl font-bold mt-3 text-blue-700">
                {accepted}
              </h2>

            </div>

            <CalendarDays className="text-blue-600" size={24} />

          </div>

        </div>

        {/* Completed */}
        <div className="bg-green-50 rounded-2xl p-5 border border-green-100">

          <div className="flex justify-between">

            <div>

              <p className="text-xs uppercase tracking-wider text-green-700 font-semibold">
                Completed
              </p>

              <h2 className="text-3xl font-bold mt-3 text-green-700">
                {completed}
              </h2>

            </div>

            <CheckCircle2 className="text-green-600" size={24} />

          </div>

        </div>

      </div>

    </div>
  );
}