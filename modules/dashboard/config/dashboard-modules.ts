import Dashboard from "@/components/super-admin/dashboard/Dashboard";

import InstituteManagement
from "@/components/super-admin/institutes/InstituteManagement";

import DepartmentManagement
from "@/components/super-admin/departments/DepartmentManagement";

import RoleManagement
from "@/components/super-admin/roles/RoleManagement";

import UserManagement
from "@/components/super-admin/users/UserManagement";

import GroupManagement
from "@/components/super-admin/groups/GroupManagement";

import CommunicationCategoryManagement
from "@/components/super-admin/communication/CommunicationCategoryManagement";

import Reports
from "@/components/super-admin/reports/Reports";

export const DASHBOARD_MODULES = {

  HOME: Dashboard,

  Institute: InstituteManagement,

  Department: DepartmentManagement,

  Role: RoleManagement,

  User: UserManagement,

  Group: GroupManagement,

  Communication: CommunicationCategoryManagement,

  Reports: Reports,

} as const;