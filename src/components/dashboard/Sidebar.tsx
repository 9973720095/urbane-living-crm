"use client";

import { X } from "lucide-react";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  isOpen = false,
  onClose,
}: Props) {
  const menus = [
    { key: "overview", icon: "📊", title: "Overview & Analytics" },
    { key: "leadManagement", icon: "🎯", title: "Lead Management" },
    { key: "vpSales", icon: "📈", title: "VP Sales Oversight" },
    { key: "designWorkspace", icon: "🎨", title: "Design Workspace" },
    { key: "tasks", icon: "📞", title: "Daily Reminders" },
    { key: "employees", icon: "👨‍💼", title: "Team Performance" },
    { key: "settings", icon: "⚙️", title: "Settings" },
  ];

  const LOGO_URL =
    "https://res.cloudinary.com/nzqefovs/image/upload/v1787720060/UrbaneLiving_Logo_6_1_dfh2r1.webp";

  return (
    <>
      {/* Mobile Dark Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed left-0 top-0 h-screen w-72 bg-slate-900 text-white flex flex-col shadow-2xl z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Logo Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex flex-col gap-2.5 relative">
          {/* Close button for Mobile */}
          <button
            onClick={onClose}
            className="lg:hidden absolute right-3 top-3 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X size={20} />
          </button>

          <div className="bg-white px-4 py-2.5 rounded-2xl w-full shadow-lg flex items-center justify-center">
            <img
              src={LOGO_URL}
              alt="Urbane Living Logo"
              className="w-full h-auto max-h-12 object-contain"
            />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {menus.map((item) => {
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key);
                  if (onClose) onClose();
                }}
                className={`w-full rounded-xl px-4 py-3 text-left transition flex items-center gap-3 font-medium text-sm ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold"
                    : "bg-slate-800/40 text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.title}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer Branding */}
        <div className="border-t border-slate-800 p-4 bg-slate-950/60">
          <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/40">
            <p className="text-[10px] font-semibold text-indigo-400 tracking-wider uppercase">
              Urbane Living System
            </p>
            <p className="text-xs font-medium text-slate-200 mt-0.5">
              Interior Design Lead Manager
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}