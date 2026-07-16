"use client";

import type { Action } from "../types/action";

interface ActionTableProps {
  actions: Action[];
  onEdit: (action: Action) => void;
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
}

export default function ActionTable({
  actions,
  onEdit,
  onArchive,
  onRestore,
}: ActionTableProps) {

  if (actions.length === 0) {
    return (
      <div className="rounded border p-6 text-center text-gray-500">
        No actions found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded border">

      <table className="min-w-full border-collapse">

        <thead className="bg-gray-100">

          <tr>

            <th className="border p-3">Module</th>

            <th className="border p-3">Action</th>

            <th className="border p-3">Code</th>

            <th className="border p-3">Status</th>

            <th className="border p-3">Actions</th>

          </tr>

        </thead>

        <tbody>

          {actions.map(item => (

            <tr key={item.id}>

              <td className="border p-3">{item.module}</td>

              <td className="border p-3">{item.action}</td>

              <td className="border p-3">{item.code}</td>

              <td className="border p-3">

                {item.status}

              </td>

              <td className="border p-3">

                <button
                  onClick={() => onEdit(item)}
                  className="mr-2 rounded bg-blue-600 px-3 py-1 text-white"
                >
                  Edit
                </button>

                {item.status === "ACTIVE" ? (

                  <button
                    onClick={() => onArchive(item.id)}
                    className="rounded bg-red-600 px-3 py-1 text-white"
                  >
                    Archive
                  </button>

                ) : (

                  <button
                    onClick={() => onRestore(item.id)}
                    className="rounded bg-green-600 px-3 py-1 text-white"
                  >
                    Restore
                  </button>

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}