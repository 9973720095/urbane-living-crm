"use client";

import { useState, useEffect } from "react";
import LeadDrawer from "./LeadDrawer";
import DesignHandoverModal from "./DesignHandoverModal";
import { Palette, RefreshCw, Search, UserCheck, UserX } from "lucide-react";

export default function LeadManagement() {
  const [leads, setLeads] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [designLead, setDesignLead] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [cityFilter, setCityFilter] = useState("ALL");
  const [agentFilter, setAgentFilter] = useState("ALL");

  // Fetch Leads & Employees Data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [leadsRes, empRes] = await Promise.all([
        fetch("/api/leads"),
        fetch("/api/employees"),
      ]);

      if (leadsRes.ok) {
        const data = await leadsRes.json();
        setLeads(data.data || data || []);
      }

      if (empRes.ok) {
        const empData = await empRes.json();
        setEmployees(empData.data || empData || []);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Helper to extract assignment (handles snake_case and camelCase)
 const getAssignedTo = (lead: any) => {
  const agent = lead.assigned_to || lead.assignedTo || lead.assignedRep;
  if (!agent) return "";
  // Agar object hai toh uska name return karein, nahi toh string
  return typeof agent === "object" ? agent.name : agent;
};

  // Quick Re-assign Handler
  const handleAssignChange = async (leadId: string, newAgent: string) => {
    setUpdatingId(leadId);
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assigned_to: newAgent,
          assignedTo: newAgent,
        }),
      });

      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) =>
            (l.id || l._id) === leadId
              ? { ...l, assigned_to: newAgent, assignedTo: newAgent }
              : l
          )
        );
      }
    } catch (err) {
      console.error("Failed to update assignment:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone_number?.includes(search);

    const matchesStatus =
      statusFilter === "ALL" || (lead.lead_status || "CREATED") === statusFilter;

    const matchesCity =
      cityFilter === "ALL" ||
      lead.city?.toLowerCase() === cityFilter.toLowerCase();

    const assigned = getAssignedTo(lead);
    const matchesAgent =
      agentFilter === "ALL" ||
      (agentFilter === "UNASSIGNED"
        ? !assigned || assigned === "Unassigned"
        : assigned.toLowerCase() === agentFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesCity && matchesAgent;
  });

  // Extract unique cities for dropdown
  const cities = Array.from(
    new Set(leads.map((l) => l.city).filter(Boolean))
  );

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Lead Management</h1>
          <p className="text-xs text-slate-500">
            Total Leads: <strong className="text-indigo-600">{leads.length}</strong> | Showing:{" "}
            <strong className="text-indigo-600">{filteredLeads.length}</strong>
          </p>
        </div>
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold shadow hover:bg-indigo-700 transition flex items-center gap-2"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        {/* Search */}
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-slate-700"
        >
          <option value="ALL">All Stages</option>
          <option value="CREATED">CREATED (New)</option>
          <option value="CALL_SCHEDULED">CALL SCHEDULED</option>
          <option value="FOLLOW_UP">FOLLOW UP</option>
          <option value="MEETING_FIXED">MEETING FIXED</option>
          <option value="SITE_VISIT">SITE VISIT</option>
          <option value="DESIGN_PROPOSAL">DESIGN PROPOSAL</option>
          <option value="WON">WON</option>
          <option value="REJECTED">REJECTED</option>
        </select>

        {/* Agent Filter */}
        <select
          value={agentFilter}
          onChange={(e) => setAgentFilter(e.target.value)}
          className="border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-slate-700"
        >
          <option value="ALL">All Representatives</option>
          <option value="UNASSIGNED">⚠️ Unassigned Leads Only</option>
          {employees.map((emp) => (
            <option key={emp.id || emp._id} value={emp.name}>
              👤 {emp.name}
            </option>
          ))}
        </select>

        {/* City Filter */}
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-slate-700"
        >
          <option value="ALL">All Cities</option>
          {cities.map((city: any) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Leads List */}
      {loading ? (
        <div className="p-10 text-center text-slate-500 font-medium">Loading Leads...</div>
      ) : filteredLeads.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-400 text-sm">No leads match your selected filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLeads.map((lead) => {
            const leadId = lead.id || lead._id;
            const assignedAgent = getAssignedTo(lead);
            const isUnassigned = !assignedAgent || assignedAgent === "Unassigned";

            return (
              <div
                key={leadId}
                className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="font-bold text-slate-900 text-base truncate">
                      {lead.customer_name || lead.name || "Unnamed Lead"}
                    </h3>
                    <span
                      className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border shrink-0 ${
                        lead.lead_status === "DESIGN_PROPOSAL"
                          ? "bg-amber-50 text-amber-600 border-amber-200"
                          : "bg-indigo-50 text-indigo-600 border-indigo-100"
                      }`}
                    >
                      {lead.lead_status || "CREATED"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{lead.phone_number || lead.phone}</p>
                  <p className="text-xs text-slate-400 mt-1">📍 {lead.city || "N/A"}</p>
                </div>

                {/* Assigned Agent Status & Selector */}
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium">Assigned To:</span>
                    {isUnassigned ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-100">
                        <UserX size={11} /> Unassigned
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                        <UserCheck size={11} /> {typeof assignedAgent === "object" ? assignedAgent?.name : assignedAgent}
                      </span>
                    )}
                  </div>

                  <select
                    disabled={updatingId === leadId}
                    value={isUnassigned ? "" : (typeof assignedAgent === "object" ? assignedAgent?.name : assignedAgent)}
                    onChange={(e) => handleAssignChange(leadId, e.target.value)}
                    className="w-full p-1.5 text-xs font-semibold border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="" disabled>
                      -- Reassign Representative --
                    </option>
                    {employees.map((emp) => (
                      <option key={emp.id || emp._id} value={emp.name}>
                        {emp.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex justify-between items-center text-xs">
                  <button
                    onClick={() => setDesignLead(lead)}
                    className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-lg font-semibold flex items-center gap-1 transition"
                  >
                    <Palette size={13} /> Design Handover
                  </button>

                  <button
                    onClick={() => setSelectedLead({
                      ...lead,
                      phone: lead.phone_number || lead.phone, // ensure phone exists
                      customer_name: lead.customer_name || lead.name
                    })}
                    className="text-indigo-600 font-semibold hover:underline"
                  >
                    Edit Details →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Drawer Component */}
      {selectedLead && (
        <LeadDrawer
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onRefresh={fetchData}
        />
      )}

      {/* Design Handover Modal */}
      {designLead && (
        <DesignHandoverModal
          lead={{
            id: designLead.id || designLead._id,
            name: designLead.customer_name || designLead.name,
            phone: designLead.phone_number || designLead.phone,
            city: designLead.city,
            stage: designLead.lead_status || "Design Proposal",
            assignedTo: getAssignedTo(designLead) || "Sales Team",
          }}
          onClose={() => setDesignLead(null)}
          onUpdateLead={() => {
            fetchData();
          }}
        />
      )}
    </div>
  );
}