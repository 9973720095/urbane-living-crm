"use client";

import LeadCard from "./LeadCard";

interface Props {
  title: string;
  stage: string;
  leads: any[];
}

export default function KanbanColumn({
  title,
  stage,
  leads,
}: Props) {
  return (
    <div className="w-[340px] bg-slate-100 rounded-3xl p-4">

      <div className="flex items-center justify-between mb-5">

        <h2 className="font-bold text-slate-800">
          {title}
        </h2>

        <div className="bg-white px-3 py-1 rounded-xl text-sm font-semibold">
          {leads.length}
        </div>

      </div>

      <div className="space-y-4">

        {leads.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
          />
        ))}

      </div>

    </div>
  );
}