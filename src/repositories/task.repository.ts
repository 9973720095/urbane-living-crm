import { prisma } from "@/lib/prisma";

export class TaskRepository {
  async create(data: any) {
    return prisma.task.create({
      data,
      include: {
        lead: true,
        employee: true,
      },
    });
  }

  async update(id: string, data: any) {
    return prisma.task.update({
      where: { id },
      data,
    });
  }

  async getById(id: string) {
    return prisma.task.findUnique({
      where: { id },
      include: {
        lead: true,
        employee: true,
      },
    });
  }

  async getEmployeeTasks(employeeId: string) {
    return prisma.task.findMany({
      where: {
        employeeId,
      },
      include: {
        lead: true,
        employee: true,
      },
      orderBy: {
        scheduledAt: "asc",
      },
    });
  }

  async getTodayTasks() {
    const today = new Date();

    const start = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const end = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    return prisma.task.findMany({
      where: {
        scheduledAt: {
          gte: start,
          lt: end,
        },
      },
      include: {
        lead: true,
        employee: true,
      },
      orderBy: {
        scheduledAt: "asc",
      },
    });
  }

  async getOverdueTasks() {
    return prisma.task.findMany({
      where: {
        scheduledAt: {
          lt: new Date(),
        },
        status: {
          not: "COMPLETED",
        },
      },
      include: {
        lead: true,
        employee: true,
      },
    });
  }

  async getPendingTasks() {
    return prisma.task.findMany({
      where: {
        status: "PENDING",
      },
      include: {
        lead: true,
        employee: true,
      },
    });
  }

  async count() {
    return prisma.task.count();
  }
}