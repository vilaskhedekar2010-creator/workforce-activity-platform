"use client";

import { useEffect, useMemo, useState } from "react";

import { userService } from "../services/UserService";

import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
} from "../types/user";

export function useUsers() {

  // =========================================
  // USER LIST
  // =========================================

  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(false);

  // =========================================
  // SEARCH & FILTERS
  // =========================================

  const [searchTerm, setSearchTerm] =
    useState("");

  const [roleFilter, setRoleFilter] =
    useState("ALL");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  // =========================================
  // FETCH USERS
  // =========================================

  const fetchUsers = async () => {

    try {

      setLoading(true);

      const data =
        await userService.getUsers();

      setUsers(data);

    } catch (error) {

      console.error(
        "Error loading users",
        error
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchUsers();

  }, []);

  // =========================================
  // FILTER USERS
  // =========================================

  const filteredUsers = useMemo(() => {

    return users.filter((user) => {

      const matchesSearch =

        user.full_name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

        ||

        user.email
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesRole =

        roleFilter === "ALL"

        ||

        user.role === roleFilter;

      const matchesStatus =

        statusFilter === "ALL"

        ||

        (user.status || "ACTIVE")
          === statusFilter;

      return (

        matchesSearch &&
        matchesRole &&
        matchesStatus

      );

    });

  }, [

    users,
    searchTerm,
    roleFilter,
    statusFilter,

  ]);

      // =========================================
  // USER STATISTICS
  // =========================================

  const totalUsers = filteredUsers.length;

  const totalFaculty =
    filteredUsers.filter(
      (user) => user.role === "FACULTY"
    ).length;

  const totalStudents =
    filteredUsers.filter(
      (user) => user.role === "STUDENT"
    ).length;

  const activeUsers =
    filteredUsers.filter(
      (user) => user.status === "ACTIVE"
    ).length;

  const inactiveUsers =
    filteredUsers.filter(
      (user) => user.status === "INACTIVE"
    ).length;

  const suspendedUsers =
    filteredUsers.filter(
      (user) => user.status === "SUSPENDED"
    ).length;

  // =========================================
  // USER STATUS
  // =========================================

  const updateUserStatus = async (
    userId: string,
    status: string
  ) => {

    await userService.updateUserStatus(
      userId,
      status
    );

    await fetchUsers();

  };

    // =========================================
  // ADD USER
  // =========================================

  const [showAddUserModal,
    setShowAddUserModal] =
    useState(false);

  const [newUserName,
    setNewUserName] =
    useState("");

  const [newUserEmail,
    setNewUserEmail] =
    useState("");

  const [newUserMobile,
    setNewUserMobile] =
    useState("");

  const [newUserRole,
    setNewUserRole] =
    useState("STUDENT");

  const [enrollmentNumber,
    setEnrollmentNumber] =
    useState("");

  const [facultyId,
    setFacultyId] =
    useState("");

  const handleCreateUser = async () => {

  const request: CreateUserRequest = {

    full_name: newUserName,

    email: newUserEmail,

    role: newUserRole,

    mobile_number: newUserMobile,

    enrollment_number: enrollmentNumber,

    faculty_id: facultyId,

  };

    await userService.createUser(
      request
    );

    setShowAddUserModal(false);

    setNewUserName("");

    setNewUserEmail("");

    setNewUserMobile("");

    setNewUserRole("STUDENT");

    setEnrollmentNumber("");

    setFacultyId("");

    await fetchUsers();

  };

  const addUser = {

    showAddUserModal,

    newUserName,

    newUserEmail,

    newUserMobile,

    newUserRole,

    enrollmentNumber,

    facultyId,

    setShowAddUserModal,

    setNewUserName,

    setNewUserEmail,

    setNewUserMobile,

    setNewUserRole,

    setEnrollmentNumber,

    setFacultyId,

    handleCreateUser,

  };

  // =========================================
// RESET PASSWORD
// =========================================

const [selectedUserId, setSelectedUserId] = useState("");

const [
  showResetPasswordModal,
  setShowResetPasswordModal,
] = useState(false);
const [resetPassword, setResetPassword] = useState("");

const [confirmResetPassword, setConfirmResetPassword] = useState("");

const handleResetPassword = async () => {

  console.log("Reset Password");

  setShowResetPasswordModal(false);

  setResetPassword("");

  setConfirmResetPassword("");

  setSelectedUserId("");

};

const resetPasswordModal = {

  showResetPasswordModal,

  resetPassword,
  confirmResetPassword,

  setShowResetPasswordModal,

  setResetPassword,
  setConfirmResetPassword,

  setSelectedUserId,

  handleResetPassword,

};

// =========================================
// EDIT USER
// =========================================

// =========================================
// EDIT USER
// =========================================

const [editUserId, setEditUserId] = useState("");

const [editFullName, setEditFullName] = useState("");

const [editEmail, setEditEmail] = useState("");

const [editRole, setEditRole] = useState("");

const [editMobileNumber, setEditMobileNumber] = useState("");

const [editEnrollmentNumber, setEditEnrollmentNumber] =
  useState("");

const [editFacultyId, setEditFacultyId] =
  useState("");

const loadUser = (user: any) => {
  setEditUserId(user.id);
  setEditFullName(user.full_name ?? "");
  setEditEmail(user.email ?? "");
  setEditRole(user.role ?? "");
  setEditMobileNumber(user.mobile_number ?? "");
  setEditEnrollmentNumber(
    user.enrollment_number ?? ""
  );
  setEditFacultyId(
    user.faculty_id ?? ""
  );
};

const handleUpdateUser = async () => {

  const request: UpdateUserRequest = {

    id: editUserId,

    institute_id: null,

    department_id: null,

    full_name: editFullName,

    role: editRole,

    faculty_id:
      editFacultyId || null,

    enrollment_number:
      editEnrollmentNumber || null,

    mobile_number:
      editMobileNumber || null,

    address: null,

    status: "ACTIVE",

  };

  await userService.updateUser(request);

  await fetchUsers();

};

const editUser = {
  editUserId,

  editFullName,
  setEditFullName,

  editEmail,

  editRole,
  setEditRole,

  editMobileNumber,
  setEditMobileNumber,

  editEnrollmentNumber,
  setEditEnrollmentNumber,

  editFacultyId,
  setEditFacultyId,

  loadUser,

  handleUpdateUser,
};

return {

    users,
    loading,

    searchTerm,
    setSearchTerm,

    roleFilter,
    setRoleFilter,

    statusFilter,
    setStatusFilter,

    filteredUsers,

    totalUsers,
    totalFaculty,
    totalStudents,
    activeUsers,
    inactiveUsers,
    suspendedUsers,
    addUser,
    setSelectedUserId,
    setShowResetPasswordModal,
    editUser,
    resetPasswordModal,
    fetchUsers,
    updateUserStatus,

};



}

