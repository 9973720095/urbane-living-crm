"use client";

import {
  Search,
  RefreshCw,
  SlidersHorizontal,
} from "lucide-react";

interface MeetingFiltersProps {
  search: string;
  setSearch: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  sortBy: string;
  setSortBy: (value: string) => void;

  onRefresh: () => void;
}

export default function MeetingFilters({
  search,
  setSearch,
  status,
  setStatus,
  sortBy,
  setSortBy,
  onRefresh,
}: MeetingFiltersProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-5">

      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

        {/* Left */}
        <div className="flex flex-col md:flex-row gap-4 flex-1">

          {/* Search */}
          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search customer, title, remarks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
            />

          </div>

          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-12 rounded-2xl border border-slate-300 px-4 bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="COMPLETED">Completed</option>
            <option value="REJECTED">Rejected</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-12 rounded-2xl border border-slate-300 px-4 bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none"
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
            <option value="customer">Customer Name</option>
            <option value="status">Status</option>
          </select>

        </div>

        {/* Right */}
        <div className="flex items-center gap-3">

          <button
            className="flex items-center gap-2 h-12 px-5 rounded-2xl border border-slate-300 hover:bg-slate-50 transition"
          >
            <SlidersHorizontal size={18} />

            More Filters
          </button>

          <button
            onClick={onRefresh}
            className="flex items-center gap-2 h-12 px-5 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-sm"
          >
            <RefreshCw size={18} />

            Refresh
          </button>

        </div>

      </div>

    </div>
  );
}