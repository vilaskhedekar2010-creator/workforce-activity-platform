"use client";

import { ALL_SERVICES } from "@/shared/constants/all-services";

type DashboardSidebarProps = {
  allowedServices: string[];
  activeService: string;
  setActiveService: React.Dispatch<React.SetStateAction<string>>;
};

export default function DashboardSidebar({
  allowedServices,
  activeService,
  setActiveService,
}: DashboardSidebarProps) {
  return (
    <aside className="w-64 border-r bg-white">

      <div className="p-4">

        <h2 className="mb-4 text-lg font-semibold">
          Services
        </h2>

        <div className="space-y-2">

            {
            ALL_SERVICES
                .filter((service) => allowedServices.includes(service.code))
                .map((service) => (
                <button
                    key={service.code}
                    onClick={() => setActiveService(service.code)}
                    className={`w-full rounded-md px-4 py-2 text-left transition ${
                    activeService === service.code
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100"
                    }`}
                >
                    {service.label}
                </button>
                ))
            }

        </div>

      </div>

    </aside>
  );
}