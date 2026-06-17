import { GoogleCalendarService } from "./googleCalendar.service";
import { TaskRepository } from "@/repositories/task.repository";

const calendar = new GoogleCalendarService();

export class TaskService {
  private taskRepository = new TaskRepository();

  // Create Task
  async createTask(data: any) {
    const task = await this.taskRepository.create(data);

    try {
      const event = await calendar.createEvent({
        title: `${task.type} - ${task.lead.customer_name}`,
        description: task.lead.phone_number,
        start: task.scheduledAt,
        end: new Date(task.scheduledAt.getTime() + 30 * 60000),
        email: task.employee.email,
      });

      await this.taskRepository.update(task.id, {
        googleEventId: event.id,
      });
    } catch (error) {
      console.error("Google Calendar Error:", error);
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

  // Accept
  async acceptTask(taskId: string) {
    return this.taskRepository.update(taskId, {
      status: "ACCEPTED",
      acceptedAt: new Date(),
    });
  }

  // Reject
  async rejectTask(taskId: string) {
    return this.taskRepository.update(taskId, {
      status: "REJECTED",
    });
  }

  // Complete
  async completeTask(taskId: string) {
    return this.taskRepository.update(taskId, {
      status: "COMPLETED",
      completedAt: new Date(),
    });
  }

  // Employee Tasks
  async getEmployeeTasks(employeeId: string) {
    return this.taskRepository.getEmployeeTasks(employeeId);
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