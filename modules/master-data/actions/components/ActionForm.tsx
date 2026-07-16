"use client";

import { useEffect, useState } from "react";

import type {
  Action,
  CreateActionRequest,
  UpdateActionRequest,
} from "../types/action";

interface ActionFormProps {
  initialData?: Action;

  onSubmit: (
    data: CreateActionRequest | UpdateActionRequest
  ) => Promise<void>;

  onCancel: () => void;

  loading?: boolean;
}

export default function ActionForm({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
}: ActionFormProps) {

  const emptyForm = {
    module: "",
    action: "",
    code: "",
    description: "",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        module: initialData.module,
        action: initialData.action,
        code: initialData.code,
        description: initialData.description ?? "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  useEffect(() => {
    if (!initialData) {
      const module = form.module
        .trim()
        .toUpperCase()
        .replace(/\s+/g, "_");

      const action = form.action
        .trim()
        .toUpperCase()
        .replace(/\s+/g, "_");

      setForm(prev => ({
        ...prev,
        code:
          module && action
            ? `${module}_${action}`
            : "",
      }));
    }
  }, [form.module, form.action]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {

    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value,
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
        name="module"
        placeholder="Module"
        value={form.module}
        onChange={handleChange}
        className="w-full rounded border p-2"
      />

      <input
        name="action"
        placeholder="Action"
        value={form.action}
        onChange={handleChange}
        className="w-full rounded border p-2"
      />

      <input
        name="code"
        placeholder="Action Code"
        value={form.code}
        readOnly
        className="w-full rounded border bg-gray-100 p-2"
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