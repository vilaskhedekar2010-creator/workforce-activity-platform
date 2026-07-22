import { supabase } from "@/lib/supabase-client";

export interface RoleDto {
  id: string;
  name: string;
  code: string;
}

export interface ActionDto {
  id: string;
  module: string;
  action: string;
  code: string;
}

export class RoleActionRepository {

  async getRoles(): Promise<RoleDto[]> {

    const { data, error } = await supabase
      .from("roles")
      .select("id,name,code")
      .eq("status", "ACTIVE")
      .order("name");

    if (error) throw error;

    return data ?? [];

  }

  async getActions(): Promise<ActionDto[]> {

    const { data, error } = await supabase
      .from("actions")
      .select("id,module,action,code")
      .eq("status", "ACTIVE")
      .eq("is_system", true)
      .order("module")
      .order("action");

    if (error) throw error;

    return data ?? [];

  }

  async getRoleActionIds(
    roleId: string
  ): Promise<string[]> {

    const { data, error } = await supabase
      .from("role_actions")
      .select("action_id")
      .eq("role_id", roleId);

    if (error) throw error;

    return (data ?? []).map(
      (row) => row.action_id
    );

  }

  async saveRoleActions(
    roleId: string,
    actionIds: string[],
    currentUserId: string
  ) {

    const { data: existingRows, error: existingError } =
      await supabase
        .from("role_actions")
        .select("action_id")
        .eq("role_id", roleId);

    if (existingError) throw existingError;

    const existingIds =
      (existingRows ?? []).map(
        (row) => row.action_id
      );

    const grantedIds =
      actionIds.filter(
        (id) => !existingIds.includes(id)
      );

    const revokedIds =
      existingIds.filter(
        (id) => !actionIds.includes(id)
      );

    if (grantedIds.length > 0) {

      const grantRows =
        grantedIds.map((actionId) => ({
          role_id: roleId,
          action_id: actionId,
          created_by: currentUserId,
        }));

      const { error } =
        await supabase
          .from("role_actions")
          .insert(grantRows);

      if (error) throw error;

    }

    if (revokedIds.length > 0) {

      const { error } =
        await supabase
          .from("role_actions")
          .delete()
          .eq("role_id", roleId)
          .in("action_id", revokedIds);

      if (error) throw error;

    }

    // Audit : Granted

    if (grantedIds.length > 0) {

      const historyRows =
        grantedIds.map((actionId) => ({
          role_id: roleId,
          action_id: actionId,
          operation: "GRANTED",
          performed_by: currentUserId,
          remarks: null,
        }));

      const { error } =
        await supabase
          .from("role_action_history")
          .insert(historyRows);

      if (error) throw error;

    }

    // Audit : Revoked

    if (revokedIds.length > 0) {

      const historyRows =
        revokedIds.map((actionId) => ({
          role_id: roleId,
          action_id: actionId,
          operation: "REVOKED",
          performed_by: currentUserId,
          remarks: null,
        }));

      const { error } =
        await supabase
          .from("role_action_history")
          .insert(historyRows);

      if (error) throw error;

    }

  }

}

export const roleActionRepository =
  new RoleActionRepository();