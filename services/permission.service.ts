import { supabase } from "@/lib/supabase-client";

export async function getUserServices(userId: string) {

  const { data, error } = await supabase
    .from("user_services")
    .select("service_code")
    .eq("user_id", userId)
    .eq("is_active", true);

  if (error) {
    console.error(error);
    return [];
  }

  return data.map(item => item.service_code);
}

export async function saveUserServices(
  userId: string,
  services: string[]
) {

  // Remove old services
  await supabase
    .from("user_services")
    .delete()
    .eq("user_id", userId);

  // Prepare new records
  const rows = services.map(service => ({
    user_id: userId,
    service_code: service,
    is_active: true,
  }));

  // Insert new services
  const { error } = await supabase
    .from("user_services")
    .insert(rows);

  if (error) {

    console.error(error);

    return false;

  }

  return true;

}