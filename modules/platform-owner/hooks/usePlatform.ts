"use client";

import { useState } from "react";

import { platformService }
from "../services/PlatformService";

import type {
  CreateSuperAdminRequest,
} from "../types/platform";

export function usePlatform() {

  const [loading, setLoading] =
    useState(false);

  async function createSuperAdmin(
    request: CreateSuperAdminRequest
  ) {

    setLoading(true);

    try {

      await platformService
        .createSuperAdmin(request);

    } finally {

      setLoading(false);

    }

  }

  return {

    loading,

    createSuperAdmin,

  };

}