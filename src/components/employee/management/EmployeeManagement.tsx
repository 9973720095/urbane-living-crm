"use client";

import { useEffect, useMemo, useState } from "react";

import EmployeeToolbar from "./EmployeeToolbar";
import EmployeeFilters, {
  EmployeeFiltersState,
} from "./EmployeeFilters";
import EmployeeTable from "./EmployeeTable";
import EmployeeDrawer from "./EmployeeDrawer";
import EmployeeDetailsDrawer from "./EmployeeDetailsDrawer";
import EmployeeDeleteDialog from "./EmployeeDeleteDialog";

import {
  DEFAULT_EMPLOYEE,
} from "../constants";

import {
  Employee,
  EmployeeDrawerFormData,
} from "../types";

export default function EmployeeManagement() {

  /* -----------------------------
      States
  ------------------------------ */

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [employees, setEmployees] =
    useState<Employee[]>([]);

  const [search, setSearch] =
    useState("");

  const [filters, setFilters] =
    useState<EmployeeFiltersState>({
      designation: "All",
      status: "All",
    });

  /* -----------------------------
      Drawers
  ------------------------------ */

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  /* -----------------------------
      Selected Employee
  ------------------------------ */

  const [
    selectedEmployee,
    setSelectedEmployee,
  ] = useState<Employee | null>(
    null
  );

  /* -----------------------------
      Load Employees
  ------------------------------ */

  const loadEmployees =
    async () => {
      try {
        setLoading(true);

        const response =
          await fetch(
            "/api/employees"
          );

        const result =
          await response.json();

        if (result.success) {
          setEmployees(result.data);
        }
      } catch (error) {
        console.error(
          "Employee Load Error",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadEmployees();
  }, []);

  /* -----------------------------
      Search + Filters
  ------------------------------ */

  const filteredEmployees =
    useMemo(() => {
      return employees.filter(
        (employee) => {
          const matchesSearch =
            employee.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            employee.email
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            employee.whatsapp.includes(
              search
            );

          const matchesDesignation =
            filters.designation ===
              "All" ||
            employee.designation ===
              filters.designation;

          const matchesStatus =
            filters.status ===
              "All" ||
            (filters.status ===
              "Active" &&
              employee.isActive) ||
            (filters.status ===
              "Inactive" &&
              !employee.isActive);

          return (
            matchesSearch &&
            matchesDesignation &&
            matchesStatus
          );
        }
      );
    }, [
      employees,
      search,
      filters,
    ]);
      /* -----------------------------
      Toolbar Actions
  ------------------------------ */

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setDrawerOpen(true);
  };

  const handleViewEmployee = (
    employee: Employee
  ) => {
    setSelectedEmployee(employee);
    setDetailsOpen(true);
  };

  const handleEditEmployee = (
    employee: Employee
  ) => {
    setSelectedEmployee(employee);
    setDrawerOpen(true);
  };

  const handleDeleteClick = (
    employee: Employee
  ) => {
    setSelectedEmployee(employee);
    setDeleteOpen(true);
  };

  /* -----------------------------
      Drawer Close
  ------------------------------ */

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedEmployee(null);
  };

  const closeDetails = () => {
    setDetailsOpen(false);
    setSelectedEmployee(null);
  };

  const closeDelete = () => {
    setDeleteOpen(false);
    setSelectedEmployee(null);
  };

  /* -----------------------------
      Reset Filters
  ------------------------------ */

  const resetFilters = () => {
    setSearch("");

    setFilters({
      designation: "All",
      status: "All",
    });
  };

  /* -----------------------------
      Create / Update Employee
  ------------------------------ */

  const handleSubmit = async (
  values: EmployeeDrawerFormData
) => {
    try {
      setSaving(true);

      const isEdit =
        !!selectedEmployee;

      const response =
        await fetch(
          isEdit
            ? `/api/employees/${selectedEmployee.id}`
            : "/api/employees",
          {
            method: isEdit
              ? "PUT"
              : "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              values
            ),
          }
        );

      const result =
        await response.json();

      if (!result.success) {
        alert(
          result.message ??
            "Something went wrong."
        );
        return;
      }

      await loadEmployees();

      closeDrawer();
    } catch (error) {
      console.error(
        "Employee Save Error",
        error
      );

      alert(
        "Unable to save employee."
      );
    } finally {
      setSaving(false);
    }
  };

  /* -----------------------------
      Delete Employee
  ------------------------------ */

  const confirmDelete =
    async () => {
      if (!selectedEmployee)
        return;

      try {
        setSaving(true);

        const response =
          await fetch(
            `/api/employees/${selectedEmployee.id}`,
            {
              method: "DELETE",
            }
          );

        const result =
          await response.json();

        if (!result.success) {
          alert(
            result.message ??
              "Unable to delete employee."
          );
          return;
        }

        await loadEmployees();

        closeDelete();
      } catch (error) {
        console.error(
          "Delete Employee Error",
          error
        );

        alert(
          "Unable to delete employee."
        );
      } finally {
        setSaving(false);
      }
    };
      /* -----------------------------
      UI
  ------------------------------ */

  return (
    <div className="space-y-6">

      {/* Toolbar */}

      <EmployeeToolbar
  search={search}
  onSearchChange={setSearch}
  totalEmployees={filteredEmployees.length}
  loading={loading}
  onRefresh={loadEmployees}
  onAddEmployee={handleAddEmployee}
/>
      {/* Filters */}

      <EmployeeFilters
        filters={filters}
        onChange={(key, value) =>
          setFilters((prev) => ({
            ...prev,
            [key]: value,
          }))
        }
        onReset={resetFilters}
      />

      {/* Table */}

      <EmployeeTable
        employees={filteredEmployees}
        loading={loading}
        onView={handleViewEmployee}
        onEdit={handleEditEmployee}
        onDelete={handleDeleteClick}
      />

      {/* Add / Edit Drawer */}

      <EmployeeDrawer
        open={drawerOpen}
        loading={saving}
        employee={selectedEmployee}
        onClose={closeDrawer}
        onSubmit={handleSubmit}
      />

      {/* Employee Details */}

      <EmployeeDetailsDrawer
        open={detailsOpen}
        employee={selectedEmployee}
        onClose={closeDetails}
      />

      {/* Delete Dialog */}

      <EmployeeDeleteDialog
        open={deleteOpen}
        loading={saving}
        employee={selectedEmployee}
        onCancel={closeDelete}
        onConfirm={confirmDelete}
      />

    </div>
  );
}