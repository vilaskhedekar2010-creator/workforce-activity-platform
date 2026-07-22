"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  ShieldCheck,
  KeyRound,
  Building2,
  GraduationCap,
  MessageSquare,
  ClipboardList,
  CalendarDays,
  Settings,
} from "lucide-react";

interface MenuItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Users",
    href: "/dashboard/master-data/users",
    icon: Users,
  },
  {
    title: "Roles",
    href: "/dashboard/master-data/roles",
    icon: ShieldCheck,
  },
  {
    title: "Role Actions",
    href: "/dashboard/master-data/role-actions",
    icon: KeyRound,
  },
  {
    title: "Institutes",
    href: "/dashboard/master-data/institutes",
    icon: Building2,
  },
  {
    title: "Departments",
    href: "/dashboard/master-data/departments",
    icon: GraduationCap,
  },
  {
    title: "Messages",
    href: "/dashboard/master-data/messages",
    icon: MessageSquare,
  },
  {
    title: "Tasks",
    href: "/dashboard/master-data/tasks",
    icon: ClipboardList,
  },
  {
    title: "Events",
    href: "/dashboard/master-data/events",
    icon: CalendarDays,
  },
  {
    title: "Settings",
    href: "/dashboard/master-data/settings",
    icon: Settings,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 border-r bg-background lg:flex lg:flex-col">
      <div className="border-b px-6 py-5">
        <h2 className="text-xl font-bold">WAMP</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Enterprise Platform
        </p>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4 text-center text-xs text-muted-foreground">
        WAMP v2.0
      </div>
    </aside>
  );
}