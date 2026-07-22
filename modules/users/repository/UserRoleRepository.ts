import { supabase } from "@/lib/supabase-client";

export interface UserRoleDto {
  userId: string;
  roleId: string;
}

export class UserRoleRepository {

  /**
   * Assign role to user.
   *
   * During onboarding a user has exactly one role.
   * If a role already exists, it is replaced.
   */
  async assignRole(
    userId: string,
    roleId: string
  ) {

    // Remove existing role assignment
    const { error: deleteError } = await supabase
      .from("user_roles")
      .delete()
      .eq("user_id", userId);

    if (deleteError) {
      throw deleteError;
    }

    // Insert new role assignment
    const { data, error } = await supabase
      .from("user_roles")
      .insert({
        user_id: userId,
        role_id: roleId,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  /**
   * Returns assigned role for user.
   */
  async getRoleId(
    userId: string
  ): Promise<string | null> {

    const { data, error } = await supabase
      .from("user_roles")
      .select("role_id")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data?.role_id ?? null;
  }

  /**
   * Remove role assignment.
   */
  async removeRole(
    userId: string
  ) {

    const { error } = await supabase
      .from("user_roles")
      .delete()
      .eq("user_id", userId);

    if (error) {
      throw error;
    }
  }

}

export const userRoleRepository =
  new UserRoleRepository();