"use client";

import { useEffect, useState } from "react";

import {
  Loader2,
  Clock3,
} from "lucide-react";

import TimelineCard from "@/components/leads/details/TimelineCard";

import {
  TimelineActivity,
} from "@/components/leads/details/types";

interface TimelineProps {
  leadId: string;
}

export default function Timeline({
  leadId,
}: TimelineProps) {

  const [loading, setLoading] =
    useState(true);

  const [activities, setActivities] =
    useState<TimelineActivity[]>([]);

  const [error, setError] =
    useState<string | null>(null);

    const fetchTimeline = async () => {
    try {

      setLoading(true);

      setError(null);

      const response = await fetch(
        `/api/timeline/${leadId}`,
        {
          cache: "no-store",
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to load timeline."
        );
      }

      setActivities(
        result.data || []
      );

    } catch (err: any) {

      setError(
        err.message ||
          "Something went wrong."
      );

    } finally {

      setLoading(false);

    }
  };

    useEffect(() => {

    if (!leadId) return;

    fetchTimeline();

  }, [leadId]);
    if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }
  

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-red-600 font-medium">
          {error}
        </p>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">

        <Clock3
          size={42}
          className="mx-auto text-slate-400"
        />

        <h3 className="mt-4 text-lg font-semibold">
          No Timeline Available
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          No activity has been recorded for this lead yet.
        </p>

      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border shadow-sm p-6">

      <div className="mb-6">

        <h2 className="text-xl font-bold">
          Lead Timeline
        </h2>

        <p className="text-sm text-slate-500">
          Complete activity history of this lead
        </p>

      </div>

      <div className="space-y-5">

        {activities.map((activity) => (

          <TimelineCard
            key={activity.id}
            activity={activity}
          />

        ))}

      </div>

    </div>
  );

}