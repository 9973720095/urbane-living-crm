"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  Users,
  CheckSquare,
  PhoneCall,
  CalendarDays,
  CheckCircle2,
  MapPin,
  LayoutDashboard,
  ClipboardList,
  Menu,
  X,
  Clock,
  AlertCircle,
  TrendingUp,
  SlidersHorizontal
} from "lucide-react";

// Strict Types Definition for Clean Code
interface Lead {
  customer_name?: string;
}

interface Task {
  id: string;
  title: string;
  type: "CALL" | "FOLLOWUP" | "MEETING" | "SITE_VISIT";
  status: "PENDING" | "ACCEPTED" | "COMPLETED" | "REJECTED";
  description?: string;
  scheduledAt?: string;
  lead?: Lead;
}

export default function EmployeeDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false); // Desktop standard responsive logic
  
  // Interactive UI Outcome Logger states
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [taskRemarks, setTaskRemarks] = useState<string>("");
  const [selectedLeadStage, setSelectedLeadStage] = useState<string>("FOLLOWUP");

  const searchParams = useSearchParams();
  const employeeId = searchParams.get("id") || searchParams.get("employeeId");

  useEffect(() => {
    if (employeeId) {
      fetchTasks();
    }
  }, [employeeId]);

  const fetchTasks = async () => {
    if (!employeeId) return;
    try {
      const res = await fetch(`/api/tasks?employeeId=${employeeId}`);
      const data = await res.json();
      if (data.success) {
        setTasks(data.data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const acceptTask = async (taskId: string) => {
    try {
      await fetch(`/api/tasks/${taskId}/accept`, { method: "PATCH" });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const rejectTask = async (taskId: string) => {
    try {
      await fetch(`/api/tasks/${taskId}/reject`, { method: "PATCH" });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const completeTask = async (taskId: string, remarks?: string, leadStage?: string) => {
    try {
      await fetch(`/api/tasks/${taskId}/complete`, { 
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ remarks, leadStage })
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // ======================================
  // MEMOIZED REAL-TIME FILTERING LOGIC
  // ======================================
  const { pendingTasks, acceptedTasks, completedTasks, followups, meetings, siteVisits, calls } = useMemo(() => {
    return {
      pendingTasks: tasks.filter((t) => t.status === "PENDING"),
      acceptedTasks: tasks.filter((t) => t.status === "ACCEPTED"),
      completedTasks: tasks.filter((t) => t.status === "COMPLETED"),
      followups: tasks.filter((t) => t.type === "FOLLOWUP"),
      meetings: tasks.filter((t) => t.type === "MEETING"),
      siteVisits: tasks.filter((t) => t.type === "SITE_VISIT"),
      calls: tasks.filter((t) => t.type === "CALL"),
    };
  }, [tasks]);

  // Modernized Config Grid Stats Layout
  const stats = [
    { title: "Total Assigned", value: tasks.length, icon: ClipboardList, bg: "bg-blue-500/10", color: "text-blue-600", border: "border-b-blue-500" },
    { title: "Pending Queue", value: pendingTasks.length, icon: Clock, bg: "bg-amber-500/10", color: "text-amber-600", border: "border-b-amber-500" },
    { title: "Follow-ups", value: followups.length, icon: PhoneCall, bg: "bg-purple-500/10", color: "text-purple-600", border: "border-b-purple-500" },
    { title: "Meetings", value: meetings.length, icon: CalendarDays, bg: "bg-indigo-500/10", color: "text-indigo-600", border: "border-b-indigo-500" },
    { title: "Site Visits", value: siteVisits.length, icon: MapPin, bg: "bg-rose-500/10", color: "text-rose-600", border: "border-b-rose-500" },
    { title: "Completed", value: completedTasks.length, icon: CheckCircle2, bg: "bg-emerald-500/10", color: "text-emerald-600", border: "border-b-emerald-500" },
  ];

  const menuItems = [
    { id: "overview", label: "Overview Dashboard", icon: LayoutDashboard },
    { id: "CALL", label: "Calls Logging", icon: PhoneCall, count: calls.length },
    { id: "FOLLOWUP", label: "Follow-ups Menu", icon: CheckSquare, count: followups.length },
    { id: "MEETING", label: "Meetings Panel", icon: CalendarDays, count: meetings.length },
    { id: "SITE_VISIT", label: "Site Visits Area", icon: MapPin, count: siteVisits.length },
    { id: "all_tasks", label: "All Workspace Tasks", icon: ClipboardList, count: tasks.length },
  ];

  if (!employeeId) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 selection:bg-blue-500 selection:text-white">
        <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl border border-slate-700/60 shadow-2xl text-center max-w-md w-full transition-all">
          <div className="w-14 h-14 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-amber-500/20 animate-pulse">
            <Users size={28} />
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mb-2 tracking-tight">Authentication Error</h2>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            Please append an authenticated employee identity string parameter to sync active workspace instances.
          </p>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-rose-400 break-all text-left shadow-inner">
            localhost:3000/employee/dashboard?id=YOUR_EMPLOYEE_ID
          </div>
        </div>
      </div>
    );
  }

  const filteredSectionTasks = activeSection === "overview" || activeSection === "all_tasks"
    ? tasks 
    : tasks.filter((t) => t.type === activeSection);

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col md:flex-row antialiased font-sans">
      
      {/* Backdrop for mobile layout navigation visibility */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/20 backdrop-blur-xs z-40 md:hidden transition-all duration-200" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ======================================
          SIDEBAR UI ELEMENT
          ====================================== */}
      <aside className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200/80 w-64 transition-transform duration-300 ease-in-out transform 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:sticky md:top-0 md:h-screen md:translate-x-0 flex flex-col shadow-sm`}>
        
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-blue-500/20 tracking-wider">
              UL
            </div>
            <span className="font-bold text-slate-800 text-lg tracking-tight">Urbane Living</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-colors">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Navigation Core</div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                  ${isActive 
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10" 
                    : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-900"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={`transition-colors ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"}`} />
                  <span className="tracking-tight">{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className={`text-[11px] px-2 py-0.5 rounded-md font-bold transition-all
                    ${isActive ? "bg-slate-800 text-slate-200" : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"}`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 px-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-500 tracking-tight">Data Stream Synced</span>
          </div>
        </div>
      </aside>

      {/* ======================================
          MAIN WORKSPACE LAYOUT
          ====================================== */}
      <main className="flex-1 min-w-0 flex flex-col">
        
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-4 flex items-center justify-between sticky top-0 z-30 transition-all">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors">
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight capitalize">
                {activeSection === "overview" ? "Work Environment Hub" : `${activeSection.replace("_", " ").toLowerCase()}`}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full shadow-xs">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-bold tracking-wider uppercase">Active Desk</span>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-8 space-y-8 max-w-7xl w-full mx-auto flex-1">
          
          {/* OVERVIEW MODULE: Stats Matrix */}
          {activeSection === "overview" && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {stats.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className={`bg-white rounded-2xl border border-slate-200/60 p-5 flex flex-col justify-between shadow-xs border-b-2 ${item.border} hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5`}>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-semibold text-slate-400 tracking-wide uppercase">{item.title}</span>
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.bg}`}>
                          <Icon className={item.color} size={18} />
                        </div>
                      </div>
                      <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{item.value}</h2>
                    </div>
                  );
                })}
              </div>

              {/* Pipeline Quick Sub-Groupings */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="bg-white rounded-2xl border border-slate-200/70 p-5 flex items-center justify-between shadow-xs hover:border-slate-300 transition-all">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-amber-800">Action Awaiting</p>
                    <p className="text-xs text-slate-400">Lifecycle logs outstanding</p>
                  </div>
                  <span className="text-xl font-black text-amber-600 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-xl">{pendingTasks.length}</span>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200/70 p-5 flex items-center justify-between shadow-xs hover:border-slate-300 transition-all">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-blue-800">In Progress</p>
                    <p className="text-xs text-slate-400">Currently accepted streams</p>
                  </div>
                  <span className="text-xl font-black text-blue-600 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-xl">{acceptedTasks.length}</span>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200/70 p-5 flex items-center justify-between shadow-xs hover:border-slate-300 transition-all">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-emerald-800">Dispatched Success</p>
                    <p className="text-xs text-slate-400">Cleared target matrices</p>
                  </div>
                  <span className="text-xl font-black text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-xl">{completedTasks.length}</span>
                </div>
              </div>
            </>
          )}

          {/* DYNAMIC TASK LIST MATRIX */}
          <div className="bg-white rounded-3xl border border-slate-200/70 shadow-xs p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-100 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={16} className="text-slate-400" />
                  <h2 className="text-lg font-bold text-slate-800 tracking-tight">
                    {activeSection === "overview" ? "Current Pipeline Queue" : "Section Workspace Focus Area"}
                  </h2>
                </div>
                <p className="text-slate-400 text-xs">Operational ledger containing active deployment sync arrays</p>
              </div>
              <span className="text-xs bg-slate-100 text-slate-700 font-bold px-3 py-1.5 rounded-xl border border-slate-200/30">
                Records Volume: {filteredSectionTasks.length}
              </span>
            </div>

            <div className="space-y-4">
              {filteredSectionTasks.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed rounded-2xl border-slate-200 bg-slate-50/50">
                  <AlertCircle className="mx-auto text-slate-300 mb-3 animate-bounce" size={36} />
                  <p className="text-slate-500 text-sm font-medium tracking-tight">No metrics mapped under current workspace index criteria.</p>
                </div>
              ) : (
                filteredSectionTasks.slice(0, 20).map((task) => (
                  <div key={task.id} className="border border-slate-200/70 bg-white hover:border-slate-300 rounded-2xl p-5 transition-all duration-200 hover:shadow-md flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    
                    <div className="space-y-2 flex-1 w-full">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="font-bold text-slate-800 text-base tracking-tight">{task.title}</h3>
                        <span className="text-[9px] tracking-wider uppercase px-2 py-0.5 bg-slate-100 font-extrabold rounded-md border border-slate-200 text-slate-500">
                          {task.type}
                        </span>
                      </div>
                      
                      <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">{task.description || "No supplemental core metadata attached to this pipeline token."}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-slate-400 pt-1 flex-wrap border-t border-slate-50 mt-2">
                        <span className="flex items-center gap-1.5"><Users size={13} /> Lead Name: <strong className="text-slate-600 font-semibold">{task.lead?.customer_name || "N/A"}</strong></span>
                        {task.scheduledAt && (
                          <span className="flex items-center gap-1.5"><Clock size={13} /> Target Clock: <strong className="text-slate-600 font-semibold">{new Date(task.scheduledAt).toLocaleString()}</strong></span>
                        )}
                      </div>
                    </div>

                    <div className="flex lg:flex-col items-end gap-3 w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0 justify-between shrink-0">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border
                        ${task.status === "COMPLETED" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : ""}
                        ${task.status === "ACCEPTED" ? "bg-blue-50 text-blue-700 border-blue-200" : ""}
                        ${task.status === "REJECTED" ? "bg-rose-50 text-rose-700 border-rose-200" : ""}
                        ${task.status === "PENDING" ? "bg-amber-50 text-amber-700 border-amber-200" : ""}
                      `}>
                        {task.status}
                      </span>

                      {/* State Dispatch Actuators */}
                      <div className="flex flex-col gap-2 w-full lg:w-auto items-end">
                        {task.status === "PENDING" && (
                          <div className="flex gap-2 w-full lg:w-auto">
                            <button
                              onClick={() => acceptTask(task.id)}
                              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-1.5 font-bold rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => rejectTask(task.id)}
                              className="bg-white hover:bg-rose-50 text-rose-600 px-4 py-1.5 font-bold rounded-xl text-xs transition-all border border-slate-200 hover:border-rose-200 cursor-pointer"
                            >
                              Reject
                            </button>
                          </div>
                        )}

                        {task.status === "ACCEPTED" && selectedTaskId !== task.id && (
                          <button
                            onClick={() => {
                              setSelectedTaskId(task.id);
                              setTaskRemarks("");
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-bold rounded-xl text-xs transition-colors shadow-sm shadow-blue-500/10 cursor-pointer"
                          >
                            Log Outcome & Complete
                          </button>
                        )}

                        {/* Dropdown Box Custom Form Integration */}
                        {selectedTaskId === task.id && (
                          <div className="bg-slate-50/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl mt-2 space-y-4 w-full sm:w-80 text-left animate-in fade-in-50 zoom-in-95 duration-150">
                            <div className="flex items-center gap-1.5 border-b border-slate-200/60 pb-2">
                              <TrendingUp size={14} className="text-blue-600" />
                              <p className="text-xs font-bold text-slate-800">Log Client Pipeline Outcome</p>
                            </div>
                            
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Discussion Logs</label>
                              <textarea
                                value={taskRemarks}
                                onChange={(e) => setTaskRemarks(e.target.value)}
                                placeholder="Client conversation notes, next steps..."
                                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white text-slate-800 focus:outline-none resize-none"
                                rows={2}
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Transition Lead Target</label>
                              <select
                                value={selectedLeadStage}
                                onChange={(e) => setSelectedLeadStage(e.target.value)}
                                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:border-blue-500 focus:outline-none cursor-pointer"
                              >
                                <option value="FOLLOWUP">Follow Up Required</option>
                                <option value="SITE_VISIT">Site Visit Scheduled</option>
                                <option value="CONFIRMED">Deal Won / Booked</option>
                                <option value="REJECTED">Client Dropped</option>
                              </select>
                            </div>

                            <div className="flex gap-2 pt-1">
                              <button
                                onClick={async () => {
                                  await completeTask(task.id, taskRemarks, selectedLeadStage);
                                  setSelectedTaskId(null);
                                }}
                                disabled={!taskRemarks.trim()}
                                className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:text-slate-500 text-white px-3 py-2 rounded-xl text-xs font-bold flex-1 transition-all shadow-sm cursor-pointer"
                              >
                                Dispatch
                              </button>
                              <button
                                onClick={() => setSelectedTaskId(null)}
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

          {/* OVERVIEW MODULE FOOTER: Real-time Audit Trace Logs */}
          {activeSection === "overview" && (
            <div className="bg-white rounded-3xl border border-slate-200/70 shadow-xs p-6">
              <h2 className="text-base font-bold text-slate-800 mb-4 tracking-tight">Recent Execution Audit Activity</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tasks.length === 0 ? (
                  <p className="text-slate-400 text-sm">No activity history recorded on transactional pipelines.</p>
                ) : (
                  tasks.slice(0, 4).map((task) => (
                    <div key={task.id} className="bg-slate-50/60 p-3 rounded-xl border border-slate-100 flex gap-3 items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <div>
                        <p className="font-semibold text-xs text-slate-700 line-clamp-1">{task.title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Status Node mapped to: <span className="font-bold text-slate-500">{task.status}</span>
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}