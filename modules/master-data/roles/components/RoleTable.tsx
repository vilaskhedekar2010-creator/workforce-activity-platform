"use client";

import type { Role } from "../types/role";

interface RoleTableProps {
  roles: Role[];

  onEdit: (role: Role) => void;

  onArchive: (id: string) => void;

  onRestore: (id: string) => void;
}

export default function RoleTable({
  roles,
  onEdit,
  onArchive,
  onRestore,
}: RoleTableProps) {

  if (roles.length === 0) {

    return (
      <div className="rounded border p-6 text-center text-gray-500">
        No roles found.
      </div>
    );

  }

  return (

    <div className="overflow-x-auto rounded border">

      <table className="min-w-full border-collapse">

        <thead className="bg-gray-100">

          <tr>

            <th className="border p-3 text-left">
              Code
            </th>

            <th className="border p-3 text-left">
              Name
            </th>

            <th className="border p-3 text-left">
              Status
            </th>

            <th className="border p-3 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {roles.map(role => (

            <tr key={role.id}>

              <td className="border p-3">
                {role.code}
              </td>

              <td className="border p-3">
                {role.name}
              </td>

              <td className="border p-3">

                <span
                  className={`rounded px-2 py-1 text-xs font-semibold ${
                    role.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {role.status}
                </span>

              </td>

              <td className="border p-3">

                <div className="flex justify-center gap-2">

                  <button
                    onClick={() => onEdit(role)}
                    className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
                  >
                    Edit
                  </button>

                  {role.status === "ACTIVE" ? (

                    <button
                      onClick={() => onArchive(role.id)}
                      className="rounded bg-red-600 px-3 py-1 text-sm text-white"
                    >
                      Archive
                    </button>

                  ) : (

                    <button
                      onClick={() => onRestore(role.id)}
                      className="rounded bg-green-600 px-3 py-1 text-sm text-white"
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

    </div>

  );

}