import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { syncUserServicesFromRole } from "@/modules/permissions/services/user-permission.service";
import { bootstrapSuperAdminRole } from "@/modules/permissions/services/bootstrap-super-admin.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      full_name,
      email,
      password,
      mobile_number,
    } = body;

    if (!full_name || !email || !password) {
      return NextResponse.json(
        {
          error: "Full name, email and password are required.",
        },
        { status: 400 }
      );
    }

    // Check if profile already exists
    const { data: existingProfile } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingProfile) {
      return NextResponse.json(
        {
          error: "A user with this email already exists.",
        },
        { status: 400 }
      );
    }

    // Ensure SUPER_ADMIN role exists
    const roleId = await bootstrapSuperAdminRole();

    // Create Auth User
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (authError || !authData.user) {
      return NextResponse.json(
        {
          error:
            authError?.message ??
            "Failed to create auth user.",
        },
        { status: 400 }
      );
    }

    const userId = authData.user.id;

    // Create Profile
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .insert({
        id: userId,
        email,
        full_name,
        mobile_number: mobile_number ?? null,
        status: "ACTIVE",
        must_change_password: true,
      });

    if (profileError) {
      await supabaseAdmin.auth.admin.deleteUser(userId);

      return NextResponse.json(
        {
          error: profileError.message,
        },
        { status: 400 }
      );
    }

    // Assign SUPER_ADMIN Role
    const { error: userRoleError } = await supabaseAdmin
      .from("user_roles")
      .insert({
        user_id: userId,
        role_id: roleId,
      });

    if (userRoleError) {
      await supabaseAdmin
        .from("profiles")
        .delete()
        .eq("id", userId);

      await supabaseAdmin.auth.admin.deleteUser(userId);

      return NextResponse.json(
        {
          error: userRoleError.message,
        },
        { status: 400 }
      );
    }

    // Create user_services from role_actions
    await syncUserServicesFromRole(
      userId,
      roleId
    );

    return NextResponse.json({
      success: true,
      message: "Super Admin created successfully.",
      userId,
    });

  } catch (error: any) {
    return NextResponse.json(
      {
        error:
          error.message ??
          "Internal Server Error",
      },
      { status: 500 }
    );
  }
}