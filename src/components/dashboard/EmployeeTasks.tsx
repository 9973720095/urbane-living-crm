"use client";

import { useState } from "react";
import {
  User,
  PhoneCall,
  RotateCcw,
  Handshake,
  Home,
  CheckCircle2,
  XCircle,
  Clock3,
  Trophy,
  Plus,
  Calendar,
} from "lucide-react";

interface Props {
  leads: any[];
  refresh: () => void;
}

export default function EmployeeTasks({ leads = [], refresh }: Props) {
  const [selectedEmployee, setSelectedEmployee] = useState<string>("All");
  const [showFollowupModal, setShowFollowupModal] = useState<string | null>(null);
  const [followupDate, setFollowupDate] = useState("");

  // Get unique employees
  const employeesList = ["All",...Array.from(new Set(
    leads.map(l => l.assignedTo?.name).filter(Boolean)
  )), "Unassigned"];

  // Filter leads
  const filteredLeads = selectedEmployee === "All"
   ? leads
    : selectedEmployee === "Unassigned"
   ? leads.filter(l =>!l.assignedTo)
    : leads.filter(l => l.assignedTo?.name === selectedEmployee);

  // Employee stats
  const employeeMap: Record<string, any> = {};
  leads.forEach((lead) => {
    const employee = lead.assignedTo?.name || "Unassigned";
    if (!employeeMap[employee]) {
      employeeMap[employee] = {
        name: employee,
        total: 0, calls: 0, followups: 0, meetings: 0,
        visits: 0, deals: 0, rejected: 0, pending: 0,
      };
    }
    employeeMap[employee].total++;
    switch (lead.stage) {
      case "CALL_SCHEDULED": employeeMap[employee].calls++; break;
      case "FOLLOWUP": employeeMap[employee].followups++; break;
      case "MEETING_FIXED": employeeMap[employee].meetings++; break;
      case "SITE_VISIT": employeeMap[employee].visits++; break;
      case "CONFIRMED": employeeMap[employee].deals++; break;
      case "REJECTED": employeeMap[employee].rejected++; break;
    }
  });

  Object.values(employeeMap).forEach((emp: any) => {
    emp.pending = emp.total - emp.deals - emp.rejected;
    emp.successRate = emp.total === 0? 0 : Number(((emp.deals / emp.total) * 100).toFixed(1));
  });

  const employees = Object.values(employeeMap).sort((a: any, b: any) => b.deals - a.deals);

  // Actions
  const takeLead = async (leadId: string) => {
    const email = prompt("Enter your email (saban.urbaneliving@gmail.com):", "saban.urbaneliving@gmail.com");
    if (!email) return;

    await fetch(`/api/leads/${leadId}/take`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employeeEmail: email })
    });
    refresh();
  };

  const updateStage = async (leadId: string, stage: string, extra: any = {}) => {
    await fetch(`/api/leads/${leadId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage,...extra })
    });
    refresh();
  };

  const setFollowup = async (leadId: string) => {
    if (!followupDate) return;
    await updateStage(leadId, 'FOLLOWUP', { nextFollowUp: followupDate });
    setShowFollowupModal(null);
    setFollowupDate("");
  };

  return (
    <div className="space-y-6">
      {/* Header with Employee Filter */}
      <div className="bg-white rounded-3xl border shadow-sm p-6">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Employee Tasks</h2>
            <p className="text-sm text-slate-500 mt-1">Self-assign leads and manage your pipeline</p>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="px-4 py-2 border rounded-xl bg-white"
            >
              {employeesList.map(emp => (
                <option key={emp} value={emp}>{emp}</option>
              ))}
            </select>
            <div className="bg-indigo-50 px-5 py-2 rounded-2xl">
              <div className="text-xs text-slate-500">Active</div>
              <div className="text-2xl font-bold text-indigo-600">{filteredLeads.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {employees.slice(0, 3).map((employee: any, index) => (
          <div key={employee.name} className="bg-white rounded-3xl border shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <User size={20} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{employee.name}</h3>
                  <p className="text-xs text-slate-500">{employee.total} leads</p>
                </div>
              </div>
              {index === 0 && <Trophy size={18} className="text-yellow-500" />}
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div><div className="text-lg font-bold text-green-600">{employee.deals}</div><div className="text-xs">Won</div></div>
              <div><div className="text-lg font-bold text-amber-600">{employee.calls}</div><div className="text-xs">Calls</div></div>
              <div><div className="text-lg font-bold text-purple-600">{employee.visits}</div><div className="text-xs">Sites</div></div>
              <div><div className="text-lg font-bold text-indigo-600">{employee.successRate}%</div><div className="text-xs">Rate</div></div>
            </div>
          </div>
        ))}
      </div>

      {/* Leads Table - Dynamic Work Area */}
      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50">
          <h3 className="font-bold">
            {selectedEmployee === "Unassigned"? "Unassigned Leads - Click to Take" : `${selectedEmployee} - My Active Leads`}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs uppercase">
              <tr>
                <th className="p-3 text-left">Client</th>
                <th>Phone</th>
                <th>City</th>
                <th>Stage</th>
                <th>Next Action</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-t hover:bg-slate-50">
                  <td className="p-3">
                    <div className="font-medium">{lead.customer_name}</div>
                    <div className="text-xs text-slate-500">{lead.email}</div>
                  </td>
                  <td>{lead.phone_number}</td>
                  <td>{lead.city || '-'}</td>
                  <td>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      lead.stage === 'CONFIRMED'? 'bg-green-100 text-green-700' :
                      lead.stage === 'REJECTED'? 'bg-red-100 text-red-700' :
                      'bg-slate-100'
                    }`}>
                      {lead.stage}
                    </span>
                  </td>
                  <td className="text-xs">
                    {lead.nextFollowUp? new Date(lead.nextFollowUp).toLocaleDateString() : '-'}
                  </td>
                  <td className="p-2">
                    <div className="flex gap-1 flex-wrap">
                      {!lead.assignedTo && (
                        <button onClick={() => takeLead(lead.id)} className="bg-indigo-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                          <Plus size={12} /> Take
                        </button>
                      )}
                      {lead.assignedTo && (
                        <>
                          <button onClick={() => updateStage(lead.id, 'CALL_SCHEDULED')} className="bg-amber-500 text-white px-2 py-1 rounded text-xs">Call</button>
                          <button onClick={() => setShowFollowupModal(lead.id)} className="bg-orange-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                            <Calendar size={12} /> Follow
                          </button>
                          <button onClick={() => updateStage(lead.id, 'MEETING_FIXED')} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Meet</button>
                          <button onClick={() => updateStage(lead.id, 'SITE_VISIT')} className="bg-purple-600 text-white px-2 py-1 rounded text-xs">Site</button>
                          <button onClick={() => updateStage(lead.id, 'CONFIRMED')} className="bg-green-600 text-white px-2 py-1 rounded text-xs">✓</button>
                          <button onClick={() => updateStage(lead.id, 'REJECTED')} className="bg-red-600 text-white px-2 py-1 rounded text-xs">✕</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Followup Modal */}
      {showFollowupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96">
            <h3 className="font-bold mb-4">Set Follow-up Date</h3>
            <input
              type="datetime-local"
              value={followupDate}
              onChange={(e) => setFollowupDate(e.target.value)}
              className="w-full border rounded-lg p-2 mb-4"
            />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowFollowupModal(null)} className="px-4 py-2 text-slate-600">Cancel</button>
              <button onClick={() => setFollowup(showFollowupModal)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
