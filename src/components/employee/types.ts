export type EmployeeRole =
  | "ADMIN"
  | "MANAGER"
  | "DESIGN_MANAGER"
  | "DESIGN_EMPLOYEE"
  | "SALES_MANAGER"
  | "SALES_EMPLOYEE"
  | "HR"
  | "EMPLOYEE";

export type EmployeeStatus =
  | "ACTIVE"
  | "INACTIVE";

export interface Employee {
  id: string;

  name: string;

  email: string;

  whatsapp: string;

  designation?: string | null;

  role?: EmployeeRole;

  department?: string | null;

  reportingManager?: string | null;

  avatar?: string | null;

  isActive: boolean;

  createdAt: string;

  updatedAt: string;
}

export interface EmployeeFormData {
  name: string;

  email: string;

  whatsapp: string;

  designation: string;

  department: string;

  role: EmployeeRole;

  reportingManager?: string;

  avatar?: string;

  isActive: boolean;
}

export interface EmployeeApiResponse {
  success: boolean;

  message?: string;

  data: Employee[];
}

export interface SingleEmployeeResponse {
  success: boolean;

  message?: string;

  data: Employee;
}

export interface EmployeeFilter {
  search: string;

  role: string;

  department: string;

  status: string;
}