"use client";

import {
  CheckCircle2,
  Clock3,
  PhoneCall,
  CalendarDays,
  Home,
  XCircle,
} from "lucide-react";

interface Props {
  tasks?: any[];
}

export default function EmployeeTasks({
  tasks = [],
}: Props) {
  const refreshPage = () => {
    window.location.reload();
  };

  const acceptTask = async (id: string) => {
    try {
      const res = await fetch(
        `/api/tasks/${id}/accept`,
        {
          method: "PATCH",
        }
      );

      const data = await res.json();

      if (data.success) {
        refreshPage();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const rejectTask = async (id: string) => {
    try {
      const res = await fetch(
        `/api/tasks/${id}/reject`,
        {
          method: "PATCH",
        }
      );

      const data = await res.json();

      if (data.success) {
        refreshPage();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const completeTask = async (id: string) => {
    try {
      const res = await fetch(
        `/api/tasks/${id}/complete`,
        {
          method: "PATCH",
        }
      );

      const data = await res.json();

      if (data.success) {
        refreshPage();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "CALL":
        return <PhoneCall size={18} />;

      case "FOLLOWUP":
        return <Clock3 size={18} />;

      case "MEETING":
        return <CalendarDays size={18} />;

      case "SITE_VISIT":
        return <Home size={18} />;

      default:
        return <Clock3 size={18} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "ACCEPTED":
        return "bg-blue-100 text-blue-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            My Tasks
          </h1>

          <p className="text-slate-500 mt-1">
            Assigned work & daily activities
          </p>

        </div>

        <div className="bg-indigo-50 px-5 py-4 rounded-2xl">

          <div className="text-sm text-slate-500">
            Total Tasks
          </div>

          <div className="text-3xl font-bold text-indigo-600">
            {tasks.length}
          </div>

        </div>

      </div>

      {/* Task List */}
      <div className="space-y-5">

        {tasks.map((task: any) => (
          <div
            key={task.id}
            className="bg-white border rounded-3xl shadow-sm p-6"
          >

            {/* Top */}
            <div className="flex flex-col xl:flex-row justify-between gap-5 mb-6">

              <div>

                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                    {getTaskIcon(task.type)}
                  </div>

                  <div>

                    <h2 className="text-xl font-bold text-slate-800">
                      {task.title}
                    </h2>

                    <p className="text-slate-500 text-sm mt-1">
                      {task.description}
                    </p>

                  </div>

                </div>

              </div>

              <div
                className={`px-4 py-2 rounded-2xl text-sm font-medium h-fit ${getStatusColor(
                  task.status
                )}`}
              >
                {task.status}
              </div>

            </div>

            {/* Lead Info */}
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

              <div className="bg-slate-50 rounded-2xl p-4">

                <div className="text-sm text-slate-500">
                  Customer
                </div>

                <div className="font-semibold mt-2">
                  {task.lead?.customer_name}
                </div>

              </div>

              <div className="bg-slate-50 rounded-2xl p-4">

                <div className="text-sm text-slate-500">
                  Phone
                </div>

                <div className="font-semibold mt-2">
                  {task.lead?.phone_number}
                </div>

              </div>

              <div className="bg-slate-50 rounded-2xl p-4">

                <div className="text-sm text-slate-500">
                  City
                </div>

                <div className="font-semibold mt-2">
                  {task.lead?.city}
                </div>

              </div>

              <div className="bg-slate-50 rounded-2xl p-4">

                <div className="text-sm text-slate-500">
                  Scheduled Time
                </div>

                <div className="font-semibold mt-2">
                  {new Date(
                    task.scheduledAt
                  ).toLocaleString()}
                </div>

              </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">

              {task.status === "PENDING" && (
                <>
                  <button
                    onClick={() => acceptTask(task.id)}
                    className="bg-blue-600 text-white px-5 py-3 rounded-2xl hover:bg-blue-700"
                  >
                    Accept Task
                  </button>

                  <button
                    onClick={() => rejectTask(task.id)}
                    className="bg-red-600 text-white px-5 py-3 rounded-2xl hover:bg-red-700"
                  >
                    Reject Task
                  </button>
                </>
              )}

              {task.status === "ACCEPTED" && (
                <button
                  onClick={() => completeTask(task.id)}
                  className="bg-green-600 text-white px-5 py-3 rounded-2xl flex items-center gap-2 hover:bg-green-700"
                >
                  <CheckCircle2 size={18} />
                  Complete Task
                </button>
              )}

              {task.status === "COMPLETED" && (
                <div className="bg-green-100 text-green-700 px-5 py-3 rounded-2xl flex items-center gap-2">

                  <CheckCircle2 size={18} />

                  Completed

                </div>
              )}

              {task.status === "REJECTED" && (
                <div className="bg-red-100 text-red-700 px-5 py-3 rounded-2xl flex items-center gap-2">

                  <XCircle size={18} />

                  Rejected

                </div>
              )}

            </div>

          </div>
        ))}

        {tasks.length === 0 && (
          <div className="bg-white rounded-3xl border shadow-sm p-16 text-center">

            <h2 className="text-2xl font-bold text-slate-700">
              No Tasks Found
            </h2>

            <p className="text-slate-500 mt-2">
              Tasks assigned by admin will appear here.
            </p>

          </div>
        )}

      </div>

    </div>
  );
}