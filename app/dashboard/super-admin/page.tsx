"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";

import DashboardSidebar
from "@/components/shared/DashboardSidebar";

import DashboardHeader
from "@/components/shared/DashboardHeader";

import StatCard
from "@/components/shared/StatCard";

import InstituteManagement from "@/components/super-admin/institutes/InstituteManagement";
import DepartmentManagement from "@/components/super-admin/departments/DepartmentManagement";
import RoleManagement from "@/components/super-admin/roles/RoleManagement";
import GroupManagement from "@/components/super-admin/groups/GroupManagement";
import CommunicationCategoryManagement from "@/components/super-admin/communication/CommunicationCategoryManagement";
import UserManagement from "@/components/super-admin/users/UserManagement";
import AddUserModal from "@/components/super-admin/users/AddUserModal";
import ResetPasswordModal from "@/components/super-admin/users/ResetPasswordModal";
import Reports from "@/components/super-admin/reports/Reports";



export default function SuperAdminPage() {

  // =========================================
  // PASSWORD RESET MODAL
  // =========================================

  const [showResetPasswordModal,
  setShowResetPasswordModal] =
  useState(false);

const [selectedUserId,
  setSelectedUserId] =
  useState("");

const [resetPassword,
  setResetPassword] =
  useState("");

const [confirmResetPassword,
  setConfirmResetPassword] =
  useState("");

  // =========================================
  // USER DETAILS
  // =========================================

  const [email, setEmail] = useState("");

  const [users, setUsers] =
  useState<any[]>([]);

  const [searchTerm, setSearchTerm] =
  useState("");

  const [roleFilter, setRoleFilter] =
    useState("ALL");

  const [statusFilter, setStatusFilter] =
    useState("ALL");


  const [profile, setProfile] =
  useState<any>(null);


  const [showAddUserModal,
  setShowAddUserModal] =
  useState(false);

  const [newUserName,
    setNewUserName] =
    useState("");

  const [newUserEmail,
    setNewUserEmail] =
    useState("");

  const [newUserPassword,
    setNewUserPassword] =
    useState("");

  const [newUserMobile,
    setNewUserMobile] =
    useState("");

  const [enrollmentNumber,
  setEnrollmentNumber] =
  useState("");

  const [facultyId,
    setFacultyId] =
    useState("");

  const [newUserRole,
    setNewUserRole] =
    useState("STUDENT");


  const [
  activeModule,
  setActiveModule,
] = useState("HOME");

const menuItems = [
  {
    id: "HOME",
    label: "Dashboard",
  },
  {
    id: "INSTITUTES",
    label: "Institute Management",
  },
  {
    id: "DEPARTMENTS",
    label: "Department Management",
  },
  {
    id: "ROLES",
    label: "Role Management",
  },
  {
    id: "USERS",
    label: "User Management",
  },
  {
    id: "GROUPS",
    label: "Group Management",
  },
  {
    id: "MESSAGE_CATEGORIES",
    label: "Communication Categories",
  },
  {
    id: "REPORTS",
    label: "Reports",
  },
];

    // =========================================
    // COMMUNICATION CATEGORIES
    // =========================================

    const [categoryName,
      setCategoryName] =
      useState("");

    const [selectedCategoryGroup,
      setSelectedCategoryGroup] =
      useState("");

    const [messageCategories,
      setMessageCategories] =
      useState<any[]>([]);
  // =========================================
  // INSTITUTE FORM
  // =========================================

  const [instituteName, setInstituteName] =
    useState("");

  const [shortName, setShortName] =
    useState("");

  // =========================================
  // INSTITUTE LIST
  // =========================================

  const [institutes, setInstitutes] =
    useState<any[]>([]);

  // =========================================
  // ROLE MANAGEMENT
  // =========================================

  const [targetEmail, setTargetEmail] =
    useState("");

  const [selectedInstitute, setSelectedInstitute] =
    useState("");

  const [selectedRole, setSelectedRole] =
    useState("INSTITUTE_ADMIN");

  // =========================================
  // DEPARTMENT FORM
  // =========================================

  const [departmentInstitute,
    setDepartmentInstitute] =
    useState("");

  const [departmentName,
    setDepartmentName] =
    useState("");

  const [departmentShortName,
    setDepartmentShortName] =
    useState("");

  // =========================================
  // GROUP MANAGEMENT
  // =========================================

  const [groupName,
    setGroupName] =
    useState("");

  const [selectedCoordinator,
    setSelectedCoordinator] =
    useState("");

  const [coordinatorList, setCoordinatorList] = useState<any[]>([]);

  const [groups,
    setGroups] =
    useState<any[]>([]);

  // =========================================
  // GROUP MEMBERS MODAL
  // =========================================

  const [selectedGroupId,
  setSelectedGroupId] =
  useState("");

  const [showMembersModal,
    setShowMembersModal] =
    useState(false);
  // =========================================
  // GROUP MEMBERS
  // =========================================
  const [members, setMembers] = useState<any[]>([]);

  const [selectedMembers,
    setSelectedMembers] =
    useState<string[]>([]);

  // =========================================
  // DEPARTMENT LIST
  // =========================================

  const [departments, setDepartments] =
    useState<any[]>([]);

  const totalInstitutes =
  institutes.length;

const totalDepartments =
  departments.length;

const totalUsers =
  users.length;


  // =========================================
  // LOAD USER
  // =========================================

  useEffect(() => {

    const loadUser = async () => {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {

        window.location.href = "/login";

        return;
      }

      setEmail(user.email || "");

      // =========================================
      // LOAD PROFILE
      // =========================================

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!data) {

        alert("Profile not found");

        return;
      }

      if (data.role !== "SUPER_ADMIN") {

        alert("Access Denied");

        window.location.href = "/dashboard";

        return;
      }
      
      setProfile(data);

      fetchInstitutes();

      fetchDepartments();

      fetchCoordinatorList();

      fetchGroups();

      fetchMembers();

      fetchMessageCategories();

      fetchUsers();
    };

    loadUser();

  }, []);

    // =========================================
    // FETCH MESSAGE CATEGORIES
    // =========================================
      const fetchMessageCategories =
      async () => {

        const { data } =
          await supabase
            .from("message_categories")
            .select(`
              *,
              class:class_id(
                name
              )
            `)
            .order(
              "created_at",
              {
                ascending: false,
              }
            );

        if (data) {

          setMessageCategories(
            data
          );

        }

    };

  // =========================================
  // CREATE MESSAGE CATEGORY
  // =========================================
  
    const createMessageCategory =
      async () => {

        if (
          !selectedCategoryGroup ||
          !categoryName
        ) {

          alert(
            "Please fill all fields."
          );

          return;

        }

        const { error } =
          await supabase
            .from(
              "message_categories"
            )
            .insert([
              {
                class_id:
                  selectedCategoryGroup,

                name:
                  categoryName,

                created_by:
                  profile.id,
              },
            ]);

        if (error) {

          alert(
            error.message
          );

          return;

        }

        alert(
          "Category created successfully."
        );

        setCategoryName("");

        fetchMessageCategories();

    };

  // =========================================
  // FETCH members
  // =========================================

    const fetchMembers =
      async () => {

        const { data } =
          await supabase
            .from("profiles")
            .select("*")
            .eq("role", "STUDENT")
            .eq("status", "ACTIVE")
            .order("full_name");

        if (data) {

          setMembers(
            data
          );

        }
    };

    // =========================================
    // FETCH COORDINATOR LIST
    // =========================================

    const fetchCoordinatorList =
    async () => {

      const { data } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("role", "FACULTY")
          .eq("status", "ACTIVE")
          .order("full_name");

      if (data) {

        setCoordinatorList(
          data
        );

      }
  };

    // =========================================
    // FETCH GrOUPS
    // =========================================
    const fetchGroups =
    async () => {

      const { data } =
        await supabase
          .from("classes")
          .select(`
            *,
            coordinator:faculty_coordinator_id(
              full_name
            )
          `)
          .order(
            "created_at",
            {
              ascending: false,
            }
          );

      if (data) {

        setGroups(
          data
        );

      }
  };

  // =========================================
  // CREATE GROUP
  // =========================================
        const createGroup =
      async () => {

        if (
          !groupName ||
          !selectedCoordinator
        ) {

          alert(
            "Please fill all fields"
          );

          return;
        }

        const { error } =
          await supabase
            .from("classes")
            .insert([
              {
                name: groupName,
                faculty_coordinator_id:
                  selectedCoordinator,
              },
            ]);

        if (error) {

          alert(
            error.message
          );

          return;
        }

        alert(
          "Group created successfully"
        );

        setGroupName("");

        setSelectedCoordinator("");

        fetchGroups();
      };

  // =========================================
  // FETCH INSTITUTES
  // =========================================

  const fetchInstitutes = async () => {

    const { data } = await supabase
      .from("institutes")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (data) {

      setInstitutes(data);
    }
  };

    const fetchUsers = async () => {

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (data) {

      setUsers(data);

    }
  };

  const filteredUsers =
  users.filter((user) => {

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

const totalFaculty =
  users.filter(
    (user) =>
      user.role ===
      "FACULTY"
  ).length;

const totalStudents =
  users.filter(
    (user) =>
      user.role ===
      "STUDENT"
  ).length;

const activeUsers =
  users.filter(
    (user) =>
      user.status ===
      "ACTIVE"
  ).length;

const inactiveUsers =
  users.filter(
    (user) =>
      user.status ===
      "INACTIVE"
  ).length;

const suspendedUsers =
  users.filter(
    (user) =>
      user.status ===
      "SUSPENDED"
  ).length;


  // =========================================
  // FETCH DEPARTMENTS
  // =========================================

  const fetchDepartments = async () => {

    const { data } = await supabase
      .from("departments")
      .select(`
        *,
        institutes(name)
      `)
      .order("created_at", {
        ascending: false,
      });

    if (data) {

      setDepartments(data);
    }
  };

  // =========================================
  // CREATE INSTITUTE
  // =========================================

  const handleCreateInstitute =
    async () => {

      if (!instituteName) {

        alert("Institute name required");

        return;
      }

      const { error } = await supabase
        .from("institutes")
        .insert([
          {
            name: instituteName,
            short_name: shortName,
          },
        ]);

      if (error) {

        alert(error.message);

        return;
      }

      alert("Institute created");

      setInstituteName("");

      setShortName("");

      fetchInstitutes();
    };

  // =========================================
  // ASSIGN ROLE
  // =========================================

  const handleAssignRole =
    async () => {

      const {
        data: userProfile,
        error,
      } = await supabase
        .from("profiles")
        .select("*")
        .eq(
          "email",
          targetEmail
            .trim()
            .toLowerCase()
        )
        .single();

      if (error || !userProfile) {

        alert("User not found");

        return;
      }

      const { error: updateError } =
        await supabase
          .from("profiles")
          .update({
            role: selectedRole,
            institute_id:
              selectedInstitute,
          })
          .eq("id", userProfile.id);

      if (updateError) {

        alert(updateError.message);

        return;
      }

      alert("Role assigned");

      setTargetEmail("");

      setSelectedInstitute("");

      setSelectedRole(
        "INSTITUTE_ADMIN"
      );
    };

    // =========================================
    // SAVE MEMBERS
    // =========================================

    const saveMembers =
      async () => {

        if (
          !selectedGroupId
        ) {

          return;
        }

        const { error: deleteError } =
          await supabase
            .from("class_members")
            .delete()
            .eq(
              "class_id",
              selectedGroupId
            );

        if (
          deleteError
        ) {

          alert(
            deleteError.message
          );

          return;
        }

        if (
          selectedMembers.length > 0
        ) {

          const records =
            selectedMembers.map(
              (
                memberId
              ) => ({

                class_id:
                  selectedGroupId,

                student_id:
                  memberId,

              })
            );

          const { error } =
            await supabase
              .from(
                "class_members"
              )
              .insert(
                records
              );

          if (
            error
          ) {

            alert(
              error.message
            );

            return;
          }

        }

        alert(
          "Members saved successfully"
        );

        setShowMembersModal(
          false
        );

        setSelectedMembers(
          []
        );

      };

    // =========================================
    // UPDATE USER STATUS
    // =========================================

    const updateUserStatus = async (
      userId: string,
      status: string
    ) => {

      const { error } =
        await supabase
          .from("profiles")
          .update({
            status: status,
          })
          .eq("id", userId);

      if (error) {

        alert(error.message);

        return;
      }

      alert("Status updated successfully");

      fetchUsers();

    };

  // =========================================
  // CREATE USER MANUALLY (FOR TESTING PURPOSES)
  // =========================================
    const handleCreateUser =
      async () => {

        const response =
          await fetch(
            "/api/create-user",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

            body:
            JSON.stringify({
              email: newUserEmail,
              password: newUserPassword,
              full_name: newUserName,
              role: newUserRole,
              mobile_number: newUserMobile,
              enrollment_number:
                enrollmentNumber,
              faculty_id:
                facultyId,
            }),
            }
          );

        const result =
          await response.json();

        if (result.error) {

          alert(result.error);

          return;
        }

        alert(
          "User created successfully"
        );

        setShowAddUserModal(
          false
        );

        setNewUserName("");
        setNewUserEmail("");
        setNewUserPassword("");
        setNewUserMobile("");
        setNewUserRole(
          "MEMBER"
        );

        fetchUsers();
      };


  // =========================================
  // CREATE DEPARTMENT
  // =========================================

  const handleCreateDepartment =
    async () => {

      if (!departmentInstitute) {

        alert("Select institute");

        return;
      }

      if (!departmentName) {

        alert("Department name required");

        return;
      }

      const { error } = await supabase
        .from("departments")
        .insert([
          {
            institute_id:
              departmentInstitute,

            name: departmentName,

            short_name:
              departmentShortName,
          },
        ]);

      if (error) {

        alert(error.message);

        return;
      }

      alert("Department created");

      setDepartmentInstitute("");

      setDepartmentName("");

      setDepartmentShortName("");

      fetchDepartments();
    };


    // =========================================
    // RESET PASSWORD
    // =========================================

    const handleResetPassword =
      async () => {

        if (
          !resetPassword ||
          !confirmResetPassword
        ) {

          alert(
            "Please enter password"
          );

          return;
        }

        if (
          resetPassword !==
          confirmResetPassword
        ) {

          alert(
            "Passwords do not match"
          );

          return;
        }

        const response =
          await fetch(
            "/api/reset-password",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  userId:
                    selectedUserId,

                  password:
                    resetPassword,
                }),
            }
          );

        const result =
          await response.json();

        if (
          !response.ok
        ) {

          alert(
            result.error
          );

          return;
        }

        alert(
          "Password reset successfully"
        );

        setShowResetPasswordModal(
          false
        );

        setResetPassword("");

        setConfirmResetPassword("");

        setSelectedUserId("");
      };

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = async () => {

    await supabase.auth.signOut();

    window.location.href = "/login";
  };

  const instituteManagement = {

  instituteName,

  shortName,

  setInstituteName,

  setShortName,

  handleCreateInstitute,

};

const departmentManagement = {

  departmentInstitute,

  departmentName,

  departmentShortName,

  institutes,

  setDepartmentInstitute,

  setDepartmentName,

  setDepartmentShortName,

  handleCreateDepartment,

};

const roleManagement = {

  targetEmail,

  selectedInstitute,

  selectedRole,

  institutes,

  setTargetEmail,

  setSelectedInstitute,

  setSelectedRole,

  handleAssignRole,

};

const groupManagement = {

  groups,

  setSelectedGroupId,

  setShowMembersModal,

  showMembersModal,

  members,

  selectedMembers,

  setSelectedMembers,

  saveMembers,

};

const communicationManagement = {

  selectedCategoryGroup,

  categoryName,

  groups,

  setSelectedCategoryGroup,

  setCategoryName,

  createMessageCategory,

};

const addUser = {

  showAddUserModal,

  newUserName,
  newUserEmail,
  newUserMobile,
  newUserPassword,
  newUserRole,

  enrollmentNumber,
  facultyId,

  setShowAddUserModal,

  setNewUserName,
  setNewUserEmail,
  setNewUserMobile,
  setNewUserPassword,
  setNewUserRole,

  setEnrollmentNumber,
  setFacultyId,

  handleCreateUser,

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

const userManagement = {

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
  resetPasswordModal,

};


// =========================================
  // UI
  // =========================================

      return (

      <div className="flex min-h-screen bg-gray-100">

        <DashboardSidebar
          title="Super Admin Workspace"
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          menuItems={menuItems}
        />

        <div className="flex-1 p-8">

          <DashboardHeader
            title="Super Admin Dashboard"
            subtitle="Institution Management Platform"
            fullName={
              profile?.full_name ||
              "Super Admin"
            }
            email={email}
            onLogout={handleLogout}
          />

          {/* HOME */}

          {activeModule === "HOME" && (

            <div>

              <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                <StatCard
                  title="Institutes"
                  value={totalInstitutes}
                  color="text-blue-700"
                />

                <StatCard
                  title="Departments"
                  value={totalDepartments}
                  color="text-green-700"
                />

                <StatCard
                  title="Users"
                  value={totalUsers}
                  color="text-purple-700"
                />

              </div>

              <div className="rounded-2xl bg-white p-8 shadow-lg">

                <h2 className="text-3xl font-bold">
                  Welcome
                </h2>

                <p className="mt-3 text-gray-600">
                  Super Admin Management &
                  Communication Platform
                </p>

              </div>

            </div>

          )}

{/* INSTITUTES */}

  {activeModule === "INSTITUTES" && (
    <InstituteManagement
      instituteManagement={instituteManagement}
    />
  )}

{/* DEPARTMENTS */}
  {activeModule === "DEPARTMENTS" && (
    <DepartmentManagement
      departmentManagement={
        departmentManagement
      }
    />
  )}

{/* ROLES */}
{activeModule === "ROLES" && (

  <RoleManagement
    roleManagement={roleManagement}
  />
)}

{/* GROUPS */}

  {activeModule === "GROUPS" && (

    <GroupManagement
      groupManagement={groupManagement}
    />

  )}

{/* MESSAGE CATEGORIES */ }
  {activeModule === "MESSAGE_CATEGORIES" && (

    <CommunicationCategoryManagement
      communicationManagement={communicationManagement}
    />
  )}

{/* USERS */}

{activeModule === "USERS" && (
  <UserManagement
    userManagement={userManagement}
  />
)}

{/* REPORTS */}
  {activeModule === "REPORTS" && (
    <Reports />
  )}

        </div>

      </div>
      );
}