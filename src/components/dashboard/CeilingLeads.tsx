"use client";
import { useState } from "react";
import ActivityModal from "../leads/ActivityModal"; // Make sure path is correct

export default function CeilingLeads({ leads, refresh }: { leads: any[], refresh: () => void }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  
  // Modal State Management
  const [showModal, setShowModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [activities, setActivities] = useState([]);

  const update = async (id: string, stage: string) => {
    setLoadingId(id);
    await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage })
    });
    setLoadingId(null);
    refresh();
  };

  // Logic to fetch and show history
  const openHistory = async (lead: any) => {
    setSelectedLead(lead);
    try {
      const res = await fetch(`/api/leads/${lead.id}/activities`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setActivities(data);
      setShowModal(true);
    } catch (err) {
      console.error("Error loading activities:", err);
    }
  };

  const getBadgeClass = (stage: string) => {
    switch(stage) {
      case 'CONFIRMED': return 'bg-green-100 text-green-700';
      case 'REJECTED': return 'bg-red-100 text-red-700';
      case 'MEETING_FIXED': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-bold">Ceiling Leads Pipeline</h3>
        <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded">{leads.length} Active</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase">
            <tr><th className="p-3 text-left">Client</th><th>Phone</th><th>Stage</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {leads.map(l => (
              <tr key={l.id} className="border-t hover:bg-slate-50 transition-colors">
                <td className="p-3">
                  <div className="font-medium">{l.customer_name}</div>
                  <div className="text-xs text-slate-500">{l.email}</div>
                </td>
                <td>{l.phone_number}</td>
                <td>
                  <span className={`text-xs px-2 py-1 rounded-full ${getBadgeClass(l.stage)}`}>
                    {l.stage}
                  </span>
                </td>
                <td className="p-2 space-x-1 whitespace-nowrap">
                  {loadingId === l.id ? (
                    <span className="text-xs text-indigo-600 px-2">Updating...</span>
                  ) : (
                    <>
                      <button onClick={() => openHistory(l)} className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded text-xs">🕒</button>
                      <button onClick={()=>update(l.id,'CALL_SCHEDULED')} className="bg-amber-500 text-white px-2 py-1 rounded text-xs hover:opacity-90">Call</button>
                      <button onClick={()=>update(l.id,'MEETING_FIXED')} className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:opacity-90">Meeting</button>
                      <button onClick={()=>update(l.id,'SITE_VISIT')} className="bg-purple-600 text-white px-2 py-1 rounded text-xs hover:opacity-90">Site</button>
                      <button onClick={()=>update(l.id,'CONFIRMED')} className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:opacity-90">✓</button>
                      <button onClick={()=>update(l.id,'REJECTED')} className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:opacity-90">✕</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* The Integration */}
      <ActivityModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        activities={activities}
        customerName={selectedLead?.customer_name}
      />
    </div>
  );
}