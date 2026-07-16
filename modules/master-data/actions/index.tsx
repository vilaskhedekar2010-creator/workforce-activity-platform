"use client";

import { useState } from "react";

import ActionForm from "./components/ActionForm";
import ActionTable from "./components/ActionTable";

import { useActions } from "./hooks/useActions";

import type {
  Action,
  CreateActionRequest,
  UpdateActionRequest,
} from "./types/action";

export default function ActionManagement() {
  const {
    actions,
    createAction,
    updateAction,
    archiveAction,
    restoreAction,
  } = useActions();

  const [selectedAction, setSelectedAction] =
    useState<Action>();

  const [isEditing, setIsEditing] =
    useState(false);

  const handleCreate = async (
    request: CreateActionRequest | UpdateActionRequest
  ) => {
    await createAction(request as CreateActionRequest);

    setSelectedAction(undefined);
    setIsEditing(false);
  };

  const handleUpdate = async (
    request: CreateActionRequest | UpdateActionRequest
  ) => {
    await updateAction(request as UpdateActionRequest);

    setSelectedAction(undefined);
    setIsEditing(false);
  };

  const handleEdit = (
    action: Action
  ) => {
    setSelectedAction(action);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setSelectedAction(undefined);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 p-6">

      <div>

        <h1 className="text-3xl font-bold">
          Action Management
        </h1>

        <p className="text-gray-500">
          Create and manage system actions.
        </p>

      </div>

      <div className="rounded-lg border bg-white p-6">

        <h2 className="mb-4 text-xl font-semibold">

          {isEditing
            ? "Edit Action"
            : "Create Action"}

        </h2>

        <ActionForm
          initialData={selectedAction}
          onSubmit={
            isEditing
              ? handleUpdate
              : handleCreate
          }
          onCancel={handleCancel}
        />

      </div>

      <ActionTable
        actions={actions}
        onEdit={handleEdit}
        onArchive={archiveAction}
        onRestore={restoreAction}
      />

    </div>
  );
}