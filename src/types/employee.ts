export interface Lead {
  id?: string;

  customer_name?: string;
  phone_number?: string;
  email?: string;
  city?: string;
  state?: string;
  address?: string;
}

export type TaskStatus =
  | "PENDING"
  | "ACCEPTED"
  | "COMPLETED"
  | "REJECTED"
  | "OVERDUE";

export type TaskType =
  | "CALL"
  | "FOLLOWUP"
  | "MEETING"
  | "SITE_VISIT";

export interface Task {
  id: string;

  title: string;

  description?: string;

  type: TaskType;

  status: TaskStatus;

  scheduledAt?: string;

  lead?: Lead;

  assignedToId?: string;

  createdAt?: string;

  updatedAt?: string;
}