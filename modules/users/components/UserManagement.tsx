// UserManagement.tsx

import { useState } from "react";

import AddUserModal from "../dialogs/AddUserModal";
import EditUserModal from "../dialogs/EditUserModal";
import ResetPasswordModal from "../dialogs/ResetPasswordModal";
import ManageServicesDialog from "../dialogs/ManageServicesDialog";

import UserStatistics from "./UserStatistics";

type UserManagementProps = {
  userManagement: {

    totalUsers: number;
    totalFaculty: number;
    totalStudents: number;

    activeUsers: number;
    inactiveUsers: number;
    suspendedUsers: number;

    searchTerm: string;
    setSearchTerm: (value: string) => void;

    roleFilter: string;
    setRoleFilter: (value: string) => void;

    statusFilter: string;
    setStatusFilter: (value: string) => void;

    filteredUsers: any[];

    updateUserStatus: (
      userId: string,
      status: string
    ) => void;

    setSelectedUserId: (
      id: string
    ) => void;

    setShowResetPasswordModal: (
      value: boolean
    ) => void;

    setShowAddUserModal: (
      value: boolean
    ) => void;

    addUser: any;
    editUser: any;
    resetPasswordModal: any;
  };
};

export default function UserManagement({
  userManagement,
}: UserManagementProps) {

  const {

    totalUsers,
    totalFaculty,
    totalStudents,

    activeUsers,
    inactiveUsers,
    suspendedUsers,

    searchTerm,
    setSearchTerm,

    roleFilter,
    setRoleFilter,

    statusFilter,
    setStatusFilter,

    filteredUsers,

    updateUserStatus,

    setSelectedUserId,

    setShowResetPasswordModal,

    setShowAddUserModal,

    addUser,
    editUser,
    resetPasswordModal,

  } = userManagement;

  // ==========================================
  // MANAGE SERVICES
  // ==========================================

  const [
    showManageServicesDialog,
    setShowManageServicesDialog,
  ] = useState(false);

  const [
    selectedUser,
    setSelectedUser,
  ] = useState<any>(null);

  // ==========================================
  // EDIT USER
  // ==========================================

  const [
    showEditUserModal,
    setShowEditUserModal,
  ] = useState(false);

  return (
    <>
          <div className="rounded-2xl bg-white p-8 shadow-lg">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-3xl font-bold">
            User Management
          </h2>

          <button
            onClick={() => setShowAddUserModal(true)}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            + Add User
          </button>

        </div>

        <UserStatistics
          totalUsers={totalUsers}
          totalFaculty={totalFaculty}
          totalStudents={totalStudents}
          activeUsers={activeUsers}
          inactiveUsers={inactiveUsers}
          suspendedUsers={suspendedUsers}
        />

        <div className="mb-6 mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">

          <input
            className="rounded border p-3"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

          <select
            className="rounded border p-3"
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(e.target.value)
            }
          >

            <option value="ALL">
              All Roles
            </option>

            <option value="SUPER_ADMIN">
              SUPER_ADMIN
            </option>

            <option value="INSTITUTE_ADMIN">
              INSTITUTE_ADMIN
            </option>

            <option value="DEPARTMENT_ADMIN">
              DEPARTMENT_ADMIN
            </option>

            <option value="COORDINATOR">
              COORDINATOR
            </option>

            <option value="FACULTY">
              FACULTY
            </option>

            <option value="STUDENT">
              STUDENT
            </option>

          </select>

          <select
            className="rounded border p-3"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >

            <option value="ALL">
              All Status
            </option>

            <option value="ACTIVE">
              ACTIVE
            </option>

            <option value="INACTIVE">
              INACTIVE
            </option>

            <option value="SUSPENDED">
              SUSPENDED
            </option>

          </select>

        </div>
                <div className="overflow-x-auto rounded border">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-3 text-left">Name</th>

                <th className="p-3 text-left">Email</th>

                <th className="p-3 text-left">Role</th>

                <th className="p-3 text-left">Status</th>

                <th className="p-3 text-left">Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredUsers.map((user: any) => (

                <tr
                  key={user.id}
                  className="border-t"
                >

                  <td className="p-3">

                    {user.full_name || "--"}

                  </td>

                  <td className="p-3">

                    {user.email}

                  </td>

                  <td className="p-3">

                    {user.role || "--"}

                  </td>

                  <td className="p-3">

                    {user.status || "ACTIVE"}

                  </td>

                  <td className="p-3">

                    {

                      user.role === "SUPER_ADMIN"

                      ?

                      <span className="font-bold text-red-600">

                        Protected

                      </span>

                      :

                      <div className="flex flex-wrap gap-2">

                        <button
                          onClick={() =>
                            updateUserStatus(
                              user.id,
                              "ACTIVE"
                            )
                          }
                          className="rounded bg-green-600 px-3 py-2 text-white"
                        >
                          Activate
                        </button>

                        <button
                          onClick={() =>
                            updateUserStatus(
                              user.id,
                              "INACTIVE"
                            )
                          }
                          className="rounded bg-yellow-600 px-3 py-2 text-white"
                        >
                          Deactivate
                        </button>

                        <button
                          onClick={() =>
                            updateUserStatus(
                              user.id,
                              "SUSPENDED"
                            )
                          }
                          className="rounded bg-red-600 px-3 py-2 text-white"
                        >
                          Suspend
                        </button>

                        <button
                          onClick={() => {

                            setSelectedUserId(
                              user.id
                            );

                            setShowResetPasswordModal(
                              true
                            );

                          }}
                          className="rounded bg-blue-600 px-3 py-2 text-white"
                        >
                          Reset Password
                        </button>

                        <button
                          onClick={() => {

                            setSelectedUser(user);

                            editUser.loadUser(user);

                            setShowEditUserModal(
                              true
                            );

                          }}
                          className="rounded bg-cyan-600 px-3 py-2 text-white"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => {

                            setSelectedUser(user);

                            setShowManageServicesDialog(
                              true
                            );

                          }}
                          className="rounded bg-indigo-600 px-3 py-2 text-white"
                        >
                          Manage Services
                        </button>

                      </div>

                    }

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
                {/* ============================= */}
        {/* ADD USER */}
        {/* ============================= */}

        <AddUserModal
          addUser={addUser}
        />

        {/* ============================= */}
        {/* RESET PASSWORD */}
        {/* ============================= */}

        <ResetPasswordModal
          resetPasswordModal={resetPasswordModal}
        />

        {/* ============================= */}
        {/* MANAGE SERVICES */}
        {/* ============================= */}

        <ManageServicesDialog
          open={showManageServicesDialog}
          onClose={() =>
            setShowManageServicesDialog(false)
          }
          user={selectedUser}
        />

        {/* ============================= */}
        {/* EDIT USER */}
        {/* ============================= */}

        <EditUserModal
          editUser={{
            ...editUser,

            showEditUserModal,
            setShowEditUserModal,

            selectedUser,
          }}
        />

      </div>

    </>
  );
}