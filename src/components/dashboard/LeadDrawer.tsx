"use client";

import { useState } from "react";
import { MessageSquare, PhoneCall, Save } from "lucide-react";
import CallLogHistory from "./CallLogHistory";

interface LeadDrawerProps {
  lead: any;
  onClose: () => void;
  onRefresh?: () => void;
}

export default function LeadDrawer({ lead, onClose, onRefresh }: LeadDrawerProps) {
  const [stage, setStage] = useState(lead?.lead_status || lead?.stage || "NEW");
  const [followUpDate, setFollowUpDate] = useState(
    lead?.nextFollowUp ? new Date(lead.nextFollowUp).toISOString().split("T")[0] : ""
  );
  const [bhk, setBhk] = useState(lead?.bhkType || lead?.scope || "3 BHK");
  const [budget, setBudget] = useState(lead?.estimatedBudget || lead?.budget || "10-15 Lakhs");
  const [notes, setNotes] = useState(lead?.remarks || lead?.notes || "");
  const [saving, setSaving] = useState(false);

  if (!lead) return null;

  // Phone number sanitization
  const phoneRaw = lead.phone_number || lead.phone || lead.mobile || "";
  const nameRaw = lead.customer_name || lead.name || "Sir/Madam";
  const cityRaw = lead.city || "";

  const rawDigits = String(phoneRaw).replace(/[^0-9]/g, "");
  const core10Digits = rawDigits.slice(-10);
  const formattedPhone = core10Digits.length === 10 ? `91${core10Digits}` : rawDigits;

  const hasValidPhone = formattedPhone.length >= 12; // 91 + 10 digit

  const waMessage = encodeURIComponent(
    `Hello ${nameRaw}, thank you for reaching out to Urbane Living! We would love to discuss your interior project.`
  );

  const callUrl = hasValidPhone ? `tel:+${formattedPhone}` : "#";
  const leadId = lead.id || lead._id;

  const handleWhatsAppClick = () => {
    if (!hasValidPhone) {
      alert("Is lead ka phone number invalid hai!");
      return;
    }
    const waMeUrl = `https://wa.me/${formattedPhone}?text=${waMessage}`;
    window.open(waMeUrl, "_blank", "noopener,noreferrer");
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage,
          lead_status: stage,
          nextFollowUp: followUpDate ? new Date(followUpDate).toISOString() : null,
          bhkType: bhk,
          estimatedBudget: budget,
          remarks: notes,
        }),
      });

      if (res.ok) {
        if (onRefresh) onRefresh();
        onClose();
      } else {
        alert("Failed to save changes.");
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800">{nameRaw}</h2>
              <p className="text-xs text-slate-500">
                {hasValidPhone ? `+${formattedPhone}` : "No phone number"} {cityRaw ? `• ${cityRaw}` : ""}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 font-bold text-lg transition"
            >
              ✕
            </button>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleWhatsAppClick}
              disabled={!hasValidPhone}
              className={`flex items-center justify-center gap-2 font-semibold py-2.5 px-4 rounded-xl shadow-sm transition ${
                hasValidPhone
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <MessageSquare size={18} /> WhatsApp
            </button>

            <a
              href={callUrl}
              className={`flex items-center justify-center gap-2 font-semibold py-2.5 px-4 rounded-xl shadow-sm transition ${
                hasValidPhone
                  ? "bg-slate-900 hover:bg-black text-white"
                  : "bg-gray-200 text-gray-400 pointer-events-none"
              }`}
            >
              <PhoneCall size={18} /> Call Now
            </a>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              INTERIOR PROJECT SPECS
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Lead Stage</label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className="w-full border rounded-xl p-2.5 text-xs font-medium bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="NEW">CREATED (New)</option>
                  <option value="CALL_SCHEDULED">Call Scheduled</option>
                  <option value="FOLLOWUP">Follow Up</option>
                  <option value="MEETING_FIXED">Meeting Fixed</option>
                  <option value="SITE_VISIT">Site Visit</option>
                  <option value="ESTIMATE_SENT">Estimate Sent</option>
                  <option value="DESIGN_PHASE">Design Phase</option>
                  <option value="QUOTATION_APPROVED">Quotation Approved</option>
                  <option value="CONFIRMED">Confirmed / Won</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">
                  Schedule Next Follow Up
                </label>
                <input
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="w-full border rounded-xl p-2.5 text-xs font-medium bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Scope / BHK</label>
                <select
                  value={bhk}
                  onChange={(e) => setBhk(e.target.value)}
                  className="w-full border rounded-xl p-2.5 text-xs font-medium bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="4+ BHK / Villa">4+ BHK / Villa</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Est. Budget</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full border rounded-xl p-2.5 text-xs font-medium bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="5-10 Lakhs">5 - 10 Lakhs</option>
                  <option value="10-15 Lakhs">10 - 15 Lakhs</option>
                  <option value="15-25 Lakhs">15 - 25 Lakhs</option>
                  <option value="25+ Lakhs">25+ Lakhs</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">
                Calling & Interaction Notes
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter client conversation details..."
                className="w-full border rounded-xl p-3 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Call Activity & Recordings List */}
          <CallLogHistory callRecordings={lead?.callRecordings} />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition mt-6 disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? "Saving Changes..." : "Save Requirements & Notes"}
        </button>
      </div>
    </div>
  );
}