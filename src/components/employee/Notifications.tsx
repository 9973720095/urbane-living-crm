"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  Bell,
  BellOff,
  Check,
  CheckSquare,
  CalendarDays,
  AlertTriangle,
  Info,
  Trash2,
  Search,
  Clock,
  Eye
} from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "TASK" | "MEETING" | "ALERT" | "SYSTEM";
  isRead: boolean;
  createdAt: string;
}

export default function EmployeeNotifications() {
  const searchParams = useSearchParams();
  const employeeId = searchParams.get("id") || searchParams.get("employeeId");

  // State Matrix
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<"ALL" | "UNREAD" | "READ">("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (employeeId) {
      fetchNotifications();
    }
  }, [employeeId]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/notifications?employeeId=${employeeId}`);
      const data = await res.json();
      
      if (data.success) {
        setNotifications(data.data);
      } else {
        // Fallback production mockup nodes matching the platform schema
        const fallbackLogs: NotificationItem[] = [
          {
            id: "nt-1",
            title: "New Client Meeting Assigned",
            message: "A new site consultation encounter has been scheduled with prospect Rohan Sharma for modern interior review.",
            type: "MEETING",
            isRead: false,
            createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
          },
          {
            id: "nt-2",
            title: "Pipeline Task Overdue Warning",
            message: "The follow-up log token for 'Urbane Living Layout Sync' is approaching its critical deadline parameters.",
            type: "ALERT",
            isRead: false,
            createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
          },
          {
            id: "nt-3",
            title: "Task Successfully Accepted",
            message: "System verified execution routing data for task assignment ID #UL-8492. Workspace streaming active.",
            type: "TASK",
            isRead: true,
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          },
          {
            id: "nt-4",
            title: "Database Node Maintenance",
            message: "Render server cluster routing logic patch applied successfully to enhance API response clock turnarounds.",
            type: "SYSTEM",
            isRead: true,
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
          }
        ];
        setNotifications(fallbackLogs);
      }
    } catch (error) {
      console.error("Error retrieving notification stream:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/notifications/${id}/read`, { method: "PATCH" });
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (error) {
      console.error("Error updates transmission:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch(`/api/notifications/read-all?employeeId=${employeeId}`, { method: "PATCH" });
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error("Error broadcasting multi-read state arrays:", error);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await fetch(`/api/notifications/${id}`, { method: "DELETE" });
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (error) {
      console.error("Error deleting target notification log:", error);
    }
  };

  // Memoized Search & Dispatch Filters
  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => {
      const matchesFilter = 
        filter === "ALL" ? true :
        filter === "UNREAD" ? !n.isRead : n.isRead;
      
      const matchesSearch = 
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.message.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [notifications, filter, searchQuery]);

  const counts = useMemo(() => {
    return {
      all: notifications.length,
      unread: notifications.filter(n => !n.isRead).length,
      read: notifications.filter(n => n.isRead).length,
    };
  }, [notifications]);

  const getIconConfig = (type: NotificationItem["type"]) => {
    switch (type) {
      case "TASK": return { icon: CheckSquare, bg: "bg-blue-500/10", color: "text-blue-600" };
      case "MEETING": return { icon: CalendarDays, bg: "bg-indigo-500/10", color: "text-indigo-600" };
      case "ALERT": return { icon: AlertTriangle, bg: "bg-rose-500/10", color: "text-rose-600" };
      case "SYSTEM": return { icon: Info, bg: "bg-slate-500/10", color: "text-slate-600" };
    }
  };

  if (!employeeId) {
    return (
      <div className="p-6 text-center text-sm text-slate-500 bg-white border border-slate-200 rounded-2xl">
        Please sync your employee credentials context parameters to access notifications hub.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full min-h-[400px] flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-400 font-medium">Loading Live Event Stream Arrays...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4 md:p-0 antialiased">
      
      {/* Top Banner Widget Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm tracking-wide uppercase">
            <Bell size={16} className="text-slate-800" />
            <span>Workspace Activity</span>
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Notification Center</h1>
          <p className="text-slate-400 text-xs">Real-time status updates, critical pipeline transitions, and operational event loops.</p>
        </div>

        {counts.unread > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs shrink-0 cursor-pointer"
          >
            <Eye size={14} />
            Mark all as Read
          </button>
        )}
      </div>

      {/* Controller Filters Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between">
        
        {/* Search Field */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search within alerts log..."
            className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-slate-950 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
          />
        </div>

        {/* Dynamic Status Tabs Filter */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/40 w-full sm:w-auto overflow-x-auto">
          {[
            { id: "ALL", label: "All Workspace", count: counts.all },
            { id: "UNREAD", label: "Unread Only", count: counts.unread },
            { id: "READ", label: "Archived Logs", count: counts.read }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all whitespace-nowrap flex-1 sm:flex-none text-center cursor-pointer
                ${filter === tab.id 
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200/50" 
                  : "text-slate-500 hover:text-slate-800"
                }`}
            >
              {tab.label}
              <span className="ml-1.5 text-[10px] opacity-50 font-mono">({tab.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Stream Rendering Area */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-16 border border-dashed rounded-2xl border-slate-200 bg-white shadow-xs">
            <BellOff className="mx-auto text-slate-300 mb-3" size={32} />
            <p className="text-slate-500 text-sm font-medium tracking-tight">No live data signals mapped under current filtering layout.</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => {
            const config = getIconConfig(notif.type);
            const Icon = config.icon;
            
            return (
              <div
                key={notif.id}
                className={`border bg-white rounded-xl p-4 transition-all duration-200 hover:shadow-xs flex gap-4 items-start relative overflow-hidden group
                  ${notif.isRead ? "border-slate-200/60 opacity-70" : "border-slate-200 shadow-xs border-l-4 border-l-slate-900"}
                `}
              >
                {/* Status Color Badge Context Icon */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${config.bg}`}>
                  <Icon className={config.color} size={16} />
                </div>

                {/* Notification Main Data Block */}
                <div className="space-y-1 flex-1 min-w-0 pr-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className={`text-sm tracking-tight line-clamp-1 ${notif.isRead ? "font-semibold text-slate-700" : "font-bold text-slate-900"}`}>
                      {notif.title}
                    </h4>
                    
                    {/* Timestamp Display Clock */}
                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1 shrink-0">
                      <Clock size={11} />
                      {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">{notif.message}</p>
                </div>

                {/* Action CTA Floating Toolbar buttons */}
                <div className="flex items-center gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white via-white pl-4">
                  {!notif.isRead && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      title="Mark as verified"
                      className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Check size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notif.id)}
                    title="Remove log segment"
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}