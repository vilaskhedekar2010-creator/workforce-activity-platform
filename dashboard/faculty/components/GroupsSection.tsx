type GroupsSectionProps = {
  groups: any[];
  selectedGroupStudents: any[];
  selectedGroupName: string;
  onOpenGroup: (
    groupId: string,
    groupName: string
  ) => void;
};

export default function GroupsSection({
  groups,
  selectedGroupStudents,
  selectedGroupName,
  onOpenGroup,
}: GroupsSectionProps) {
  return (
    <div className="space-y-8">

      {/* GROUP CARDS */}

      <div className="rounded-2xl bg-white p-8 shadow-lg">

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold text-gray-800">
              Assigned Groups
            </h2>

            <p className="mt-1 text-gray-500">
              Groups assigned to you
            </p>

          </div>

        </div>

        {groups.length === 0 ? (

          <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">
            No groups assigned yet.
          </div>

        ) : (

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

            {groups.map((group) => (

              <div
                key={group.id}
                onClick={() =>
                  onOpenGroup(
                    group.id,
                    `${group.name} ${group.section}`
                  )
                }
                className="cursor-pointer rounded-2xl border bg-gray-50 p-6 transition hover:border-blue-500 hover:shadow-lg"
              >

                <h3 className="text-2xl font-bold text-blue-700">
                  {group.name}
                </h3>

                <p className="mt-3 text-lg text-gray-700">
                  Section{" "}
                  <span className="font-semibold">
                    {group.section}
                  </span>
                </p>

                <p className="mt-4 text-sm font-semibold text-blue-600">
                  Click to View Members →
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* MEMBER TABLE */}

      {selectedGroupStudents.length > 0 && (

        <div className="rounded-2xl bg-white p-8 shadow-lg">

          <div className="mb-6">

            <h2 className="text-3xl font-bold text-gray-800">
              Members
            </h2>

            <p className="mt-2 text-gray-500">
              {selectedGroupName}
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="min-w-full border border-gray-200">

              <thead className="bg-gray-100">

                <tr>

                  <th className="border p-3 text-center">
                    Enrollment No
                  </th>

                  <th className="border p-3 text-center">
                    Name
                  </th>

                  <th className="border p-3 text-center">
                    Email
                  </th>

                  <th className="border p-3 text-center">
                    Mobile
                  </th>

                </tr>

              </thead>

              <tbody>

                {selectedGroupStudents.map(
                  (member: any, index) => (

                    <tr
                      key={index}
                      className="hover:bg-gray-50"
                    >

                      <td className="border p-3 text-center">
                        {member.enrollment_number || "--"}
                      </td>

                      <td className="border p-3 text-center">
                        {member.full_name || "--"}
                      </td>

                      <td className="border p-3">
                        {member.email || "--"}
                      </td>

                      <td className="border p-3">
                        {member.mobile || "--"}
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>
  );
}