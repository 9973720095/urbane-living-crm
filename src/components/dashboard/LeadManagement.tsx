"use client";

import { useEffect, useMemo, useState } from "react";

import LeadKanbanBoard from "@/components/leads/LeadKanbanBoard";

interface Employee {
  id: string;
  name: string;
}

interface Props {
  leads: any[];
}

export default function LeadManagement({
  leads,
}: Props) {

  const [employees, setEmployees] = useState<Employee[]>([]);

  const [selectedEmployee, setSelectedEmployee] =
    useState("ALL");

  const [loadingEmployees, setLoadingEmployees] =
    useState(true);

  //----------------------------------------------------
  // Load Employees
  //----------------------------------------------------

  useEffect(() => {

    const loadEmployees = async () => {

      try {

        const res = await fetch("/api/employees");

        const data = await res.json();

        setEmployees(data.data || []);

      } catch (err) {

        console.error(err);

      } finally {

        setLoadingEmployees(false);

      }

    };

    loadEmployees();

  }, []);

  //----------------------------------------------------
  // Filter Leads
  //----------------------------------------------------

  const filteredLeads = useMemo(() => {

    if (selectedEmployee === "ALL")
      return leads;

    return leads.filter(
      (lead) =>
        lead.assignedToId === selectedEmployee
    );

  }, [leads, selectedEmployee]);

  //----------------------------------------------------
  // UI
  //----------------------------------------------------

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="bg-white rounded-3xl border p-6 shadow-sm">

        <div className="flex flex-col lg:flex-row justify-between gap-5">

          <div>

            <h2 className="text-3xl font-bold text-slate-800">

              Lead Management

            </h2>

            <p className="text-slate-500 mt-2">

              Manage Leads, Employees & Customer Journey

            </p>

          </div>

          <div className="flex items-center gap-4">

            <select

              value={selectedEmployee}

              onChange={(e)=>
                setSelectedEmployee(e.target.value)
              }

              className="border rounded-xl px-4 py-3"

            >

              <option value="ALL">

                All Employees

              </option>

              {employees.map((emp)=>(
                <option
                  key={emp.id}
                  value={emp.id}
                >
                  {emp.name}
                </option>
              ))}

            </select>

          </div>

        </div>

      </div>

      {/* Summary */}

      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-white rounded-2xl border p-5">

          <p className="text-slate-500 text-sm">

            Total Leads

          </p>

          <h2 className="text-3xl font-bold mt-2">

            {filteredLeads.length}

          </h2>

        </div>

        <div className="bg-white rounded-2xl border p-5">

          <p className="text-slate-500 text-sm">

            New

          </p>

          <h2 className="text-3xl font-bold mt-2">

            {
              filteredLeads.filter(
                l=>l.stage==="NEW"
              ).length
            }

          </h2>

        </div>

        <div className="bg-white rounded-2xl border p-5">

          <p className="text-slate-500 text-sm">

            Followups

          </p>

          <h2 className="text-3xl font-bold mt-2">

            {
              filteredLeads.filter(
                l=>l.stage==="FOLLOWUP"
              ).length
            }

          </h2>

        </div>

        <div className="bg-white rounded-2xl border p-5">

          <p className="text-slate-500 text-sm">

            Confirmed

          </p>

          <h2 className="text-3xl font-bold mt-2 text-green-600">

            {
              filteredLeads.filter(
                l=>l.stage==="CONFIRMED"
              ).length
            }

          </h2>

        </div>

      </div>

      {/* Kanban */}

      <LeadKanbanBoard
        leads={filteredLeads}
      />

    </div>

  );

}