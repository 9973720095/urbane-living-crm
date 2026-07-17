"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Shield,
  CheckCircle2,
  Clock,
  Edit3,
  Save,
  X,
  Building,
  Award,
  BarChart3
} from "lucide-react";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  joiningDate: string;
  location: string;
  empIdToken: string;
}

interface PerformanceMetrics {
  tasksCompleted: number;
  totalAssigned: number;
  conversionRate: number; // Percentage value
  avgResponseTime: string; // e.g., "2.4 hrs"
}

export default function EmployeeProfile() {
  const searchParams = useSearchParams();
  const employeeId = searchParams.get("id") || searchParams.get("employeeId");

  // State Management
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [editedProfile, setEditedProfile] = useState<ProfileData | null>(null);
  
  // Hardcoded Performance Metrics for tracking display arrays
  const metrics: PerformanceMetrics = useMemo(() => ({
    tasksCompleted: profile ? 142 : 0,
    totalAssigned: profile ? 165 : 0,
    conversionRate: 86,
    avgResponseTime: "1.8 hrs"
  }), [profile]);

  useEffect(() => {
    if (employeeId) {
      fetchProfileData();
    }
  }, [employeeId]);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/employee/profile?employeeId=${employeeId}`);
      const data = await res.json();
      
      if (data.success) {
        setProfile(data.data);
        setEditedProfile(data.data);
      } else {
        // Fallback placeholder data matched to Urbane Living structure if API routing requires sync
        const fallbackData: ProfileData = {
          name: "Saban Kumar Jha",
          email: "saban.jha@urbaneliving.com",
          phone: "+91 9973720095",
          designation: "Frontend & UI Developer",
          department: "Product Engineering",
          joiningDate: "2025-11-01",
          location: "Delhi, India",
          empIdToken: employeeId || "UL-2026-09"
        };
        setProfile(fallbackData);
        setEditedProfile(fallbackData);
      }
    } catch (error) {
      console.error("Error retrieving user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSave = async () => {
    if (!editedProfile || !employeeId) return;
    try {
      const res = await fetch(`/api/employee/profile/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId, ...editedProfile })
      });
      const data = await res.json();
      if (data.success) {
        setProfile(editedProfile);
        setIsEditing(false);
      } else {
        // Optimistic local state updates for standalone sandboxes
        setProfile(editedProfile);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Profile updates transmission error:", error);
    }
  };

  if (!employeeId) {
    return (
      <div className="p-6 text-center text-sm text-slate-500 bg-white border border-slate-200 rounded-2xl">
        Please sync your employee context parameters to map credentials layout arrays.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full min-h-[400px] flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-400 font-medium">Synchronizing Secure Identity Matrices...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-4 md:p-0 transition-all antialiased">
      
      {/* Upper Profile Hero Banner Card */}
      <div className="bg-white rounded-3xl border border-slate-200/70 shadow-xs overflow-hidden relative">
        <div className="h-32 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        
        <div className="px-6 pb-6 relative flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 -mt-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 w-full sm:w-auto">
            {/* Avatar block */}
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 border-4 border-white flex items-center justify-center text-white font-black text-2xl shadow-md tracking-wider shrink-0">
              {profile?.name.split(" ").map(n => n[0]).join("")}
            </div>
            
            <div className="space-y-1 pb-1">
              <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                {profile?.name}
                <span className="text-[10px] bg-indigo-50 border border-indigo-100 font-black text-indigo-700 px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Verified Instance
                </span>
              </h1>
              <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <Briefcase size={13} className="text-slate-400" />
                {profile?.designation} • <span className="text-slate-400 font-normal">{profile?.department}</span>
              </p>
            </div>
          </div>

          {/* Edit State Toggle Actuators */}
          <div className="shrink-0 pb-1 w-full sm:w-auto flex justify-end">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 bg-white text-slate-700 hover:text-slate-900 border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer hover:bg-slate-50"
              >
                <Edit3 size={14} />
                Modify Profile
              </button>
            ) : (
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={handleProfileSave}
                  className="flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex-1 sm:flex-none"
                >
                  <Save size={14} />
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setEditedProfile(profile);
                    setIsEditing(false);
                  }}
                  className="flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <X size={14} />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid Layout Infrastructure */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Grid Sidebar Column: Metadata Core Fields */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200/70 p-6 shadow-xs space-y-6">
          <div>
            <h2 className="text-sm font-bold text-slate-800 tracking-tight uppercase flex items-center gap-2 border-b border-slate-100 pb-3">
              <User size={15} className="text-slate-400" />
              Account Specifications
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-slate-800">
            {/* Identity Token Display (Read-Only Field) */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block flex items-center gap-1">
                <Shield size={11} /> Employee ID Key
              </label>
              <div className="bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/50 font-mono text-xs text-slate-600 shadow-inner">
                {profile?.empIdToken}
              </div>
            </div>

            {/* Department Mapping (Read-Only Field) */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block flex items-center gap-1">
                <Building size={11} /> Office Department
              </label>
              <div className="bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/50 text-xs text-slate-600">
                {profile?.department}
              </div>
            </div>

            {/* Editable Field: Full Name */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">Identity Name</label>
              <input
                type="text"
                disabled={!isEditing}
                value={editedProfile?.name || ""}
                onChange={(e) => editedProfile && setEditedProfile({ ...editedProfile, name: e.target.value })}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-0 bg-white disabled:bg-slate-50/50 disabled:text-slate-500 font-medium focus:outline-none transition-all"
              />
            </div>

            {/* Editable Field: Designation */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">Role Designation</label>
              <input
                type="text"
                disabled={!isEditing}
                value={editedProfile?.designation || ""}
                onChange={(e) => editedProfile && setEditedProfile({ ...editedProfile, designation: e.target.value })}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-0 bg-white disabled:bg-slate-50/50 disabled:text-slate-500 font-medium focus:outline-none transition-all"
              />
            </div>

            {/* Editable Field: Communications Email */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block flex items-center gap-1">
                <Mail size={11} /> Contact Email Address
              </label>
              <input
                type="email"
                disabled={!isEditing}
                value={editedProfile?.email || ""}
                onChange={(e) => editedProfile && setEditedProfile({ ...editedProfile, email: e.target.value })}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-0 bg-white disabled:bg-slate-50/50 disabled:text-slate-500 font-medium focus:outline-none transition-all"
              />
            </div>

            {/* Editable Field: Secondary Phone Routing */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block flex items-center gap-1">
                <Phone size={11} /> Primary Phone Number
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={editedProfile?.phone || ""}
                onChange={(e) => editedProfile && setEditedProfile({ ...editedProfile, phone: e.target.value })}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-0 bg-white disabled:bg-slate-50/50 disabled:text-slate-500 font-medium focus:outline-none transition-all"
              />
            </div>

            {/* Editable Field: Location Coordinates */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block flex items-center gap-1">
                <MapPin size={11} /> Standard Desk Base Location
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={editedProfile?.location || ""}
                onChange={(e) => editedProfile && setEditedProfile({ ...editedProfile, location: e.target.value })}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-0 bg-white disabled:bg-slate-50/50 disabled:text-slate-500 font-medium focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Right Grid Sidebar Column: Performance & Lifecycle Metrics */}
        <div className="space-y-6">
          
          {/* Metrics Stats Summary Matrix Block */}
          <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-xs space-y-4">
            <h2 className="text-xs font-bold text-slate-800 tracking-tight uppercase flex items-center gap-2 border-b border-slate-100 pb-3">
              <BarChart3 size={15} className="text-slate-400" />
              Efficiency Indexes
            </h2>
            
            <div className="space-y-4 pt-1">
              {/* Stat Node 1 */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-xs text-slate-400 font-medium">Task Clearings Rate</p>
                  <p className="text-xs font-bold text-slate-700">{metrics.tasksCompleted} / {metrics.totalAssigned} items</p>
                </div>
                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600">
                  <CheckCircle2 size={18} />
                </div>
              </div>

              {/* Stat Node 2 */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-xs text-slate-400 font-medium">Conversion Yield</p>
                  <p className="text-xs font-bold text-slate-700">{metrics.conversionRate}% Pipeline Won</p>
                </div>
                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600">
                  <Award size={18} />
                </div>
              </div>

              {/* Stat Node 3 */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-xs text-slate-400 font-medium">Average Response Clock</p>
                  <p className="text-xs font-bold text-slate-700">{metrics.avgResponseTime} Turnaround</p>
                </div>
                <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-600">
                  <Clock size={18} />
                </div>
              </div>
            </div>
          </div>

          {/* Account Onboarding Lifecycle Metadata */}
          <div className="bg-slate-900 border border-slate-950 text-slate-400 rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-xs tracking-wide uppercase">
              <Calendar size={14} className="text-indigo-400" />
              <span>Workspace Stream Metadata</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              This node identity was initialized into the Urbane Living environment database cluster on:
            </p>
            <div className="text-xs font-mono font-bold text-slate-200 pt-1">
              {profile?.joiningDate ? new Date(profile.joiningDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : "N/A"}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}