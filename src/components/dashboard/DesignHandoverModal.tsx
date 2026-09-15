"use client";

import { useState } from "react";
import { X, UploadCloud, FileText, Image as ImageIcon, CheckCircle, Clock, Palette } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  city: string;
  stage: string;
  assignedTo: string;
}

export default function DesignHandoverModal({
  lead,
  onClose,
  onUpdateLead,
}: {
  lead: Lead;
  onClose: () => void;
  onUpdateLead: (updatedLead: Lead) => void;
}) {
  const [currentStage, setCurrentStage] = useState(lead.stage || "Design Proposal");
  const [designFiles, setDesignFiles] = useState([
    { name: "Living_Room_3D_v1.png", type: "image", size: "2.4 MB", uploadedBy: "Design Team" },
  ]);
  const [notes, setNotes] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Mock File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setIsUploading(true);

    setTimeout(() => {
      setDesignFiles([
        ...designFiles,
        {
          name: file.name,
          type: file.type.includes("pdf") ? "document" : "image",
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          uploadedBy: "Design Team",
        },
      ]);
      setIsUploading(false);
    }, 800);
  };

  const handleSavePipeline = () => {
    onUpdateLead({ ...lead, stage: currentStage });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl border">
        {/* Header */}
        <div className="flex justify-between items-start border-b pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-700 border border-amber-200">
                DESIGN HANDOVER
              </span>
              <span className="text-xs text-slate-400">ID: #{lead.id}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">{lead.name}</h2>
            <p className="text-xs text-slate-500">📍 {lead.city} • Assigned Sales Rep: {lead.assignedTo}</p>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* Lead Stage Selector */}
        <div>
          <label className="text-xs font-bold text-slate-700 mb-2 block">Pipeline Lifecycle Stage</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              "New Lead",
              "Site Visit Scheduled",
              "Design Proposal",
              "Quotation Sent",
            ].map((stage) => (
              <button
                key={stage}
                type="button"
                onClick={() => setCurrentStage(stage)}
                className={`p-2.5 rounded-xl text-xs font-semibold border transition text-left flex flex-col justify-between h-16 ${
                  currentStage === stage
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700 font-bold shadow-sm"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-[10px] text-slate-400">STAGE</span>
                  {currentStage === stage && <CheckCircle size={14} className="text-indigo-600" />}
                </div>
                <span>{stage}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Design Upload Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Palette size={16} className="text-amber-500" />
              Design Attachments (3D Renders / Layouts)
            </h3>
            <label className="cursor-pointer px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5 shadow-sm">
              <UploadCloud size={14} />
              {isUploading ? "Uploading..." : "Upload Layout / 3D Render"}
              <input type="file" onChange={handleFileUpload} className="hidden" accept="image/*,.pdf" />
            </label>
          </div>

          {/* Files List */}
          <div className="border rounded-xl divide-y divide-slate-100 max-h-36 overflow-y-auto bg-slate-50/50">
            {designFiles.map((file, idx) => (
              <div key={idx} className="p-3 flex items-center justify-between hover:bg-white transition">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
                    {file.type === "image" ? <ImageIcon size={16} /> : <FileText size={16} />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{file.name}</p>
                    <p className="text-[10px] text-slate-400">Size: {file.size} • Uploaded by {file.uploadedBy}</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Ready
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Designer Notes */}
        <div>
          <label className="text-xs font-bold text-slate-700 mb-1 block">Design Team Internal Remarks</label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Italian marble requirements added in Living room. Client preferred warm light palette."
            className="w-full p-2.5 text-xs border rounded-xl focus:outline-indigo-600"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 pt-3 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSavePipeline}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/20"
          >
            Save Stage & Update Lead
          </button>
        </div>
      </div>
    </div>
  );
}