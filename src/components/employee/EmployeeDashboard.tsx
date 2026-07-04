"use client";

import { useEffect, useState } from "react";
import {
  Users,
  CheckSquare,
  PhoneCall,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

export default function EmployeeDashboard() {
  const [tasks, setTasks] = useState<any[]>([]);

  // TEMP STATIC EMPLOYEE ID
  const employeeId = "cmqhyelgz0002utacv7d8d4fj";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(
        `/api/tasks?employeeId=${employeeId}`
      );

      const data = await res.json();

      if (data.success) {
        setTasks(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const acceptTask = async (taskId: string) => {
    try {
      await fetch(`/api/tasks/${taskId}/accept`, {
        method: "PATCH",
      });

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const rejectTask = async (taskId: string) => {
    try {
      await fetch(`/api/tasks/${taskId}/reject`, {
        method: "PATCH",
      });

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const completeTask = async (taskId: string) => {
    try {
      await fetch(`/api/tasks/${taskId}/complete`, {
        method: "PATCH",
      });

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const pendingTasks = tasks.filter(
    (task) => task.status === "PENDING"
  );

  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED"
  );

  const followups = tasks.filter(
    (task) => task.type === "FOLLOWUP"
  );

  const meetings = tasks.filter(
    (task) => task.type === "MEETING"
  );

  const stats = [
    {
      title: "Assigned Tasks",
      value: tasks.length,
      icon: Users,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      title: "Pending Tasks",
      value: pendingTasks.length,
      icon: CheckSquare,
      bg: "bg-yellow-50",
      color: "text-yellow-600",
    },
    {
      title: "Today's Followups",
      value: followups.length,
      icon: PhoneCall,
      bg: "bg-purple-50",
      color: "text-purple-600",
    },
    {
      title: "Meetings",
      value: meetings.length,
      icon: CalendarDays,
      bg: "bg-indigo-50",
      color: "text-indigo-600",
    },
    {
      title: "Completed Tasks",
      value: completedTasks.length,
      icon: CheckCircle2,
      bg: "bg-green-50",
      color: "text-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="p-6 lg:p-8 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Employee Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Welcome back. Here's your work summary.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">

          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-white rounded-3xl border shadow-sm p-6"
              >
                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-slate-500">
                      {item.title}
                    </p>

                    <h2 className="text-3xl font-bold text-slate-800 mt-3">
                      {item.value}
                    </h2>
                  </div>

                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.bg}`}
                  >
                    <Icon
                      className={item.color}
                      size={26}
                    />
                  </div>

                </div>
              </div>
            );
          })}

        </div>

        {/* Today's Tasks */}
        <div className="bg-white rounded-3xl border shadow-sm p-6">

          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Today's Tasks
          </h2>

          <div className="space-y-4">

            {tasks.slice(0, 10).map((task) => (

              <div
                key={task.id}
                className="border rounded-2xl p-5"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h3 className="font-semibold text-slate-800">
                      {task.title}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      {task.description}
                    </p>

                    <p className="text-xs text-slate-400 mt-2">
                      Lead: {task.lead?.customer_name}
                    </p>

                  </div>

                  <span
                    className={`px-4 py-2 rounded-xl text-sm
                    ${
                      task.status === "COMPLETED"
                        ? "bg-green-100 text-green-700"
                        : task.status === "ACCEPTED"
                        ? "bg-blue-100 text-blue-700"
                        : task.status === "REJECTED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.status}
                  </span>

                </div>

                <div className="flex gap-3 mt-4">

                  {task.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => acceptTask(task.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => rejectTask(task.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {task.status === "ACCEPTED" && (
                    <button
                      onClick={() => completeTask(task.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
                    >
                      Complete Task
                    </button>
                  )}

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-3xl border shadow-sm p-6">

          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Recent Activity
          </h2>

          <div className="space-y-4">

            {tasks.slice(0, 5).map((task) => (

              <div
                key={task.id}
                className="border-l-4 border-blue-500 pl-4"
              >

                <p className="font-medium text-slate-700">
                  {task.title}
                </p>

                <p className="text-sm text-slate-500">
                  {task.status}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>
    </div>
  );
}