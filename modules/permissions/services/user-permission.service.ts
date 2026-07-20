import { supabaseAdmin } from "@/lib/supabase-admin";

export async function syncUserServicesFromRole(
  userId: string,
  roleId: string
) {
  // Remove existing services
  const { error: deleteError } = await supabaseAdmin
    .from("user_services")
    .delete()
    .eq("user_id", userId);

  if (deleteError) {
    throw deleteError;
  }

  // Get all action codes assigned to this role
  const { data, error } = await supabaseAdmin
    .from("role_actions")
    .select(`
      action_id,
      actions (
        code
      )
    `)
    .eq("role_id", roleId);

  if (error) {
    throw error;
  }

  if (!data || data.length === 0) {
    return;
  }

  const rows = data.map((item: any) => ({
    user_id: userId,
    service_code: item.actions.code,
    is_active: true,
  }));

  const { error: insertError } = await supabaseAdmin
    .from("user_services")
    .insert(rows);

  if (insertError) {
    throw insertError;
  }
}