"use client";

import { useState } from "react";

import DashboardSidebar
from "@/components/shared/DashboardSidebar";

import DashboardHeader
from "@/components/shared/DashboardHeader";

import { useDashboard }
from "../hooks/useDashboard";

export interface DashboardLayoutProps {

  title: string;

  subtitle: string;

  children: React.ReactNode;

}

export default function DashboardLayout({

  title,

  subtitle,

  children,

}: DashboardLayoutProps) {

  const dashboard =
    useDashboard();

  const [

    activeModule,

    setActiveModule,

  ] = useState("HOME");

  if (dashboard.loading) {

    return (

      <div className="flex min-h-screen items-center justify-center">

        Loading Dashboard...

      </div>

    );

  }

  return (

    <div className="flex min-h-screen bg-gray-100">

      <DashboardSidebar

        title={title}

        activeModule={activeModule}

        setActiveModule={setActiveModule}

        menuItems={[

          {

            id: "HOME",

            label: "Dashboard",

          },

          ...dashboard.menuItems,

        ]}

      />

      <div className="flex-1 p-8">

      <DashboardHeader
        title={title}
        subtitle={subtitle}
        fullName={
          dashboard.user?.full_name ??
          "User"
        }
        email={
          dashboard.user?.email ??
          ""
        }
        role={
          dashboard.user?.role ??
          ""
        }
        onLogout={async () => {

            // Will move to AuthService later

            window.location.href =

              "/login";

          }}

        />

        {children}

      </div>

    </div>

  );

}