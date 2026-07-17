"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  CalendarDays,
  Clock,
  Users,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  SlidersHorizontal,
  MessageSquare,
  ArrowUpRight,
  TrendingUp
} from "lucide-react";

interface Lead {
  customer_name?: string;
}

interface MeetingTask {
  id: string;
  title: string;
  type: "MEETING";
  status: "PENDING" | "ACCEPTED" | "COMPLETED" | "REJECTED";
  description?: string;
  scheduledAt?: string;
  lead?: Lead;
}

export default function EmployeeMeetings() {
  const [meetings, setMeetings] = useState<MeetingTask[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  
  // Outcome logging states
  const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>(null);
  const [meetingRemarks, setMeetingRemarks] = useState<string>("");
  const [selectedLeadStage, setSelectedLeadStage] = useState<string>("FOLLOWUP");

  const searchParams = useSearchParams();
  const employeeId = searchParams.get("id") || searchParams.get("employeeId");

  useEffect(() => {
    if (employeeId) {
      fetchMeetings();
    }
  }, [employeeId]);

  const fetchMeetings = async () => {
    if (!employeeId) return;
    try {
      // Fetching only meetings or filtering from general tasks endpoint
      const res = await fetch(`/api/tasks?employeeId=${employeeId}&type=MEETING`);
      const data = await res.json();
      if (data.success) {
        // Just in case API returns all types, we safe-filter for MEETINGS
        const filtered = data.data.filter((t: any) => t.type === "MEETING");
        setMeetings(filtered);
      }
    } catch (error) {
      console.error("Fetch meetings error:", error);
    }
  };

  const handleStatusUpdate = async (meetingId: string, action: "accept" | "reject") => {
    try {
      await fetch(`/api/tasks/${meetingId}/${action}`, { method: "PATCH" });
      fetchMeetings();
    } catch (error) {
      console.error(`Error performing ${action} on meeting:`, error);
    }
  };

  const handleCompleteMeeting = async (meetingId: string) => {
    try {
      await fetch(`/api/tasks/${meetingId}/complete`, { 
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ remarks: meetingRemarks, leadStage: selectedLeadStage })
      });
      setSelectedMeetingId(null);
      setMeetingRemarks("");
      fetchMeetings();
    } catch (error) {
      console.error("Error completing meeting:", error);
    }
  };

  // ======================================
  // FILTER & SEARCH LOGIC
  // ======================================
  const filteredMeetings = useMemo(() => {
    return meetings.filter((m) => {
      const matchesStatus = statusFilter === "ALL" ? true : m.status === statusFilter;
      const matchesSearch = 
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.lead?.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [meetings, statusFilter, searchQuery]);

  // Counters for Tab Badges
  const counts = useMemo(() => {
    return {
      all: meetings.length,
      pending: meetings.filter((m) => m.status === "PENDING").length,
      accepted: meetings.filter((m) => m.status === "ACCEPTED").length,
      completed: meetings.filter((m) => m.status === "COMPLETED").length,
    };
  }, [meetings]);

  if (!employeeId) {
    return (
      <div className="p-6 text-center text-sm text-slate-500 bg-white border border-slate-200 rounded-2xl">
        Please sync your employee context parameters to access the Meetings Desk.
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-0">
      
      {/* Dynamic Header Block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm tracking-wide uppercase">
            <CalendarDays size={16} />
            <span>Client Consultations</span>
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Meetings Management Panel</h1>
          <p className="text-slate-400 text-xs">Schedule validation, pipeline mapping, and presentation execution logs.</p>
        </div>
        
        {/* Quick Summary Strip */}
        <div className="flex gap-3 bg-slate-50 p-2 rounded-xl border border-slate-200/40 text-center text-xs">
          <div className="px-3 py-1">
            <p className="text-[10px] uppercase font-bold text-slate-400">Upcoming</p>
            <p className="text-sm font-black text-indigo-600 mt-0.5">{counts.accepted}</p>
          </div>
          <div className="border-l border-slate-200 my-1" />
          <div className="px-3 py-1">
            <p className="text-[10px] uppercase font-bold text-slate-400">Awaiting Action</p>
            <p className="text-sm font-black text-amber-600 mt-0.5">{counts.pending}</p>
          </div>
        </div>
      </div>

      {/* Control Filters Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Input Box */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by lead or discussion title..."
            className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
          />
        </div>

        {/* Status Tab Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/40">
            {[
              { id: "ALL", label: "All Items", count: counts.all },
              { id: "PENDING", label: "Pending", count: counts.pending },
              { id: "ACCEPTED", label: "Accepted", count: counts.accepted },
              { id: "COMPLETED", label: "Completed", count: counts.completed }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer
                  ${statusFilter === tab.id 
                    ? "bg-white text-slate-900 shadow-xs border border-slate-200/50" 
                    : "text-slate-500 hover:text-slate-800"
                  }`}
              >
                {tab.label}
                <span className="ml-1.5 text-[10px] opacity-60 font-mono">({tab.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Meetings Pipeline Stream */}
      <div className="space-y-4">
        {filteredMeetings.length === 0 ? (
          <div className="text-center py-16 border border-dashed rounded-3xl border-slate-200 bg-white shadow-xs">
            <AlertCircle className="mx-auto text-slate-300 mb-3 animate-pulse" size={32} />
            <p className="text-slate-500 text-sm font-medium tracking-tight">No conference tokens discovered matching this state filter.</p>
          </div>
        ) : (
          filteredMeetings.map((meeting) => (
            <div 
              key={meeting.id} 
              className={`border border-slate-200 bg-white hover:border-slate-300 rounded-2xl p-5 transition-all duration-300 hover:shadow-md flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative overflow-hidden
                ${meeting.status === "ACCEPTED" ? "border-l-4 border-l-indigo-500" : ""}
                ${meeting.status === "COMPLETED" ? "border-l-4 border-l-emerald-500" : ""}
              `}
            >
              
              {/* Left Segment: Meta Content details */}
              <div className="space-y-2 flex-1 w-full">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 flex items-center gap-1">
                    <CalendarDays size={12} className="text-slate-400" />
                    MEETING INSTANCE
                  </div>
                  
                  {meeting.scheduledAt && (
                    <div className="text-xs text-indigo-600 font-bold bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-md flex items-center gap-1.5 shadow-xs">
                      <Clock size={13} />
                      <span>{new Date(meeting.scheduledAt).toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-slate-800 text-base tracking-tight pt-1 flex items-center gap-1.5">
                  {meeting.title}
                  <ArrowUpRight size={14} className="text-slate-300" />
                </h3>
                
                <p className="text-sm text-slate-500 max-w-3xl leading-relaxed">{meeting.description || "No specific client briefs attached to this sync point."}</p>
                
                {/* Embedded Client Context Bar */}
                <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-50 mt-3">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Users size={13} className="text-slate-400" /> 
                    Target Prospect: <strong className="text-slate-700 font-semibold">{meeting.lead?.customer_name || "Anonymous Target"}</strong>
                  </span>
                </div>
              </div>

              {/* Right Segment: Status Badge & Dynamic Actions CTA */}
              <div className="flex lg:flex-col items-end gap-3 w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0 justify-between shrink-0">
                
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border
                  ${meeting.status === "COMPLETED" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : ""}
                  ${meeting.status === "ACCEPTED" ? "bg-indigo-50 text-indigo-700 border-indigo-200" : ""}
                  ${meeting.status === "REJECTED" ? "bg-rose-50 text-rose-700 border-rose-200" : ""}
                  ${meeting.status === "PENDING" ? "bg-amber-50 text-amber-700 border-amber-200" : ""}
                `}>
                  {meeting.status}
                </span>

                <div className="flex flex-col gap-2 w-full lg:w-auto items-end">
                  {/* Pending Workflow Buttons */}
                  {meeting.status === "PENDING" && (
                    <div className="flex gap-2 w-full lg:w-auto">
                      <button
                        onClick={() => handleStatusUpdate(meeting.id, "accept")}
                        className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-1.5 font-bold rounded-xl text-xs transition-colors shadow-xs cursor-pointer"
                      >
                        Accept Slot
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(meeting.id, "reject")}
                        className="bg-white hover:bg-rose-50 text-rose-600 px-4 py-1.5 font-bold rounded-xl text-xs transition-all border border-slate-200 hover:border-rose-200 cursor-pointer"
                      >
                        Decline
                      </button>
                    </div>
                  )}

                  {/* Accepted state verification Trigger */}
                  {meeting.status === "ACCEPTED" && selectedMeetingId !== meeting.id && (
                    <button
                      onClick={() => {
                        setSelectedMeetingId(meeting.id);
                        setMeetingRemarks("");
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 font-bold rounded-xl text-xs transition-all shadow-sm shadow-indigo-500/10 flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare size={13} />
                      Log Minutes & Close
                    </button>
                  )}

                  {/* Dropdown Modal Form Overlay */}
                  {selectedMeetingId === meeting.id && (
                    <div className="bg-slate-50/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl mt-2 space-y-4 w-full sm:w-80 text-left animate-in fade-in-50 zoom-in-95 duration-150">
                      <div className="flex items-center gap-1.5 border-b border-slate-200/60 pb-2">
                        <TrendingUp size={14} className="text-indigo-600" />
                        <p className="text-xs font-bold text-slate-800">Minutes of Meeting (MoM)</p>
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Discussion Minutes</label>
                        <textarea
                          value={meetingRemarks}
                          onChange={(e) => setMeetingRemarks(e.target.value)}
                          placeholder="What did the client say? Design choices, pricing discussions..."
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white text-slate-800 focus:outline-none resize-none"
                          rows={3}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Pipeline Progression Target</label>
                        <select
                          value={selectedLeadStage}
                          onChange={(e) => setSelectedLeadStage(e.target.value)}
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:border-indigo-500 focus:outline-none cursor-pointer"
                        >
                          <option value="FOLLOWUP">Follow Up Required</option>
                          <option value="SITE_VISIT">Progress to Site Visit</option>
                          <option value="CONFIRMED">Deal Won / Booking Confirmed</option>
                          <option value="REJECTED">Dropped / Lost Pipeline</option>
                        </select>
                      </div>

                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => handleCompleteMeeting(meeting.id)}
                          disabled={!meetingRemarks.trim()}
                          className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:text-slate-500 text-white px-3 py-2 rounded-xl text-xs font-bold flex-1 transition-all shadow-sm cursor-pointer"
                        >
                          Save Ledger
                        </button>
                        <button
                          onClick={() => setSelectedMeetingId(null)}
                          className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                        >
                          Abort
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}