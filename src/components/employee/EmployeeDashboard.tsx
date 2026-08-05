"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useSearchParams } from "next/navigation";

import Sidebar from "./EmployeeSidebar";
import DashboardHeader from "./EmployeeTopNavbar";
import DashboardStats from "./DashboardStats";
import TodaySchedule from "./TodaySchedule";

import EmployeeTasks from "./EmployeeTasks";
import EmployeeLeads from "./EmployeeLeads";
import EmployeeFollowups from "./EmployeeFollowups";
import EmployeeMeetings from "./EmployeeMeetings";

import LeadDrawer from "./LeadDrawer";
import OutcomeModal from "./OutcomeModal";

import type { Task } from "@/types/employee";

type FollowUpTask = Task & {
  type: "FOLLOWUP";
  followupDate: string;
  status: "PENDING" | "COMPLETED" | "MISSED";
};

export default function EmployeeDashboard() {
  const searchParams = useSearchParams();

  const employeeId =
    searchParams.get("id") ||
    searchParams.get("employeeId");

  //-----------------------------------------
  // States
  //-----------------------------------------

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] =
    useState("dashboard");

  const [selectedTask, setSelectedTask] =
    useState<Task | null>(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [outcomeOpen, setOutcomeOpen] =
    useState(false);

  //-----------------------------------------
  // Fetch Employee Tasks
  //-----------------------------------------

  const fetchTasks = useCallback(async () => {
    if (!employeeId) return;

    try {
      setLoading(true);

      const res = await fetch(
        `/api/tasks?employeeId=${employeeId}`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      if (data.success) {
        setTasks(data.data ?? []);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Task Fetch Error:", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [employeeId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  //-----------------------------------------
  // Employee Missing
  //-----------------------------------------

  if (!employeeId) {
    return (
      <div className="flex h-screen items-center justify-center text-xl font-semibold">
        Employee Id Missing
      </div>
    );
  }

  //-----------------------------------------
  // Dashboard Counts
  //-----------------------------------------

  const totalTasks = tasks.length;

  const pending = useMemo(
    () =>
      tasks.filter(
        (task) => task.status === "PENDING"
      ).length,
    [tasks]
  );

  const accepted = useMemo(
    () =>
      tasks.filter(
        (task) => task.status === "ACCEPTED"
      ).length,
    [tasks]
  );

  const completed = useMemo(
    () =>
      tasks.filter(
        (task) => task.status === "COMPLETED"
      ).length,
    [tasks]
  );

  const overdue = useMemo(
    () =>
      tasks.filter((task) => {
        if (task.status === "COMPLETED")
          return false;

        if (!task.scheduledAt)
          return false;

        return (
          new Date(task.scheduledAt) <
          new Date()
        );
      }).length,
    [tasks]
  );

  const meetings = useMemo(
    () =>
      tasks.filter(
        (task) => task.type === "MEETING"
      ).length,
    [tasks]
  );

  const followupTasks = useMemo(
    () =>
      tasks.filter(
        (
          task
        ): task is FollowUpTask =>
          task.type === "FOLLOWUP"
      ),
    [tasks]
  );

  const followups =
    followupTasks.length;

  const siteVisits = useMemo(
    () =>
      tasks.filter(
        (task) =>
          task.type === "SITE_VISIT"
      ).length,
    [tasks]
  );

  //-----------------------------------------
  // Today's Schedule
  //-----------------------------------------

 const todaySchedules = useMemo(() => {
  const today = new Date();

  return tasks
    .filter((task) => {
      if (!task.scheduledAt) return false;

      const date = new Date(task.scheduledAt);

      return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
      );
    })
    .sort(
      (a, b) =>
        new Date(a.scheduledAt ?? "").getTime() -
        new Date(b.scheduledAt ?? "").getTime()
    );
}, [tasks]);

  //-----------------------------------------
  // Handlers
  //-----------------------------------------

  const handleFollowupComplete =
    async () => {
      await fetchTasks();
    };

  const handleFollowupReschedule =
    async () => {
      await fetchTasks();
    };

  //-----------------------------------------
  // JSX Starts Here
  //-----------------------------------------

  return (
        <div className="flex h-screen bg-slate-100">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalTasks={totalTasks}
        pendingTasks={pending}
        followups={followups}
        meetings={meetings}
        siteVisits={siteVisits}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader employeeName="Employee" />

        <main className="flex-1 overflow-y-auto space-y-6 p-6">
          {/* Dashboard */}

          {activeTab === "dashboard" && (
            <>
              <DashboardStats
                pending={pending}
                accepted={accepted}
                completed={completed}
                overdue={overdue}
                meetings={meetings}
                followups={followups}
              />

              <TodaySchedule tasks={todaySchedules} />
            </>
          )}

          {/* Tasks */}

          {(activeTab === "tasks" ||
            activeTab === "pending" ||
            activeTab === "site_visits") && (
            <EmployeeTasks
              tasks={tasks as any}
              loading={loading}
              onRefresh={fetchTasks}
              onLeadClick={(task: Task) => {
                setSelectedTask(task);
                setDrawerOpen(true);
              }}
              onOutcome={(task: Task) => {
                setSelectedTask(task);
                setOutcomeOpen(true);
              }}
            />
          )}

          {/* Followups */}

          {activeTab === "followups" && (
            <EmployeeFollowups
              followups={followupTasks
                .filter(
                  (
                    t
                  ): t is FollowUpTask & {
                    lead: {
                      id: string;
                      customer_name: string;
                      phone_number?: string;
                      city?: string;
                    };
                  } =>
                    !!t.lead?.id &&
                    !!t.lead?.customer_name
                )
                .map((t) => ({
                  id: t.id,

                  followupDate:
                    t.scheduledAt ??
                    t.followupDate,

                  remarks:
                    t.description ?? "",

                  status:
                    t.status === "COMPLETED"
                      ? "COMPLETED"
                      : "PENDING",

                  lead: {
                    id: t.lead!.id,

                    customer_name:
                      t.lead!.customer_name,

                    phone_number:
                      t.lead!.phone_number ?? "",

                    city:
                      t.lead!.city ?? "",
                  },
                }))}
              onComplete={
                handleFollowupComplete
              }
              onReschedule={
                handleFollowupReschedule
              }
            />
          )}

          {/* Meetings */}

          {activeTab === "meetings" && (
            <EmployeeMeetings />
          )}

          {/* Leads */}

          {activeTab === "leads" && (
            <EmployeeLeads
              employeeId={employeeId}
            />
          )}

          {/* Profile */}

          {activeTab === "profile" && (
            <div className="rounded-3xl border bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold">
                Employee Profile
              </h2>

              <p className="mt-2 text-slate-500">
                Profile Module Coming Soon...
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Lead Drawer */}

      <LeadDrawer
        open={drawerOpen}
        lead={
            selectedTask?.lead &&
            selectedTask.lead.id &&
            selectedTask.lead.customer_name
              ? {
                  id: selectedTask.lead.id,
                  customer_name: selectedTask.lead.customer_name,
                  phone_number: selectedTask.lead.phone_number ?? "",
                  email: selectedTask.lead.email ?? "",
                  city: selectedTask.lead.city ?? "",
                  address: selectedTask.lead.address ?? "",
                }
              : null
          }
        onClose={() => {
          setDrawerOpen(false);
          setSelectedTask(null);
        }}
      />

      {/* Outcome Modal */}

      <OutcomeModal
        open={outcomeOpen}
        task={selectedTask}
        onClose={() => {
          setOutcomeOpen(false);
          setSelectedTask(null);
        }}
        refresh={fetchTasks}
      />
    </div>
  );
}
