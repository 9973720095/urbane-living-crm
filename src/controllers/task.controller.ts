import { TaskService } from "@/services/task.service";

export class TaskController {
  private taskService = new TaskService();

  // Create Task
  async createTask(data: any) {
    return this.taskService.createTask(data);
  }

  // Single Task
  async getTaskById(id: string) {
    return this.taskService.getTaskById(id);
  }

  // Update Status
  async updateTaskStatus(taskId: string, status: any) {
    return this.taskService.updateTaskStatus(taskId, status);
  }

  // Accept Task
  async acceptTask(taskId: string) {
    return this.taskService.acceptTask(taskId);
  }

  // Reject Task
  async rejectTask(taskId: string) {
    return this.taskService.rejectTask(taskId);
  }

  // Complete Task
  async completeTask(taskId: string) {
    return this.taskService.completeTask(taskId);
  }

  // Employee Tasks
  async getEmployeeTasks(employeeId: string) {
    return this.taskService.getEmployeeTasks(employeeId);
  }

  // Today's Tasks
  async getTodayTasks() {
    return this.taskService.getTodayTasks();
  }

  // Overdue Tasks
  async getOverdueTasks() {
    return this.taskService.getOverdueTasks();
  }

  // Pending Tasks
  async getPendingTasks() {
    return this.taskService.getPendingTasks();
  }

  // Dashboard Stats
  async getDashboardStats() {
    return this.taskService.getDashboardStats();
  }

  // Reschedule
  async rescheduleTask(
    taskId: string,
    scheduledAt: Date
  ) {
    return this.taskService.rescheduleTask(
      taskId,
      scheduledAt
    );
  }
}