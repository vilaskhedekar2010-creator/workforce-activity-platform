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

import React from "react";

export interface ModuleDefinition {

  code: string;

  databaseModule: string;

  displayName: string;

  description: string;

  route: string;

  order: number;

  isSystem: boolean;

  component: React.ComponentType<any>;

}

export const MODULE_REGISTRY:
Record<string, ModuleDefinition> = {

  HOME: {

    code: "HOME",

    databaseModule: "HOME",

    displayName: "Dashboard",

    description:
      "Dashboard",

    route:
      "/dashboard",

    order: 0,

    isSystem: true,

    component: Dashboard,

  },

  INSTITUTE: {

    code: "INSTITUTE",

    databaseModule:
      "Institute",

    displayName:
      "Institute",

    description:
      "Institute Management",

    route:
      "/dashboard/institutes",

    order: 10,

    isSystem: true,

    component:
      InstituteManagement,

  },

  DEPARTMENT: {

    code:
      "DEPARTMENT",

    databaseModule:
      "Department",

    displayName:
      "Department",

    description:
      "Department Management",

    route:
      "/dashboard/departments",

    order: 20,

    isSystem: true,

    component:
      DepartmentManagement,

  },

  ROLE: {

    code:
      "ROLE",

    databaseModule:
      "Role",

    displayName:
      "Role",

    description:
      "Role Management",

    route:
      "/dashboard/roles",

    order: 30,

    isSystem: true,

    component:
      RoleManagement,

  },

  USER: {

    code:
      "USER",

    databaseModule:
      "User",

    displayName:
      "User",

    description:
      "User Management",

    route:
      "/dashboard/users",

    order: 40,

    isSystem: true,

    component:
      UserManagement,

  },

  GROUP: {

    code:
      "GROUP",

    databaseModule:
      "Group",

    displayName:
      "Group",

    description:
      "Group Management",

    route:
      "/dashboard/groups",

    order: 50,

    isSystem: true,

    component:
      GroupManagement,

  },

  COMMUNICATION: {

    code:
      "COMMUNICATION",

    databaseModule:
      "Communication",

    displayName:
      "Communication",

    description:
      "Communication",

    route:
      "/dashboard/communication",

    order: 60,

    isSystem: true,

    component:
      CommunicationCategoryManagement,

  },

  REPORTS: {

    code:
      "REPORTS",

    databaseModule:
      "Reports",

    displayName:
      "Reports",

    description:
      "Reports",

    route:
      "/dashboard/reports",

    order: 70,

    isSystem: true,

    component:
      Reports,

  },

};

export const MODULE_LIST =

Object.values(
  MODULE_REGISTRY
)

.sort(

  (a, b) =>

    a.order - b.order

);