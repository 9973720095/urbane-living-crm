import React from "react";

interface FollowUp {
  id: string;
  followupDate: string | Date;
  remarks?: string | null;
  status: "PENDING" | "COMPLETED" | "MISSED";
  lead: {
    customer_name: string;
    phone_number: string;
  };
}

interface EmployeeFollowupsProps {
  followups: FollowUp[];
  onActionComplete: (id: string, remarks: string) => void;
}

export const EmployeeFollowups: React.FC<EmployeeFollowupsProps> = ({ followups, onActionComplete }) => {
  const getStatusStyle = (status: string) => {
    if (status === "COMPLETED") return "bg-green-100 text-green-800 border-green-200";
    if (status === "MISSED") return "bg-red-100 text-red-800 border-red-200";
    return "bg-amber-100 text-amber-800 border-amber-200";
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">Your Scheduled Follow-Ups Pipeline</h2>
        <span className="text-xs text-gray-500 font-medium">Total Actions: {followups.length}</span>
      </div>

      {followups.length === 0 ? (
        <div className="p-8 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed">
          No pending or missed callbacks are current assigned to your stream.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {followups.map((item) => (
            <div key={item.id} className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-950 text-base">{item.lead.customer_name}</h4>
                    <p className="text-xs text-gray-500 font-mono mt-0.5">📞 {item.lead.phone_number}</p>
                  </div>
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded border ${getStatusStyle(item.status)}`}>
                    {item.status}
                  </span>
                </div>

                <div className="mt-3 text-xs text-gray-600 bg-slate-50 p-2.5 rounded border border-slate-100">
                  <span className="font-semibold block text-slate-400 uppercase tracking-tight text-[10px]">Context / Last Remarks:</span>
                  <p className="mt-0.5 text-gray-700 italic">
                    {item.remarks || "No prior descriptive logging detail available."}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Target Date Time:</span>
                  <span className="font-semibold text-gray-700">
                    {new Date(item.followupDate).toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" })}
                  </span>
                </div>

                {item.status === "PENDING" && (
                  <button
                    onClick={() => {
                      const msg = prompt("Enter final call outcome text notes to save logs:");
                      if (msg) onActionComplete(item.id, msg);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-1.5 rounded-lg shadow-sm transition-colors"
                  >
                    Execute Close
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};