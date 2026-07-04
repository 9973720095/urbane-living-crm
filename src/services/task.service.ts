import { GoogleCalendarService } from "./googleCalendar.service";
import { TaskRepository } from "@/repositories/task.repository";
import { prisma } from "@/lib/prisma";

const calendar = new GoogleCalendarService();

export class TaskService {
  private taskRepository = new TaskRepository();

  // Create Task
  async createTask(data: any) {
    const task = await this.taskRepository.create({
      ...data,
      scheduledAt: new Date(data.scheduledAt),
    });

    try {
      const event = await calendar.createEvent({
        title: `${task.type} - ${task.lead.customer_name}`,
        description: task.lead.phone_number,
        start: task.scheduledAt,
        end: new Date(
          task.scheduledAt.getTime() + 30 * 60000
        ),
        email: task.employee.email,
      });

      await this.taskRepository.update(task.id, {
        googleEventId: event.id,
      });
    } catch (error) {
      console.error(
        "Google Calendar Error:",
        error
      );
    }

    return task;
  }

  // Single Task
  async getTaskById(id: string) {
    return this.taskRepository.getById(id);
  }

  // Update Status
  async updateTaskStatus(
    taskId: string,
    status: string
  ) {
    return this.taskRepository.update(taskId, {
      status,
    });
  }

  // Accept Task
  async acceptTask(taskId: string) {
    const task =
      await this.taskRepository.update(taskId, {
        status: "ACCEPTED",
        acceptedAt: new Date(),
      });

    try {
      await prisma.notification.create({
        data: {
          title: "Task Accepted",
          message: `${task.title} accepted by employee`,
          type: "SUCCESS",
          employeeId: task.employeeId,
        },
      });
    } catch (error) {
      console.error(
        "Notification Error:",
        error
      );
    }

    return task;
  }

  // Reject Task
  async rejectTask(taskId: string) {
    const task =
      await this.taskRepository.update(taskId, {
        status: "REJECTED",
      });

    try {
      await prisma.notification.create({
        data: {
          title: "Task Rejected",
          message: `${task.title} rejected by employee`,
          type: "ERROR",
          employeeId: task.employeeId,
        },
      });
    } catch (error) {
      console.error(
        "Notification Error:",
        error
      );
    }

    return task;
  }

  // Complete Task
  async completeTask(taskId: string) {
    const task =
      await this.taskRepository.update(taskId, {
        status: "COMPLETED",
        completedAt: new Date(),
      });

    try {
      await prisma.notification.create({
        data: {
          title: "Task Completed",
          message: `${task.title} completed successfully`,
          type: "SUCCESS",
          employeeId: task.employeeId,
        },
      });
    } catch (error) {
      console.error(
        "Notification Error:",
        error
      );
    }

    return task;
  }

  // Employee Tasks
  async getEmployeeTasks(employeeId: string) {
    return this.taskRepository.getEmployeeTasks(
      employeeId
    );
  }

  // Today's Tasks
  async getTodayTasks() {
    return this.taskRepository.getTodayTasks();
  }

  // Overdue Tasks
  async getOverdueTasks() {
    return this.taskRepository.getOverdueTasks();
  }

  // Pending Tasks
  async getPendingTasks() {
    return this.taskRepository.getPendingTasks();
  }

  // Dashboard Stats
  async getDashboardStats() {
    const [
      totalTasks,
      todayTasks,
      overdueTasks,
      pendingTasks,
    ] = await Promise.all([
      this.taskRepository.count(),
      this.taskRepository.getTodayTasks(),
      this.taskRepository.getOverdueTasks(),
      this.taskRepository.getPendingTasks(),
    ]);

    return {
      total: totalTasks,
      today: todayTasks.length,
      overdue: overdueTasks.length,
      pending: pendingTasks.length,
    };
  }

  // Reschedule
  async rescheduleTask(
    taskId: string,
    scheduledAt: Date
  ) {
    return this.taskRepository.update(taskId, {
      scheduledAt,
      status: "PENDING",
    });
  }
}