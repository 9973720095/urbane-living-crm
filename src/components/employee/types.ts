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

/* ------------------------------------------
   Employee Model
------------------------------------------- */

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

/* ------------------------------------------
   Drawer (Create / Edit)
------------------------------------------- */

export interface EmployeeDrawerFormData {
  name: string;

  email: string;

  whatsapp: string;

  designation?: string;
}

/* ------------------------------------------
   Complete Employee Form
------------------------------------------- */

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

/* ------------------------------------------
   API Responses
------------------------------------------- */

export interface ApiResponse {
  success: boolean;

  message?: string;
}

export interface EmployeeApiResponse extends ApiResponse {
  data: Employee[];
}

export interface SingleEmployeeResponse extends ApiResponse {
  data: Employee;
}

export interface EmployeeMutationResponse extends ApiResponse {
  data?: Employee;
}

/* ------------------------------------------
   Filters
------------------------------------------- */

export interface EmployeeFilter {
  search: string;

  role: string;

  department: string;

  status: string;
}