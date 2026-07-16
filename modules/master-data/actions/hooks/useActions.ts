"use client";

import { useCallback, useEffect, useState } from "react";

import { actionService } from "../services/ActionService";

import type {
  Action,
  CreateActionRequest,
  UpdateActionRequest,
} from "../types/action";

export function useActions() {
  const [actions, setActions] = useState<Action[]>([]);

  const loadActions = useCallback(async () => {
    const result = await actionService.getAll();
    setActions(result);
  }, []);

  useEffect(() => {
    loadActions();
  }, [loadActions]);

  const createAction = async (
    request: CreateActionRequest
  ) => {
    await actionService.create(request);
    await loadActions();
  };

  const updateAction = async (
    request: UpdateActionRequest
  ) => {
    await actionService.update(request);
    await loadActions();
  };

  const archiveAction = async (
    id: string
  ) => {
    await actionService.archive(id);
    await loadActions();
  };

  const restoreAction = async (
    id: string
  ) => {
    await actionService.restore(id);
    await loadActions();
  };

  return {
    actions,

    createAction,

    updateAction,

    archiveAction,

    restoreAction,

    refreshActions: loadActions,
  };
}