"use client";

import type { Group } from "../types/group.types";

interface GroupListProps {

  groups: Group[];

  onEdit: (group: Group) => void;

  onArchive: (group: Group) => void;

  onRestore: (group: Group) => void;

}

export default function GroupList({

  groups,

  onEdit,

  onArchive,

  onRestore,

}: GroupListProps) {

  return (

    <table className="w-full border">

      <thead>

        <tr className="bg-gray-100">

          <th className="border px-3 py-2 text-left">
            Name
          </th>

          <th className="border px-3 py-2 text-left">
            Type
          </th>

          <th className="border px-3 py-2 text-left">
            Status
          </th>

          <th className="border px-3 py-2 text-center">
            Actions
          </th>

        </tr>

      </thead>

      <tbody>

        {groups.map((group) => (

          <tr key={group.id}>

            <td className="border px-3 py-2">

              {group.name}

            </td>

            <td className="border px-3 py-2">

              {group.groupType}

            </td>

            <td className="border px-3 py-2">

              {group.status}

            </td>

            <td className="border px-3 py-2 text-center">

              <div className="flex justify-center gap-2">

                <button
                  onClick={() => onEdit(group)}
                  className="rounded bg-yellow-500 px-3 py-1 text-white"
                >
                  Edit
                </button>

                {group.status === "ACTIVE" ? (

                  <button
                    onClick={() => onArchive(group)}
                    className="rounded bg-red-600 px-3 py-1 text-white"
                  >
                    Archive
                  </button>

                ) : (

                  <button
                    onClick={() => onRestore(group)}
                    className="rounded bg-green-600 px-3 py-1 text-white"
                  >
                    Restore
                  </button>

                )}

              </div>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  );

}