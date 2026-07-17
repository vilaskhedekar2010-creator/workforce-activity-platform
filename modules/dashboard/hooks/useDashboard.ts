"use client";

import { useEffect, useState } from "react";

import {
  dashboardService,
  SidebarMenuItem,
} from "../services/DashboardService";

import {
  DashboardPermission,
  DashboardUser,
} from "../repository/DashboardRepository";

export function useDashboard() {

  const [loading, setLoading] =
    useState(true);

  const [user, setUser] =
    useState<DashboardUser | null>(null);

  const [permissions, setPermissions] =
    useState<DashboardPermission[]>([]);

  const [menuItems, setMenuItems] =
    useState<SidebarMenuItem[]>([]);

  async function refresh() {

    setLoading(true);

    try {

      const dashboard =
        await dashboardService.loadDashboard();

      setUser(dashboard.user);

      setPermissions(
        dashboard.permissions
      );

      setMenuItems(
        dashboard.menuItems
      );

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    refresh();

  }, []);

  return {

    loading,

    user,

    permissions,

    menuItems,

    refresh,

    hasModule: (module: string) =>
      dashboardService.hasModule(
        permissions,
        module
      ),

    hasAction: (actionCode: string) =>
      dashboardService.hasAction(
        permissions,
        actionCode
      ),

  };

}