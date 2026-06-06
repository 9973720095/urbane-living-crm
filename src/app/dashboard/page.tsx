"use client";

import React, { useState } from "react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    window.location.href = "/login";
  };

  // Temporary static data for Urbane Living leads representation
  const sampleLeads = [
    { id: "1", name: "Amit Sharma", email: "amit.s@gmail.com", project: "3BHK Modular Kitchen", status: "New", budget: "₹4.5 Lakhs" },
    { id: "2", name: "Neha Verma", email: "neha.v@yahoo.com", project: "Full Living Room Interior", status: "In Progress", budget: "₹8.0 Lakhs" },
    { id: "3", name: "Sanjay Gupta", email: "sanjay.g@outlook.com", project: "Office Space Renovation", status: "Completed", budget: "₹15.2 Lakhs" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-slate-200 p-6 flex flex-col justify-between shadow-xl">
        <div>
          <div className="mb-8 border-b border-slate-800 pb-4">
            <h1 className="text-xl font-bold text-white tracking-tight">Urbane Living</h1>
            <p className="text-xs text-slate-400 mt-1">Workspace CRM Control Engine</p>
          </div>
          
          <nav className="space-y-1.5">
            <button 
              onClick={() => setActiveTab("overview")}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === "overview" ? "bg-slate-800 text-white border-l-4 border-indigo-500" : "hover:bg-slate-800/60 text-slate-400 hover:text-slate-200"}`}
            >
              Overview Console
            </button>
            <button 
              onClick={() => setActiveTab("leads")}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === "leads" ? "bg-slate-800 text-white border-l-4 border-indigo-500" : "hover:bg-slate-800/60 text-slate-400 hover:text-slate-200"}`}
            >
              Space-Interio Leads
            </button>
            <button 
              onClick={() => setActiveTab("settings")}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === "settings" ? "bg-slate-800 text-white border-l-4 border-indigo-500" : "hover:bg-slate-800/60 text-slate-400 hover:text-slate-200"}`}
            >
              System Settings
            </button>
          </nav>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-red-950/30 hover:text-red-300 rounded-lg transition-colors border border-transparent hover:border-red-900/50"
        >
          Disconnect Session
        </button>
      </aside>

      {/* Main Container Viewport */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Administrative Workspace</h2>
            <p className="text-sm text-slate-500 mt-0.5">Real-time status metrics and user management pipeline.</p>
          </div>
          
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm self-start md:self-auto">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">MongoDB Node Active</span>
          </div>
        </header>

        {activeTab === "overview" && (
          <div>
            {/* Analytical Analytics Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Cached Leads</p>
                <h3 className="text-3xl font-extrabold text-slate-900 mt-2">148 Entries</h3>
                <div className="mt-2 text-xs text-emerald-600 font-medium bg-emerald-50 px-2.5 py-1 rounded-md inline-block">
                  ↑ Sync Pipeline OK
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Design Layouts</p>
                <h3 className="text-3xl font-extrabold text-slate-900 mt-2">24 In Progress</h3>
                <div className="mt-2 text-xs text-blue-600 font-medium bg-blue-50 px-2.5 py-1 rounded-md inline-block">
                  SketchUp & Enscape verified
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Staging Environment</p>
                <h3 className="text-3xl font-extrabold text-indigo-600 mt-2">Render.com</h3>
                <div className="mt-2 text-xs text-indigo-600 font-medium bg-indigo-50 px-2.5 py-1 rounded-md inline-block">
                  Live Stream Stable
                </div>
              </div>
            </div>

            {/* Leads Table Component View */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h4 className="text-base font-bold text-slate-900">Recent Enquiries Inbox</h4>
                <span className="text-xs text-slate-500 font-medium">Staging Mock Mode</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase border-b border-slate-100">
                      <th className="px-6 py-3.5">Client Name</th>
                      <th className="px-6 py-3.5">Requirement Details</th>
                      <th className="px-6 py-3.5">Budget Class</th>
                      <th className="px-6 py-3.5">Status Flag</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                    {sampleLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-900">
                          <div>{lead.name}</div>
                          <div className="text-xs text-slate-400 font-normal">{lead.email}</div>
                        </td>
                        <td className="px-6 py-4">{lead.project}</td>
                        <td className="px-6 py-4 font-mono font-medium text-slate-700">{lead.budget}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${lead.status === "Completed" ? "bg-emerald-50 text-emerald-700" : lead.status === "In Progress" ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"}`}>
                            {lead.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "leads" && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
            <h3 className="text-lg font-bold text-slate-900">Space-Interio Pipeline Active</h3>
            <p className="text-slate-500 text-sm mt-1">Ready to receive incoming connection queries from live MongoDB clusters.</p>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">System Parameters</h3>
            <p className="text-slate-500 text-sm mt-1">Individual Configuration Stream Profiles are active.</p>
          </div>
        )}
      </main>
    </div>
  );
}