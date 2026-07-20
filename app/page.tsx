import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";

export default async function HomePage() {
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("id, role")
    .eq("role", "PLATFORM_OWNER")
    .limit(1);

  if (error) {
    console.error("Bootstrap check failed:", error);
    redirect("/login");
  }

  if (!data || data.length === 0) {
    redirect("/bootstrap");
  }

  redirect("/login");
}