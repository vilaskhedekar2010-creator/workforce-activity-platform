import { supabase } from "@/lib/supabase-client";

export const checkUserStatus = async () => {

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data: profile } =
    await supabase
      .from("profiles")
      .select("status")
      .eq("id", user.id)
      .single();

  if (
    profile?.status === "INACTIVE" ||
    profile?.status === "SUSPENDED"
  ) {

    await supabase.auth.signOut();

    alert(
      "Your account has been disabled by administrator."
    );

    window.location.href = "/login";
  }
};