"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";

export default function InstituteAdminPage() {

  // =========================================
  // USER DETAILS
  // =========================================

  const [email, setEmail] = useState("");

  const [profile, setProfile] = useState<any>(null);

  // =========================================
  // DEPARTMENT FORM
  // =========================================

  const [departmentName, setDepartmentName] =
    useState("");

  const [shortName, setShortName] =
    useState("");

  // =========================================
  // DEPARTMENT LIST
  // =========================================

  const [departments, setDepartments] =
    useState<any[]>([]);

      // =========================================
  // ASSIGN ROLE
  // =========================================

  const [targetEmail, setTargetEmail] =
    useState("");

  const [selectedDepartment,
    setSelectedDepartment] =
    useState("");

  const [selectedRole,
    setSelectedRole] =
    useState("FACULTY");

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

      // Security Check
      if (data.role !== "INSTITUTE_ADMIN") {

        alert("Access Denied");

        window.location.href = "/dashboard";

        return;
      }

      setProfile(data);

      fetchDepartments(data.institute_id);
    };

    loadUser();

  }, []);

  // =========================================
  // FETCH DEPARTMENTS
  // =========================================

  const fetchDepartments = async (
    instituteId: string
  ) => {

    const { data } = await supabase
      .from("departments")
      .select("*")
      .eq("institute_id", instituteId)
      .order("created_at", {
        ascending: false,
      });

    if (data) {
      setDepartments(data);
    }
  };

  // =========================================
  // CREATE DEPARTMENT
  // =========================================

  const handleCreateDepartment =
    async () => {

      if (!departmentName) {

        alert("Department name required");

        return;
      }

      const { error } = await supabase
        .from("departments")
        .insert([
          {
            institute_id:
              profile.institute_id,

            name: departmentName,

            short_name: shortName,
          },
        ]);

      if (error) {

        alert(error.message);

        return;
      }

      alert(
        "Department created successfully"
      );

      setDepartmentName("");
      setShortName("");

      fetchDepartments(profile.institute_id);
    };
  // =========================================
  // ASSIGN ROLE
  // =========================================

  const handleAssignRole =
    async () => {

      if (!targetEmail) {

        alert("User email required");

        return;
      }

      if (!selectedDepartment) {

        alert("Please select department");

        return;
      }

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
              profile.institute_id,

            department_id:
              selectedDepartment,

          })
          .eq("id", userProfile.id);

      if (updateError) {

        alert(updateError.message);

        return;
      }

      alert("Role assigned successfully");

      setTargetEmail("");

      setSelectedDepartment("");

      setSelectedRole("FACULTY");
    };
  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = async () => {

    await supabase.auth.signOut();

    window.location.href = "/login";
  };

  // =========================================
  // UI
  // =========================================

  return (

    <div className="p-10">

      {/* HEADER */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Institute Admin Dashboard
          </h1>

          <p>
            Logged in as: {email}
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="rounded bg-black px-4 py-2 text-white"
        >
          Logout
        </button>

      </div>

      {/* CREATE DEPARTMENT */}

      <div className="rounded border p-6">

        <h2 className="mb-4 text-2xl font-bold">
          Create Department
        </h2>

        <input
          type="text"
          placeholder="Department Name"
          value={departmentName}
          onChange={(e) =>
            setDepartmentName(
              e.target.value
            )
          }
          className="mb-3 w-full rounded border p-2"
        />

        <input
          type="text"
          placeholder="Short Name"
          value={shortName}
          onChange={(e) =>
            setShortName(
              e.target.value
            )
          }
          className="mb-3 w-full rounded border p-2"
        />

        <button
          onClick={handleCreateDepartment}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Create Department
        </button>

      </div>

          {/* ASSIGN ROLE */}

      <div className="mt-8 rounded border p-6">

        <h2 className="mb-4 text-2xl font-bold">
          Assign Department Role
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
          value={selectedDepartment}
          onChange={(e) =>
            setSelectedDepartment(
              e.target.value
            )
          }
          className="mb-3 w-full rounded border p-2"
        >

          <option value="">
            Select Department
          </option>

          {departments.map((dept) => (

            <option
              key={dept.id}
              value={dept.id}
            >
              {dept.name}
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

          <option value="DEPARTMENT_ADMIN">
            DEPARTMENT_ADMIN
          </option>

          <option value="FACULTY">
            FACULTY
          </option>

          <option value="STUDENT">
            STUDENT
          </option>

        </select>

        <button
          onClick={handleAssignRole}
          className="rounded bg-green-600 px-4 py-2 text-white"
        >
          Assign Role
        </button>

      </div>
      
      {/* DEPARTMENT LIST */}

      <div className="mt-10">

        <h2 className="mb-4 text-2xl font-bold">
          Departments
        </h2>

        <div className="space-y-3">

          {departments.map((dept) => (

            <div
              key={dept.id}
              className="rounded border p-4"
            >

              <p className="font-bold">
                {dept.name}
              </p>

              <p>
                {dept.short_name}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}