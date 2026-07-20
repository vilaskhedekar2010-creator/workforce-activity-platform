"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";

export default function SuperAdminPage() {

  // =========================================
  // USER DETAILS
  // =========================================

  const [email, setEmail] = useState("");

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
  // DEPARTMENT LIST
  // =========================================

  const [departments, setDepartments] =
    useState<any[]>([]);

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

      fetchInstitutes();

      fetchDepartments();
    };

    loadUser();

  }, []);

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
            Super Admin Dashboard
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

      {/* CREATE INSTITUTE */}

      <div className="rounded border p-6">

        <h2 className="mb-4 text-2xl font-bold">
          Create Institute
        </h2>

        <input
          type="text"
          placeholder="Institute Name"
          value={instituteName}
          onChange={(e) =>
            setInstituteName(
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
          onClick={handleCreateInstitute}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Create Institute
        </button>

      </div>
            {/* ASSIGN ROLE */}

      <div className="mt-8 rounded border p-6">

        <h2 className="mb-4 text-2xl font-bold">
          Assign Role
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

      {/* CREATE DEPARTMENT */}

      <div className="mt-8 rounded border p-6">

        <h2 className="mb-4 text-2xl font-bold">
          Create Department
        </h2>

        <select
          value={departmentInstitute}
          onChange={(e) =>
            setDepartmentInstitute(
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
          value={departmentShortName}
          onChange={(e) =>
            setDepartmentShortName(
              e.target.value
            )
          }
          className="mb-3 w-full rounded border p-2"
        />

        <button
          onClick={
            handleCreateDepartment
          }
          className="rounded bg-purple-600 px-4 py-2 text-white"
        >
          Create Department
        </button>

      </div>

      {/* INSTITUTE LIST */}

      <div className="mt-10">

        <h2 className="mb-4 text-2xl font-bold">
          Institutes
        </h2>

        <div className="space-y-3">

          {institutes.map((inst) => (

            <div
              key={inst.id}
              className="rounded border p-4"
            >

              <p className="font-bold">
                {inst.name}
              </p>

              <p>
                {inst.short_name}
              </p>

            </div>

          ))}

        </div>

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

              <p className="text-sm text-gray-600">
                Institute:
                {" "}
                {
                  dept.institutes?.name
                }
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}