"use client";

import { useEffect, useState } from "react";

import {
  roleActionService,
} from "../services/RoleActionService";

import type {
  ActionDto,
  RoleDto,
} from "../repository/RoleActionRepository";

export function useRoleActions() {

  const [roles, setRoles] =
    useState<RoleDto[]>([]);

  const [actions, setActions] =
    useState<ActionDto[]>([]);

  const [selectedRoleId,
    setSelectedRoleId] =
    useState("");

  const [selectedActions,
    setSelectedActions] =
    useState<string[]>([]);

  const [originalActions,
    setOriginalActions] =
    useState<string[]>([]);

  const [isDirty,
    setIsDirty] =
    useState(false);

  const [loading,
    setLoading] =
    useState(false);

  useEffect(() => {

    async function load() {

      setLoading(true);

      const [
        roles,
        actions,
      ] = await Promise.all([

        roleActionService.getRoles(),

        roleActionService.getActions(),

      ]);

      setRoles(roles);

      setActions(actions);

      setLoading(false);

    }

    load();

  }, []);

  async function loadRole(
    roleId: string
  ) {

    setSelectedRoleId(roleId);

    const ids =
      await roleActionService.getRoleActionIds(
        roleId
      );

    setSelectedActions(ids);

    setOriginalActions(ids);

    setIsDirty(false);

  }

  async function save() {

    if (!selectedRoleId) return;

    await roleActionService.saveRoleActions(
      selectedRoleId,
      selectedActions
    );

    setOriginalActions(selectedActions);

    setIsDirty(false);

  }

  function toggleAction(
    id: string,
    checked: boolean
  ) {

    let updated: string[];

    if (checked) {

      updated = [

        ...selectedActions,

        id,

      ];

    } else {

      updated = selectedActions.filter(

        actionId => actionId !== id

      );

    }

    setSelectedActions(updated);

    const changed =

      updated.length !== originalActions.length ||

      updated.some(

        actionId => !originalActions.includes(actionId)

      );
          setIsDirty(changed);

  }

  function setActionsSelection(
    ids: string[]
  ) {

    setSelectedActions(ids);

    const changed =

      ids.length !== originalActions.length ||

      ids.some(

        actionId => !originalActions.includes(actionId)

      );

    setIsDirty(changed);

  }

  return {

    loading,

    roles,

    actions,

    selectedRoleId,

    selectedActions,

    originalActions,

    isDirty,

    loadRole,

    save,

    toggleAction,

    setSelectedActions: setActionsSelection,

    setIsDirty,

  };

}