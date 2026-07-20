"use client";

import { LogOut, Settings, User } from "lucide-react";

import { useBootstrap } from "@/platform/auth/context/BootstrapContext";
import { BootstrapService } from "@/platform/auth/services/bootstrap.service";

export default function ProfileMenu() {
  const { user, profile, loading } = useBootstrap();

  async function handleLogout() {
    await BootstrapService.logout();
    window.location.href = "/login";
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 rounded-lg border px-3 py-2">
        Loading...
      </div>
    );
  }

  const initials =
    profile?.full_name
      ?.split(" ")
      .map((name: string) => name[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "U";

  return (
    <div className="flex items-center gap-3 rounded-lg border px-3 py-2">
      {profile?.profile_photo ? (
        <img
          src={profile.profile_photo}
          alt={profile.full_name}
          className="h-10 w-10 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {initials}
        </div>
      )}

      <div className="hidden min-w-[170px] md:block">
        <p className="text-sm font-medium">
          {profile?.full_name}
        </p>

        <p className="text-xs text-muted-foreground">
          {user?.email}
        </p>
      </div>

      <div className="hidden items-center gap-1 lg:flex">
        <button
          type="button"
          title="Profile"
          className="rounded-md p-2 transition-colors hover:bg-muted"
        >
          <User className="h-4 w-4" />
        </button>

        <button
          type="button"
          title="Settings"
          className="rounded-md p-2 transition-colors hover:bg-muted"
        >
          <Settings className="h-4 w-4" />
        </button>

        <button
          type="button"
          title="Logout"
          onClick={handleLogout}
          className="rounded-md p-2 text-destructive transition-colors hover:bg-muted"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}