"use client";

import type { Profile } from "@/shared/types/profile";

type DashboardHeaderProps = {
  profile: Profile | null;
  onLogout?: () => void;
};

export default function DashboardHeader({
  profile,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold">
          Workforce Activity Management Platform
        </h1>

        <p className="text-sm text-gray-500">
          Universal Dashboard
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="font-semibold">
            {profile?.full_name ?? "Unknown User"}
          </p>

          <p className="text-sm text-gray-500">
            {profile?.email}
          </p>

          <p className="text-xs text-blue-600">
            {profile?.role}
          </p>
        </div>

        <button
          onClick={onLogout}
          className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
}