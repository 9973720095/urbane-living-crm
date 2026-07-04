"use client";

import { useEffect, useState } from "react";
import {
  User,
  Users,
  ClipboardList,
  CalendarClock,
} from "lucide-react";

export default function AdminTaskManager() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    employeeId: "",
    leadId: "",
    type: "CALL",
    title: "",
    description: "",
    scheduledAt: "",
  });

  useEffect(() => {
    fetchEmployees();
    fetchLeads();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await fetch("/api/employees");
      const data = await res.json();

      if (data.success) {
        setEmployees(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();

      if (data.success) {
        setLeads(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignTask = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Task Assigned Successfully");

        setForm({
          employeeId: "",
          leadId: "",
          type: "CALL",
          title: "",
          description: "",
          scheduledAt: "",
        });
      } else {
        alert("Task creation failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="bg-white rounded-3xl border shadow-sm p-6">

        <h1 className="text-3xl font-bold text-slate-800">
          Assign New Task
        </h1>

        <p className="text-slate-500 mt-2">
          Assign leads and activities to employees
        </p>

      </div>

      {/* Form */}
      <div className="bg-white rounded-3xl border shadow-sm p-8">

        <div className="grid md:grid-cols-2 gap-6">

          {/* Employee */}
          <div>
            <label className="text-sm text-slate-500">
              Employee
            </label>

            <div className="relative mt-2">

              <Users
                size={18}
                className="absolute left-4 top-4 text-slate-400"
              />

              <select
                value={form.employeeId}
                onChange={(e) =>
                  setForm({
                    ...form,
                    employeeId: e.target.value,
                  })
                }
                className="w-full border rounded-2xl py-3 pl-12 pr-4"
              >
                <option value="">
                  Select Employee
                </option>

                {employees.map((employee) => (
                  <option
                    key={employee.id}
                    value={employee.id}
                  >
                    {employee.name}
                  </option>
                ))}
              </select>

            </div>
          </div>

          {/* Lead */}
          <div>
            <label className="text-sm text-slate-500">
              Lead
            </label>

            <div className="relative mt-2">

              <User
                size={18}
                className="absolute left-4 top-4 text-slate-400"
              />

              <select
                value={form.leadId}
                onChange={(e) =>
                  setForm({
                    ...form,
                    leadId: e.target.value,
                  })
                }
                className="w-full border rounded-2xl py-3 pl-12 pr-4"
              >
                <option value="">
                  Select Lead
                </option>

                {leads.map((lead) => (
                  <option
                    key={lead.id}
                    value={lead.id}
                  >
                    {lead.customer_name}
                  </option>
                ))}
              </select>

            </div>
          </div>

          {/* Task Type */}
          <div>
            <label className="text-sm text-slate-500">
              Task Type
            </label>

            <div className="relative mt-2">

              <ClipboardList
                size={18}
                className="absolute left-4 top-4 text-slate-400"
              />

              <select
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value,
                  })
                }
                className="w-full border rounded-2xl py-3 pl-12 pr-4"
              >
                <option value="CALL">CALL</option>
                <option value="FOLLOWUP">
                  FOLLOWUP
                </option>
                <option value="MEETING">
                  MEETING
                </option>
                <option value="SITE_VISIT">
                  SITE VISIT
                </option>
              </select>

            </div>
          </div>

          {/* Schedule */}
          <div>
            <label className="text-sm text-slate-500">
              Schedule Time
            </label>

            <div className="relative mt-2">

              <CalendarClock
                size={18}
                className="absolute left-4 top-4 text-slate-400"
              />

              <input
                type="datetime-local"
                value={form.scheduledAt}
                onChange={(e) =>
                  setForm({
                    ...form,
                    scheduledAt: e.target.value,
                  })
                }
                className="w-full border rounded-2xl py-3 pl-12 pr-4"
              />

            </div>
          </div>

        </div>

        {/* Title */}
        <div className="mt-6">

          <label className="text-sm text-slate-500">
            Title
          </label>

          <input
            type="text"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            className="w-full border rounded-2xl p-4 mt-2"
            placeholder="Task title"
          />

        </div>

        {/* Description */}
        <div className="mt-6">

          <label className="text-sm text-slate-500">
            Description
          </label>

          <textarea
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="w-full border rounded-2xl p-4 mt-2"
            placeholder="Task description"
          />

        </div>

        {/* Button */}
        <button
          onClick={handleAssignTask}
          disabled={loading}
          className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold"
        >
          {loading
            ? "Assigning..."
            : "Assign Task"}
        </button>

      </div>

    </div>
  );
}