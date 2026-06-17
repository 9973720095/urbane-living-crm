"use client";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  stage: string;
  setStage: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;
}

export default function FilterBar({
  search,
  setSearch,
  stage,
  setStage,
  sort,
  setSort,
}: Props) {
  const resetFilters = () => {
    setSearch("");
    setStage("ALL");
    setSort("LATEST");
  };

  return (
    <div className="bg-white border rounded-2xl shadow-sm p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* Search */}
        <div>
          <label className="text-sm font-medium text-slate-600">
            Search
          </label>

          <input
            type="text"
            placeholder="Name, phone or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-2 w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Stage Filter */}
        <div>
          <label className="text-sm font-medium text-slate-600">
            Stage
          </label>

          <select
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            className="mt-2 w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="ALL">All Stages</option>
            <option value="NEW">New</option>
            <option value="CALL_SCHEDULED">Call Scheduled</option>
            <option value="FOLLOWUP">Follow Up</option>
            <option value="MEETING_FIXED">Meeting Fixed</option>
            <option value="SITE_VISIT">Site Visit</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="text-sm font-medium text-slate-600">
            Sort
          </label>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="mt-2 w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="LATEST">Latest First</option>
            <option value="OLDEST">Oldest First</option>
            <option value="A_Z">Name A-Z</option>
            <option value="Z_A">Name Z-A</option>
          </select>
        </div>

        {/* Reset */}
        <div className="flex items-end">
          <button
            onClick={resetFilters}
            className="w-full bg-slate-900 text-white rounded-xl py-2 hover:bg-slate-800 transition"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}