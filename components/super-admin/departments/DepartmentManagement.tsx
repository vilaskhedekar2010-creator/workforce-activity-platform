type DepartmentManagementData = {
  departmentInstitute: string;
  departmentName: string;
  departmentShortName: string;

  institutes: any[];

  setDepartmentInstitute: (
    value: string
  ) => void;

  setDepartmentName: (
    value: string
  ) => void;

  setDepartmentShortName: (
    value: string
  ) => void;

  handleCreateDepartment: () => void;
};

type DepartmentManagementProps = {
  departmentManagement: DepartmentManagementData;
};

export default function DepartmentManagement({
  departmentManagement,
}: DepartmentManagementProps) {

  const {
    departmentInstitute,
    departmentName,
    departmentShortName,
    institutes,
    setDepartmentInstitute,
    setDepartmentName,
    setDepartmentShortName,
    handleCreateDepartment,
  } = departmentManagement;

  return (

    <div className="rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="mb-4 text-3xl font-bold">

        Department Management

      </h2>

      <div className="rounded border p-6">

        <select
          value={departmentInstitute}
          onChange={(e) =>
            setDepartmentInstitute(
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

        <input
          type="text"
          placeholder="Department Name"
          value={departmentName}
          onChange={(e) =>
            setDepartmentName(
              e.target.value
            )
          }
          className="mb-3 w-full rounded border p-2"
        />

        <input
          type="text"
          placeholder="Short Name"
          value={departmentShortName}
          onChange={(e) =>
            setDepartmentShortName(
              e.target.value
            )
          }
          className="mb-3 w-full rounded border p-2"
        />

        <button
          onClick={handleCreateDepartment}
          className="rounded bg-purple-600 px-4 py-2 text-white"
        >

          Create Department

        </button>

      </div>

    </div>

  );

}