"use client";

import Image from "next/image";
import { Phone, Mail, Wifi, Menu } from "lucide-react";

interface TopNavbarProps {
  onMenuClick?: () => void;
}

export default function TopNavbar({ onMenuClick }: TopNavbarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b shadow-sm w-full min-w-0">
      <div className="px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
        {/* Left Section */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors focus:outline-none shrink-0"
            aria-label="Toggle Navigation"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <div className="shrink-0 relative w-9 h-9 sm:w-12 sm:h-12">
            <Image
              src="https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1777899675/UrbaneLiving_Logo_6_1_dfh2r1.png"
              alt="Urbane Living"
              fill
              sizes="(max-width: 640px) 36px, 48px"
              className="rounded-xl object-contain"
            />
          </div>

          {/* Title & Subtitle */}
          <div className="min-w-0">
            <h2 className="text-base sm:text-2xl font-bold text-slate-800 truncate">
              Urbane Living CRM
            </h2>
            <p className="text-[10px] sm:text-sm text-slate-500 truncate hidden sm:block">
              Smart Sales Management System
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-5 shrink-0">
          {/* Company Info (Desktop Only) */}
          <div className="hidden lg:block text-right">
            <div className="flex items-center gap-2 justify-end text-sm text-slate-600">
              <Phone size={14} />
              9560555103
            </div>
            <div className="flex items-center gap-2 justify-end text-sm text-slate-500 mt-1">
              <Mail size={14} />
              urbanelivingofficial@gmail.com
            </div>
          </div>

          {/* System Status Badge */}
          <div className="bg-emerald-100 text-emerald-700 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold">
            <Wifi size={14} className="sm:w-4 sm:h-4 shrink-0" />
            <span className="hidden xs:inline">System</span> Online
          </div>

          {/* Admin Avatar */}
          <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white flex items-center justify-center font-bold text-xs sm:text-lg shadow-md shrink-0">
            UL
          </div>
        </div>
      </div>
    </header>
  );
}