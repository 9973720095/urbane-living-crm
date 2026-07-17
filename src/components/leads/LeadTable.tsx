import React from "react";

interface Lead {
  id: string;
  customer_name: string;
  phone_number: string;
  email?: string | null;
  city?: string | null;
  stage: "NEW" | "CALL_SCHEDULED" | "FOLLOWUP" | "MEETING_FIXED" | "SITE_VISIT" | "CONFIRMED" | "REJECTED";
  priority?: string | null;
  assignedTo?: { name: string; role: string } | null;
  createdAt: string | Date;
}

interface LeadTableProps {
  leads: Lead[];
  onViewDetails: (id: string) => void;
  onAssignLead?: (id: string) => void;
}

export const LeadTable: React.FC<LeadTableProps> = ({ leads, onViewDetails, onAssignLead }) => {
  const getStageColor = (stage: string) => {
    switch (stage) {
      case "NEW": return "bg-blue-100 text-blue-800";
      case "CALL_SCHEDULED": return "bg-purple-100 text-purple-800";
      case "FOLLOWUP": return "bg-yellow-100 text-yellow-800";
      case "MEETING_FIXED": return "bg-indigo-100 text-indigo-800";
      case "SITE_VISIT": return "bg-orange-100 text-orange-800";
      case "CONFIRMED": return "bg-green-100 text-green-800";
      case "REJECTED": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <th className="px-6 py-4">Customer Details</th>
              <th className="px-6 py-4">Stage</th>
              <th className="px-6 py-4">Priority</th>
              <th className="px-6 py-4">Assigned Professional</th>
              <th className="px-6 py-4">Created Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50/70 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">{lead.customer_name}</div>
                  <div className="text-xs text-gray-500">{lead.phone_number} {lead.email ? `| ${lead.email}` : ""}</div>
                  {lead.city && <div className="text-xs text-gray-400 mt-0.5">📍 {lead.city}</div>}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStageColor(lead.stage)}`}>
                    {lead.stage.replace("_", " ")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`font-medium text-xs ${lead.priority === "HIGH" ? "text-red-600 bg-red-50 px-2 py-0.5 rounded" : "text-gray-500"}`}>
                    {lead.priority || "MEDIUM"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {lead.assignedTo ? (
                    <div>
                      <div className="font-medium text-gray-800">{lead.assignedTo.name}</div>
                      <div className="text-xs text-blue-600 font-semibold">{lead.assignedTo.role}</div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => onAssignLead?.(lead.id)}
                      className="text-xs text-gray-400 hover:text-blue-600 italic underline"
                    >
                      Unassigned (Click to Route)
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 text-xs text-gray-500">
                  {new Date(lead.createdAt).toLocaleDateString("en-IN")}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => onViewDetails(lead.id)}
                    className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};