"use client";

import { useState } from "react";
import { COMPANY } from "@/lib/company";
import Image from "next/image";
import {
  MapPin,
  Users,
  Building,
  ShieldCheck,
  Plus,
  Trash2,
  X,
  Edit3,
  Phone,
  Mail,
  Palette,
} from "lucide-react";

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState<"autoAssign" | "users" | "company">("users");

  // City Rules State
  const [cityRules, setCityRules] = useState([
    { id: "1", city: "Delhi", assignedTo: "Karun Kumar" },
    { id: "2", city: "Ghaziabad", assignedTo: "Archit Kumar" },
    { id: "3", city: "Noida", assignedTo: "Vibhooti Mishra" },
    { id: "4", city: "Gurugram", assignedTo: "Karun Kumar" },
  ]);

  // System Users State (Including Design Team & VP Sales)
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Admin User",
      email: "admin@urbaneliving.com",
      phone: "+91 9876543210",
      role: "ADMIN",
      status: "Active",
    },
    {
      id: "2",
      name: "Vibhooti Mishra",
      email: "vibhooti@urbaneliving.com",
      phone: "+91 9876543211",
      role: "VP_SALES",
      status: "Active",
    },
    {
      id: "3",
      name: "Archit Kumar",
      email: "archit@urbaneliving.com",
      phone: "+91 9876543212",
      role: "SALES",
      status: "Active",
    },
    {
      id: "4",
      name: "Karun Kumar",
      email: "karun@urbaneliving.com",
      phone: "+91 9876543213",
      role: "SALES",
      status: "Active",
    },
    {
      id: "5",
      name: "Design Lead",
      email: "design@urbaneliving.com",
      phone: "+91 9876543214",
      role: "DESIGN_TEAM",
      status: "Active",
    },
    {
      id: "6",
      name: "Accounts Manager",
      email: "accounts@urbaneliving.com",
      phone: "+91 9876543215",
      role: "ACCOUNTANT",
      status: "Active",
    },
  ]);

  // Modal States
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  // Form States - Rule
  const [newCity, setNewCity] = useState("");
  const [newAssignee, setNewAssignee] = useState("");

  // Form States - User Full Fields
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userRole, setUserRole] = useState("SALES");
  const [userStatus, setUserStatus] = useState("Active");

  // Handlers for City Rules
  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCity || !newAssignee) return;
    const newRule = {
      id: Date.now().toString(),
      city: newCity,
      assignedTo: newAssignee,
    };
    setCityRules([...cityRules, newRule]);
    setNewCity("");
    setNewAssignee("");
    setIsRuleModalOpen(false);
  };

  const handleDeleteRule = (id: string) => {
    setCityRules(cityRules.filter((r) => r.id !== id));
  };

  // Handlers for User CRUD
  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userEmail) return;

    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                name: userName,
                email: userEmail,
                phone: userPhone,
                role: userRole,
                status: userStatus,
              }
            : u
        )
      );
    } else {
      const newUser = {
        id: Date.now().toString(),
        name: userName,
        email: userEmail,
        phone: userPhone || "+91 -------",
        role: userRole,
        status: userStatus,
      };
      setUsers([...users, newUser]);
    }

    closeUserModal();
  };

  const openEditUser = (user: any) => {
    setEditingUser(user);
    setUserName(user.name);
    setUserEmail(user.email);
    setUserPhone(user.phone || "");
    setUserRole(user.role);
    setUserStatus(user.status || "Active");
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setEditingUser(null);
    setUserName("");
    setUserEmail("");
    setUserPhone("");
    setUserRole("SALES");
    setUserStatus("Active");
    setIsUserModalOpen(false);
  };

  // Helper for Role Badges
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "VP_SALES":
        return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case "DESIGN_TEAM":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "ACCOUNTANT":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "VP_SALES":
        return "VP SALES";
      case "DESIGN_TEAM":
        return "DESIGN TEAM";
      default:
        return role;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage City Auto-Assign Rules, User Roles & Access, and Business Info
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab("users")}
          className={`pb-3 flex items-center gap-2 transition border-b-2 ${
            activeTab === "users"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Users size={18} />
          User Roles & Access
        </button>
        <button
          onClick={() => setActiveTab("autoAssign")}
          className={`pb-3 flex items-center gap-2 transition border-b-2 ${
            activeTab === "autoAssign"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <MapPin size={18} />
          City Auto-Assign Rules
        </button>
        <button
          onClick={() => setActiveTab("company")}
          className={`pb-3 flex items-center gap-2 transition border-b-2 ${
            activeTab === "company"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Building size={18} />
          Company Profile
        </button>
      </div>

      {/* TAB 1: USER ROLES MANAGEMENT */}
      {activeTab === "users" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-slate-800">Team Members & Access Levels</h2>
              <p className="text-xs text-slate-500">
                Manage accounts for Admin, VP Sales, Telecallers, Design Team, and Accountants.
              </p>
            </div>
            <button
              onClick={() => {
                closeUserModal();
                setIsUserModalOpen(true);
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
            >
              <Plus size={16} /> Add User
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-y">
                <tr>
                  <th className="p-3.5">USER NAME</th>
                  <th className="p-3.5">CONTACT EMAIL</th>
                  <th className="p-3.5">PHONE</th>
                  <th className="p-3.5">ROLE</th>
                  <th className="p-3.5">STATUS</th>
                  <th className="p-3.5 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 transition">
                    <td className="p-3.5 font-bold text-slate-800 flex items-center gap-2">
                      {u.role === "DESIGN_TEAM" ? (
                        <Palette size={16} className="text-amber-500" />
                      ) : (
                        <ShieldCheck size={16} className="text-indigo-500" />
                      )}
                      {u.name}
                    </td>
                    <td className="p-3.5 text-slate-600">
                      <span className="flex items-center gap-1">
                        <Mail size={12} className="text-slate-400" />
                        {u.email}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-600">
                      <span className="flex items-center gap-1">
                        <Phone size={12} className="text-slate-400" />
                        {u.phone || "N/A"}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${getRoleBadge(
                          u.role
                        )}`}
                      >
                        {getRoleLabel(u.role)}
                      </span>
                    </td>
                    <td className="p-3.5 font-semibold">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] ${
                          u.status === "Active"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-rose-50 text-rose-600"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => openEditUser(u)}
                        className="text-slate-500 hover:text-indigo-600 font-semibold flex items-center gap-1 ml-auto transition"
                      >
                        <Edit3 size={14} /> Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: CITY AUTO-ASSIGN RULES */}
      {activeTab === "autoAssign" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-slate-800">Location Rules</h2>
              <p className="text-xs text-slate-500">
                Inbound leads will be automatically assigned based on customer city.
              </p>
            </div>
            <button
              onClick={() => setIsRuleModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition flex items-center gap-1.5"
            >
              <Plus size={16} /> Add New Rule
            </button>
          </div>

          <div className="divide-y divide-slate-100 border rounded-xl overflow-hidden">
            {cityRules.map((rule) => (
              <div
                key={rule.id}
                className="p-4 flex justify-between items-center bg-white hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 capitalize">{rule.city}</h4>
                    <p className="text-xs text-slate-500">
                      Auto-Assigned To:{" "}
                      <span className="font-semibold text-slate-700">{rule.assignedTo}</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteRule(rule.id)}
                  className="p-2 text-slate-400 hover:text-rose-500 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: COMPANY PROFILE */}
      {activeTab === "company" && (
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex items-center gap-6">
          <Image
            src={COMPANY.logo}
            alt={COMPANY.name}
            width={90}
            height={90}
            className="rounded-2xl border p-2 bg-white object-contain shadow-sm"
          />
          <div>
            <h1 className="text-2xl font-black text-slate-900">{COMPANY.name}</h1>
            <p className="text-xs text-slate-500 mt-1">📧 {COMPANY.email}</p>
            <p className="text-xs text-slate-500 mt-0.5">📞 {COMPANY.phone}</p>
          </div>
        </div>
      )}

      {/* MODAL 1: ADD / EDIT USER */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-800 text-base">
                {editingUser ? "Edit User Details" : "Add New Team Member"}
              </h3>
              <button onClick={closeUserModal} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveUser} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-600">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Sharma"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full mt-1 p-2.5 text-xs border rounded-xl focus:outline-indigo-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. ananya@urbaneliving.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full mt-1 p-2.5 text-xs border rounded-xl focus:outline-indigo-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600">Phone Number</label>
                <input
                  type="text"
                  placeholder="e.g. +91 9876543210"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full mt-1 p-2.5 text-xs border rounded-xl focus:outline-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600">Assign Role</label>
                  <select
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    className="w-full mt-1 p-2.5 text-xs border rounded-xl focus:outline-indigo-600 bg-white"
                  >
                    <option value="SALES">SALES / TELECALLER</option>
                    <option value="VP_SALES">VP SALES (Manager)</option>
                    <option value="DESIGN_TEAM">DESIGN TEAM</option>
                    <option value="ACCOUNTANT">ACCOUNTANT</option>
                    <option value="ADMIN">SUPER ADMIN</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600">Account Status</label>
                  <select
                    value={userStatus}
                    onChange={(e) => setUserStatus(e.target.value)}
                    className="w-full mt-1 p-2.5 text-xs border rounded-xl focus:outline-indigo-600 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={closeUserModal}
                  className="px-4 py-2 border rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 shadow-md shadow-indigo-600/20"
                >
                  {editingUser ? "Update User" : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD CITY RULE */}
      {isRuleModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-800 text-base">Add Location Auto-Assign Rule</h3>
              <button onClick={() => setIsRuleModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddRule} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600">City Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Faridabad"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  className="w-full mt-1 p-2.5 text-xs border rounded-xl focus:outline-indigo-600"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">Assign To Employee</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vibhooti Mishra"
                  value={newAssignee}
                  onChange={(e) => setNewAssignee(e.target.value)}
                  className="w-full mt-1 p-2.5 text-xs border rounded-xl focus:outline-indigo-600"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsRuleModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700"
                >
                  Save Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}