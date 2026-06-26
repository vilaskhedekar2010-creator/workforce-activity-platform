import ManageMembersModal from "./ManageMembersModal";

type GroupManagementData = {
  groups: any[];

  setSelectedGroupId: (
    value: string
  ) => void;

  setShowMembersModal: (
    value: boolean
  ) => void;

  showMembersModal: boolean;

  members: any[];

  selectedMembers: string[];

  setSelectedMembers: (
    value: string[]
  ) => void;

  saveMembers: () => void;
};

type GroupManagementProps = {
  groupManagement: GroupManagementData;
};

export default function GroupManagement({
  groupManagement,
}: GroupManagementProps) {

  const {
    groups,
    setSelectedGroupId,
    setShowMembersModal,
    showMembersModal,
    members,
    selectedMembers,
    setSelectedMembers,
    saveMembers,
  } = groupManagement;

  return (

    <div className="rounded-lg border p-6">

      <h2 className="mb-4 text-xl font-bold">

        Existing Groups

      </h2>

      <table className="w-full border">

        <thead>

          <tr className="border-b bg-gray-100">

            <th className="p-3 text-left">

              Group Name

            </th>

            <th className="p-3 text-left">

              Coordinator

            </th>

            <th className="p-3 text-left">

              Actions

            </th>

          </tr>

        </thead>

        <tbody>

          {groups.map((group) => (

            <tr
              key={group.id}
              className="border-b"
            >

              <td className="p-3">

                {group.name}

              </td>

              <td className="p-3">

                {group.coordinator?.full_name ??
                  "Not Assigned"}

              </td>

              <td className="p-3">

                <button
                  onClick={() => {

                    setSelectedGroupId(
                      group.id
                    );

                    setShowMembersModal(
                      true
                    );

                  }}
                  className="rounded bg-green-600 px-3 py-1 text-white"
                >

                  Manage Members

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <ManageMembersModal
        manageMembers={{
          showMembersModal,
          members,
          selectedMembers,
          setShowMembersModal,
          setSelectedMembers,
          saveMembers,
        }}
      />

    </div>

  );

}