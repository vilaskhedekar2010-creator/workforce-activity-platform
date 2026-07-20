import { supabaseAdmin } from "@/lib/supabase-admin";

export async function bootstrapSuperAdminRole(): Promise<string> {
  // --------------------------------------------------
  // Check if SUPER_ADMIN role already exists
  // --------------------------------------------------
  const { data: existingRole, error: roleLookupError } = await supabaseAdmin
    .from("roles")
    .select("id")
    .eq("code", "SUPER_ADMIN")
    .maybeSingle();

  if (roleLookupError) {
    throw new Error(roleLookupError.message);
  }

  let roleId = existingRole?.id;

  // --------------------------------------------------
  // Create SUPER_ADMIN role if missing
  // --------------------------------------------------
  if (!roleId) {
    const { data: newRole, error: createRoleError } = await supabaseAdmin
      .from("roles")
      .insert({
        code: "SUPER_ADMIN",
        name: "Super Admin",
        description: "System Super Administrator",
        status: "ACTIVE",
        is_system: true,
        scope: "SYSTEM",
      })
      .select("id")
      .single();

    if (createRoleError || !newRole) {
      throw new Error(createRoleError?.message ?? "Unable to create SUPER_ADMIN role.");
    }

    roleId = newRole.id;
  }

  // --------------------------------------------------
  // Read all ACTIVE actions
  // --------------------------------------------------
  const { data: actions, error: actionError } = await supabaseAdmin
    .from("actions")
    .select("id")
    .eq("status", "ACTIVE");

  if (actionError) {
    throw new Error(actionError.message);
  }

  if (!actions?.length) {
    return roleId;
  }

  // --------------------------------------------------
  // Existing mappings
  // --------------------------------------------------
  const { data: existingMappings } = await supabaseAdmin
    .from("role_actions")
    .select("action_id")
    .eq("role_id", roleId);

  const existingActionIds = new Set(
    (existingMappings ?? []).map((x) => x.action_id)
  );

  // --------------------------------------------------
  // Insert only missing mappings
  // --------------------------------------------------
  const newMappings = actions
    .filter((a) => !existingActionIds.has(a.id))
    .map((a) => ({
      role_id: roleId,
      action_id: a.id,
    }));

  if (newMappings.length > 0) {
    const { error } = await supabaseAdmin
      .from("role_actions")
      .insert(newMappings);

    if (error) {
      throw new Error(error.message);
    }
  }

  return roleId;
}