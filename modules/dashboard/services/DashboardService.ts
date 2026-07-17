import {
  dashboardRepository,
  DashboardPermission,
  DashboardUser,
} from "../repository/DashboardRepository";

export interface SidebarMenuItem {

  id: string;

  label: string;

}

export class DashboardService {

  async loadDashboard() {

    const user: DashboardUser =
      await dashboardRepository.getCurrentUser();

    const permissions: DashboardPermission[] =
      await dashboardRepository.getRolePermissions(
        user.role
      );

    const menuItems =
      this.buildSidebar(
        permissions
      );

    return {

      user,

      permissions,

      menuItems,

    };

  }

  private buildSidebar(
    permissions: DashboardPermission[]
  ): SidebarMenuItem[] {

    const modules =
      Array.from(

        new Set(

          permissions.map(
            permission =>
              permission.module
          )

        )

      );

    modules.sort();

    return modules.map(
      module => ({

        id: module
          .toLowerCase()
          .replace(/\s+/g, "-"),

        label: module,

      })
    );

  }

  hasModule(

    permissions: DashboardPermission[],

    module: string

  ): boolean {

    return permissions.some(

      permission =>

        permission.module === module

    );

  }

  hasAction(

    permissions: DashboardPermission[],

    actionCode: string

  ): boolean {

    return permissions.some(

      permission =>

        permission.code === actionCode

    );

  }

}

export const dashboardService =
  new DashboardService();