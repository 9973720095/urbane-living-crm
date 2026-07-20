import { Employee } from "./types";

export function formatDate(date: string) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function getInitials(name: string) {
  if (!name) return "";

  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

export function getRoleLabel(role?: string) {
  if (!role) return "-";

  return role
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getStatus(employee: Employee) {
  return employee.isActive
    ? "Active"
    : "Inactive";
}

export function sortEmployees(
  employees: Employee[]
) {
  return [...employees].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );
}

export function filterEmployees(
  employees: Employee[],
  search: string
) {
  if (!search.trim()) return employees;

  const keyword = search.toLowerCase();

  return employees.filter((employee) => {
    return (
      employee.name
        .toLowerCase()
        .includes(keyword) ||
      employee.email
        .toLowerCase()
        .includes(keyword) ||
      employee.whatsapp.includes(keyword) ||
      (employee.designation ?? "")
        .toLowerCase()
        .includes(keyword)
    );
  });
}