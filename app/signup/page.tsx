"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-client";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {

    const {
      data,
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {

      alert(error.message);

      return;
    }

    if (data.user) {

      const {
        error: profileError,
      } = await supabase
        .from("profiles")
        .insert([
          {
            id: data.user.id,
            email: data.user.email,
            role: "STUDENT",
            status: "ACTIVE",
          },
        ]);

      if (profileError) {

        alert(profileError.message);

        return;
      }
    }

    alert("Signup successful");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg border p-6 shadow">
        <h1 className="mb-4 text-2xl font-bold">Signup</h1>

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
          onClick={handleSignup}
          className="w-full rounded bg-black p-2 text-white"
        >
          Signup
        </button>
      </div>
    </div>
  );
}