"use client";

import EmployeeDashboard from "@/components/employee/EmployeeDashboard";
import { Suspense } from "react";

export default function EmployeePage() {
  return (
    // Suspense lagana zaroori hai taaki useSearchParams build fail na kare
    <Suspense fallback={
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-slate-500 font-medium animate-pulse">Loading Dashboard...</p>
      </div>
    }>
      <EmployeeDashboard />
    </Suspense>
  );
}