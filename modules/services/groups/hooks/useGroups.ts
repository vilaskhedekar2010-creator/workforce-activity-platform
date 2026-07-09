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

  const editGroup = async (

    id: string,

    currentName: string

  ) => {

    const newName = prompt(

      "Update Group Name",

      currentName

    );

    if (!newName) return;

    await service.updateGroup(

      id,

      newName

    );

    await loadGroups();

  };

  return {

    groups,

    addGroup,

    editGroup,

  };

}