"use client";

import { useState } from "react";

import RoleForm from "./components/RoleForm";
import RoleTable from "./components/RoleTable";

import { useRoles } from "./hooks/useRoles";

import type {
  Role,
  CreateRoleRequest,
  UpdateRoleRequest,
} from "./types/role";

export default function RoleManagement() {
  const {
    roles,
    createRole,
    updateRole,
    archiveRole,
    restoreRole,
  } = useRoles();

  const [selectedRole, setSelectedRole] =
    useState<Role>();

  const [isEditing, setIsEditing] =
    useState(false);

  const handleCreate = async (
    request: CreateRoleRequest | UpdateRoleRequest
  ) => {
    await createRole(request as CreateRoleRequest);

    setSelectedRole(undefined);
    setIsEditing(false);
  };

  const handleUpdate = async (
    request: CreateRoleRequest | UpdateRoleRequest
  ) => {
    await updateRole(request as UpdateRoleRequest);

    setSelectedRole(undefined);
    setIsEditing(false);
  };

  const handleEdit = (
    role: Role
  ) => {
    setSelectedRole(role);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setSelectedRole(undefined);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 p-6">

      <div>

        <h1 className="text-3xl font-bold">
          Role Management
        </h1>

        <p className="text-gray-500">
          Create and manage system roles.
        </p>

      </div>

      <div className="rounded-lg border bg-white p-6">

        <h2 className="mb-4 text-xl font-semibold">

          {isEditing
            ? "Edit Role"
            : "Create Role"}

        </h2>

        <RoleForm
          initialData={selectedRole}
          onSubmit={
            isEditing
              ? handleUpdate
              : handleCreate
          }
          onCancel={handleCancel}
        />

      </div>

      <RoleTable
        roles={roles}
        onEdit={handleEdit}
        onArchive={archiveRole}
        onRestore={restoreRole}
      />

    </div>
  );
}