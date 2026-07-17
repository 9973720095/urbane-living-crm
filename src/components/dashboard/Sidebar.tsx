"use client";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
}: Props) {
  const menus = [
    {
      key: "overview",
      icon: "📊",
      title: "Overview",
    },
    {
      key: "analytics",
      icon: "📈",
      title: "Analytics",
    },
    {
      key: "funnel",
      icon: "🔥",
      title: "Lead Funnel",
    },
    {
      key: "tasks",
      icon: "📞",
      title: "Task Center",
    },
    {
      key: "cities",
      icon: "🏙",
      title: "City Analytics",
    },
    {
      key: "employees",
      icon: "👨💼",
      title: "Employee Performance",
    },
    {
      key: "employeeTasks",
      icon: "📋",
      title: "Employee Tasks",
    },

    // NEW MENU
    {
      key: "taskManager",
      icon: "🎯",
      title: "Task Manager",
    },

    {
      key: "leads",
      icon: "👥",
      title: "Ceiling Leads",
    },
        {
      key: "leadManagement",
      icon: "🎯",
      title: "Lead Management",
    },
    {
      key: "settings",
      icon: "⚙",
      title: "Settings",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900 text-white hidden lg:flex flex-col shadow-2xl">

      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold">
          Urbane Living CRM
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Sales Management System
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-5 space-y-3 overflow-y-auto">

        {menus.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`w-full rounded-2xl px-5 py-4 text-left transition flex items-center gap-3
            ${
              activeTab === item.key
                ? "bg-indigo-600 shadow-lg"
                : "bg-slate-800 hover:bg-slate-700"
            }`}
          >
            <span className="text-xl">
              {item.icon}
            </span>

            <span className="font-medium">
              {item.title}
            </span>
          </button>
        ))}

      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-5">
        <div className="bg-slate-800 rounded-2xl p-4">
          <p className="text-xs text-slate-400">
            Urbane Living CRM
          </p>

          <p className="text-sm font-semibold mt-1">
            Real Estate Lead Manager
          </p>
        </div>
      </div>

    </aside>
  );
}