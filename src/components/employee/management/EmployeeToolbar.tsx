"use client";

import {
  Plus,
  RefreshCw,
  Search,
  Users,
} from "lucide-react";

interface EmployeeToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  totalEmployees: number;

  loading?: boolean;

  onRefresh: () => void;

  onAddEmployee: () => void;
}

export default function EmployeeToolbar({
  search,
  onSearchChange,
  totalEmployees,
  loading = false,
  onRefresh,
  onAddEmployee,
}: EmployeeToolbarProps) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-5">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        {/* Left */}

        <div>

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center">

              <Users
                size={24}
                className="text-indigo-600"
              />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-slate-800">
                Employee Management
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Total Employees :{" "}
                <span className="font-semibold text-slate-700">
                  {totalEmployees}
                </span>
              </p>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-col md:flex-row gap-3">

          {/* Search */}

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                onSearchChange(e.target.value)
              }
              placeholder="Search employee..."
              className="
                w-full
                md:w-72
                rounded-xl
                border
                pl-11
                pr-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-indigo-500
                transition
              "
            />

          </div>

          {/* Refresh */}

          <button
            onClick={onRefresh}
            disabled={loading}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              px-5
              py-3
              hover:bg-slate-50
              transition
              disabled:opacity-50
            "
          >

            <RefreshCw
              size={18}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh

          </button>

          {/* Add */}

          <button
            onClick={onAddEmployee}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              px-5
              py-3
              transition
            "
          >

            <Plus size={18} />

            Add Employee

          </button>

        </div>

      </div>

    </div>
  );
}