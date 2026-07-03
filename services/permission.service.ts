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