"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center gap-5">

      <button
        onClick={() => router.push("/admin/dashboard")}
        className="px-6 py-3 bg-indigo-600 text-white rounded-xl"
      >
        Login as Admin
      </button>

      <button
        onClick={() => router.push("/employee/dashboard")}
        className="px-6 py-3 bg-green-600 text-white rounded-xl"
      >
        Login as Employee
      </button>

    </div>
  );
}