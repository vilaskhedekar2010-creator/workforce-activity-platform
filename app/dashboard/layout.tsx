"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import DashboardHeader from "./components/DashboardHeader";
import DashboardSidebar from "./components/DashboardSidebar";
import DashboardFooter from "./components/DashboardFooter";

import {
  BootstrapProvider,
  useBootstrap,
} from "@/platform/auth/context/BootstrapContext";

function DashboardContent({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  const {
    loading,
    authenticated,
  } = useBootstrap();

  useEffect(() => {
    if (!loading && !authenticated) {
      router.replace("/login");
    }
  }, [loading, authenticated, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6">
          {children}
        </main>

        <DashboardFooter />
      </div>
    </div>
  );
}

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <BootstrapProvider>
      <DashboardContent>
        {children}
      </DashboardContent>
    </BootstrapProvider>
  );
}