"use client";

import { useEffect, useState } from "react";

import type {
  Role,
  CreateRoleRequest,
  UpdateRoleRequest,
} from "../types/role";

interface RoleFormProps {
  initialData?: Role;

  onSubmit: (
    data: CreateRoleRequest | UpdateRoleRequest
  ) => Promise<void>;

  onCancel: () => void;

  loading?: boolean;
}

export default function RoleForm({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
}: RoleFormProps) {

  const emptyForm = {
    code: "",
    name: "",
    description: "",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {

    if (initialData) {

      setForm({
        code: initialData.code,
        name: initialData.name,
        description: initialData.description ?? "",
      });

    } else {

      setForm(emptyForm);

    }

  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {

    setForm(prev => ({
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
        placeholder="Role Code"
        value={form.code}
        onChange={handleChange}
        disabled={!!initialData}
        className="w-full rounded border p-2"
      />

      <input
        name="name"
        placeholder="Role Name"
        value={form.name}
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