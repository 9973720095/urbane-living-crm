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
import CeilingLeads from "./CeilingLeads";
import SystemSettings from "./SystemSettings";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/leads");

      if (!res.ok) throw new Error();

      const data = await res.json();

      setLeads(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error(err);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();

    const interval = setInterval(() => {
      fetchLeads();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading CRM...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="lg:ml-72">

        <TopNavbar />

        <main className="p-4 lg:p-8">

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8">

              <OverviewConsole leads={leads} />

              <DashboardStats leads={leads} />

            </div>
          )}

          {/* ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="space-y-8">

              <DashboardStats leads={leads} />

              <div className="grid xl:grid-cols-2 gap-8">

                <RecentLeads leads={leads} />

                <CityAnalytics leads={leads} />

              </div>

            </div>
          )}

          {/* LEAD FUNNEL */}
          {activeTab === "funnel" && (
            <LeadFunnel leads={leads} />
          )}

          {/* TASK CENTER */}
          {activeTab === "tasks" && (
            <TaskPanel leads={leads} />
          )}

          {/* CITY ANALYTICS */}
          {activeTab === "cities" && (
            <CityAnalytics leads={leads} />
          )}

          {/* EMPLOYEE PERFORMANCE */}
          {activeTab === "employees" && (
            <EmployeePerformance leads={leads} />
          )}

          {/* EMPLOYEE TASKS */}
          {activeTab === "employeeTasks" && (
            <EmployeeTasks
              leads={leads}
              refresh={fetchLeads}
            />
          )}

          {/* CEILING LEADS */}
          {activeTab === "leads" && (
            <CeilingLeads
              leads={leads}
              refresh={fetchLeads}
            />
          )}

          {/* SETTINGS */}
          {activeTab === "settings" && (
            <SystemSettings />
          )}

        </main>

      </div>

    </div>
  );
}