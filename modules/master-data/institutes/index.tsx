"use client";

import { useState } from "react";

import { useInstitutes } from "./hooks/useInstitutes";

import InstituteForm from "./components/InstituteForm";
import InstituteTable from "./components/InstituteTable";

import type {
  Institute,
  CreateInstituteRequest,
  UpdateInstituteRequest,
} from "./types/institute";

export default function InstituteManagement() {
  const {
    institutes,
    createInstitute,
    updateInstitute,
    archiveInstitute,
    restoreInstitute,
  } = useInstitutes();

  const [selectedInstitute, setSelectedInstitute] =
    useState<Institute | undefined>();

  const [isEditing, setIsEditing] =
    useState(false);

  const handleCreate = async (
    request: CreateInstituteRequest | UpdateInstituteRequest
  ) => {
    await createInstitute(request as CreateInstituteRequest);

    setSelectedInstitute(undefined);
    setIsEditing(false);
  };

  const handleUpdate = async (
    request: CreateInstituteRequest | UpdateInstituteRequest
  ) => {
    await updateInstitute(request as UpdateInstituteRequest);

    setSelectedInstitute(undefined);
    setIsEditing(false);
  };

  const handleEdit = (
    institute: Institute
  ) => {
    setSelectedInstitute(institute);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setSelectedInstitute(undefined);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 p-6">

      <div>
        <h1 className="text-3xl font-bold">
          Institute Management
        </h1>

        <p className="text-gray-500">
          Create, update and manage institutes.
        </p>
      </div>

      <div className="rounded-lg border bg-white p-6">

        <h2 className="mb-4 text-xl font-semibold">
          {isEditing
            ? "Edit Institute"
            : "Create Institute"}
        </h2>

        <InstituteForm
          initialData={selectedInstitute}
          onSubmit={
            isEditing
              ? handleUpdate
              : handleCreate
          }
          onCancel={handleCancel}
        />

      </div>

      <InstituteTable
        institutes={institutes}
        onEdit={handleEdit}
        onArchive={archiveInstitute}
        onRestore={restoreInstitute}
      />

    </div>
  );
}