"use client";
import { LeadTimeline } from "./LeadTimeline";

export default function ActivityModal({ isOpen, onClose, activities, customerName }: any) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">History: {customerName}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          <LeadTimeline activities={activities} />
        </div>
      </div>
    </div>
  );
}