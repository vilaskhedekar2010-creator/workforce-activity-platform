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

            <div className="rounded-2xl bg-white p-8 shadow-lg">

              <h2 className="mb-4 text-3xl font-bold">
                Role Management
              </h2>

              <input
                type="email"
                placeholder="User Email"
                value={targetEmail}
                onChange={(e) =>
                  setTargetEmail(
                    e.target.value
                      .toLowerCase()
                  )
                }
                className="mb-3 w-full rounded border p-2"
              />

              <select
                value={selectedInstitute}
                onChange={(e) =>
                  setSelectedInstitute(
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

              <select
                value={selectedRole}
                onChange={(e) =>
                  setSelectedRole(
                    e.target.value
                  )
                }
                className="mb-3 w-full rounded border p-2"
              >

                <option value="INSTITUTE_ADMIN">
                  INSTITUTE_ADMIN
                </option>

                <option value="DEPARTMENT_ADMIN">
                  DEPARTMENT_ADMIN
                </option>

                <option value="FACULTY">
                  COORDINATORS
                </option>

                <option value="STUDENT">
                  MEMBER
                </option>

              </select>

              <button
                onClick={handleAssignRole}
                className="rounded bg-green-600 px-4 py-2 text-white"
              >
                Assign Role
              </button>

            </div>

          )}

          {/* GROUPS */}

          {activeModule === "GROUPS" && (

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
                        {group.coordinator?.full_name ||
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
{
showMembersModal && (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">

  <div className="w-full max-w-md rounded bg-white p-6">

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
            checked={
              selectedMembers.includes(
                member.id
              )
            }
            onChange={(e) => {

              if (
                e.target.checked
              ) {

                setSelectedMembers(
                  [
                    ...selectedMembers,
                    member.id,
                  ]
                );

              } else {

                setSelectedMembers(
                  selectedMembers.filter(
                    (id) =>
                      id !==
                      member.id
                  )
                );

              }

            }}
          />

          {member.full_name}

        </label>

      ))}

    </div>

    <div className="mt-4 flex justify-end gap-2">

      <button
        onClick={() => {

          setShowMembersModal(
            false
          );

          setSelectedMembers(
            []
          );

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

)}

            </div>


            )}

            {/* MESSAGE CATEGORIES */ }

            {activeModule === "MESSAGE_CATEGORIES" && (

                <div className="space-y-6">

                  {/* Create Category */}

                  <div className="rounded-lg border p-6">

                    <h2 className="mb-4 text-xl font-bold">

                      Create Communication Category

                    </h2>

                    <select
                      value={selectedCategoryGroup}
                      onChange={(e)=>
                        setSelectedCategoryGroup(
                          e.target.value
                        )
                      }
                      className="mb-3 w-full rounded border p-3"
                    >

                      <option value="">

                        Select Group

                      </option>

                      {groups.map((group)=>(

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
                      onChange={(e)=>
                        setCategoryName(
                          e.target.value
                        )
                      }
                      className="mb-3 w-full rounded border p-3"
                    />

                    <button
                      onClick={
                        createMessageCategory
                      }
                      className="rounded bg-blue-600 px-4 py-2 text-white"
                    >

                      Create Category

                    </button>

                  </div>

                </div>

                )}

          {/* USERS */}

          {activeModule === "USERS" && (

          <div className="rounded-2xl bg-white p-8 shadow-lg">

            <h2 className="mb-6 text-3xl font-bold">

              User Management

            </h2>
              <button
                onClick={() =>
                  setShowAddUserModal(
                    true
                  )
                }
                className="rounded bg-blue-600 px-4 py-2 text-white"
              >
                + Add User
              </button>

            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">

              <div className="rounded border bg-blue-50 p-4">
                <h3 className="text-sm font-semibold text-gray-600">
                  Total Users
                </h3>
                <p className="text-3xl font-bold text-blue-700">
                  {totalUsers}
                </p>
              </div>

              <div className="rounded border bg-green-50 p-4">
                <h3 className="text-sm font-semibold text-gray-600">
                  Coordinators
                </h3>
                <p className="text-3xl font-bold text-green-700">
                  {totalFaculty}
                </p>
              </div>

              <div className="rounded border bg-purple-50 p-4">
                <h3 className="text-sm font-semibold text-gray-600">
                  Members
                </h3>
                <p className="text-3xl font-bold text-purple-700">
                  {totalStudents}
                </p>
              </div>

              <div className="rounded border bg-emerald-50 p-4">
                <h3 className="text-sm font-semibold text-gray-600">
                  Active
                </h3>
                <p className="text-3xl font-bold text-emerald-700">
                  {activeUsers}
                </p>
              </div>

              <div className="rounded border bg-yellow-50 p-4">
                <h3 className="text-sm font-semibold text-gray-600">
                  Inactive
                </h3>
                <p className="text-3xl font-bold text-yellow-700">
                  {inactiveUsers}
                </p>
              </div>

              <div className="rounded border bg-red-50 p-4">
                <h3 className="text-sm font-semibold text-gray-600">
                  Suspended
                </h3>
                <p className="text-3xl font-bold text-red-700">
                  {suspendedUsers}
                </p>
              </div>

            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">

              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(
                    e.target.value
                  )
                }
                className="rounded border p-3"
              />

              <select
                value={roleFilter}
                onChange={(e) =>
                  setRoleFilter(
                    e.target.value
                  )
                }
                className="rounded border p-3"
              >
                <option value="ALL">
                  All Roles
                </option>

                <option value="SUPER_ADMIN">
                  SUPER_ADMIN
                </option>

                <option value="FACULTY">
                  FACULTY
                </option>

                <option value="STUDENT">
                  STUDENT
                </option>

              </select>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
                className="rounded border p-3"
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

                    <th className="p-3 text-left">
                      Name
                    </th>

                    <th className="p-3 text-left">
                      Email
                    </th>

                    <th className="p-3 text-left">
                      Role
                    </th>

                    <th className="p-3 text-left">
                      Status
                    </th>

                    <th className="p-3 text-left">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredUsers.map(
                    (user) => (

                      <tr
                        key={user.id}
                        className="border-t"
                      >

                        <td className="p-3">

                          {
                            user.full_name ||
                            "--"
                          }

                        </td>

                        <td className="p-3">

                          {user.email}

                        </td>

                        <td className="p-3">

                          {
                            user.role ||
                            "--"
                          }

                        </td>

                        <td className="p-3">

                          {
                            user.status ||
                            "ACTIVE"
                          }

                        </td>

                        <td className="p-3">

                          {
                            user.role === "SUPER_ADMIN"

                              ? (

                                <span className="font-bold text-red-600">
                                  Protected
                                </span>

                              )

                              : (

                                <div className="flex gap-2">

                                  <button
                                    onClick={() =>
                                      updateUserStatus(
                                        user.id,
                                        "ACTIVE"
                                      )
                                    }
                                    className="rounded bg-green-600 px-3 py-1 text-white"
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
                                    className="rounded bg-yellow-600 px-3 py-1 text-white"
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
                                    className="rounded bg-red-600 px-3 py-1 text-white"
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
                                    className="rounded bg-blue-600 px-3 py-1 text-white"
                                  >
                                    Reset Password
                                  </button>

                                </div>

                              )
                          }

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

          )}

          {/* REPORTS */}

          {activeModule === "REPORTS" && (

            <div className="rounded-2xl bg-white p-8 shadow-lg">

              <h2 className="mb-4 text-3xl font-bold">
                Reports
              </h2>

              <p>
                Coming Soon
              </p>

            </div>

          )}

        </div>

        {/* ADD USER MODAL */}

        {
          showAddUserModal && (

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">

              <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">

                <h2 className="mb-5 text-2xl font-bold">

                  Add User

                </h2>

                <input
                  type="text"
                  placeholder="Full Name"
                  value={newUserName}
                  onChange={(e) =>
                    setNewUserName(
                      e.target.value
                    )
                  }
                  className="mb-3 w-full rounded border p-3"
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={newUserEmail}
                  onChange={(e) =>
                    setNewUserEmail(
                      e.target.value
                    )
                  }
                  className="mb-3 w-full rounded border p-3"
                />

                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={newUserMobile}
                  onChange={(e) =>
                    setNewUserMobile(
                      e.target.value
                    )
                  }
                  className="mb-3 w-full rounded border p-3"
                />



                <input
                  type="password"
                  placeholder="Password"
                  value={newUserPassword}
                  onChange={(e) =>
                    setNewUserPassword(
                      e.target.value
                    )
                  }
                  className="mb-3 w-full rounded border p-3"
                />

                <select
                  value={newUserRole}
                  onChange={(e) =>
                    setNewUserRole(
                      e.target.value
                    )
                  }
                  className="mb-4 w-full rounded border p-3"
                >

                  <option value="STUDENT">
                    STUDENT
                  </option>

                  <option value="FACULTY">
                    FACULTY
                  </option>

                </select>

                {
                  newUserRole ===
                  "STUDENT" && (

                  <input
                    type="text"
                    placeholder="Enrollment Number"
                    value={enrollmentNumber}
                    onChange={(e) =>
                      setEnrollmentNumber(
                        e.target.value
                      )
                    }
                    className="mb-3 w-full rounded border p-3"
                  />
                )}

                {
                  newUserRole ===
                  "FACULTY" && (

                  <input
                    type="text"
                    placeholder="Faculty ID"
                    value={facultyId}
                    onChange={(e) =>
                      setFacultyId(
                        e.target.value
                      )
                    }
                    className="mb-3 w-full rounded border p-3"
                  />
                )}

                <div className="flex justify-end gap-3">

                  <button
                    onClick={() =>
                      setShowAddUserModal(
                        false
                      )
                    }
                    className="rounded bg-gray-500 px-4 py-2 text-white"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={
                      handleCreateUser
                    }
                    className="rounded bg-green-600 px-4 py-2 text-white"
                  >
                    Create User
                  </button>

                </div>

              </div>

            </div>
          )
        }
        {/* =========================================
            RESET PASSWORD MODAL
        ========================================= */}

        {
          showResetPasswordModal && (

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">

              <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">

                <h2 className="mb-5 text-2xl font-bold">

                  Reset Password

                </h2>

                <input
                  type="password"
                  placeholder="New Password"
                  value={resetPassword}
                  onChange={(e) =>
                    setResetPassword(
                      e.target.value
                    )
                  }
                  className="mb-4 w-full rounded border p-3"
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmResetPassword}
                  onChange={(e) =>
                    setConfirmResetPassword(
                      e.target.value
                    )
                  }
                  className="mb-4 w-full rounded border p-3"
                />

                <div className="flex justify-end gap-3">

                  <button
                    onClick={() => {

                      setShowResetPasswordModal(
                        false
                      );

                      setResetPassword("");

                      setConfirmResetPassword("");

                      setSelectedUserId("");

                    }}
                    className="rounded bg-gray-500 px-4 py-2 text-white"
                  >

                    Cancel

                  </button>

                  <button
                    onClick={
                      handleResetPassword
                    }
                    className="rounded bg-blue-600 px-4 py-2 text-white"
                  >

                    Reset Password

                  </button>

                </div>

              </div>

            </div>
          )
        }

      </div>
      );
}