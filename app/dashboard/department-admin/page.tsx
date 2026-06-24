"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";

import DashboardSidebar
from "@/components/shared/DashboardSidebar";

import DashboardHeader
from "@/components/shared/DashboardHeader";

import StatCard
from "@/components/shared/StatCard";

export default function DepartmentAdminPage() {

  // =========================================
  // USER DETAILS
  // =========================================

  const [email, setEmail] =
    useState("");

  const [profile, setProfile] =
    useState<any>(null);

  // =========================================
  // FACULTY + STUDENTS
  // =========================================

  const [facultyUsers,
    setFacultyUsers] =
    useState<any[]>([]);

  const [studentUsers,
    setStudentUsers] =
    useState<any[]>([]);

  // =========================================
  // CLASS FORM
  // =========================================

  const [className,
    setClassName] =
    useState("");

  const [section,
    setSection] =
    useState("");

  const [academicYear,
    setAcademicYear] =
    useState("");

  const [selectedFaculty,
    setSelectedFaculty] =
    useState("");

  // =========================================
  // CLASS LIST
  // =========================================

  const [classes,
    setClasses] =
    useState<any[]>([]);

      // =========================================
  // ASSIGN STUDENT TO CLASS
  // =========================================

  const [selectedClassId,
    setSelectedClassId] =
    useState("");

  const [selectedStudentId,
    setSelectedStudentId] =
    useState("");

  // =========================================
  // CLASS MEMBERS
  // =========================================

  const [classMembers,
    setClassMembers] =
    useState<any[]>([]);

  // =========================================
  // ACTIVE MODULE
  // =========================================

  const [
    activeModule,
    setActiveModule,
  ] = useState("HOME");

  // =========================================
  // SIDEBAR MENU
  // =========================================

  const menuItems = [
    {
      id: "HOME",
      label: "Dashboard",
    },
    {
      id: "FACULTY",
      label: "Faculty Management",
    },
    {
      id: "STUDENTS",
      label: "Student Management",
    },
    {
      id: "CLASSES",
      label: "Class Management",
    },
    {
      id: "CATEGORY",
      label: "Category Management",
    },
  ];

  // =========================================
  // LOAD USER
  // =========================================

  useEffect(() => {

    const loadUser = async () => {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {

        window.location.href =
          "/login";

        return;
      }

      setEmail(user.email || "");

      // =========================================
      // LOAD PROFILE
      // =========================================

      const { data } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

      if (!data) {

        alert("Profile not found");

        return;
      }

      // =========================================
      // SECURITY CHECK
      // =========================================

      if (
        data.role !== "DEPARTMENT_ADMIN" &&
        data.role !== "INSTITUTE_ADMIN" &&
        data.role !== "SUPER_ADMIN"
      ) {

        alert("Access Denied");

        window.location.href =
          "/dashboard";

        return;
      }

      setProfile(data);

      fetchDepartmentUsers(
        data.department_id
      );

      fetchClasses(
        data.department_id
      );
    };

    loadUser();

  }, []);

  // =========================================
  // FETCH USERS
  // =========================================

  const fetchDepartmentUsers =
    async (
      departmentId: string
    ) => {

      // FACULTY

      const {
        data: facultyData
      } = await supabase
        .from("profiles")
        .select("*")
        .eq(
          "department_id",
          departmentId
        )
        .eq("role", "FACULTY");

      if (facultyData) {

        setFacultyUsers(
          facultyData
        );
      }

      // STUDENTS

      const {
        data: studentData
      } = await supabase
        .from("profiles")
        .select("*")
        .eq(
          "department_id",
          departmentId
        )
        .eq("role", "STUDENT");

      if (studentData) {

        setStudentUsers(
          studentData
        );
      }
    };

  // =========================================
  // FETCH CLASSES
  // =========================================

  const fetchClasses =
    async (
      departmentId: string
    ) => {

      const { data } =
        await supabase
          .from("classes")
          .select(`
            *,
            faculty_coordinator:
            faculty_coordinator_id(
              full_name,
              email
            )
          `)
          .eq(
            "department_id",
            departmentId
          )
          .order(
            "created_at",
            {
              ascending: false,
            }
          );

      if (data) {

        setClasses(data);
      }
    };
  // =========================================
  // FETCH CLASS MEMBERS
  // =========================================

  const fetchClassMembers =
    async (
      classId: string
    ) => {

      const { data } =
        await supabase
          .from("class_members")
          .select(`
            *,
            profiles(
              full_name,
              email
            )
          `)
          .eq("class_id", classId);

      if (data) {

        setClassMembers(data);
      }
    };

  // =========================================
  // ASSIGN STUDENT TO CLASS
  // =========================================

  const handleAssignStudent =
    async () => {

      if (!selectedClassId) {

        alert("Select class");

        return;
      }

      if (!selectedStudentId) {

        alert("Select student");

        return;
      }

const {
  data: existingMember
} = await supabase
  .from("class_members")
  .select("*")
  .eq("class_id", selectedClassId)
  .eq("student_id", selectedStudentId)
  .maybeSingle();

if (existingMember) {

  alert(
    "Student already assigned"
  );

  return;
}

const { error } =
  await supabase
    .from("class_members")
    .insert([
      {
        class_id:
          selectedClassId,

        student_id:
          selectedStudentId,
      },
    ]);

      if (error) {

        alert(error.message);

        return;
      }

      alert(
        "Student assigned successfully"
      );

      setSelectedStudentId("");

      fetchClassMembers(
        selectedClassId
      );
    };


  // =========================================
  // CREATE CLASS
  // =========================================

  const handleCreateClass =
    async () => {

      if (!className) {

        alert("Class name required");

        return;
      }

      const { error } =
        await supabase
          .from("classes")
          .insert([
            {

              institute_id:
                profile.institute_id,

              department_id:
                profile.department_id,

              name: className,

              section: section,

              academic_year:
                academicYear,

              faculty_coordinator_id:
                selectedFaculty || null,

            },
          ]);

      if (error) {

        alert(error.message);

        return;
      }

      alert(
        "Class created successfully"
      );

      setClassName("");

      setSection("");

      setAcademicYear("");

      setSelectedFaculty("");

      fetchClasses(
        profile.department_id
      );
    };

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout =
    async () => {

      await supabase.auth.signOut();

      window.location.href =
        "/login";
    };

  // =========================================
  // UI
  // =========================================

  return (

    <div className="flex min-h-screen bg-gray-100">

    <DashboardSidebar
      title="Department Workspace"
      activeModule={activeModule}
      setActiveModule={setActiveModule}
      menuItems={menuItems}
    />

    {/* MAIN CONTENT */}

    <div className="flex-1 p-8">

      {/* HEADER */}

      <DashboardHeader
        title="Department Dashboard"
        subtitle="Department Management & Communication Portal"
        fullName={
          profile?.full_name ||
          "Department Admin"
        }
        email={email}
        onLogout={handleLogout}
      />

      {/* =========================================
      HOME MODULE
      ========================================= */}

      {
        activeModule ===
        "HOME" && (

        <div
          className="flex min-h-[75vh] items-end justify-center rounded-2xl bg-cover bg-center shadow-lg pb-12"
          style={{
            backgroundImage:
              "url('/campus.jpeg')",
          }}
        >

          <div className="w-full max-w-6xl rounded-2xl bg-white/10 px-10 py-8 text-center text-black shadow-md">

            <h1 className="text-6xl font-bold">

              Welcome

            </h1>

            <p className="mt-4 text-2xl">

              Department Management &
              Communication Platform

            </p>

            {/* STATS */}

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

              <StatCard
                title="Faculty Members"
                value={
                  facultyUsers.length
                }
                color="text-blue-700"
              />

              <StatCard
                title="Students"
                value={
                  studentUsers.length
                }
                color="text-green-700"
              />

              <StatCard
                title="Classes"
                value={
                  classes.length
                }
                color="text-purple-700"
              />

              <StatCard
                title="Categories"
                value="Coming Soon"
                color="text-yellow-600"
              />

            </div>

          </div>

        </div>
      )}



      {/* CREATE CLASS */}
      {
      activeModule ===
      "CLASSES" && (

      <div className="mb-10 rounded border p-6">

        <h2 className="mb-4 text-2xl font-bold">
          Create Class
        </h2>

        <input
          type="text"
          placeholder="Class Name"
          value={className}
          onChange={(e) =>
            setClassName(
              e.target.value
            )
          }
          className="mb-3 w-full rounded border p-2"
        />

        <input
          type="text"
          placeholder="Section"
          value={section}
          onChange={(e) =>
            setSection(
              e.target.value
            )
          }
          className="mb-3 w-full rounded border p-2"
        />

        <input
          type="text"
          placeholder="Academic Year"
          value={academicYear}
          onChange={(e) =>
            setAcademicYear(
              e.target.value
            )
          }
          className="mb-3 w-full rounded border p-2"
        />

        <select
          value={selectedFaculty}
          onChange={(e) =>
            setSelectedFaculty(
              e.target.value
            )
          }
          className="mb-3 w-full rounded border p-2"
        >

          <option value="">
            Select Faculty Coordinator
          </option>

          {facultyUsers.map(
            (faculty) => (

            <option
              key={faculty.id}
              value={faculty.id}
            >
              {faculty.full_name || faculty.email}
            </option>

          ))}

        </select>

        <button
          onClick={
            handleCreateClass
          }
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Create Class
        </button>

      </div>
      )}

      {/* FACULTY */}
      {
      activeModule ===
      "FACULTY" && (

      <div className="rounded border p-6">

        <h2 className="mb-4 text-2xl font-bold">
          Faculty Members
        </h2>

        <div className="space-y-3">

          {facultyUsers.map(
            (faculty) => (

            <div
              key={faculty.id}
              className="rounded border p-4"
            >

              <p className="font-bold">
                {faculty.full_name || faculty.email}
              </p>

              <p>
                {faculty.email}
              </p>

            </div>

          ))}

        </div>

      </div>
      )}

      {/* CLASSES */}

      {
      activeModule ===
      "CLASSES" && (

      <div className="mt-10 rounded border p-6">

        <h2 className="mb-4 text-2xl font-bold">
          Classes
        </h2>

        <div className="space-y-3">

          {classes.map(
            (cls) => (

            <div
              key={cls.id}
              className="rounded border p-4"
            >

              <p className="font-bold">
                {cls.name}
              </p>

              <p>
                Section:
                {" "}
                {cls.section}
              </p>

              <p>
                Academic Year:
                {" "}
                {cls.academic_year}
              </p>

              <p>
                Faculty Coordinator:
                {" "}
                {
                    cls
                    .faculty_coordinator
                    ?.full_name
                    ||
                        cls.faculty_coordinator
                        ?.email
                    ||
                        "Not Assigned"
                }
              </p>

            </div>

          ))}

        </div>
                    {/* CLASS MEMBERS */}

      <div className="mt-6">

        <h3 className="mb-3 text-xl font-bold">
          Class Students
        </h3>

        <div className="space-y-3">

          {classMembers.map(
            (member) => (

            <div
              key={member.id}
              className="rounded border p-3"
            >

              <p className="font-bold">

                {
                  member.profiles
                    ?.full_name
                  ||
                  member.profiles
                    ?.email
                }

              </p>

              <p>

                {
                  member.profiles
                    ?.email
                }

              </p>

            </div>

          ))}

        </div>

      </div>

      </div>
      )}





      {/* STUDENTS */}
      {
      activeModule ===
      "STUDENTS" && (
      <div className="mt-10 rounded border p-6">

        <h2 className="mb-4 text-2xl font-bold">
          Students
        </h2>

        <div className="space-y-3">

          {studentUsers.map(
            (student) => (

            <div
              key={student.id}
              className="rounded border p-4"
            >

              <p className="font-bold">
                {student.full_name}
              </p>

              <p>
                {student.email}
              </p>

            </div>

          ))}

        </div>
                  {/* ASSIGN STUDENT TO CLASS */}

      <div className="mt-10 rounded border p-6">

        <h2 className="mb-4 text-2xl font-bold">
          Assign Student To Class
        </h2>

        <select
          value={selectedClassId}
          onChange={(e) => {

            setSelectedClassId(
              e.target.value
            );

            fetchClassMembers(
              e.target.value
            );
          }}
          className="mb-3 w-full rounded border p-2"
        >

          <option value="">
            Select Class
          </option>

          {classes.map((cls) => (

            <option
              key={cls.id}
              value={cls.id}
            >
              {cls.name}
            </option>

          ))}

        </select>

        <select
          value={selectedStudentId}
          onChange={(e) =>
            setSelectedStudentId(
              e.target.value
            )
          }
          className="mb-3 w-full rounded border p-2"
        >

          <option value="">
            Select Student
          </option>

          {studentUsers.map(
            (student) => (

            <option
              key={student.id}
              value={student.id}
            >
              {
                student.full_name
                ||
                student.email
              }
            </option>

          ))}

        </select>

        <button
          onClick={
            handleAssignStudent
          }
          className="rounded bg-green-600 px-4 py-2 text-white"
        >
          Assign Student
        </button>

      </div>

      </div>
      )}

    </div>
  </div>
  );
}