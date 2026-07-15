"use client";

import type { Department } from "../types/department";

interface DepartmentTableProps {
  departments: Department[];

  onEdit: (department: Department) => void;

  onArchive: (id: string) => void;

  onRestore: (id: string) => void;
}

export default function DepartmentTable({
  departments,
  onEdit,
  onArchive,
  onRestore,
}: DepartmentTableProps) {
  if (departments.length === 0) {
    return (
      <div className="rounded border p-6 text-center text-gray-500">
        No departments found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded border">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3 text-left">Institute</th>
            <th className="border p-3 text-left">Code</th>
            <th className="border p-3 text-left">Department</th>
            <th className="border p-3 text-left">Short Name</th>
            <th className="border p-3 text-left">Status</th>
            <th className="border p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td className="border p-3">
                {department.instituteDisplay}
              </td>

              <td className="border p-3">
                {department.code}
              </td>

              <td className="border p-3">
                {department.name}
              </td>

              <td className="border p-3">
                {department.shortName}
              </td>

              <td className="border p-3">
                <span
                  className={`rounded px-2 py-1 text-xs font-semibold ${
                    department.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {department.status}
                </span>
              </td>

              <td className="border p-3">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(department)}
                    className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
                  >
                    Edit
                  </button>

                  {department.status === "ACTIVE" ? (
                    <button
                      onClick={() => onArchive(department.id)}
                      className="rounded bg-red-600 px-3 py-1 text-sm text-white"
                    >
                      Archive
                    </button>
                  ) : (
                    <button
                      onClick={() => onRestore(department.id)}
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