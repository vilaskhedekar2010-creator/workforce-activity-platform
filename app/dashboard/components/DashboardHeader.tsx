"use client";

import { Bell } from "lucide-react";
import ProfileMenu from "./ProfileMenu";
import Breadcrumb from "./Breadcrumb";

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold tracking-tight">
            Workforce & Activity Management Platform
          </h1>

          <Breadcrumb />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded-md p-2 transition-colors hover:bg-muted"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>

          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}