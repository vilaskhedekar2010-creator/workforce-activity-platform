"use client";

import { useState } from "react";

import DepartmentForm from "./components/DepartmentForm";
import DepartmentTable from "./components/DepartmentTable";

import { useDepartments } from "./hooks/useDepartments";

import type {
  Department,
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
} from "./types/department";

export default function DepartmentManagement() {
  const {
    departments,
    createDepartment,
    updateDepartment,
    archiveDepartment,
    restoreDepartment,
  } = useDepartments();

  const [selectedDepartment, setSelectedDepartment] =
    useState<Department>();

  const [isEditing, setIsEditing] =
    useState(false);

  const handleCreate = async (
    request: CreateDepartmentRequest | UpdateDepartmentRequest
  ) => {
    await createDepartment(request as CreateDepartmentRequest);

    setSelectedDepartment(undefined);
    setIsEditing(false);
  };

  const handleUpdate = async (
    request: CreateDepartmentRequest | UpdateDepartmentRequest
  ) => {
    await updateDepartment(request as UpdateDepartmentRequest);

    setSelectedDepartment(undefined);
    setIsEditing(false);
  };

  const handleEdit = (
    department: Department
  ) => {
    setSelectedDepartment(department);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setSelectedDepartment(undefined);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 p-6">

      <div>
        <h1 className="text-3xl font-bold">
          Department Management
        </h1>

        <p className="text-gray-500">
          Create, update and manage departments.
        </p>
      </div>

      <div className="rounded-lg border bg-white p-6">

        <h2 className="mb-4 text-xl font-semibold">
          {isEditing
            ? "Edit Department"
            : "Create Department"}
        </h2>

        <DepartmentForm
          initialData={selectedDepartment}
          onSubmit={
            isEditing
              ? handleUpdate
              : handleCreate
          }
          onCancel={handleCancel}
        />

      </div>

      <DepartmentTable
        departments={departments}
        onEdit={handleEdit}
        onArchive={archiveDepartment}
        onRestore={restoreDepartment}
      />

    </div>
  );
}