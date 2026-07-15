"use client";

import { useEffect, useState } from "react";

import { useInstitutes } from "../../institutes/hooks/useInstitutes";

import type {
  Department,
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
} from "../types/department";

interface DepartmentFormProps {
  initialData?: Department;

  onSubmit: (
    data: CreateDepartmentRequest | UpdateDepartmentRequest
  ) => Promise<void>;

  onCancel: () => void;

  loading?: boolean;
}

export default function DepartmentForm({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
}: DepartmentFormProps) {

  const { institutes } = useInstitutes();

  const emptyForm = {
    instituteId: "",

    code: "",

    name: "",

    shortName: "",

    description: "",

    email: "",

    phone: "",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {

    if (initialData) {

      setForm({
        instituteId: initialData.instituteId,

        code: initialData.code,

        name: initialData.name,

        shortName: initialData.shortName ?? "",

        description: initialData.description ?? "",

        email: initialData.email ?? "",

        phone: initialData.phone ?? "",
      });

    } else {

      setForm(emptyForm);

    }

  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
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

      <select
        name="instituteId"
        value={form.instituteId}
        onChange={handleChange}
        className="w-full rounded border p-2"
      >

        <option value="">
          Select Institute
        </option>

        {institutes.map((institute) => (

          <option
            key={institute.id}
            value={institute.id}
          >

            {institute.code} | {institute.name}

          </option>

        ))}

      </select>

      <input
        name="code"
        placeholder="Department Code"
        value={form.code}
        onChange={handleChange}
        disabled={!!initialData}
        className="w-full rounded border p-2"
      />

      <input
        name="name"
        placeholder="Department Name"
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