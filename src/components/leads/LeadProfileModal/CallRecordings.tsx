"use client";

import { useMemo, useState } from "react";

import {
  Search,
  PhoneIncoming,
  PhoneOutgoing,
  Play,
  Download,
  Trash2,
} from "lucide-react";

import {
  CallRecording,
  CallRecordingsProps,
} from "./types";

import { formatDate } from "./utils";

export default function CallRecordings({
  recordings,
  loading = false,
  onDelete,
}: CallRecordingsProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return recordings.filter((call) => {
      return (
        call.phoneNumber
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        (call.employeeName ?? "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [recordings, search]);

  return (
    <div className="bg-white rounded-3xl border shadow-sm p-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-2xl font-bold">
            Call Recordings
          </h2>

          <p className="text-sm text-slate-500">
            Incoming & Outgoing Calls
          </p>

        </div>

        <div className="text-sm text-slate-500">

          {filtered.length} Calls

        </div>

      </div>

      {/* Search */}

      <div className="relative mb-6">

        <Search
          className="absolute left-4 top-3.5 text-slate-400"
          size={18}
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search phone or employee..."
          className="
            w-full
            rounded-xl
            border
            pl-11
            pr-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

      </div>

      {loading ? (
        <div className="text-center py-10 text-slate-500">

          Loading...

        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-slate-500">

          No call recordings found.

        </div>
      ) : (
        <div className="space-y-4">

          {filtered.map((call) => (

            <CallRow
              key={call.id}
              call={call}
              onDelete={onDelete}
            />

          ))}

        </div>
      )}

    </div>
  );
}

interface RowProps {
  call: CallRecording;

  onDelete?: (
    id: string
  ) => Promise<void> | void;
}

function CallRow({
  call,
  onDelete,
}: RowProps) {
  return (
    <div
      className="
        border
        rounded-2xl
        p-5
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-5
      "
    >

      {/* Left */}

      <div>

        <div className="flex items-center gap-3">

          {call.direction === "INCOMING" ? (
            <PhoneIncoming
              className="text-green-600"
              size={20}
            />
          ) : (
            <PhoneOutgoing
              className="text-blue-600"
              size={20}
            />
          )}

          <h3 className="font-semibold">

            {call.phoneNumber}

          </h3>

        </div>

        <div className="mt-2 text-sm text-slate-500 space-y-1">

          <p>

            Employee :

            {" "}

            {call.employeeName || "-"}

          </p>

          <p>

            Duration :

            {" "}

            {call.duration}s

          </p>

          <p>

            {formatDate(call.createdAt)}

          </p>

        </div>

      </div>

      {/* Audio */}

      <div className="flex-1">

        <audio
          controls
          src={call.recordingUrl}
          className="w-full"
        />

      </div>

      {/* Actions */}

      <div className="flex gap-2">

        <a
          href={call.recordingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            w-11
            h-11
            rounded-xl
            bg-blue-100
            hover:bg-blue-200
            flex
            items-center
            justify-center
          "
        >
          <Play size={18} />
        </a>

        <a
          href={call.recordingUrl}
          download
          className="
            w-11
            h-11
            rounded-xl
            bg-green-100
            hover:bg-green-200
            flex
            items-center
            justify-center
          "
        >
          <Download size={18} />
        </a>

        <button
          onClick={() =>
            onDelete?.(call.id)
          }
          className="
            w-11
            h-11
            rounded-xl
            bg-red-100
            hover:bg-red-200
            flex
            items-center
            justify-center
          "
        >
          <Trash2
            size={18}
            className="text-red-600"
          />
        </button>

      </div>

    </div>
  );
}