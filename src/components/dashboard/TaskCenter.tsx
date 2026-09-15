"use client";

import { useState, useEffect } from "react";
import {
  PhoneCall,
  Calendar,
  Users,
  CheckCircle2,
  XCircle,
  MapPin,
  Clock,
  MessageSquare,
} from "lucide-react";

export default function TaskCenter() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTaskData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/leads");
      const json = await res.json();
      if (json.success || Array.isArray(json.data || json)) {
        setLeads(json.data || json || []);
      }
    } catch (err) {
      console.error("Error fetching task center data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskData();
  }, []);

  // Filter Categories
  const todayStr = new Date().toISOString().split("T")[0];

  const todaysFollowups = leads.filter((l) => {
    if (!l.nextFollowUp) return false;
    const fDate = new Date(l.nextFollowUp).toISOString().split("T")[0];
    return fDate === todayStr;
  });

  const callsScheduled = leads.filter(
    (l) => l.stage === "CALL_SCHEDULED" || l.lead_status === "CALL_SCHEDULED"
  );

  const meetings = leads.filter(
    (l) => l.stage === "MEETING_FIXED" || l.lead_status === "MEETING_FIXED"
  );

  const siteVisits = leads.filter(
    (l) => l.stage === "SITE_VISIT" || l.lead_status === "SITE_VISIT"
  );

  const confirmedDeals = leads.filter(
    (l) => l.stage === "CONFIRMED" || l.lead_status === "CONFIRMED"
  );

  const rejectedLeads = leads.filter(
    (l) => l.stage === "REJECTED" || l.lead_status === "REJECTED"
  );

  const totalActivities =
    todaysFollowups.length +
    callsScheduled.length +
    meetings.length +
    siteVisits.length;

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Task Center</h1>
          <p className="text-xs text-slate-500 mt-1">
            Daily CRM Activities & Performance Overview
          </p>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 px-5 py-3 rounded-2xl text-right">
          <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
            Total Activities
          </p>
          <p className="text-2xl font-black text-indigo-600">
            {totalActivities}
          </p>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Today's Followups */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">
              Today's Followups
            </p>
            <h3 className="text-2xl font-extrabold text-slate-800 mt-1">
              {todaysFollowups.length}
            </h3>
          </div>
          <div className="p-3.5 bg-amber-50 text-amber-500 rounded-xl">
            <Clock size={22} />
          </div>
        </div>

        {/* Calls Scheduled */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">
              Calls Scheduled
            </p>
            <h3 className="text-2xl font-extrabold text-slate-800 mt-1">
              {callsScheduled.length}
            </h3>
          </div>
          <div className="p-3.5 bg-blue-50 text-blue-500 rounded-xl">
            <PhoneCall size={22} />
          </div>
        </div>

        {/* Meetings */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">
              Meetings Fixed
            </p>
            <h3 className="text-2xl font-extrabold text-slate-800 mt-1">
              {meetings.length}
            </h3>
          </div>
          <div className="p-3.5 bg-purple-50 text-purple-500 rounded-xl">
            <Calendar size={22} />
          </div>
        </div>

        {/* Site Visits */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Site Visits</p>
            <h3 className="text-2xl font-extrabold text-slate-800 mt-1">
              {siteVisits.length}
            </h3>
          </div>
          <div className="p-3.5 bg-pink-50 text-pink-500 rounded-xl">
            <MapPin size={22} />
          </div>
        </div>

        {/* Confirmed Deals */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">
              Confirmed Deals
            </p>
            <h3 className="text-2xl font-extrabold text-slate-800 mt-1">
              {confirmedDeals.length}
            </h3>
          </div>
          <div className="p-3.5 bg-emerald-50 text-emerald-500 rounded-xl">
            <CheckCircle2 size={22} />
          </div>
        </div>

        {/* Rejected */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">
              Rejected Leads
            </p>
            <h3 className="text-2xl font-extrabold text-slate-800 mt-1">
              {rejectedLeads.length}
            </h3>
          </div>
          <div className="p-3.5 bg-rose-50 text-rose-500 rounded-xl">
            <XCircle size={22} />
          </div>
        </div>
      </div>

      {/* Actionable Active Tasks Feed */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <h2 className="text-base font-bold text-slate-800 mb-4">
          Pending Calls & Scheduled Action Queue
        </h2>

        {callsScheduled.length === 0 ? (
          <p className="text-xs text-slate-400 py-6 text-center">
            No active scheduled calls for today.
          </p>
        ) : (
          <div className="space-y-3">
            {callsScheduled.map((item) => {
              const cleanPhone = (item.customer_phone || item.phone || "").replace(
                /[^0-9]/g,
                ""
              );
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-blue-100 text-blue-600 rounded-lg">
                      <PhoneCall size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        {item.customer_name || "Unknown Customer"}
                      </h4>
                      <p className="text-xs text-slate-500">
                        +{cleanPhone} • {item.city || "N/A"} • {item.bhkType || "Interior Project"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${cleanPhone}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 bg-emerald-500 text-white rounded-lg text-xs font-semibold hover:bg-emerald-600 transition"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={`tel:+${cleanPhone}`}
                      className="p-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-black transition"
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}