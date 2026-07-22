import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { syncUserServicesFromRole } from "@/modules/permissions/services/user-permission.service";

export async function POST(request: Request) {
  try {

    const body = await request.json();

    const {
      email,
      password,
      full_name,
      role,
      mobile_number,
      enrollment_number,
      faculty_id,
      performedBy,
    } = body;

    // =====================================================
    // Create Auth User
    // =====================================================

    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (authError) {
      return NextResponse.json(
        {
          error: authError.message,
        },
        {
          status: 400,
        }
      );
    }

    const userId = authData.user.id;

    // =====================================================
    // Find Role
    // =====================================================

    const { data: roleRecord, error: roleError } =
      await supabaseAdmin
        .from("roles")
        .select("id")
        .eq("code", role)
        .single();

    if (roleError || !roleRecord) {

      await supabaseAdmin.auth.admin.deleteUser(userId);

      return NextResponse.json(
        {
          error: "Role not found",
        },
        {
          status: 400,
        }
      );
    }

    // =====================================================
    // Create Profile
    // =====================================================

    const { error: profileError } =
      await supabaseAdmin
        .from("profiles")
        .insert([
          {
            id: userId,
            email,
            full_name,
            role,
            mobile_number,
            enrollment_number,
            faculty_id,
            status: "ACTIVE",
            must_change_password: true,
          },
        ]);

    if (profileError) {

      await supabaseAdmin.auth.admin.deleteUser(userId);

      return NextResponse.json(
        {
          error: profileError.message,
        },
        {
          status: 400,
        }
      );
    }

    // =====================================================
    // Assign Role
    // =====================================================

    const { error: userRoleError } =
      await supabaseAdmin
        .from("user_roles")
        .insert([
          {
            user_id: userId,
            role_id: roleRecord.id,
          },
        ]);

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
        {
          status: 400,
        }
      );
    }

    // =====================================================
    // Copy Default Permissions
    // =====================================================

    await syncUserServicesFromRole(
      userId,
      roleRecord.id,
      performedBy ?? "SYSTEM"
    );

    return NextResponse.json({
      success: true,
      userId,
    });

  } catch (error: any) {

    console.error(error);

    return NextResponse.json(
      {
        error: error.message ?? "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}