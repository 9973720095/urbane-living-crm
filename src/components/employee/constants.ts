import { EmployeeRole } from "./types";

export const EMPLOYEE_ROLES: EmployeeRole[] = [
  "ADMIN",

  "MANAGER",

  "DESIGN_MANAGER",

  "DESIGN_EMPLOYEE",

  "SALES_MANAGER",

  "SALES_EMPLOYEE",

  "HR",

  "EMPLOYEE",
];

export const DEPARTMENTS = [
  "Management",

  "Design",

  "Sales",

  "HR",

  "Marketing",

  "Support",

  "Accounts",

  "Operations",
];

export const STATUS_OPTIONS = [
  {
    label: "Active",
    value: "ACTIVE",
  },
  {
    label: "Inactive",
    value: "INACTIVE",
  },
];

export const STATUS = [
  "All",
  "Active",
  "Inactive",
];
export const DESIGNATIONS: string[] = [
  "Admin",
  "Manager",
  "Sales Manager",
  "Sales Executive",
  "HR",
  "Designer",
  "Designer Team Manager",
  "Employee",
];

export const DEFAULT_EMPLOYEE = {
  name: "",

  email: "",

  whatsapp: "",

  designation: "",

  department: "",

  role: "EMPLOYEE" as EmployeeRole,

  reportingManager: "",

  avatar: "",

  isActive: true,
};