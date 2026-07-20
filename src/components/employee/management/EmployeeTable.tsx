"use client";

import {
  Eye,
  Pencil,
  Trash2,
  Phone,
  Mail,
  BadgeCheck,
  XCircle,
} from "lucide-react";

import { Employee } from "../types";
import { formatDate } from "../utils";

interface Props {
  employees: Employee[];
  loading?: boolean;

  onView: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export default function EmployeeTable({
  employees,
  loading = false,
  onView,
  onEdit,
  onDelete,
}: Props) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border shadow-sm p-12 text-center">

        <div className="animate-pulse">

          <div className="h-6 w-48 bg-slate-200 rounded mx-auto mb-5" />

          <div className="space-y-3">

            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="h-14 rounded-xl bg-slate-100"
              />
            ))}

          </div>

        </div>

      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="bg-white rounded-2xl border shadow-sm p-16 text-center">

        <img
          src="https://lh3.googleusercontent.com/ogw/AF2bZyg1PXqWTIk04PIZE2jlOLEjSCYLPfwPJnQbO-5wcl_Jlw=s32-c-mo"
          alt="No Employees"
          className="w-44 mx-auto mb-6"
        />

        <h2 className="text-xl font-bold">
          No Employees Found
        </h2>

        <p className="text-slate-500 mt-2">
          Employee list is empty.
        </p>

      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full">
            <thead className="bg-slate-50">
                <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                    Employee
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                    Contact
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                    Designation
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                    Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                    Joined
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold">
                    Actions
                </th>
                </tr>
            </thead>
            <tbody>
                {employees.map((employee) => (
                <tr
                    key={employee.id}
                    className="border-t hover:bg-slate-50 transition"
                >
                    {/* Employee */}
                    <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700">
                                {employee.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800">
                                    {employee.name}
                                </h3>
                                <p className="text-xs text-slate-500">
                                    ID : {employee.id.slice(-8)}
                                </p>
                            </div>
                        </div>
                    </td>
                    {/* Contact */}
                    <td className="px-6 py-5">

                    <div className="space-y-2">

                        <div className="flex items-center gap-2 text-sm">

                        <Mail size={15} />

                        {employee.email}

                        </div>

                        <div className="flex items-center gap-2 text-sm">

                        <Phone size={15} />

                        {employee.whatsapp}

                        </div>

                    </div>

                    </td>

                    {/* Designation */}

                    <td className="px-6 py-5">

                    <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium">

                        {employee.designation || "-"}

                    </span>

                    </td>

                    {/* Status */}

                    <td className="px-6 py-5">

                    {employee.isActive ? (

                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">

                        <BadgeCheck size={16} />

                        Active

                        </span>

                    ) : (

                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm">

                        <XCircle size={16} />

                        Inactive

                        </span>

                    )}

                    </td>

                    {/* Joined */}

                    <td className="px-6 py-5 text-sm text-slate-600">

                    {formatDate(employee.createdAt)}

                    </td>

                     <td className="px-6 py-5 text-center">

                        <div className="flex items-center justify-center gap-2">

                            {/* View */}

                            <button
                            onClick={() => onView(employee)}
                            className="
                                w-10
                                h-10
                                rounded-xl
                                bg-blue-50
                                hover:bg-blue-100
                                text-blue-600
                                transition
                            "
                            title="View Employee"
                            >
                            <Eye
                                size={18}
                                className="mx-auto"
                            />
                            </button>

                            {/* Edit */}

                            <button
                            onClick={() => onEdit(employee)}
                            className="
                                w-10
                                h-10
                                rounded-xl
                                bg-amber-50
                                hover:bg-amber-100
                                text-amber-600
                                transition
                            "
                            title="Edit Employee"
                            >
                            <Pencil
                                size={18}
                                className="mx-auto"
                            />
                            </button>

                            {/* Delete */}

                            <button
                            onClick={() => onDelete(employee)}
                            className="
                                w-10
                                h-10
                                rounded-xl
                                bg-red-50
                                hover:bg-red-100
                                text-red-600
                                transition
                            "
                            title="Delete Employee"
                            >
                            <Trash2
                                size={18}
                                className="mx-auto"
                            />
                            </button>

                        </div>

                    </td>
                </tr>

                ))}
          </tbody>
        </table>
      </div>
            {/* Mobile View */}
      <div className="lg:hidden divide-y">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="p-5"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-lg font-bold text-indigo-700">
                {employee.name.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">
                  {employee.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {employee.designation || "-"}
                </p>
              </div>

              {employee.isActive ? (
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                  Active
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                  Inactive
                </span>
              )}
            </div>

            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                {employee.email}
              </div>

              <div className="flex items-center gap-2">
                <Phone size={16} />
                {employee.whatsapp}
              </div>

              <div>
                <span className="font-medium">Joined:</span> {formatDate(employee.createdAt)}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-5">
              <button
                onClick={() => onView(employee)}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 transition"
              >
                <Eye size={16} />
                View
              </button>

              <button
                onClick={() => onEdit(employee)}
                className="flex items-center justify-center gap-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-600 py-2 transition"
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                onClick={() => onDelete(employee)}
                className="flex items-center justify-center gap-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 py-2 transition"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}