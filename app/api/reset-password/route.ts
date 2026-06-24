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
      userId,
      password,
    } = body;

    const {
      error,
    } =
      await supabaseAdmin
        .auth
        .admin
        .updateUserById(
          userId,
          {
            password,
          }
        );

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

    const {
      error:
      profileError,
    } =
      await supabaseAdmin
        .from("profiles")
        .update({
          must_change_password:
            true,
        })
        .eq(
          "id",
          userId
        );

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

  } catch {

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