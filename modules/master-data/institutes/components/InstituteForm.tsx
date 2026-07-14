"use client";

import { useEffect, useState } from "react";

import type {
  CreateInstituteRequest,
  UpdateInstituteRequest,
  Institute,
} from "../types/institute";

interface InstituteFormProps {
  initialData?: Institute;

  onSubmit: (
    data: CreateInstituteRequest | UpdateInstituteRequest
  ) => Promise<void>;

  onCancel: () => void;

  loading?: boolean;
}

export default function InstituteForm({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
}: InstituteFormProps) {
  const emptyForm = {
    code: "",
    name: "",
    shortName: "",
    description: "",
    email: "",
    phone: "",
    website: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  };

  const [form, setForm] = useState(emptyForm);

  /**
   * Populate form whenever Edit is clicked.
   * Also clears the form when switching back to Create mode.
   */
  useEffect(() => {
    if (initialData) {
      setForm({
        code: initialData.code ?? "",
        name: initialData.name ?? "",
        shortName: initialData.shortName ?? "",
        description: initialData.description ?? "",
        email: initialData.email ?? "",
        phone: initialData.phone ?? "",
        website: initialData.website ?? "",
        addressLine1: initialData.addressLine1 ?? "",
        addressLine2: initialData.addressLine2 ?? "",
        city: initialData.city ?? "",
        state: initialData.state ?? "",
        country: initialData.country ?? "",
        postalCode: initialData.postalCode ?? "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (initialData) {
      await onSubmit({
        id: initialData.id,
        ...form,
      });
    } else {
      await onSubmit(form);
      setForm(emptyForm);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        name="code"
        placeholder="Institute Code"
        value={form.code}
        onChange={handleChange}
        disabled={!!initialData}
        className="w-full rounded border p-2"
      />

      <input
        name="name"
        placeholder="Institute Name"
        value={form.name}
        onChange={handleChange}
        className="w-full rounded border p-2"
      />

      <input
        name="shortName"
        placeholder="Short Name"
        value={form.shortName}
        onChange={handleChange}
        className="w-full rounded border p-2"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full rounded border p-2"
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full rounded border p-2"
      />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        className="w-full rounded border p-2"
      />

      <input
        name="website"
        placeholder="Website"
        value={form.website}
        onChange={handleChange}
        className="w-full rounded border p-2"
      />

      <input
        name="addressLine1"
        placeholder="Address Line 1"
        value={form.addressLine1}
        onChange={handleChange}
        className="w-full rounded border p-2"
      />

      <input
        name="addressLine2"
        placeholder="Address Line 2"
        value={form.addressLine2}
        onChange={handleChange}
        className="w-full rounded border p-2"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="rounded border p-2"
        />

        <input
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          className="rounded border p-2"
        />

        <input
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          className="rounded border p-2"
        />

        <input
          name="postalCode"
          placeholder="Postal Code"
          value={form.postalCode}
          onChange={handleChange}
          className="rounded border p-2"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          {initialData ? "Update" : "Create"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded border px-4 py-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}