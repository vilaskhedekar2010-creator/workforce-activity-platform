import { supabaseAdmin } from "@/lib/supabase-admin";

/**
 * Used when:
 * - Creating a new user
 * - Changing a user's role
 *
 * Rebuilds only ROLE permissions.
 * USER permissions remain untouched.
 */
export async function syncUserServicesFromRole(
  userId: string,
  roleId: string
) {
  // Get role permissions
  const { data: roleActions, error: roleError } = await supabaseAdmin
    .from("role_actions")
    .select(
      `
      actions (
        code
      )
    `
    )
    .eq("role_id", roleId);

  if (roleError) throw roleError;

  const rolePermissionCodes =
    roleActions?.map((item: any) => item.actions.code) ?? [];

  await syncRolePermissionsForUser(userId, rolePermissionCodes);
}

/**
 * Synchronize only ROLE permissions.
 *
 * USER permissions are NEVER modified.
 *
 * This performs a diff:
 *
 * Existing ROLE
 *        vs
 * Incoming ROLE
 *
 * Added   -> INSERT
 * Removed -> DELETE
 * Same    -> Ignore
 */
export async function syncRolePermissionsForUser(
  userId: string,
  rolePermissionCodes: string[]
) {
  // Read current ROLE permissions
  const { data: currentPermissions, error: currentError } =
    await supabaseAdmin
      .from("user_services")
      .select("service_code")
      .eq("user_id", userId)
      .eq("permission_source", "ROLE");

  if (currentError) throw currentError;

  const currentCodes = new Set(
    (currentPermissions ?? []).map((x) => x.service_code)
  );

  const incomingCodes = new Set(rolePermissionCodes);

  // Find new permissions
  const permissionsToAdd = rolePermissionCodes.filter(
    (code) => !currentCodes.has(code)
  );

  // Find removed permissions
  const permissionsToRemove = [...currentCodes].filter(
    (code) => !incomingCodes.has(code)
  );

  // Insert only new permissions
  if (permissionsToAdd.length > 0) {
    const rows = permissionsToAdd.map((code) => ({
      user_id: userId,
      service_code: code,
      permission_source: "ROLE",
      is_active: true,
    }));

    const { error } = await supabaseAdmin
      .from("user_services")
      .insert(rows);

    if (error) throw error;
  }

  // Delete only removed ROLE permissions
  if (permissionsToRemove.length > 0) {
    const { error } = await supabaseAdmin
      .from("user_services")
      .delete()
      .eq("user_id", userId)
      .eq("permission_source", "ROLE")
      .in("service_code", permissionsToRemove);

    if (error) throw error;
  }
}