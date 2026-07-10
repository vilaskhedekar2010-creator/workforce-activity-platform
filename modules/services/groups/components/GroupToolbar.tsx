"use client";

interface GroupToolbarProps {

  totalGroups: number;

  onAddGroup: () => void;

}

export default function GroupToolbar({

  totalGroups,

  onAddGroup,

}: GroupToolbarProps) {

  return (

    <div className="mb-6 flex items-center justify-between">

      <div>

        <h1 className="text-2xl font-bold">

          Group Management

        </h1>

        <p className="text-sm text-gray-500">

          Total Groups : {totalGroups}

        </p>

      </div>

      <div className="flex items-center gap-2">

        <button
          className="rounded bg-blue-600 px-4 py-2 text-white"
          onClick={onAddGroup}
        >
          + Add Group
        </button>

      </div>

    </div>

  );

}