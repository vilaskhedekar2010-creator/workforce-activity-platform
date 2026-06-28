type ManageMembersModalProps = {
  manageMembers: {
    showMembersModal: boolean;
    members: any[];
    selectedMembers: string[];

    setShowMembersModal: (value: boolean) => void;
    setSelectedMembers: (
      value: string[]
    ) => void;

    saveMembers: () => void;
  };
};

export default function ManageMembersModal({
  manageMembers,
}: ManageMembersModalProps) {

  const {
    showMembersModal,
    members,
    selectedMembers,
    setShowMembersModal,
    setSelectedMembers,
    saveMembers,
  } = manageMembers;

  if (!showMembersModal) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">

        <h2 className="mb-4 text-xl font-bold">

          Manage Members

        </h2>

        <div className="max-h-80 overflow-y-auto">

          {members.map((member) => (

            <label
              key={member.id}
              className="mb-2 flex items-center gap-2"
            >

              <input
                type="checkbox"
                checked={selectedMembers.includes(member.id)}
                onChange={(e) => {

                  if (e.target.checked) {

                    setSelectedMembers([
                      ...selectedMembers,
                      member.id,
                    ]);

                  } else {

                    setSelectedMembers(

                      selectedMembers.filter(
                        (id) => id !== member.id
                      )

                    );

                  }

                }}
              />

              {member.full_name}

            </label>

          ))}

        </div>

        <div className="mt-5 flex justify-end gap-3">

          <button
            onClick={() => {

              setShowMembersModal(false);

              setSelectedMembers([]);

            }}
            className="rounded bg-gray-500 px-4 py-2 text-white"
          >

            Cancel

          </button>

          <button
            onClick={saveMembers}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >

            Save Members

          </button>

        </div>

      </div>

    </div>

  );

}