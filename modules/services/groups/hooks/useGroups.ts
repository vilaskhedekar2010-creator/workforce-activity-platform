"use client";

import { useCallback, useEffect, useState } from "react";

import { GroupService } from "../services/group.service";
import type { Group } from "../types/group.types";

export function useGroups() {

  const service = new GroupService();

  const [groups, setGroups] = useState<Group[]>([]);

  const loadGroups = useCallback(async () => {

    const result = await service.getGroups();

    setGroups(result);

  }, []);

  useEffect(() => {

    loadGroups();

  }, [loadGroups]);

  const addGroup = async (

    name: string

  ) => {

    if (!name.trim()) return;

    await service.createGroup(name);

    await loadGroups();

  };

  const updateGroup = async (

    id: string,

    name: string

  ) => {

    if (!name.trim()) return;

    await service.updateGroup(id, name);

    await loadGroups();

  };

  const archiveGroup = async (

    id: string

  ) => {

    await service.archiveGroup(id);

    await loadGroups();

  };

  const restoreGroup = async (

    id: string

  ) => {

    await service.restoreGroup(id);

    await loadGroups();

  };

  return {

    groups,

    addGroup,

    updateGroup,

    archiveGroup,

    restoreGroup,

    refreshGroups: loadGroups,

  };

}