import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

import { saveRoleActions } from "@/modules/role-actions/application/SaveRoleActions";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(
  request: NextRequest
) {
  try {
    const authHeader =
      request.headers.get("Authorization");

    if (!authHeader) {
      return NextResponse.json(
        {
          success: false,
          message: "Authorization header missing.",
        },
        {
          status: 401,
        }
      );
    }

    const token = authHeader.replace(
      "Bearer ",
      ""
    );

    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const body = await request.json();

    const result =
      await saveRoleActions(
        body,
        user.id
      );

    return NextResponse.json(result);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save role actions.",
      },
      {
        status: 500,
      }
    );

  }
}