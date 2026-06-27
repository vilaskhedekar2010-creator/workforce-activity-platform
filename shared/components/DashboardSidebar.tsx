import React from "react";

type SidebarItem = {
  id: string;
  label: string;
};

export interface DashboardSidebarProps {
  title: string;
  activeModule: string;
  setActiveModule: (module: string) => void;
  menuItems: SidebarItem[];
};

export default function DashboardSidebar({
  title,
  activeModule,
  setActiveModule,
  menuItems,
}: DashboardSidebarProps) {
  return (
    <aside
      className="w-72 bg-slate-900 text-white shadow-xl"
      aria-label="Sidebar Navigation"
    >
      {/* Logo Section */}
      <div className="border-b border-slate-700 px-6 py-8 text-center">
        <img
          src="/logo.png"
          alt="WAMP Logo"
          className="mx-auto mb-4 h-16 w-16 object-contain"
        />

        <h2 className="text-2xl font-bold tracking-wide text-white">
          {title}
        </h2>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6 flex flex-col gap-2 px-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-current={
              activeModule === item.id ? "page" : undefined
            }
            onClick={() => setActiveModule(item.id)}
            className={`w-full rounded-xl px-4 py-3.5 text-left text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              activeModule === item.id
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-200 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}