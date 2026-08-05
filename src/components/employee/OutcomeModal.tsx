"use client";

import { useState, useEffect } from "react";
import { X, Save, MessageSquare, TrendingUp } from "lucide-react";
import type { Task } from "@/types/employee";

interface Props {
  open: boolean;
  task: Task | null;
  loading?: boolean;
  onClose: () => void;
  refresh: () => Promise<void>;
}

export default function OutcomeModal({
  open,
  task,
  loading = false,
  onClose,
  refresh,
}: Props) {
  const [remarks, setRemarks] = useState("");
  const [leadStage, setLeadStage] = useState("FOLLOWUP");
  const [nextFollowup, setNextFollowup] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) {
      setRemarks("");
      setLeadStage("FOLLOWUP");
      setNextFollowup("");
    }
  }, [open]);

  const handleSubmit = async () => {
    if (!task) return;

    try {
      setSaving(true);

      const res = await fetch(`/api/tasks/${task.id}/complete`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          remarks,
          leadStage,
          nextFollowup:
            leadStage === "FOLLOWUP"
              ? nextFollowup
              : undefined,
        }),
      });

      const data = await res.json();

      if (data.success) {
        await refresh();
        onClose();
      } else {
        alert(data.message || "Unable to save outcome");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl">

          <div className="flex items-center justify-between border-b p-6">

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Task Outcome
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Save Meeting / Call Result
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
            >
              <X size={18} />
            </button>

          </div>

          <div className="p-6 space-y-5">

            <div>

              <label className="text-sm font-semibold flex items-center gap-2 mb-2">
                <MessageSquare size={16} />
                Remarks
              </label>

              <textarea
                rows={5}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full rounded-2xl border p-4 resize-none"
                placeholder="Write meeting summary..."
              />

            </div>

            <div>

              <label className="text-sm font-semibold flex items-center gap-2 mb-2">
                <TrendingUp size={16} />
                Lead Stage
              </label>

              <select
                value={leadStage}
                onChange={(e) => setLeadStage(e.target.value)}
                className="w-full rounded-2xl border p-3"
              >
                <option value="FOLLOWUP">Follow Up</option>
                <option value="SITE_VISIT">Site Visit</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="REJECTED">Rejected</option>
              </select>

            </div>

            {leadStage === "FOLLOWUP" && (

              <div>

                <label className="text-sm font-semibold mb-2 block">
                  Next Followup
                </label>

                <input
                  type="datetime-local"
                  value={nextFollowup}
                  onChange={(e) =>
                    setNextFollowup(e.target.value)
                  }
                  className="w-full rounded-2xl border p-3"
                />

              </div>

            )}

          </div>

          <div className="border-t p-6 flex justify-end gap-3">

            <button
              onClick={onClose}
              className="px-5 py-3 rounded-2xl bg-slate-100"
            >
              Cancel
            </button>

            <button
              disabled={
                loading ||
                saving ||
                remarks.trim() === ""
              }
              onClick={handleSubmit}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 disabled:opacity-50"
            >
              <Save size={18} />
              {saving ? "Saving..." : "Save Outcome"}
            </button>

          </div>

        </div>

      </div>
    </>
  );
}