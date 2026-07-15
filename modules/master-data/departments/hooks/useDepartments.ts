"use client";

import { useCallback, useEffect, useState } from "react";

import { DepartmentService } from "../services/DepartmentService";

import type {
  Department,
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
} from "../types/department";

export function useDepartments() {
  const service = new DepartmentService();

  const [departments, setDepartments] = useState<Department[]>([]);

  const loadDepartments = useCallback(async () => {
    const result = await service.getAll();
    setDepartments(result);
  }, []);

  useEffect(() => {
    loadDepartments();
  }, [loadDepartments]);

  const createDepartment = async (
    request: CreateDepartmentRequest
  ) => {
    await service.create(request);
    await loadDepartments();
  };

  const updateDepartment = async (
    request: UpdateDepartmentRequest
  ) => {
    await service.update(request);
    await loadDepartments();
  };

  const archiveDepartment = async (
    id: string
  ) => {
    await service.archive(id);
    await loadDepartments();
  };

  const restoreDepartment = async (
    id: string
  ) => {
    await service.restore(id);
    await loadDepartments();
  };

  return {
    departments,
    createDepartment,
    updateDepartment,
    archiveDepartment,
    restoreDepartment,
    refreshDepartments: loadDepartments,
  };
}