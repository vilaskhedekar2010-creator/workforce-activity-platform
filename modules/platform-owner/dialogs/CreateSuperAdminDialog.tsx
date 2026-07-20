"use client";

import { useState } from "react";

import { usePlatform } from "../hooks/usePlatform";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CreateSuperAdminDialog({
  open,
  onClose,
}: Props) {
  const { createSuperAdmin, loading } = usePlatform();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  if (!open) return null;

  async function handleSave() {
    if (!fullName.trim()) {
      alert("Please enter Full Name");
      return;
    }

    if (!email.trim()) {
      alert("Please enter Email");
      return;
    }

    if (!password.trim()) {
      alert("Please enter Password");
      return;
    }

    try {
      await createSuperAdmin({
        full_name: fullName,
        email,
        password,
        mobile_number: mobileNumber,
      });

      alert("Super Admin created successfully.");

      setFullName("");
      setEmail("");
      setPassword("");
      setMobileNumber("");

      onClose();
    } catch (error: any) {
      alert(error.message || "Failed to create Super Admin");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[500px] rounded-xl bg-white p-6 shadow-xl">

        <h2 className="mb-6 text-2xl font-bold">
          Create Super Admin
        </h2>

        <input
          className="mb-4 w-full rounded border p-3"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          className="mb-4 w-full rounded border p-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="mb-4 w-full rounded border p-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="mb-6 w-full rounded border p-3"
          placeholder="Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
          >
            {loading ? "Creating..." : "Save"}
          </button>

        </div>

      </div>
    </div>
  );
}