import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
try {
const tasks = await prisma.task.findMany({
include: {
employee: true,
lead: true,
},
orderBy: {
updatedAt: "desc",
},
});

const stats = {
  total: tasks.length,
  pending: tasks.filter(
    (task) => task.status === "PENDING"
  ).length,
  accepted: tasks.filter(
    (task) => task.status === "ACCEPTED"
  ).length,
  completed: tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length,
  rejected: tasks.filter(
    (task) => task.status === "REJECTED"
  ).length,
};

const recentActivity = tasks
  .slice(0, 20)
  .map((task) => ({
    id: task.id,
    title: task.title,
    status: task.status,
    employee: task.employee?.name,
    lead: task.lead?.customer_name,
    updatedAt: task.updatedAt,
  }));

return NextResponse.json({
  success: true,
  count: tasks.length,
  stats,
  recentActivity,
  data: tasks,
});

} catch (error) {
console.error(
"TASKS ALL API ERROR:",
error
);

return NextResponse.json(
  {
    success: false,
    message: "Failed to fetch tasks",
    stats: {
      total: 0,
      pending: 0,
      accepted: 0,
      completed: 0,
      rejected: 0,
    },
    recentActivity: [],
    data: [],
  },
  {
    status: 500,
  }
);

}
}
