"use client";

import { useState } from "react";

import { useGroups } from "./hooks/useGroups";

import GroupToolbar from "./components/GroupToolbar";
import GroupList from "./components/GroupList";
import GroupDialog from "./dialogs/GroupDialog";

import type { Group } from "./types/group.types";

export default function Groups() {

  const {

    groups,

    addGroup,

    updateGroup,

    archiveGroup,

    restoreGroup,

  } = useGroups();

  const [open, setOpen] = useState(false);

  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const handleCreate = () => {

    setSelectedGroup(null);

    setOpen(true);

  };

  const handleEdit = (

    group: Group

  ) => {

    setSelectedGroup(group);

    setOpen(true);

  };

  const handleArchive = async (

    group: Group

  ) => {

    const confirmed = window.confirm(

      `Archive "${group.name}" ?`

    );

    if (!confirmed) return;

    await archiveGroup(group.id);

  };

  const handleRestore = async (

    group: Group

  ) => {

    const confirmed = window.confirm(

      `Restore "${group.name}" ?`

    );

    if (!confirmed) return;

    await restoreGroup(group.id);

  };

  const handleClose = () => {

    setSelectedGroup(null);

    setOpen(false);

  };

  const handleSave = async (

    name: string

  ) => {

    if (selectedGroup) {

      await updateGroup(

        selectedGroup.id,

        name

      );

    } else {

      await addGroup(name);

    }

    handleClose();

  };

  return (

    <div className="p-6">

      <GroupToolbar

        totalGroups={groups.length}

        onAddGroup={handleCreate}

      />

      <GroupList

        groups={groups}

        onEdit={handleEdit}

        onArchive={handleArchive}

        onRestore={handleRestore}

      />

      <GroupDialog

        open={open}

        title={

          selectedGroup
            ? "Edit Group"
            : "Create Group"

        }

        initialName={

          selectedGroup?.name ?? ""

        }

        onClose={handleClose}

        onSave={handleSave}

      />

    </div>

  );

}