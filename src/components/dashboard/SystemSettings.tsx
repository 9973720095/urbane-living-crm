"use client";
export default function SystemSettings() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="font-bold text-lg mb-3">CRM Control</h3>
        <ul className="space-y-2 text-sm text-slate-600">
          <li>• Sheet Columns: A,B,C,M,N,O,P,Q,R,S,T mapped</li>
          <li>• Auto-sync: /api/leads/sync</li>
          <li>• Notifications: saban.urbaneliving@gmail.com</li>
          <li>• Employees: 3 active</li>
        </ul>
      </div>
      <div className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="font-bold text-lg mb-3">Workflow Stages</h3>
        <div className="flex flex-wrap gap-2">
          {['NEW','ASSIGNED','CALL_SCHEDULED','MEETING_FIXED','FOLLOWUP','SITE_VISIT','CONFIRMED','REJECTED'].map(s => (
            <span key={s} className="px-2 py-1 bg-slate-100 rounded text-xs">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}