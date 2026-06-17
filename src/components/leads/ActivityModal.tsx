"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { LeadTimeline } from "./LeadTimeline";

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  activities: any[];
  customerName?: string;
}

export default function ActivityModal({
  isOpen,
  onClose,
  activities,
  customerName,
}: ActivityModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener(
        "keydown",
        handleEsc
      );
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6">

        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in duration-200">

          {/* Header */}
          <div className="sticky top-0 z-20 bg-white border-b px-6 py-5 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold text-slate-800">
                Activity Timeline
              </h2>

              <div className="flex items-center gap-3 mt-2">

                <p className="text-sm text-slate-500">
                  {customerName || "Lead"}
                </p>

                <div className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium">
                  {activities.length} Activities
                </div>

              </div>

            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-slate-100 transition flex items-center justify-center"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>

          </div>

          {/* Body */}
          <div className="max-h-[70vh] overflow-y-auto p-6 bg-slate-50">

            {activities.length > 0 ? (
              <LeadTimeline activities={activities} />
            ) : (
              <div className="flex flex-col items-center justify-center py-20">

                <div className="text-6xl mb-4">
                  📋
                </div>

                <h3 className="text-lg font-semibold text-slate-700">
                  No Activity Found
                </h3>

                <p className="text-sm text-slate-400 mt-2">
                  No history available for this lead.
                </p>

              </div>
            )}

          </div>

          {/* Footer */}
          <div className="border-t bg-white px-6 py-4 flex justify-between items-center">

            <div className="text-xs text-slate-400">
              CRM Activity History
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-900 text-white hover:bg-black transition"
            >
              Close
            </button>

          </div>

        </div>

      </div>
    </>
  );
}