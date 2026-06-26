type RoleManagementData = {
  targetEmail: string;
  selectedInstitute: string;
  selectedRole: string;

  institutes: any[];

  setTargetEmail: (value: string) => void;
  setSelectedInstitute: (value: string) => void;
  setSelectedRole: (value: string) => void;

  handleAssignRole: () => void;
};

type RoleManagementProps = {
  roleManagement: RoleManagementData;
};

export default function RoleManagement({
  roleManagement,
}: RoleManagementProps) {

  const {
    targetEmail,
    selectedInstitute,
    selectedRole,
    institutes,
    setTargetEmail,
    setSelectedInstitute,
    setSelectedRole,
    handleAssignRole,
  } = roleManagement;

  return (

    <div className="rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="mb-4 text-3xl font-bold">

        Role Management

      </h2>

      <input
        type="email"
        placeholder="User Email"
        value={targetEmail}
        onChange={(e) =>
          setTargetEmail(
            e.target.value.toLowerCase()
          )
        }
        className="mb-3 w-full rounded border p-2"
      />

      <select
        value={selectedInstitute}
        onChange={(e) =>
          setSelectedInstitute(
            e.target.value
          )
        }
        className="mb-3 w-full rounded border p-2"
      >

        <option value="">
          Select Institute
        </option>

        {institutes.map((inst) => (

          <option
            key={inst.id}
            value={inst.id}
          >
            {inst.name}
          </option>

        ))}

      </select>

      <select
        value={selectedRole}
        onChange={(e) =>
          setSelectedRole(
            e.target.value
          )
        }
        className="mb-3 w-full rounded border p-2"
      >

        <option value="INSTITUTE_ADMIN">
          INSTITUTE_ADMIN
        </option>

        <option value="DEPARTMENT_ADMIN">
          DEPARTMENT_ADMIN
        </option>

        <option value="FACULTY">
          COORDINATOR
        </option>

        <option value="STUDENT">
          MEMBER
        </option>

      </select>

      <button
        onClick={handleAssignRole}
        className="rounded bg-green-600 px-4 py-2 text-white"
      >

        Assign Role

      </button>

    </div>

  );

}