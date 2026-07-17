import { supabase } from "@/lib/supabase-client";

export interface DashboardPermission {

  actionId: string;

  module: string;

  action: string;

  code: string;

  description: string;

}

export interface DashboardUser {

  id: string;

  email: string;

  full_name: string | null;

  role: string;

}

export class DashboardRepository {

  async getCurrentUser(): Promise<DashboardUser> {

    // Logged in Auth User
    const {

      data: auth,

      error: authError,

    } = await supabase.auth.getUser();

    if (authError) {

      throw authError;

    }

    if (!auth.user) {

      throw new Error(
        "User not authenticated."
      );

    }

    // Business Profile
    const {

      data: profile,

      error: profileError,

    } = await supabase

      .from("profiles")

      .select(`
        id,
        email,
        full_name,
        role
      `)

      .eq(
        "id",
        auth.user.id
      )

      .single();

    if (profileError) {

      throw profileError;

    }

    return profile;

  }

  async getRolePermissions(
    role: string
  ): Promise<DashboardPermission[]> {

    // Get Role Id

    const {

      data: roleData,

      error: roleError,

    } = await supabase

      .from("roles")

      .select("id")

      .eq(
        "code",
        role
      )

      .single();

    if (roleError) {

      throw roleError;

    }

    // Get Permissions

    const {

      data,

      error,

    } = await supabase

      .from("role_actions")

      .select(`
        action_id,
        actions (
          module,
          action,
          code,
          description
        )
      `)

      .eq(
        "role_id",
        roleData.id
      );

    if (error) {

      throw error;

    }

    return (data ?? []).map(
      (item: any) => ({

        actionId:
          item.action_id,

        module:
          item.actions.module,

        action:
          item.actions.action,

        code:
          item.actions.code,

        description:
          item.actions.description,

      })
    );

  }

}

export const dashboardRepository =
  new DashboardRepository();