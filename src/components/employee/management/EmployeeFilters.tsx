"use client";

import { RotateCcw } from "lucide-react";

import {
  DESIGNATIONS,
  STATUS,
} from "../constants";

export interface EmployeeFiltersState {
  designation: string;
  status: string;
}

interface EmployeeFiltersProps {
  filters: EmployeeFiltersState;

  onChange: (
    key: keyof EmployeeFiltersState,
    value: string
  ) => void;

  onReset: () => void;
}

export default function EmployeeFilters({
  filters,
  onChange,
  onReset,
}: EmployeeFiltersProps) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-5">

      <div className="flex flex-col lg:flex-row lg:items-end gap-5">

        {/* Designation */}

        <div className="flex-1">

          <label
            htmlFor="designation"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Designation
          </label>

          <select
            id="designation"
            value={filters.designation}
            onChange={(e) =>
              onChange(
                "designation",
                e.target.value
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              transition
              focus:ring-2
              focus:ring-indigo-500
              focus:border-indigo-500
            "
          >
            {DESIGNATIONS.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

        </div>

        {/* Status */}

        <div className="flex-1">

          <label
            htmlFor="status"
            className="block text-sm font-medium text-slate-600 mb-2"
          >
            Status
          </label>

          <select
            id="status"
            value={filters.status}
            onChange={(e) =>
              onChange(
                "status",
                e.target.value
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              transition
              focus:ring-2
              focus:ring-indigo-500
              focus:border-indigo-500
            "
          >
            {STATUS.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

        </div>

        {/* Reset */}

        <div>

          <button
            type="button"
            onClick={onReset}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-300
              px-5
              py-3
              hover:bg-slate-100
              transition
            "
          >
            <RotateCcw size={18} />

            Reset Filters

          </button>

        </div>

      </div>

    </div>
  );
}