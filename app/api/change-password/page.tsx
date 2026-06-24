"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-client";

export default function ChangePasswordPage() {

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const handleChangePassword =
    async () => {

      if (
        password !==
        confirmPassword
      ) {

        alert(
          "Passwords do not match"
        );

        return;
      }

      if (
        password.length < 6
      ) {

        alert(
          "Password must be at least 6 characters"
        );

        return;
      }

      const {
        data: { user },
      } = await supabase
        .auth
        .getUser();

      if (!user) {

        alert(
          "User not found"
        );

        return;
      }

      const {
        error:
        passwordError,
      } = await supabase
        .auth
        .updateUser({
          password,
        });

      if (
        passwordError
      ) {

        alert(
          passwordError.message
        );

        return;
      }

      const {
        error:
        profileError,
      } = await supabase

        .from("profiles")

        .update({
          must_change_password:
            false,
        })

        .eq(
          "id",
          user.id
        );

      if (
        profileError
      ) {

        alert(
          profileError.message
        );

        return;
      }

      alert(
        "Password updated successfully"
      );

      window.location.href =
        "/dashboard";
    };

  return (

    <div className="flex min-h-screen items-center justify-center bg-gray-100">

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-6 text-3xl font-bold">

          Change Password

        </h1>

        <p className="mb-6 text-gray-600">

          Please change your password before continuing.

        </p>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="mb-4 w-full rounded border p-3"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          className="mb-6 w-full rounded border p-3"
        />

        <button
          onClick={
            handleChangePassword
          }
          className="w-full rounded bg-blue-600 p-3 text-white"
        >
          Update Password
        </button>

      </div>

    </div>
  );
}