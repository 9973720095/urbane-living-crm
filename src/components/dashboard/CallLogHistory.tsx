"use client";

import { PhoneIncoming, PhoneOutgoing, PhoneMissed, Play, Clock, User } from "lucide-react";

interface CallRecordingItem {
  id: string;
  phoneNumber: string;
  direction: "INCOMING" | "OUTGOING" | "MISSED" | "REJECTED";
  duration: number;
  recordingUrl?: string | null;
  createdAt: string | Date;
  employee?: {
    name: string;
  } | null;
}

interface CallLogHistoryProps {
  callRecordings?: CallRecordingItem[];
}

export default function CallLogHistory({ callRecordings = [] }: CallLogHistoryProps) {
  // Duration Format Helper (Seconds -> 02m 15s)
  const formatDuration = (seconds: number) => {
    if (!seconds || seconds === 0) return "0s";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  // Call Direction Icon & Badge Styling
  const getDirectionBadge = (direction: string) => {
    switch (direction) {
      case "INCOMING":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <PhoneIncoming size={12} className="text-emerald-600" />
            Incoming
          </span>
        );
      case "OUTGOING":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
            <PhoneOutgoing size={12} className="text-blue-600" />
            Outgoing
          </span>
        );
      case "MISSED":
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
            <PhoneMissed size={12} className="text-rose-600" />
            Missed
          </span>
        );
      default:
        return null;
    }
  };

  if (!callRecordings || callRecordings.length === 0) {
    return (
      <div className="text-center py-6 border border-dashed rounded-xl bg-slate-50/50">
        <p className="text-xs text-slate-400 font-medium">No call logs or recordings found for this lead.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Call Activity & Recordings ({callRecordings.length})
        </h4>
      </div>

      <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
        {callRecordings.map((log) => (
          <div
            key={log.id}
            className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-slate-300 transition flex flex-col gap-2.5"
          >
            {/* Header: Status, Employee, Time */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {getDirectionBadge(log.direction)}
                {log.employee && (
                  <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                    <User size={11} /> {log.employee.name}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-400">
                {new Date(log.createdAt).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </div>

            {/* Content: Talk Time */}
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-1 text-slate-500">
                <Clock size={13} />
                <span>Talktime: <strong className="text-slate-800">{formatDuration(log.duration)}</strong></span>
              </div>
            </div>

            {/* Audio Player Block */}
            {log.recordingUrl ? (
              <div className="mt-1 pt-2 border-t border-slate-100">
                <audio controls className="w-full h-8 rounded-md focus:outline-none">
                  <source src={log.recordingUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ) : (
              <div className="mt-0.5 text-[11px] text-slate-400 italic">
                * Call not recorded / No audio sync
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}