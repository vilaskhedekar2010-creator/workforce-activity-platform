import { supabase } from "@/lib/supabase-client";

/**
 * Checks whether the currently authenticated user's account
 * is active. If the account is inactive or suspended,
 * the user is automatically signed out.
 */
export const checkUserStatus = async (): Promise<void> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("status")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Failed to verify user status:", error);
      return;
    }

    if (
      profile?.status === "INACTIVE" ||
      profile?.status === "SUSPENDED"
    ) {
      await supabase.auth.signOut();

      alert("Your account has been disabled by administrator.");

      window.location.href = "/login";
    }
  } catch (error) {
    console.error("User status verification failed:", error);
  }
};