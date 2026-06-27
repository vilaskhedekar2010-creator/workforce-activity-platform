import {
  UsersRound,
  Plus,
  Search,
  UserCheck,
} from "lucide-react";

import { useGroupManagement } from "@/hooks/useGroupManagement";

import ManageMembersModal from "./ManageMembersModal";

type GroupManagementData = {
  groups: any[];

  groupName: string;
  setGroupName: (
    value: string
  ) => void;

  selectedCoordinator: string;
  setSelectedCoordinator: (
    value: string
  ) => void;

  coordinatorList: any[];

  createGroup: () => void;

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

    groupName,
    setGroupName,

    selectedCoordinator,
    setSelectedCoordinator,

    coordinatorList,

    createGroup,

    setSelectedGroupId,
    setShowMembersModal,

    showMembersModal,

    members,

    selectedMembers,
    setSelectedMembers,

    saveMembers,

  } = groupManagement;

    const {

      searchTerm,

      setSearchTerm,

      filteredGroups,

    } = useGroupManagement(
      groups
    );

  return (

    <div className="space-y-2">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-blue-100 p-2">

                <UsersRound
                  size={28}
                  className="text-blue-600"
                />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-slate-800">

                  Group Management

                </h2>

                <p className="mt-0.5 text-sm text-slate-500">

                  Create and manage communication groups.

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =========================================
          DASHBOARD CARDS
      ========================================= */}

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <p className="text-lg text-slate-800 text-center">

            Total Groups

          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-800 text-center">

            {groups.length}

          </h3>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <p className="text-lg text-slate-800 text-center">

            Coordinators

          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-800 text-center">

            {coordinatorList.length}

          </h3>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <p className="text-lg text-slate-800 text-center">

            Members

          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-800 text-center">

            Coming Soon

          </h3>

        </div>

      </div>

      {/* =========================================
          CREATE GROUP
      ========================================= */}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="mb-3 flex items-center gap-2">

          <Plus
            size={20}
            className="text-blue-600"
          />

          <h3 className="text-xl font-semibold text-slate-800">

            Create New Group

          </h3>

        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

          <input
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={(e) =>
              setGroupName(
                e.target.value
              )
            }
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
          />

          <select
            value={selectedCoordinator}
            onChange={(e) =>
              setSelectedCoordinator(
                e.target.value
              )
            }
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
          >

            <option value="">

              Select Coordinator

            </option>

            {coordinatorList.map(
              (faculty) => (

                <option
                  key={faculty.id}
                  value={faculty.id}
                >

                  {faculty.full_name}

                </option>

              )
            )}

          </select>

       {/* </div> */} 

        {/* <div className="mt-4 flex justify-end"> */}

          <button
            onClick={createGroup}
            className="rounded-xl text-lg bg-blue-600 px-6 py-2 font-medium text-white transition hover:bg-blue-700"
          >

            Create Group

          </button>

        </div>

      </div>

      {/* =========================================
          GROUP LIST
      ========================================= */}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center justify-between border-b border-slate-200 p-5">

          <h3 className="text-xl font-semibold text-slate-800">

            Existing Groups

          </h3>

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-3 text-slate-400"
            />

          <input
            type="text"
            placeholder="Search Groups..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            className="w-96 rounded-xl border border-slate-300 py-2 pl-10 pr-4 outline-none transition focus:border-blue-600"
          />

          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-6 py-3 text-left text-lg font-semibold text-slate-700">

                  Group

                </th>

                <th className="px-6 py-3 text-left text-lg font-semibold text-slate-700">

                  Coordinator

                </th>

                <th className="px-6 py-3 text-center text-lg font-semibold text-slate-700">

                  Members

                </th>

                <th className="px-6 py-3 text-center text-lg font-semibold text-slate-700">

                  Status

                </th>

                <th className="px-6 py-3 text-center text-lg font-semibold text-slate-700">

                  Actions

                </th>

              </tr>

            </thead>

            <tbody>

              {filteredGroups.map((group) => (

                <tr
                  key={group.id}
                  className="border-t border-slate-200 hover:bg-slate-50"
                >
                                      <td className="px-6 py-3">

                    <div className="font-semibold text-slate-800 text-left">

                      {group.name}

                    </div>

                  </td>

                  <td className="px-6 py-3">

                    <div className="flex items-center gap-2">

                      <div className="rounded-full bg-blue-100 p-2">

                        <UserCheck
                          size={16}
                          className="text-blue-600"
                        />

                      </div>

                      <div>

                        <p className="font-medium text-slate-800 text-lg">

                          {group.coordinator?.full_name ??
                            "Not Assigned"}

                        </p>

                        <p className="text-sm text-slate-500">

                          Faculty Coordinator

                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-3 text-center">

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-lg font-medium text-slate-700">

                      --

                    </span>

                  </td>

                  <td className="px-6 py-3 text-center">

                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-lg font-semibold text-emerald-700">

                      Active

                    </span>

                  </td>

                  <td className="px-6 py-3 text-center">

                    <button
                      onClick={() => {

                        setSelectedGroupId(
                          group.id
                        );

                        setShowMembersModal(
                          true
                        );

                      }}
                      className="rounded-xl bg-blue-600 px-6 py-2 text-lg font-medium text-white transition hover:bg-blue-700"
                    >

                      Manage Members

                    </button>

                  </td>

                </tr>

              ))}

              {filteredGroups.length === 0 && (

                <tr>

                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center"
                  >

                    <UsersRound
                      size={48}
                      className="mx-auto mb-4 text-slate-300"
                    />

                    <h3 className="text-lg font-semibold text-slate-700">

                      No Groups Found

                    </h3>

                    <p className="mt-2 text-sm text-slate-500">

                      {searchTerm
                        ? `No groups found matching "${searchTerm}".`
                        : "Create your first communication group using the form above."}

                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

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