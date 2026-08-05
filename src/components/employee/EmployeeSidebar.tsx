"use client";

import {
  LayoutDashboard,
  ClipboardList,
  Users,
  PhoneCall,
  CalendarDays,
  MapPin,
  User,
  LogOut,
} from "lucide-react";

interface Props {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;

  totalTasks?: number;
  pendingTasks?: number;
  followups?: number;
  meetings?: number;
  siteVisits?: number;
}

export default function EmployeeSidebar({
  activeTab,
  setActiveTab,
  totalTasks = 0,
  pendingTasks = 0,
  followups = 0,
  meetings = 0,
  siteVisits = 0,
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
      icon: ClipboardList,
      count: totalTasks,
    },
    {
      key: "pending",
      title: "Pending",
      icon: PhoneCall,
      count: pendingTasks,
    },
    {
      key: "followups",
      title: "Followups",
      icon: PhoneCall,
      count: followups,
    },
    {
      key: "meetings",
      title: "Meetings",
      icon: CalendarDays,
      count: meetings,
    },
    {
      key: "site_visits",
      title: "Site Visits",
      icon: MapPin,
      count: siteVisits,
    },
    {
      key: "leads",
      title: "My Leads",
      icon: Users,
    },
    {
      key: "profile",
      title: "Profile",
      icon: User,
    },
  ];

  return (
    <aside className="w-72 h-screen bg-white border-r border-slate-200 shadow-sm flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b">

        <h1 className="text-2xl font-bold text-indigo-600">
          Urbane CRM
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Employee Workspace
        </p>

      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-2">

        {menus.map((menu) => {
          const Icon = menu.icon;
          const active = activeTab === menu.key;

          return (
            <button
              key={menu.key}
              onClick={() => setActiveTab(menu.key)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200
              ${
                active
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-3">

                <Icon size={18} />

                <span className="font-medium">
                  {menu.title}
                </span>

              </div>

              {menu.count !== undefined && (
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-lg
                  ${
                    active
                      ? "bg-white text-indigo-600"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {menu.count}
                </span>
              )}
            </button>
          );
        })}

      </nav>

      {/* Employee */}
      <div className="border-t p-5">

        <div className="flex items-center gap-3 mb-5">

          <div className="w-11 h-11 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
            SJ
          </div>

          <div>

            <h3 className="font-semibold text-slate-800">
              Employee
            </h3>

            <p className="text-xs text-green-600">
              ● Active Now
            </p>

          </div>

        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-xl transition">

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </aside>
  );
}