import {
  Building2,
  FolderTree,
  Home,
  MessageSquare,
  Shield,
  Users,
  UserCog,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

export interface NavigationItem {
  code: string;
  title: string;
  route: string;
  icon: LucideIcon;
  order: number;
  requiredService: string | null;
  isSystem: boolean;
}

export const NAVIGATION_REGISTRY: NavigationItem[] = [
  {
    code: "HOME",
    title: "Dashboard",
    route: "/dashboard",
    icon: Home,
    order: 0,
    requiredService: null,
    isSystem: true,
  },
  {
    code: "INSTITUTE",
    title: "Institutes",
    route: "/dashboard/institutes",
    icon: Building2,
    order: 10,
    requiredService: "INSTITUTE_VIEW",
    isSystem: true,
  },
  {
    code: "DEPARTMENT",
    title: "Departments",
    route: "/dashboard/departments",
    icon: FolderTree,
    order: 20,
    requiredService: "DEPARTMENT_VIEW",
    isSystem: true,
  },
  {
    code: "ROLE",
    title: "Roles",
    route: "/dashboard/roles",
    icon: Shield,
    order: 30,
    requiredService: "ROLE_VIEW",
    isSystem: true,
  },
  {
    code: "USER",
    title: "Users",
    route: "/dashboard/users",
    icon: UserCog,
    order: 40,
    requiredService: "USER_VIEW",
    isSystem: true,
  },
  {
    code: "GROUP",
    title: "Groups",
    route: "/dashboard/groups",
    icon: Users,
    order: 50,
    requiredService: "GROUP_VIEW",
    isSystem: true,
  },
  {
    code: "COMMUNICATION",
    title: "Communication",
    route: "/dashboard/communication",
    icon: MessageSquare,
    order: 60,
    requiredService: "MESSAGE_VIEW",
    isSystem: true,
  },
  {
    code: "REPORTS",
    title: "Reports",
    route: "/dashboard/reports",
    icon: BarChart3,
    order: 70,
    requiredService: "REPORT_VIEW",
    isSystem: true,
  },
];

export const NAVIGATION_LIST = [...NAVIGATION_REGISTRY].sort(
  (a, b) => a.order - b.order
);