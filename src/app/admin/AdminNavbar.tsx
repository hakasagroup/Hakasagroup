"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

type AdminUser = {
  email?: string | null;
  name?: string | null;
};

export default function AdminNavbar({ user }: { user?: AdminUser }) {
  return (
    <nav className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
      <div className="text-xl font-bold tracking-tight">
        HAKASA<span className="text-blue-600">Admin</span>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/admin/leads"
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          Leads
        </Link>
        <span className="text-sm font-medium text-slate-600">
          {user?.email}
        </span>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-sm font-medium text-red-600 hover:text-red-800"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}