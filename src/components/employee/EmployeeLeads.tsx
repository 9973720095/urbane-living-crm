"use client";
import { useEffect, useState } from "react";

export default function EmployeeLeads({ employeeId }: { employeeId: string }) {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    // API se leads fetch karein
    fetch("/api/leads") 
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Agar employee specific leads chahiye, toh filter lagayein
          const filtered = data.data.filter((l: any) => l.assignedToId === employeeId);
          setLeads(filtered);
        }
      });
  }, [employeeId]);

  return (
    <div className="p-6 bg-white rounded-3xl border shadow-sm">
      <h2 className="text-xl font-bold mb-4">My Leads</h2>
      {leads.length === 0 ? <p>No leads assigned yet.</p> : (
        <ul>
          {leads.map((lead) => (
            <li key={lead.id} className="p-3 border-b">{lead.customer_name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}