"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";

export default function DashboardPage() {

  // =========================================
  // USER DETAILS
  // =========================================

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

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
  // USER ROLE MANAGEMENT
  // =========================================

  const [targetEmail, setTargetEmail] =
    useState("");

  const [selectedInstitute, setSelectedInstitute] =
    useState("");

  const [selectedRole, setSelectedRole] =
    useState("INSTITUTE_ADMIN");

  const [activeModule,
    setActiveModule] =
    useState("DASHBOARD");

  // =========================================
  // LOAD USER + ROLE
  // =========================================

  useEffect(() => {

    const loadUser = async () => {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Redirect to login if no user
      if (!user) {
        window.location.href = "/login";
        return;
      }

      setEmail(user.email || "");

      // =========================================
      // FETCH PROFILE
      // =========================================

      const {
              data: profileData,
              error: profileError,
      } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

let profile = profileData;

      // =========================================
      // CREATE PROFILE IF NOT EXISTS
      // =========================================

      if (!profile) {

        const {
          data: insertedProfile,
          error,
        } = await supabase
          .from("profiles")
          .insert([
            {
              id: user.id,
              email: user.email,
              role: "STUDENT",
            },
          ])
          .select()
          .single();

        if (error) {
          console.log(error.message);
        }

        profile = insertedProfile;
      }

      // =========================================
      // SET ROLE
      // =========================================

      if (profile) {
        setRole(profile.role);
      }
      if (profile) {
        setRole(profile.role);
        // =========================================
        // // ROLE BASED REDIRECT
        // // =========================================
        if (profile.role === "SUPER_ADMIN") {
          window.location.href = 
          "/dashboard/super-admin";
          return;
        }

      if (profile.role === "INSTITUTE_ADMIN") {

        window.location.href =
          "/dashboard/institute-admin";

        return;
      }

      if (profile.role === "DEPARTMENT_ADMIN") {

        window.location.href =
          "/dashboard/department-admin";

          return;
      }

      if (profile.role === "FACULTY") {

        window.location.href =
        "/dashboard/faculty";

        return;
      }

      if (profile.role === "STUDENT") {

        window.location.href =
        "/dashboard/student";

        return;
      }

      }

      // =========================================
      // LOAD INSTITUTES
      // =========================================

      fetchInstitutes();
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
  // CREATE INSTITUTE
  // =========================================

  const handleCreateInstitute = async () => {

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

    alert("Institute created successfully");

    setInstituteName("");
    setShortName("");

    fetchInstitutes();
  };

  // =========================================
  // ASSIGN ROLE + INSTITUTE
  // =========================================

  const handleAssignRole = async () => {

    if (!targetEmail) {
      alert("User email required");
      return;
    }

    if (!selectedInstitute) {
      alert("Please select institute");
      return;
    }

    const {
      data: userProfile,
      error,
    } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", targetEmail.trim().toLowerCase())
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
          institute_id: selectedInstitute,
        })
        .eq("id", userProfile.id);

    if (updateError) {
      alert(updateError.message);
      return;
    }

    alert("Role assigned successfully");

    setTargetEmail("");
    setSelectedInstitute("");
    setSelectedRole("INSTITUTE_ADMIN");
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
            Dashboard
          </h1>

          <p>
            Logged in as: {email}
          </p>

          <p className="font-semibold text-blue-600">
            Role: {role}
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="rounded bg-black px-4 py-2 text-white"
        >
          Logout
        </button>

      </div>

      {/* SUPER ADMIN SECTION */}

      {role == "SUPER_ADMIN" && (

        <>

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
                setInstituteName(e.target.value)
              }
              className="mb-3 w-full rounded border p-2"
            />

            <input
              type="text"
              placeholder="Short Name"
              value={shortName}
              onChange={(e) =>
                setShortName(e.target.value)
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
                setTargetEmail(e.target.value)
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
                setSelectedRole(e.target.value)
              }
              className="mb-3 w-full rounded border p-2"
            >

              <option value="INSTITUTE_ADMIN">
                INSTITUTE_ADMIN
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

        </>

      )}

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

    </div>
  );
}