"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Clock3,
  PhoneCall,
  CalendarDays,
  Home,
  XCircle,
  User,
  MapPin,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description?: string;
  type: "CALL" | "FOLLOWUP" | "MEETING" | "SITE_VISIT";
  status: "PENDING" | "ACCEPTED" | "COMPLETED" | "REJECTED";
  scheduledAt?: string;

  lead?: {
    customer_name?: string;
    phone_number?: string;
    city?: string;
  };
}

interface Props {
  tasks: Task[];
  loading?: boolean;
  onRefresh: () => Promise<void>;
  onLeadClick?: (task: Task) => void;
  onOutcome?: (task: Task) => void;
}

export default function EmployeeTasks({
  tasks,
  loading = false,
  onRefresh,
  onLeadClick,
  onOutcome,
}: Props) {
  const [remarks, setRemarks] = useState("");
  const [leadStage, setLeadStage] = useState("FOLLOWUP");
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  async function updateTask(url: string, body?: any) {
    await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    onRefresh();
  }

  function icon(type: string) {
    switch (type) {
      case "CALL":
        return <PhoneCall size={18} />;
      case "FOLLOWUP":
        return <Clock3 size={18} />;
      case "MEETING":
        return <CalendarDays size={18} />;
      default:
        return <Home size={18} />;
    }
  }

  function badge(status: string) {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "ACCEPTED":
        return "bg-blue-100 text-blue-700";
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      default:
        return "bg-red-100 text-red-700";
    }
  }

  return (
    <div className="space-y-5">

      {tasks.length === 0 && (
        <div className="bg-white rounded-3xl p-16 border text-center">
          <h2 className="text-xl font-bold">
            No Tasks Assigned
          </h2>

          <p className="text-slate-500 mt-2">
            Admin assigned tasks will appear here.
          </p>
        </div>
      )}

      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white rounded-3xl border shadow-sm p-6"
        >
          {/* Header */}

          <div className="flex justify-between flex-wrap gap-5">

            <div className="flex gap-4">

              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                {icon(task.type)}
              </div>

              <div>
                <h2 className="font-bold text-xl">
                  {task.title}
                </h2>

                <p className="text-slate-500 mt-1">
                  {task.description}
                </p>
              </div>

            </div>

            <div
              className={`px-4 py-2 rounded-xl font-medium h-fit ${badge(task.status)}`}
            >
              {task.status}
            </div>

          </div>

          {/* Lead */}

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">

            <div className="bg-slate-50 rounded-xl p-4">
              <div className="text-sm text-slate-500 flex items-center gap-2">
                <User size={15} />
                Customer
              </div>

              <div className="font-semibold mt-2">
                {task.lead?.customer_name}
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <div className="text-sm text-slate-500">
                Phone
              </div>

              <div className="font-semibold mt-2">
                {task.lead?.phone_number}
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <div className="text-sm text-slate-500 flex gap-2 items-center">
                <MapPin size={15} />
                City
              </div>

              <div className="font-semibold mt-2">
                {task.lead?.city}
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <div className="text-sm text-slate-500">
                Schedule
              </div>

              <div className="font-semibold mt-2">
                {task.scheduledAt
                  ? new Date(task.scheduledAt).toLocaleString()
                  : "-"}
              </div>
            </div>

          </div>

          {/* Buttons */}

          <div className="mt-6 flex flex-wrap gap-3">

            {task.status === "PENDING" && (
              <>
                <button
                  onClick={() =>
                    updateTask(`/api/tasks/${task.id}/accept`)
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    updateTask(`/api/tasks/${task.id}/reject`)
                  }
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl"
                >
                  Reject
                </button>
              </>
            )}

            {task.status === "ACCEPTED" &&
              selectedTask !== task.id && (
                <button
                  onClick={() => setSelectedTask(task.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
                >
                  Complete Task
                </button>
              )}

            {task.status === "COMPLETED" && (
              <div className="bg-green-100 text-green-700 px-5 py-3 rounded-xl flex items-center gap-2">
                <CheckCircle2 size={18} />
                Completed
              </div>
            )}

            {task.status === "REJECTED" && (
              <div className="bg-red-100 text-red-700 px-5 py-3 rounded-xl flex items-center gap-2">
                <XCircle size={18} />
                Rejected
              </div>
            )}

          </div>

          {/* Complete Form */}

          {selectedTask === task.id && (
            <div className="mt-6 bg-slate-50 rounded-2xl p-5 border">

              <textarea
                rows={3}
                placeholder="Remarks..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full border rounded-xl p-3"
              />

              <select
                value={leadStage}
                onChange={(e) =>
                  setLeadStage(e.target.value)
                }
                className="w-full border rounded-xl p-3 mt-3"
              >
                <option value="FOLLOWUP">Followup</option>
                <option value="SITE_VISIT">
                  Site Visit
                </option>
                <option value="CONFIRMED">
                  Confirmed
                </option>
                <option value="REJECTED">
                  Rejected
                </option>
              </select>

              <div className="flex gap-3 mt-4">

                <button
                  onClick={() =>
                    updateTask(
                      `/api/tasks/${task.id}/complete`,
                      {
                        remarks,
                        leadStage,
                      }
                    )
                  }
                  className="bg-green-600 text-white px-5 py-3 rounded-xl"
                >
                  Submit
                </button>

                <button
                  onClick={() => setSelectedTask(null)}
                  className="bg-slate-200 px-5 py-3 rounded-xl"
                >
                  Cancel
                </button>

              </div>

            </div>
          )}
        </div>
      ))}
    </div>
  );
}