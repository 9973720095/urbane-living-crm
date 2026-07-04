"use client";

import Image from "next/image";
import {
  Download,
  Trash2,
  X,
  Music,
  FileText,
} from "lucide-react";

import { MediaPreviewProps } from "./types";
import { formatDate } from "./utils";

export default function MediaPreview({
  media,
  open,
  deletingId,
  onClose,
  onDelete,
}: MediaPreviewProps) {
  if (!open || !media) return null;

  const isDeleting = deletingId === media.id;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Media Preview"
    >
      <div className="relative bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-auto shadow-2xl">

        {/* Close Button */}

        <button
          onClick={onClose}
          aria-label="Close Preview"
          className="absolute top-5 right-5 z-50 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-slate-100"
        >
          <X size={22} />
        </button>

        <div className="p-6">

          {/* Heading */}

          <h2 className="text-2xl font-bold mb-6 break-all">
            {media.fileName}
          </h2>

          {/* ==============================
               PHOTO
          ============================== */}

          {media.type === "PHOTO" && (
            <Image
              src={media.fileUrl}
              alt={media.fileName}
              width={1200}
              height={900}
              sizes="100vw"
              unoptimized
              className="w-full max-h-[75vh] object-contain rounded-2xl"
            />
          )}

          {/* ==============================
               VIDEO
          ============================== */}

          {media.type === "VIDEO" && (
            <video
              src={media.fileUrl}
              controls
              className="w-full rounded-2xl max-h-[75vh]"
            />
          )}

          {/* ==============================
               AUDIO
          ============================== */}

          {media.type === "AUDIO" && (
            <div className="py-16 flex flex-col items-center">

              <Music
                size={72}
                className="text-green-600 mb-6"
              />

              <audio
                controls
                src={media.fileUrl}
                className="w-full max-w-xl"
              />
            </div>
          )}

          {/* ==============================
               DOCUMENT
          ============================== */}

          {media.type === "DOCUMENT" && (
            <div className="py-16 flex flex-col items-center">

              <FileText
                size={80}
                className="text-blue-600"
              />

              <p className="mt-5 text-slate-500">
                Document Preview
              </p>

              <a
                href={media.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
              >
                Open Document
              </a>
            </div>
          )}

          {/* ===========================================
              Metadata
          =========================================== */}

          <div className="mt-8 border-t pt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div className="space-y-2">

              <p className="text-sm text-slate-500">
                Uploaded {formatDate(media.createdAt)}
              </p>

              {media.caption && (
                <p className="text-slate-700">
                  {media.caption}
                </p>
              )}

            </div>

            {/* =======================================
                Actions
            ======================================= */}

            <div className="flex flex-wrap gap-3">

              <a
                href={media.fileUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition"
              >
                <Download size={18} />

                Download
              </a>

              <button
                type="button"
                disabled={isDeleting}
                onClick={async () => {
                  const deleted = await onDelete(media.id);

                  if (deleted) {
                    onClose();
                  }
                }}
                className="
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  px-5
                  py-3
                  rounded-xl
                  flex
                  items-center
                  gap-2
                  transition
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {isDeleting ? (
                  <>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={18} />

                    Delete
                  </>
                )}
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}