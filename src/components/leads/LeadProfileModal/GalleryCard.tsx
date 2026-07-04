"use client";

import Image from "next/image";
import {
  Image as ImageIcon,
  Video,
  Music,
  FileText,
  Download,
  Trash2,
} from "lucide-react";

import { GalleryCardProps } from "./types";
import { formatDate, formatFileSize } from "./utils";

export default function GalleryCard({
  item,
  deletingId,
  onPreview,
  onDelete,
}: GalleryCardProps) {
  const isDeleting = deletingId === item.id;

  const renderIcon = () => {
    switch (item.type) {
      case "PHOTO":
        return (
          <Image
            src={item.fileUrl}
            alt={item.fileName}
            width={48}
            height={48}
            sizes="48px"
            unoptimized
            className="w-12 h-12 rounded-xl object-cover border"
          />
        );

      case "VIDEO":
        return (
          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
            <Video size={22} className="text-red-600" />
          </div>
        );

      case "AUDIO":
        return (
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
            <Music size={22} className="text-green-600" />
          </div>
        );

      default:
        return (
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <FileText size={22} className="text-blue-600" />
          </div>
        );
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Preview ${item.fileName}`}
      onClick={() => onPreview(item)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPreview(item);
        }
      }}
      className="
        bg-white
        border
        rounded-2xl
        p-4
        hover:shadow-lg
        hover:border-blue-300
        transition-all
        cursor-pointer
      "
    >
      <div className="flex items-start gap-3">
        {renderIcon()}

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">
            {item.fileName}
          </h3>

          <p className="text-xs text-slate-500 mt-1">
            {formatDate(item.createdAt)}
          </p>

          {item.fileSize ? (
            <p className="text-xs text-slate-400 mt-1">
              {formatFileSize(item.fileSize)}
            </p>
          ) : null}
        </div>
      </div>

      {item.caption ? (
        <p className="text-sm text-slate-600 mt-4 line-clamp-2">
          {item.caption}
        </p>
      ) : null}

      <div className="flex gap-2 mt-5">
        <a
          href={item.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          download
          onClick={(e) => e.stopPropagation()}
          className="
            flex-1
            bg-blue-600
            hover:bg-blue-700
            text-white
            rounded-xl
            py-2.5
            flex
            items-center
            justify-center
            gap-2
            transition
          "
        >
          <Download size={16} />
          Download
        </a>

        <button
          type="button"
          disabled={isDeleting}
          onClick={async (e) => {
            e.stopPropagation();
            await onDelete(item.id);
          }}
          className="
            w-11
            h-11
            rounded-xl
            bg-red-100
            hover:bg-red-200
            flex
            items-center
            justify-center
            transition
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          <Trash2
            size={18}
            className={`text-red-600 ${
              isDeleting ? "animate-pulse" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}