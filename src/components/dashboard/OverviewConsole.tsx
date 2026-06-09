"use client";
export default function OverviewConsole({ leads }: { leads: any[] }) {
  const stats = {
    total: leads.length,
    new: leads.filter(l => l.stage === 'NEW').length,
    scheduled: leads.filter(l => l.stage === 'CALL_SCHEDULED').length,
    meeting: leads.filter(l => l.stage === 'MEETING_FIXED').length,
    site: leads.filter(l => l.stage === 'SITE_VISIT').length,
    won: leads.filter(l => l.stage === 'CONFIRMED').length,
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {Object.entries(stats).map(([k,v]) => (
          <div key={k} className="bg-white p-5 rounded-2xl border shadow-sm">
            <p className="text-xs uppercase text-slate-500 font-bold">{k}</p>
            <h3 className="text-3xl font-extrabold mt-1 text-slate-900">{v}</h3>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-2xl border">
        <h4 className="font-bold mb-2">Today's Pipeline</h4>
        <p className="text-sm text-slate-600">Real-time funnel from Meta Sheet → Ceiling Leads. Auto-sync every 5 sec.</p>
      </div>
    </div>
  );
}