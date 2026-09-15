"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

import OverviewConsole from "./OverviewConsole";
import DashboardStats from "./DashboardStats";
import LeadFunnel from "./LeadFunnel";
import RecentLeads from "./RecentLeads";
import CityAnalytics from "./CityAnalytics";
import TaskPanel from "./TaskPanel";
import EmployeePerformance from "./EmployeePerformance";
import EmployeeTasks from "./EmployeeTasks";
import AdminTaskManager from "./AdminTaskManager";
import CeilingLeads from "./CeilingLeads";
import SystemSettings from "./SystemSettings";
import LeadManagement from "./LeadManagement";
import VPSalesOverview from "./VPSalesOverview";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      await fetch("/api/leads/sync");
      const res = await fetch("/api/leads");

      if (!res.ok) {
        throw new Error("Failed to fetch leads");
      }

      const data = await res.json();

      setLeads(
        Array.isArray(data.data)
          ? data.data
          : Array.isArray(data)
          ? data
          : []
      );
    } catch (err) {
      console.error("LEAD FETCH ERROR:", err);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();

    const interval = setInterval(() => {
      fetchLeads();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-medium">
        Loading CRM...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row overflow-x-hidden">
      {/* Responsive Drawer Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-72 min-w-0 flex flex-col">
        {/* Pass mobile toggle handler to Navbar */}
        <TopNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-3 sm:p-6 lg:p-8 flex-1 min-w-0">
          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6 sm:space-y-8">
              <OverviewConsole leads={leads} />
              <DashboardStats leads={leads} />
            </div>
          )}

          {/* ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="space-y-6 sm:space-y-8">
              <DashboardStats leads={leads} />
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
                <RecentLeads leads={leads} />
                <CityAnalytics leads={leads} />
              </div>
            </div>
          )}

          {/* LEAD FUNNEL */}
          {activeTab === "funnel" && <LeadFunnel leads={leads} />}

          {/* TASK CENTER */}
          {activeTab === "tasks" && <TaskPanel leads={leads} />}

          {/* TASK MANAGER */}
          {activeTab === "taskManager" && <AdminTaskManager />}

          {/* CITY ANALYTICS */}
          {activeTab === "cities" && <CityAnalytics leads={leads} />}

          {/* EMPLOYEE PERFORMANCE */}
          {activeTab === "employees" && <EmployeePerformance leads={leads} />}

          {/* VP SALES OVERVIEW */}
          {activeTab === "vpSales" && <VPSalesOverview leads={leads} />}

          {/* DESIGN WORKSPACE */}
          {activeTab === "designWorkspace" && (
            <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 text-center">
              <h2 className="text-lg sm:text-xl font-bold text-slate-800">
                🎨 Design Team Workspace
              </h2>
              <p className="text-xs text-slate-500 mt-2">
                Lead Management tab mein jaakar kisi lead par{" "}
                <strong>"Design Handover"</strong> click karein taaki 3D Renders aur layouts upload kiye ja sakein.
              </p>
            </div>
          )}

          {/* EMPLOYEE TASKS */}
          {activeTab === "employeeTasks" && (
            <EmployeeTasks leads={leads} refresh={fetchLeads} />
          )}

          {/* CEILING LEADS */}
          {activeTab === "leads" && (
            <CeilingLeads leads={leads} refresh={fetchLeads} />
          )}

          {/* LEAD MANAGEMENT */}
          {activeTab === "leadManagement" && <LeadManagement />}

          {/* SETTINGS */}
          {activeTab === "settings" && <SystemSettings />}
        </main>
      </div>
    </div>
  );
}