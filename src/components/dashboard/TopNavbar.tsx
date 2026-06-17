"use client";

import Image from "next/image";
import {
  Phone,
  Mail,
  Wifi,
} from "lucide-react";

export default function TopNavbar() {
  return (
    <header className="sticky top-0 z-30 bg-white border-b shadow-sm">

      <div className="px-6 py-4 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-4">

          <Image
            src="https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1777899675/UrbaneLiving_Logo_6_1_dfh2r1.png"
            alt="Urbane Living"
            width={55}
            height={55}
            className="rounded-2xl"
          />

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Urbane Living CRM
            </h2>

            <p className="text-sm text-slate-500">
              Smart Sales Management System
            </p>

          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-5">

          {/* Company Info */}
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

          {/* System Status */}
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-2xl flex items-center gap-2 text-sm font-semibold">

            <Wifi size={16} />

            <span>
              System Online
            </span>

          </div>

          {/* Admin Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
            UL
          </div>

        </div>

      </div>

    </header>
  );
}