"use client";

import {
  Bell,
  CalendarDays,
  LogOut,
  Clock3,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  employeeName?: string;
  designation?: string;
  notificationCount?: number;
}

export default function EmployeeTopNavbar({
  employeeName = "Employee",
  designation = "Sales Executive",
  notificationCount = 0,
}: Props) {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateTime();

    const timer = setInterval(updateTime, 1000 * 30);

    return () => clearInterval(timer);
  }, []);

  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <header className="bg-white border-b border-slate-200 px-8 py-5 sticky top-0 z-30">

      <div className="flex items-center justify-between">

        {/* Left */}

        <div>

          <h1 className="text-2xl font-bold text-slate-800">
            Employee Dashboard
          </h1>

          <div className="flex flex-wrap items-center gap-5 mt-2 text-sm text-slate-500">

            <div className="flex items-center gap-2">
              <CalendarDays size={16} />
              {currentDate}
            </div>

            <div className="flex items-center gap-2">
              <Clock3 size={16} />
              {currentTime}
            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          {/* Notification */}

          <button className="relative h-11 w-11 rounded-xl bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center">

            <Bell
              size={20}
              className="text-slate-700"
            />

            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
                {notificationCount}
              </span>
            )}

          </button>

          {/* Profile */}

          <div className="flex items-center gap-3">

            <div className="h-12 w-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
              {employeeName.charAt(0).toUpperCase()}
            </div>

            <div>

              <div className="font-semibold text-slate-800">
                {employeeName}
              </div>

              <div className="text-sm text-slate-500">
                {designation}
              </div>

            </div>

          </div>

          {/* Logout */}

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl transition"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>

    </header>
  );
}