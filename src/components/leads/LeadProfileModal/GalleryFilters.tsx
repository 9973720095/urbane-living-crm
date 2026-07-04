"use client";

import { Search, Image, Video, Music, FileText } from "lucide-react";
import { GalleryFiltersProps } from "./types";

export default function GalleryFilters({
  search,
  setSearch,
  filter,
  setFilter,
}: GalleryFiltersProps) {
  const filters = [
    {
      label: "All",
      value: "ALL",
      icon: null,
    },
    {
      label: "Photos",
      value: "PHOTO",
      icon: <Image size={16} />,
    },
    {
      label: "Videos",
      value: "VIDEO",
      icon: <Video size={16} />,
    },
    {
      label: "Audio",
      value: "AUDIO",
      icon: <Music size={16} />,
    },
    {
      label: "Documents",
      value: "DOCUMENT",
      icon: <FileText size={16} />,
    },
  ] as const;

  return (
    <div className="mb-6 space-y-5">
      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Customer Media
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Photos, Videos, Audio & Documents
          </p>
        </div>

        {/* Search */}

        <div className="relative w-full lg:w-80">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search media..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              pl-10
              pr-4
              py-2.5
              outline-none
              transition
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-200
            "
          />
        </div>
      </div>

      {/* Filters */}

      <div className="flex flex-wrap gap-3">
        {filters.map((item) => {
          const active = filter === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() =>
                setFilter(item.value)
              }
              className={`
                flex
                items-center
                gap-2
                rounded-xl
                px-4
                py-2.5
                text-sm
                font-medium
                transition-all

                ${
                  active
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }
              `}
            >
              {item.icon}

              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}