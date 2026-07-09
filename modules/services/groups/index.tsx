"use client";

import { useState } from "react";

import { useGroups } from "./hooks/useGroups";

import GroupDialog from "./dialogs/GroupDialog";

import GroupList from "./components/GroupList";

export default function Groups() {

  const {

    groups,

    addGroup,

    editGroup,

  } = useGroups();

  const [open, setOpen] = useState(false);

  return (

    <div className="p-6">

      <div className="mb-6 flex items-center justify-between">

        <h1 className="text-2xl font-bold">

          Groups ({groups.length})

        </h1>

        <button
          onClick={() => setOpen(true)}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >

          + Add Group

        </button>

      </div>

      <GroupList

        groups={groups}

        onEdit={editGroup}

      />

      <GroupDialog

        open={open}

        title="Create Group"

        onClose={() => setOpen(false)}

        onSave={async (name) => {

          await addGroup(name);

        }}

      />

    </div>

  );

}