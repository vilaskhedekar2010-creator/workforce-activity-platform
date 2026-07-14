"use client";

import { useCallback, useEffect, useState } from "react";

import { InstituteService } from "../services/InstituteService";

import type {
  Institute,
  CreateInstituteRequest,
  UpdateInstituteRequest,
} from "../types/institute";

export function useInstitutes() {
  const service = new InstituteService();

  const [institutes, setInstitutes] = useState<Institute[]>([]);

  const loadInstitutes = useCallback(async () => {
    const result = await service.getAll();

    setInstitutes(result);
  }, []);

  useEffect(() => {
    loadInstitutes();
  }, [loadInstitutes]);

  const createInstitute = async (
    request: CreateInstituteRequest
  ) => {
    await service.create(request);

    await loadInstitutes();
  };

  const updateInstitute = async (
    request: UpdateInstituteRequest
  ) => {
    await service.update(request);

    await loadInstitutes();
  };

  const archiveInstitute = async (
    id: string
  ) => {
    await service.archive(id);

    await loadInstitutes();
  };

  const restoreInstitute = async (
    id: string
  ) => {
    await service.restore(id);

    await loadInstitutes();
  };

  return {
    institutes,

    createInstitute,

    updateInstitute,

    archiveInstitute,

    restoreInstitute,

    refreshInstitutes: loadInstitutes,
  };
}