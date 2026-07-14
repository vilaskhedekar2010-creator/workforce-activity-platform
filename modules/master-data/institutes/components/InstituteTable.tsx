"use client";

import type { Institute } from "../types/institute";

interface InstituteTableProps {
  institutes: Institute[];

  onEdit: (institute: Institute) => void;

  onArchive: (id: string) => void;

  onRestore: (id: string) => void;
}

export default function InstituteTable({
  institutes,
  onEdit,
  onArchive,
  onRestore,
}: InstituteTableProps) {
  if (institutes.length === 0) {
    return (
      <div className="rounded border p-6 text-center text-gray-500">
        No institutes found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded border">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3 text-left">Code</th>
            <th className="border p-3 text-left">Name</th>
            <th className="border p-3 text-left">Short Name</th>
            <th className="border p-3 text-left">Email</th>
            <th className="border p-3 text-left">City</th>
            <th className="border p-3 text-left">Status</th>
            <th className="border p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {institutes.map((institute) => (
            <tr key={institute.id}>
              <td className="border p-3">
                {institute.code}
              </td>

              <td className="border p-3">
                {institute.name}
              </td>

              <td className="border p-3">
                {institute.shortName}
              </td>

              <td className="border p-3">
                {institute.email || "-"}
              </td>

              <td className="border p-3">
                {institute.city || "-"}
              </td>

              <td className="border p-3">
                <span
                  className={`rounded px-2 py-1 text-xs font-semibold ${
                    institute.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {institute.status}
                </span>
              </td>

              <td className="border p-3">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(institute)}
                    className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
                  >
                    Edit
                  </button>

                  {institute.status === "ACTIVE" ? (
                    <button
                      onClick={() => onArchive(institute.id)}
                      className="rounded bg-red-600 px-3 py-1 text-sm text-white"
                    >
                      Archive
                    </button>
                  ) : (
                    <button
                      onClick={() => onRestore(institute.id)}
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