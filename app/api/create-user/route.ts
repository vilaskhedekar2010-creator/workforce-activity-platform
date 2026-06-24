import { NextResponse } from "next/server";
import { supabaseAdmin }
from "@/lib/supabase-admin";

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

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

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