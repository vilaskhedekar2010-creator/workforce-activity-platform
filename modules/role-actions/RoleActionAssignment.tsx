"use client";

import { useEffect, useMemo, useState } from "react";

import RoleSelector from "./components/RoleSelector";
import ModuleActionCard from "./components/ModuleActionCard";
import SaveToolbar from "./components/SaveToolbar";

import UnsavedChangesDialog from "@/shared/components/UnsavedChangesDialog";

import { useRoleActions } from "./hooks/useRoleActions";

export default function RoleActionAssignment() {

  const {

    loading,

    roles,

    actions,

    selectedRoleId,

    selectedActions,

    isDirty,

    loadRole,

    save,

    toggleAction,

    setSelectedActions,

  } = useRoleActions();

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [pendingRoleId, setPendingRoleId] =
    useState<string | null>(null);

  useEffect(() => {

    if (
      roles.length > 0 &&
      !selectedRoleId
    ) {

      loadRole(
        roles[0].id
      );

    }

  }, [roles]);

  useEffect(() => {

    function beforeUnload(
      event: BeforeUnloadEvent
    ) {

      if (!isDirty) return;

      event.preventDefault();

      event.returnValue = "";

    }

    window.addEventListener(
      "beforeunload",
      beforeUnload
    );

    return () =>
      window.removeEventListener(
        "beforeunload",
        beforeUnload
      );

  }, [isDirty]);

  const groupedModules = useMemo(() => {

    const grouped:
      Record<string, typeof actions> = {};

    actions.forEach(action => {

      if (!grouped[action.module]) {

        grouped[action.module] = [];

      }

      grouped[action.module].push(action);

    });

    return grouped;

  }, [actions]);

  async function handleRoleChange(
    roleId: string
  ) {

    if (!isDirty) {

      await loadRole(roleId);

      return;

    }

    setPendingRoleId(roleId);

    setDialogOpen(true);

  }

  async function handleSaveAndContinue() {

    await save();

    setDialogOpen(false);

    if (pendingRoleId) {

      await loadRole(pendingRoleId);

      setPendingRoleId(null);

    }

  }

  async function handleDiscard() {

    setDialogOpen(false);

    if (pendingRoleId) {

      await loadRole(pendingRoleId);

      setPendingRoleId(null);

    }

  }

  function handleCancel() {

    setDialogOpen(false);

    setPendingRoleId(null);

  }

  function toggleModule(
    module: string,
    checked: boolean
  ) {

    const moduleActions =
      groupedModules[module] ?? [];

    if (checked) {

      const ids = new Set(selectedActions);

      moduleActions.forEach(action =>
        ids.add(action.id)
      );

      setSelectedActions(
        Array.from(ids)
      );

    } else {

      const ids =
        selectedActions.filter(
          id =>
            !moduleActions.some(
              action =>
                action.id === id
            )
        );

      setSelectedActions(ids);

    }

  }

  function selectAll() {

    setSelectedActions(

      actions.map(
        action => action.id
      )

    );

  }

  function clearAll() {

    setSelectedActions([]);

  }

  if (loading) {

    return (
      <div className="p-8">
        Loading...
      </div>
    );

  }

  return (

    <>

      <UnsavedChangesDialog

        open={dialogOpen}

        onSave={handleSaveAndContinue}

        onDiscard={handleDiscard}

        onCancel={handleCancel}

      />

      <div className="space-y-6">

        <SaveToolbar

          onSelectAll={selectAll}

          onClearAll={clearAll}

          onSave={save}

          disabled={!isDirty}

        />

        <RoleSelector

          roles={roles}

          selectedRoleId={selectedRoleId}

          onChange={handleRoleChange}

        />

        <div className="space-y-5">
                      {Object.entries(groupedModules).map(

            ([module, moduleActions]) => (

              <ModuleActionCard

                key={module}

                module={module}

                actions={moduleActions}

                selectedActions={selectedActions}

                onToggleAction={toggleAction}

                onToggleModule={toggleModule}

              />

            )

          )}

        </div>

      </div>

    </>

  );

}