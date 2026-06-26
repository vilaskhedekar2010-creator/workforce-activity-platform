type InstituteManagementData = {
  instituteName: string;
  shortName: string;

  setInstituteName: (
    value: string
  ) => void;

  setShortName: (
    value: string
  ) => void;

  handleCreateInstitute: () => void;
};

type InstituteManagementProps = {
  instituteManagement: InstituteManagementData;
};

export default function InstituteManagement({
  instituteManagement,
}: InstituteManagementProps) {

  const {
    instituteName,
    shortName,
    setInstituteName,
    setShortName,
    handleCreateInstitute,
  } = instituteManagement;

  return (

    <div className="rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="mb-4 text-3xl font-bold">

        Institute Management

      </h2>

      <div className="rounded border p-6">

        <input
          type="text"
          placeholder="Institute Name"
          value={instituteName}
          onChange={(e) =>
            setInstituteName(
              e.target.value
            )
          }
          className="mb-3 w-full rounded border p-2"
        />

        <input
          type="text"
          placeholder="Short Name"
          value={shortName}
          onChange={(e) =>
            setShortName(
              e.target.value
            )
          }
          className="mb-3 w-full rounded border p-2"
        />

        <button
          onClick={handleCreateInstitute}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >

          Create Institute

        </button>

      </div>

    </div>

  );

}