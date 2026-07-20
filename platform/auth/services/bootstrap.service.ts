import { supabase } from "@/lib/supabase-client";

export interface BootstrapResult {
  success: boolean;
  redirectTo?: string;
  message?: string;
  user?: {
    id: string;
    email: string;
  };
}

export class BootstrapService {
  static async login(
    email: string,
    password: string
  ): Promise<BootstrapResult> {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    const user = data.user;

    if (!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    const {
      data: profile,
      error: profileError,
    } = await supabase
      .from("profiles")
      .select(`
        status,
        must_change_password
      `)
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      await supabase.auth.signOut();

      return {
        success: false,
        message: "Profile not found.",
      };
    }

    if (profile.status === "INACTIVE") {
      await supabase.auth.signOut();

      return {
        success: false,
        message:
          "Your account is inactive. Contact administrator.",
      };
    }

    if (profile.status === "SUSPENDED") {
      await supabase.auth.signOut();

      return {
        success: false,
        message:
          "Your account has been suspended.",
      };
    }

    if (profile.must_change_password) {
      return {
        success: true,
        redirectTo: "/change-password",
        user: {
          id: user.id,
          email: user.email ?? "",
        },
      };
    }

    return {
      success: true,
      redirectTo: "/dashboard",
      user: {
        id: user.id,
        email: user.email ?? "",
      },
    };
  }

  static async bootstrap() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      authenticated: false,
    };
  }

  const {
    data: profile,
    error: profileError,
  } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return {
      authenticated: false,
    };
  }

  return {
    authenticated: true,
    user,
    profile,
  };
}

  static async logout() {
    await supabase.auth.signOut();
  }

  static async getCurrentUser() {
    const { data } =
      await supabase.auth.getUser();

    return data.user;
  }
}