"use client";

interface Role {
  id: string;
  code: string;
  name: string;
}

interface RoleSelectorProps {
  roles: Role[];
  selectedRoleId: string;
  onChange: (roleId: string) => void;
}

export default function RoleSelector({
  roles,
  selectedRoleId,
  onChange,
}: RoleSelectorProps) {
  return (
    <div className="mb-6">

      <label className="mb-2 block text-sm font-semibold">
        Select Role
      </label>

      <select
        value={selectedRoleId}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border p-2"
      >
        <option value="">
          -- Select Role --
        </option>

        {roles.map((role) => (
          <option
            key={role.id}
            value={role.id}
          >
            {role.name}
          </option>
        ))}

      </select>

    </div>
  );
}