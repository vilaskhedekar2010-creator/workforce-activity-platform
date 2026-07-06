import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { DEFAULT_SERVICES } from "@/shared/constants/default-services";

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const {
      email,
      password,
      full_name,
      role,
      mobile_number,
      enrollment_number,
      faculty_id,
    } = body;

    const {
      data,
      error,
    } =
      await supabaseAdmin.auth.admin.createUser({

        email,

        password,

        email_confirm: true,

      });

    if (error) {

      return NextResponse.json(
        {
          error:
            error.message,
        },
        {
          status: 400,
        }
      );
    }

    const userId =
      data.user.id;

    const {
      error:
        profileError,
    } =
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

      return NextResponse.json(
        {
          error:
            profileError.message,
        },
        {
          status: 400,
        }
      );
    }

    // =========================================
    // ASSIGN DEFAULT SERVICES
    // =========================================

    let services: string[] = [];

    switch (role) {

      case "FACULTY":
        services = DEFAULT_SERVICES.FACULTY;
        break;

      case "STUDENT":
        services = DEFAULT_SERVICES.STUDENT;
        break;

      case "SUPER_ADMIN":
        services = DEFAULT_SERVICES.SUPER_ADMIN;
        break;

      default:
        services = [];

    }

    if (services.length > 0) {

      const rows =
        services.map(service => ({

          user_id: userId,

          service_code: service,

          is_active: true,

        }));

      const {
        error:
          serviceError,
      } =
        await supabaseAdmin
          .from("user_services")
          .insert(rows);

      if (serviceError) {

        return NextResponse.json(
          {
            error:
              serviceError.message,
          },
          {
            status: 400,
          }
        );

      }

    }

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Server Error",
      },
      {
        status: 500,
      }
    );

  }

}