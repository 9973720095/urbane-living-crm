"use client";

import {
  Bell,
  CalendarDays,
} from "lucide-react";

interface Props {
  employeeName?: string;
}        

export default function EmployeeTopNavbar({
  employeeName = "Employee",
}: Props) {
  const today = new Date();

  const currentDate = today.toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <header className="bg-white border-b shadow-sm px-6 py-4">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        {/* Left */}
        <div>

          <h1 className="text-2xl font-bold text-slate-800">
            Employee Dashboard
          </h1>

          <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">

            <CalendarDays size={16} />

            <span>{currentDate}</span>

          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-5">

          {/* Notification */}
          <button className="relative w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition">

            <Bell
              size={20}
              className="text-slate-700"
            />

            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              0
            </span>

          </button>

          {/* Profile */}
          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
              {employeeName.charAt(0)}
            </div>

            <div>

              <div className="font-semibold text-slate-800">
                {employeeName}
              </div>

              <div className="text-sm text-slate-500">
                Employee
              </div>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}