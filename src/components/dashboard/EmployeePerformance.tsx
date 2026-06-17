
"use client";

import {
  Trophy,
  PhoneCall,
  Handshake,
  Home,
  CheckCircle2,
  Users,
  UserPlus,
  RefreshCcw,
  FileText,
  XCircle,
  Activity,
} from "lucide-react";

interface Props {
  leads: any[];
}

export default function EmployeePerformance({
  leads = [],
}: Props) {
  const employeeMap: Record<string, any> = {};

  leads.forEach((lead) => {
    const name =
      lead.assignedTo?.name ||
      lead.assigned_to?.name ||
      lead.employee_name ||
      "Unassigned";

    if (!employeeMap[name]) {
      employeeMap[name] = {
        name,
        total: 0,
        newLeads: 0,
        calls: 0,
        followups: 0,
        meetings: 0,
        visits: 0,
        quotations: 0,
        deals: 0,
        rejected: 0,
      };
    }

    employeeMap[name].total++;

    switch (lead.stage) {
      case "NEW":
        employeeMap[name].newLeads++;
        break;

      case "CALL_SCHEDULED":
        employeeMap[name].calls++;
        break;

      case "FOLLOWUP":
        employeeMap[name].followups++;
        break;

      case "MEETING_FIXED":
        employeeMap[name].meetings++;
        break;

      case "SITE_VISIT":
        employeeMap[name].visits++;
        break;

      case "QUOTATION_SENT":
        employeeMap[name].quotations++;
        break;

      case "CONFIRMED":
        employeeMap[name].deals++;
        break;

      case "REJECTED":
        employeeMap[name].rejected++;
        break;
    }
  });

  const employees = Object.values(employeeMap)
    .map((emp: any) => ({
      ...emp,

      activeLeads:
        emp.total -
        emp.deals -
        emp.rejected,

      successRate:
        emp.total > 0
          ? Number(
              (
                (emp.deals / emp.total) *
                100
              ).toFixed(1)
            )
          : 0,
    }))
    .sort(
      (a: any, b: any) =>
        b.deals - a.deals
    );

  return (
    <div className="bg-white rounded-3xl border shadow-sm p-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-5 mb-8">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Employee Performance
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Dynamic Lead Handling Workflow
          </p>
        </div>

        <div className="bg-indigo-50 px-5 py-4 rounded-2xl">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Users size={16} />
            Employees
          </div>

          <div className="text-3xl font-bold text-indigo-600 mt-1">
            {employees.length}
          </div>
        </div>
      </div>

      <div className="space-y-6">

        {employees.map(
          (employee: any, index) => (
            <div
              key={employee.name}
              className="border rounded-3xl p-6 hover:bg-slate-50 transition"
            >

              {/* Top */}
              <div className="flex flex-col lg:flex-row justify-between gap-5 mb-6">

                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 text-xl">
                    {employee.name.charAt(0)}
                  </div>

                  <div>

                    <h3 className="font-bold text-slate-800 text-lg">
                      {employee.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      Assigned Leads : {employee.total}
                    </p>

                  </div>
                </div>

                {index === 0 && (
                  <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-2xl flex items-center gap-2 h-fit">
                    <Trophy size={16} />
                    Top Performer
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">

                <div className="bg-blue-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-blue-700">
                    <UserPlus size={16} />
                    New Leads
                  </div>

                  <div className="text-2xl font-bold mt-2">
                    {employee.newLeads}
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-yellow-700">
                    <PhoneCall size={16} />
                    Calls
                  </div>

                  <div className="text-2xl font-bold mt-2">
                    {employee.calls}
                  </div>
                </div>

                <div className="bg-orange-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-orange-700">
                    <RefreshCcw size={16} />
                    Followups
                  </div>

                  <div className="text-2xl font-bold mt-2">
                    {employee.followups}
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-indigo-700">
                    <Handshake size={16} />
                    Meetings
                  </div>

                  <div className="text-2xl font-bold mt-2">
                    {employee.meetings}
                  </div>
                </div>

                <div className="bg-purple-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-purple-700">
                    <Home size={16} />
                    Site Visits
                  </div>

                  <div className="text-2xl font-bold mt-2">
                    {employee.visits}
                  </div>
                </div>

                <div className="bg-cyan-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-cyan-700">
                    <FileText size={16} />
                    Quotations
                  </div>

                  <div className="text-2xl font-bold mt-2">
                    {employee.quotations}
                  </div>
                </div>

                <div className="bg-green-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle2 size={16} />
                    Deals Closed
                  </div>

                  <div className="text-2xl font-bold mt-2">
                    {employee.deals}
                  </div>
                </div>

                <div className="bg-red-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-red-700">
                    <XCircle size={16} />
                    Rejected
                  </div>

                  <div className="text-2xl font-bold mt-2">
                    {employee.rejected}
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <Activity size={16} />
                    Active Leads
                  </div>

                  <div className="text-2xl font-bold mt-2">
                    {employee.activeLeads}
                  </div>
                </div>

                <div className="bg-indigo-100 rounded-2xl p-4">

                  <div className="text-sm text-indigo-700">
                    Success Rate
                  </div>

                  <div className="text-2xl font-bold text-indigo-600 mt-2">
                    {employee.successRate}%
                  </div>

                </div>

              </div>

            </div>
          )
        )}

        {employees.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            No employee data available
          </div>
        )}

      </div>

    </div>
  );
}
