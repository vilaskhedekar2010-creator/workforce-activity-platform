"use client";

import type { Group } from "../types/group.types";

interface GroupListProps {

  groups: Group[];

  onEdit: (id: string, name: string) => void;

}

export default function GroupList({

  groups,

  onEdit,

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
            Action
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

              <button
                onClick={() => onEdit(group.id, group.name)}
                className="rounded bg-yellow-500 px-3 py-1 text-white"
              >
                Edit
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  );

}