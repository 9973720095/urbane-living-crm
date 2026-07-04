"use client";

import { useEffect, useState } from "react";
import {
Clock3,
CheckCircle2,
XCircle,
BadgeCheck,
} from "lucide-react";

export default function TaskMonitoring() {
const [tasks, setTasks] = useState<any[]>([]);

useEffect(() => {
fetchTasks();

const interval = setInterval(() => {
  fetchTasks();
}, 10000);

return () => clearInterval(interval);

}, []);

const fetchTasks = async () => {
try {
const res = await fetch("/api/tasks/all");
const data = await res.json();

  if (data.success) {
    setTasks(data.data || []);
  }
} catch (error) {
  console.error(error);
}

};

const pending = tasks.filter(
(task) => task.status === "PENDING"
);

const accepted = tasks.filter(
(task) => task.status === "ACCEPTED"
);

const completed = tasks.filter(
(task) => task.status === "COMPLETED"
);

const rejected = tasks.filter(
(task) => task.status === "REJECTED"
);

const cards = [
{
title: "Pending",
value: pending.length,
icon: Clock3,
data: pending,
},
{
title: "Accepted",
value: accepted.length,
icon: BadgeCheck,
data: accepted,
},
{
title: "Completed",
value: completed.length,
icon: CheckCircle2,
data: completed,
},
{
title: "Rejected",
value: rejected.length,
icon: XCircle,
data: rejected,
},
];

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

return ( <div className="space-y-8">

  <div>
    <h1 className="text-3xl font-bold text-slate-800">
      Task Monitoring
    </h1>

    <p className="text-slate-500 mt-2">
      Real-time employee task tracking
    </p>
  </div>

  <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">

    {cards.map((card) => {
      const Icon = card.icon;

      return (
        <div
          key={card.title}
          className="bg-white border rounded-3xl shadow-sm p-6"
        >
          <div className="flex justify-between items-center mb-5">
            <div>
              <div className="text-slate-500 text-sm">
                {card.title}
              </div>

              <div className="text-4xl font-bold mt-2">
                {card.value}
              </div>
            </div>

            <Icon size={28} />
          </div>

          <div className="space-y-3">

            {card.data.length === 0 && (
              <div className="text-sm text-slate-400">
                No Tasks
              </div>
            )}

            {card.data.slice(0, 5).map((task: any) => (
              <div
                key={task.id}
                className="bg-slate-50 rounded-2xl p-3"
              >
                <div className="flex justify-between items-start">

                  <div>
                    <div className="font-semibold text-sm">
                      {task.employee?.name}
                    </div>

                    <div className="text-xs text-slate-500 mt-1">
                      {task.title}
                    </div>

                    <div className="text-xs text-slate-400 mt-1">
                      Lead : {task.lead?.customer_name}
                    </div>

                    <div className="text-xs text-slate-400 mt-1">
                      Type : {task.type}
                    </div>

                    <div className="text-xs text-slate-400 mt-1">
                      {new Date(
                        task.scheduledAt
                      ).toLocaleString()}
                    </div>
                  </div>

                  <span
                    className={`text-xs px-2 py-1 rounded-lg ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>

                </div>
              </div>
            ))}

          </div>
        </div>
      );
    })}

  </div>

  <div className="bg-white rounded-3xl border shadow-sm p-6">

    <h2 className="text-xl font-bold mb-5">
      Recent Assigned Tasks
    </h2>

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead>
          <tr className="border-b">
            <th className="text-left py-3">
              Employee
            </th>

            <th className="text-left py-3">
              Lead
            </th>

            <th className="text-left py-3">
              Task
            </th>

            <th className="text-left py-3">
              Type
            </th>

            <th className="text-left py-3">
              Status
            </th>
          </tr>
        </thead>

        <tbody>

          {tasks.map((task: any) => (
            <tr
              key={task.id}
              className="border-b"
            >
              <td className="py-4">
                {task.employee?.name}
              </td>

              <td className="py-4">
                {task.lead?.customer_name}
              </td>

              <td className="py-4">
                {task.title}
              </td>

              <td className="py-4">
                {task.type}
              </td>

              <td className="py-4">
                <span
                  className={`px-3 py-1 rounded-xl text-xs ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>

  </div>

</div>

);
}
