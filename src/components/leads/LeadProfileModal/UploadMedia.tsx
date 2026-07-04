"use client";

import { useCallback, useRef, useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  Video,
  Music,
  FileText,
  X,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import { UploadMediaProps } from "./types";

const MAX_FILE_SIZE = 100 * 1024 * 1024; //100MB

const IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

const VIDEO_TYPES = [
  "video/mp4",
  "video/quicktime",
  "video/x-msvideo",
  "video/webm",
];

const AUDIO_TYPES = [
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/x-wav",
  "audio/ogg",
  "audio/mp4",
];

const DOCUMENT_TYPES = [
  "application/pdf",

  "application/msword",

  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  "application/vnd.ms-excel",

  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const ACCEPTED_TYPES = [
  ...IMAGE_TYPES,
  ...VIDEO_TYPES,
  ...AUDIO_TYPES,
  ...DOCUMENT_TYPES,
];

interface UploadFile {
  id: string;

  file: File;

  progress: number;

  status: "waiting" | "uploading" | "success" | "error";

  error?: string;
}

export default function UploadMedia({
  leadId,
  onUploaded,
}: UploadMediaProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragging, setDragging] = useState(false);

  const [files, setFiles] = useState<UploadFile[]>([]);

  const [uploading, setUploading] = useState(false);

  //------------------------------------------------
  // Validate File
  //------------------------------------------------

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Unsupported file type.";
    }

    if (file.size > MAX_FILE_SIZE) {
      return "Maximum file size is 100 MB.";
    }

    return null;
  };

  //------------------------------------------------
  // Get Icon
  //------------------------------------------------

  const getIcon = (type: string) => {
    if (IMAGE_TYPES.includes(type))
      return <ImageIcon className="w-5 h-5 text-blue-600" />;

    if (VIDEO_TYPES.includes(type))
      return <Video className="w-5 h-5 text-red-600" />;

    if (AUDIO_TYPES.includes(type))
      return <Music className="w-5 h-5 text-green-600" />;

    return <FileText className="w-5 h-5 text-slate-600" />;
  };

  //------------------------------------------------
  // Add Files
  //------------------------------------------------

  const addFiles = useCallback((selected: FileList | null) => {
    if (!selected) return;

    const newFiles: UploadFile[] = [];

    Array.from(selected).forEach((file) => {
      const error = validateFile(file);

      newFiles.push({
        id:
          crypto.randomUUID?.() ??
          `${Date.now()}-${Math.random()}`,

        file,

        progress: 0,

        status: error ? "error" : "waiting",

        error: error ?? undefined,
      });
    });

    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  //------------------------------------------------
  // Remove File
  //------------------------------------------------

  const removeFile = (id: string) => {
    setFiles((prev) =>
      prev.filter((f) => f.id !== id)
    );
  };
    //------------------------------------------------
  // Upload Single File
  //------------------------------------------------

  const uploadSingleFile = async (
    uploadFile: UploadFile
  ): Promise<boolean> => {
    try {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id
            ? {
                ...f,
                status: "uploading",
                progress: 10,
              }
            : f
        )
      );

      const formData = new FormData();

      formData.append("file", uploadFile.file);

      formData.append("leadId", leadId);

      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id
            ? {
                ...f,
                progress: 35,
              }
            : f
        )
      );

      const uploadResponse = await fetch(
        "/api/lead-media/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok || !uploadData.success) {
        throw new Error(
          uploadData.message ?? "Upload failed."
        );
      }

      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id
            ? {
                ...f,
                progress: 70,
              }
            : f
        )
      );

      //------------------------------------------------
      // Save into Prisma
      //------------------------------------------------

      const saveResponse = await fetch(
        "/api/lead-media",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            leadId,

            fileName: uploadFile.file.name,

            fileSize: uploadFile.file.size,

            fileUrl: uploadData.data.url,

            type: uploadData.data.resourceType,

            caption: "",
          }),
        }
      );

      const saveData = await saveResponse.json();

      if (!saveResponse.ok || !saveData.success) {
        throw new Error(
          saveData.message ?? "Database save failed."
        );
      }

      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id
            ? {
                ...f,
                progress: 100,
                status: "success",
              }
            : f
        )
      );

      return true;
    } catch (error: any) {
      console.error(error);

      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id
            ? {
                ...f,
                status: "error",
                error:
                  error.message ??
                  "Upload failed.",
              }
            : f
        )
      );

      return false;
    }
  };

  //------------------------------------------------
  // Upload All Files
  //------------------------------------------------

  const uploadAllFiles = async () => {
    const pendingFiles = files.filter(
      (f) => f.status === "waiting"
    );

    if (!pendingFiles.length) return;

    setUploading(true);

    try {
      await Promise.all(
        pendingFiles.map(uploadSingleFile)
      );

      await onUploaded?.();
    } finally {
      setUploading(false);
    }
  };
    //------------------------------------------------
  // Component UI
  //------------------------------------------------

  return (
    <div className="bg-white rounded-3xl border shadow-sm p-6">

      {/* Header */}

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Upload Media
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Images, Videos, Audio & Documents
        </p>
      </div>

      {/* Hidden Input */}

      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        accept={ACCEPTED_TYPES.join(",")}
        onChange={(e) => addFiles(e.target.files)}
      />

      {/* Drop Area */}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();

          setDragging(false);

          addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`
          border-2
          border-dashed
          rounded-2xl
          p-10
          text-center
          cursor-pointer
          transition

          ${
            dragging
              ? "border-blue-600 bg-blue-50"
              : "border-slate-300 hover:border-blue-500 hover:bg-slate-50"
          }
        `}
      >
        <Upload className="mx-auto w-14 h-14 text-blue-600 mb-5" />

        <h3 className="text-lg font-semibold">
          Drag & Drop files here
        </h3>

        <p className="text-slate-500 mt-2">
          or click to browse
        </p>

        <p className="text-xs text-slate-400 mt-4">
          Maximum file size 100 MB
        </p>
      </div>

      {/* Selected Files */}

      {files.length > 0 && (

        <div className="mt-8 space-y-4">

          {files.map((item) => (

            <div
              key={item.id}
              className="border rounded-xl p-4"
            >

              <div className="flex justify-between items-center">

                <div className="flex gap-3 items-center">

                  {getIcon(item.file.type)}

                  <div>

                    <p className="font-medium break-all">
                      {item.file.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {(item.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  {item.status === "uploading" && (
                    <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                  )}

                  {item.status === "success" && (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  )}

                  <button
                    onClick={() => removeFile(item.id)}
                    disabled={item.status === "uploading"}
                  >
                    <X className="w-5 h-5 text-red-600" />
                  </button>

                </div>

              </div>

              {/* Progress */}

              {(item.status === "uploading" ||
                item.status === "success") && (

                <div className="mt-3">

                  <div className="w-full h-2 rounded-full bg-slate-200">

                    <div
                      className="h-2 rounded-full bg-blue-600 transition-all"
                      style={{
                        width: `${item.progress}%`,
                      }}
                    />

                  </div>

                </div>

              )}

              {/* Error */}

              {item.error && (

                <p className="text-red-600 text-sm mt-3">

                  {item.error}

                </p>

              )}

            </div>

          ))}

          {/* Upload Button */}

          <button
            onClick={uploadAllFiles}
            disabled={uploading}
            className="
              w-full
              mt-4
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-3
              font-semibold
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {uploading
              ? "Uploading..."
              : "Upload Files"}
          </button>

        </div>

      )}

    </div>
  );
}