"use client";

import {
  LayoutDashboard,
  CheckSquare,
  Users,
  PhoneCall,
  CalendarDays,
  User,
  LogOut,
} from "lucide-react";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function EmployeeSidebar({
  activeTab,
  setActiveTab,
}: Props) {
  const menus = [
    {
      key: "dashboard",
      title: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      key: "tasks",
      title: "My Tasks",
      icon: CheckSquare,
    },
    {
      key: "leads",
      title: "My Leads",
      icon: Users,
    },
    {
      key: "followups",
      title: "Followups",
      icon: PhoneCall,
    },
    {
      key: "meetings",
      title: "Meetings",
      icon: CalendarDays,
    },
    {
      key: "profile",
      title: "Profile",
      icon: User,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-white border-r shadow-sm p-5">

      {/* Logo */}
      <div className="mb-10">

        <h1 className="text-2xl font-bold text-indigo-600">
          Employee CRM
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Work Management
        </p>

      </div>

      {/* Menu */}
      <div className="space-y-2">

        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <button
              key={menu.key}
              onClick={() => setActiveTab(menu.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition
              ${
                activeTab === menu.key
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon size={20} />

              <span className="font-medium">
                {menu.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Logout */}
      <div className="absolute bottom-8 left-5 right-5">

        <button
          className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-2xl hover:bg-red-100 transition"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>
    </aside>
  );
}