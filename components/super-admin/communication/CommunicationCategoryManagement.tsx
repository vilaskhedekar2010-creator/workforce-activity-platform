type CommunicationCategoryManagementData = {
  selectedCategoryGroup: string;
  categoryName: string;

  groups: any[];

  setSelectedCategoryGroup: (
    value: string
  ) => void;

  setCategoryName: (
    value: string
  ) => void;

  createMessageCategory: () => void;
};

type CommunicationCategoryManagementProps = {
  communicationManagement: CommunicationCategoryManagementData;
};

export default function CommunicationCategoryManagement({
  communicationManagement,
}: CommunicationCategoryManagementProps) {

  const {
    selectedCategoryGroup,
    categoryName,
    groups,
    setSelectedCategoryGroup,
    setCategoryName,
    createMessageCategory,
  } = communicationManagement;

  return (

    <div className="space-y-6">

      <div className="rounded-lg border p-6">

        <h2 className="mb-4 text-xl font-bold">

          Create Communication Category

        </h2>

        <select
          value={selectedCategoryGroup}
          onChange={(e) =>
            setSelectedCategoryGroup(
              e.target.value
            )
          }
          className="mb-3 w-full rounded border p-3"
        >

          <option value="">
            Select Group
          </option>

          {groups.map((group) => (

            <option
              key={group.id}
              value={group.id}
            >
              {group.name}
            </option>

          ))}

        </select>

        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) =>
            setCategoryName(
              e.target.value
            )
          }
          className="mb-3 w-full rounded border p-3"
        />

        <button
          onClick={createMessageCategory}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >

          Create Category

        </button>

      </div>

    </div>

  );

}