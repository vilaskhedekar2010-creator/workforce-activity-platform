import React from "react";

export interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  fullName: string;
  email: string;
  onLogout: () => void;
};

export default function DashboardHeader({
  title,
  subtitle,
  fullName,
  email,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <header className="mb-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-slate-100">
            <img
              src="/logo.png"
              alt="WAMP Logo"
              className="h-12 w-12 object-contain"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {title}
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-base font-semibold text-slate-900">
              {fullName}
            </p>

            <p className="text-sm text-slate-500">
              {email}
            </p>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}