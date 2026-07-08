"use client";

import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import ModuleRenderer from "./ModuleRenderer";

type DashboardLayoutProps = {
  user: any;
  profile: any;
  allowedServices: string[];
  activeService: string;
  setActiveService: React.Dispatch<React.SetStateAction<string>>;
};

export default function DashboardLayout({
  user,
  profile,
  allowedServices,
  activeService,
  setActiveService,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen flex-col bg-gray-100">

      <DashboardHeader
        profile={profile}
      />

      <div className="flex flex-1 overflow-hidden">

        <DashboardSidebar
          allowedServices={allowedServices}
          activeService={activeService}
          setActiveService={setActiveService}
        />

        <main className="flex-1 overflow-auto bg-gray-50">

          <ModuleRenderer
            activeService={activeService}
          />

        </main>

      </div>

    </div>
  );
}