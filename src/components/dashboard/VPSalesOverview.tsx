"use client";

import { useState, useEffect } from "react";
import { Users, TrendingUp, CheckCircle2, UserPlus, AlertCircle, ShieldAlert } from "lucide-react";

interface Props {
  leads?: any[];
}

export default function VPSalesOverview({ leads = [] }: Props) {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [assignee, setAssignee] = useState("");
  const [isAssigning, setIsAssigning] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch("/api/employees");
        if (res.ok) {
          const data = await res.json();
          setTeamMembers(data.data || data || []);
        }
      } catch (err) {
        console.error("Error fetching team:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const getAssignedName = (lead: any): string => {
    const raw =
      lead.assigned_to ||
      lead.assignedTo ||
      lead.assignedRep ||
      lead.agent_name ||
      lead.assigned_employee ||
      "";

    if (!raw) return "";
    if (typeof raw === "object") {
      return (raw.name || raw.customer_name || raw.email || raw._id || raw.id || "").toString();
    }
    return raw.toString();
  };

  const getLeadStatus = (lead: any): string => {
    const status = lead.lead_status || lead.status || lead.stage || "";
    return typeof status === "string" ? status.toUpperCase() : String(status).toUpperCase();
  };

  const unassignedLeads = leads.filter((l) => {
    const assigned = getAssignedName(l).trim().toLowerCase();
    return !assigned || assigned === "unassigned" || assigned === "none" || assigned === "null";
  });

  const totalLeads = leads.length;
  const wonDeals = leads.filter((l) =>
    ["WON", "CLOSED", "DEAL WON", "CLOSURE"].includes(getLeadStatus(l))
  ).length;

  const siteVisits = leads.filter((l) =>
    ["SITE_VISIT", "SITE VISIT", "VISIT SCHEDULED", "MEETING_FIXED"].includes(getLeadStatus(l))
  ).length;

  const handleAssignLead = async () => {
    if (!selectedLead || !assignee) return;
    setIsAssigning(true);
    const leadId = selectedLead.id || selectedLead._id;

    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assigned_to: assignee,
          assignedTo: assignee,
          lead_status: selectedLead.lead_status || "ASSIGNED",
        }),
      });

      if (res.ok) {
        setSelectedLead(null);
        setAssignee("");
        window.location.reload();
      }
    } catch (err) {
      console.error("Failed to assign lead", err);
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 bg-slate-50 min-h-screen w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold bg-indigo-100 text-indigo-700 border border-indigo-200">
              VP SALES COMMAND CENTER
            </span>
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium">
              Manager: Vibhooti Mishra
            </span>
          </div>
          <h1 className="text-lg sm:text-2xl font-bold text-slate-900 mt-1">
            Operations & Distribution Control
          </h1>
        </div>
      </div>

      {/* Responsive High-Level KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Active Pipeline */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] sm:text-xs font-semibold text-slate-500">
              Total Active Pipeline
            </p>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              {totalLeads} Leads
            </h3>
            <p className="text-[9px] sm:text-[10px] text-indigo-600 font-semibold mt-1">
              Real-time DB Sync
            </p>
          </div>
          <div className="p-2.5 sm:p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
            <Users size={20} />
          </div>
        </div>

        {/* Site Visits Scheduled */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] sm:text-xs font-semibold text-slate-500">
              Site Visits Scheduled
            </p>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              {siteVisits} Visits
            </h3>
            <p className="text-[9px] sm:text-[10px] text-amber-600 font-semibold mt-1">
              Field Evaluations
            </p>
          </div>
          <div className="p-2.5 sm:p-3 bg-amber-50 text-amber-600 rounded-xl shrink-0">
            <TrendingUp size={20} />
          </div>
        </div>

        {/* Deals Won */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] sm:text-xs font-semibold text-slate-500">
              Deals Won
            </p>
            <h3 className="text-xl sm:text-2xl font-black text-emerald-600 mt-0.5">
              {wonDeals} Closures
            </h3>
            <p className="text-[9px] sm:text-[10px] text-slate-400 mt-1">
              Converted Projects
            </p>
          </div>
          <div className="p-2.5 sm:p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
            <CheckCircle2 size={20} />
          </div>
        </div>

        {/* Unassigned Backlog */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] sm:text-xs font-semibold text-slate-500">
              Unassigned Backlog
            </p>
            <h3 className="text-xl sm:text-2xl font-black text-rose-600 mt-0.5">
              {unassignedLeads.length} Leads
            </h3>
            <p className="text-[9px] sm:text-[10px] text-rose-500 font-medium mt-1">
              Action Required
            </p>
          </div>
          <div className="p-2.5 sm:p-3 bg-rose-50 text-rose-600 rounded-xl shrink-0">
            <ShieldAlert size={20} />
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Sales Representatives Breakdown */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 space-y-3 sm:space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1">
            <h2 className="text-sm sm:text-base font-bold text-slate-800">
              Sales Representatives Breakdown
            </h2>
            <span className="text-[10px] sm:text-xs text-indigo-600 font-semibold">
              Active Sales Workforce
            </span>
          </div>

          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            {loading ? (
              <p className="text-xs text-slate-400 py-4 text-center">
                Loading team performance...
              </p>
            ) : teamMembers.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">
                No active team members configured.
              </div>
            ) : (
              <table className="w-full text-left text-xs min-w-[500px]">
                <thead className="bg-slate-50 text-slate-500 border-y">
                  <tr>
                    <th className="p-2.5 sm:p-3">REPRESENTATIVE</th>
                    <th className="p-2.5 sm:p-3">ROLE</th>
                    <th className="p-2.5 sm:p-3">ASSIGNED LEADS</th>
                    <th className="p-2.5 sm:p-3">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {teamMembers.map((rep, i) => {
                    const repName = (rep.name || rep.email || "").toString().trim().toLowerCase();
                    const repId = (rep.id || rep._id || "").toString().trim().toLowerCase();

                    const repLeadsCount = leads.filter((l) => {
                      const assignedVal = getAssignedName(l).trim().toLowerCase();
                      if (!assignedVal) return false;
                      return (
                        assignedVal === repName ||
                        (repId && assignedVal === repId) ||
                        (rep.email && assignedVal === rep.email.toLowerCase())
                      );
                    }).length;

                    return (
                      <tr key={i} className="hover:bg-slate-50 transition">
                        <td className="p-2.5 sm:p-3 font-bold text-slate-800">
                          {rep.name || rep.email}
                        </td>
                        <td className="p-2.5 sm:p-3 text-slate-500">
                          {rep.role || "Sales Rep"}
                        </td>
                        <td className="p-2.5 sm:p-3 font-semibold text-indigo-600">
                          {repLeadsCount} Active Leads
                        </td>
                        <td className="p-2.5 sm:p-3">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                            Active
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Priority Unassigned Queue */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 space-y-3 sm:space-y-4 shadow-sm flex flex-col">
          <div className="flex items-center justify-between border-b pb-3">
            <h2 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-1.5">
              <AlertCircle size={16} className="text-amber-500 shrink-0" />
              Unassigned Leads Queue
            </h2>
            <span className="text-[10px] sm:text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              {unassignedLeads.length} Action Needed
            </span>
          </div>

          <div className="space-y-2.5 sm:space-y-3 flex-1 overflow-y-auto max-h-[350px] sm:max-h-[420px] pr-1">
            {unassignedLeads.length === 0 ? (
              <p className="text-xs text-emerald-600 font-medium text-center py-8 sm:py-10">
                ✨ All leads are currently assigned!
              </p>
            ) : (
              unassignedLeads.map((lead) => (
                <div
                  key={lead.id || lead._id}
                  className="p-3 sm:p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">
                        {lead.customer_name || lead.name || "New Client"}
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        📍 {lead.city || "N/A"} • {lead.phone_number || lead.phone}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedLead(lead)}
                    className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[11px] font-semibold transition flex items-center justify-center gap-1 shadow-sm"
                  >
                    <UserPlus size={13} /> Assign To Rep
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Responsive Assign Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-4 sm:p-6 space-y-4 shadow-2xl border border-slate-100">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Assign Lead</h3>
            <p className="text-xs text-slate-500">
              Assigning <strong>{selectedLead.customer_name || selectedLead.name}</strong> ({selectedLead.city || "N/A"}) to a representative.
            </p>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Select Sales Representative</label>
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-600 outline-none text-slate-800 bg-white"
              >
                <option value="">-- Choose Rep --</option>
                {teamMembers.map((m) => (
                  <option key={m.id || m._id} value={m.name}>
                    {m.name} ({m.role})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                disabled={!assignee || isAssigning}
                onClick={handleAssignLead}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold disabled:opacity-50"
              >
                {isAssigning ? "Assigning..." : "Confirm Assignment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}