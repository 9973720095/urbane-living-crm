"use client";
import { useState, useEffect } from "react";
import OverviewConsole from "./OverviewConsole";
import CeilingLeads from "./CeilingLeads";
import SystemSettings from "./SystemSettings";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [leads, setLeads] = useState<any[]>([]);

  const fetchLeads = async () => {
    const res = await fetch('/api/leads');
    setLeads(await res.json());
  };

  useEffect(() => { fetchLeads(); const i = setInterval(fetchLeads, 5000); return () => clearInterval(i); }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 text-slate-200 p-6 flex flex-col">
        <h1 className="text-xl font-bold text-white mb-8">Urbane Living</h1>
        <nav className="space-y-2">
          <button onClick={()=>setActiveTab("overview")} className={`w-full text-left px-4 py-2 rounded ${activeTab==="overview"?"bg-slate-800 text-white":""}`}>Overview Console</button>
          <button onClick={()=>setActiveTab("leads")} className={`w-full text-left px-4 py-2 rounded ${activeTab==="leads"?"bg-slate-800 text-white":""}`}>Ceiling Leads</button>
          <button onClick={()=>setActiveTab("settings")} className={`w-full text-left px-4 py-2 rounded ${activeTab==="settings"?"bg-slate-800 text-white":""}`}>System Settings</button>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        {activeTab==="overview" && <OverviewConsole leads={leads} />}
        {activeTab==="leads" && <CeilingLeads leads={leads} refresh={fetchLeads} />}
        {activeTab==="settings" && <SystemSettings />}
      </main>
    </div>
  );
}