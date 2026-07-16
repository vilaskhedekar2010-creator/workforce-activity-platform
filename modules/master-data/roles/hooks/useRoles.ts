"use client";

import { useCallback, useEffect, useState } from "react";

import { roleService } from "../services/RoleService";

import type {
  Role,
  CreateRoleRequest,
  UpdateRoleRequest,
} from "../types/role";

export function useRoles() {
  const [roles, setRoles] = useState<Role[]>([]);

  const loadRoles = useCallback(async () => {
    const result = await roleService.getAll();
    setRoles(result);
  }, []);

  useEffect(() => {
    loadRoles();
  }, [loadRoles]);

  const createRole = async (
    request: CreateRoleRequest
  ) => {
    await roleService.create(request);
    await loadRoles();
  };

  const updateRole = async (
    request: UpdateRoleRequest
  ) => {
    await roleService.update(request);
    await loadRoles();
  };

  const archiveRole = async (
    id: string
  ) => {
    await roleService.archive(id);
    await loadRoles();
  };

  const restoreRole = async (
    id: string
  ) => {
    await roleService.restore(id);
    await loadRoles();
  };

  return {
    roles,

    createRole,

    updateRole,

    archiveRole,

    restoreRole,

    refreshRoles: loadRoles,
  };
}