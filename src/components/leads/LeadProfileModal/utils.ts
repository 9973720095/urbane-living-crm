import { createElement } from "react";
import {
  Image as ImageIcon,
  Video,
  Music,
  FileText,
} from "lucide-react";
import { LeadMediaType } from "./types";

/**
 * Format Date
 */
export function formatDate(date: string | Date) {
  return new Date(date).toLocaleString();
}

/**
 * Format File Size
 */
export function formatFileSize(bytes?: number | null) {
  if (!bytes || bytes <= 0) return "-";

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * Get Media Icon
 */
export function getMediaIcon(type: LeadMediaType, size = 18) {
  switch (type) {
    case "PHOTO":
      return createElement(ImageIcon, { size, className: "text-blue-600" });

    case "VIDEO":
      return createElement(Video, { size, className: "text-red-600" });

    case "AUDIO":
      return createElement(Music, { size, className: "text-green-600" });

    default:
      return createElement(FileText, { size, className: "text-slate-600" });
  }
}

/**
 * Get Badge Color
 */
export function getMediaColor(type: LeadMediaType) {
  switch (type) {
    case "PHOTO":
      return "bg-blue-100 text-blue-700";

    case "VIDEO":
      return "bg-red-100 text-red-700";

    case "AUDIO":
      return "bg-green-100 text-green-700";

    case "DOCUMENT":
      return "bg-slate-100 text-slate-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

/**
 * Type Helpers
 */
export const isImage = (type: LeadMediaType) => type === "PHOTO";

export const isVideo = (type: LeadMediaType) => type === "VIDEO";

export const isAudio = (type: LeadMediaType) => type === "AUDIO";

export const isDocument = (type: LeadMediaType) =>
  type === "DOCUMENT";

/**
 * File Extension
 */
export function getFileExtension(fileName: string) {
  const index = fileName.lastIndexOf(".");

  if (index === -1) return "";

  return fileName.substring(index + 1).toUpperCase();
}

/**
 * Short File Name
 */
export function truncateFileName(
  fileName: string,
  maxLength = 30
) {
  if (fileName.length <= maxLength) {
    return fileName;
  }

  const extension = fileName.split(".").pop();

  return (
    fileName.substring(0, maxLength) +
    "..." +
    (extension ? "." + extension : "")
  );
}