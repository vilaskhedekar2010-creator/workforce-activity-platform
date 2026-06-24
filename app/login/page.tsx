"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

      const handleLogin = async () => {

        const {
          data,
          error,
        } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {

          alert(error.message);

          return;
        }

        const userId =
          data.user?.id;

        if (!userId) {

          alert("User not found");

          return;
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
          .eq("id", userId)
          .single();

        if (
          profileError ||
          !profile
        ) {

          await supabase.auth.signOut();

          alert(
            "Profile not found"
          );

          return;
        }

        if (
          profile.status ===
          "INACTIVE"
        ) {

          await supabase.auth.signOut();

          alert(
            "Your account is inactive. Contact administrator."
          );

          return;
        }

        if (
          profile.status ===
          "SUSPENDED"
        ) {

          await supabase.auth.signOut();

          alert(
            "Your account has been suspended."
          );

          return;
        }

        if (
          profile.must_change_password
        ) {

          window.location.href =
            "/change-password";

          return;
        }

        window.location.href =
          "/dashboard";
      };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg border p-6 shadow">
        <h1 className="mb-4 text-2xl font-bold">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-4 w-full rounded border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full rounded bg-black p-2 text-white"
        >
          Login
        </button>
      </div>
    </div>
  );
}