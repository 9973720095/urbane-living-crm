"use client";

import { useEffect, useMemo, useState } from "react";

import GalleryCard from "./GalleryCard";
import GalleryFilters from "./GalleryFilters";
import MediaPreview from "./MediaPreview";

import {
  LeadGalleryProps,
  LeadMedia,
  LeadMediaType,
} from "./types";

export default function LeadGallery({
  media,
  onDeleted,
}: LeadGalleryProps) {
  const [preview, setPreview] =
    useState<LeadMedia | null>(null);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    LeadMediaType | "ALL"
  >("ALL");

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  useEffect(() => {
    if (!preview) return;

    const oldOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (
      e: KeyboardEvent
    ) => {
      if (e.key === "Escape") {
        setPreview(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow =
        oldOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [preview]);

  const filteredMedia = useMemo(() => {
    return media.filter((item) => {
      const matchesType =
        filter === "ALL"
          ? true
          : item.type === filter;

      const keyword = search.trim().toLowerCase();

      const matchesSearch =
        keyword.length === 0
          ? true
          : item.fileName
              .toLowerCase()
              .includes(keyword) ||
            (item.caption ?? "")
              .toLowerCase()
              .includes(keyword);

      return matchesType && matchesSearch;
    });
  }, [media, filter, search]);

  const deleteMedia = async (
    id: string
  ): Promise<boolean> => {
    const ok = confirm(
      "Delete this media?"
    );

    if (!ok) return false;

    try {
      setDeletingId(id);

      const res = await fetch(
        "/api/lead-media",
        {
          method: "DELETE",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        }
      );

      if (!res.ok) {
        alert(
          "Failed to delete media."
        );
        return false;
      }

      const data = await res.json();

      if (!data.success) {
        alert(
          data.message ??
            "Delete failed."
        );
        return false;
      }

      await onDeleted?.();

      return true;
    } catch (err) {
      console.error(err);

      alert(
        "Something went wrong."
      );

      return false;
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white rounded-3xl border shadow-sm p-6">

      <GalleryFilters
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />

      {filteredMedia.length === 0 ? (
        <div className="py-16 text-center text-slate-500">
          No media found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {filteredMedia.map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
              deletingId={deletingId}
              onPreview={setPreview}
              onDelete={deleteMedia}
            />
          ))}

        </div>
      )}

      <MediaPreview
        open={!!preview}
        media={preview}
        deletingId={deletingId}
        onClose={() =>
          setPreview(null)
        }
        onDelete={deleteMedia}
      />
    </div>
  );
}