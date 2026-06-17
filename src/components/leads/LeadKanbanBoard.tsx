"use client";

import { useState } from "react";
import LeadCard from "./LeadCard";
import LeadDetailsDrawer from "./LeadDetailsDrawer";

interface Props {
  leads: any[];
}

export default function LeadKanbanBoard({
  leads,
}: Props) {
  const [selectedLead, setSelectedLead] =
    useState<any>(null);

  const columns = [
    {
      title: "New",
      stage: "NEW",
      color: "bg-slate-100",
    },
    {
      title: "Call Scheduled",
      stage: "CALL_SCHEDULED",
      color: "bg-yellow-100",
    },
    {
      title: "Follow Up",
      stage: "FOLLOWUP",
      color: "bg-orange-100",
    },
    {
      title: "Meeting Fixed",
      stage: "MEETING_FIXED",
      color: "bg-blue-100",
    },
    {
      title: "Site Visit",
      stage: "SITE_VISIT",
      color: "bg-purple-100",
    },
    {
      title: "Confirmed",
      stage: "CONFIRMED",
      color: "bg-green-100",
    },
    {
      title: "Rejected",
      stage: "REJECTED",
      color: "bg-red-100",
    },
  ];

  return (
    <>
      <div className="overflow-x-auto">
        <div className="flex gap-6 min-w-max pb-4">
          {columns.map((column) => {
            const stageLeads = leads.filter(
              (lead) => lead.stage === column.stage
            );

            return (
              <div
                key={column.stage}
                className="w-[340px] flex-shrink-0"
              >
                {/* Column Header */}
                <div
                  className={`${column.color} rounded-2xl px-4 py-3 mb-4 border`}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-slate-800">
                      {column.title}
                    </h2>

                    <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold">
                      {stageLeads.length}
                    </span>
                  </div>
                </div>

                {/* Lead Cards */}
                <div className="space-y-4">
                  {stageLeads.length > 0 ? (
                    stageLeads.map((lead) => (
                      <LeadCard
                        key={lead.id}
                        lead={lead}
                        onOpenDetails={setSelectedLead}
                      />
                    ))
                  ) : (
                    <div className="bg-slate-50 border rounded-2xl p-6 text-center text-sm text-slate-400">
                      No Leads
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Drawer */}
      {selectedLead && (
        <LeadDetailsDrawer
          lead={selectedLead}
          isOpen={true}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </>
  );
}