import { supabase } from "@/lib/supabase-client";

import {
  roleActionRepository,
  ActionDto,
  RoleDto,
} from "../repository/RoleActionRepository";

export class RoleActionService {

  getRoles(): Promise<RoleDto[]> {
    return roleActionRepository.getRoles();
  }

  getActions(): Promise<ActionDto[]> {
    return roleActionRepository.getActions();
  }

  getRoleActionIds(
    roleId: string
  ): Promise<string[]> {
    return roleActionRepository.getRoleActionIds(
      roleId
    );
  }

  async saveRoleActions(
    roleId: string,
    actionIds: string[]
  ) {

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      throw new Error("User is not authenticated.");
    }

    const response = await fetch(
      "/api/role-actions/save",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          roleId,
          actionIds,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    return response.json();

  }

}

export const roleActionService =
  new RoleActionService();