"use client";

import { useState } from "react";

import CreateSuperAdminDialog
from "../dialogs/CreateSuperAdminDialog";

export default function
PlatformDashboard() {

  const [

    open,

    setOpen,

  ] = useState(false);

  return (

    <div className="rounded-2xl bg-white p-8 shadow-lg">

      <h1 className="text-3xl font-bold">

        Platform Owner Dashboard

      </h1>

      <p className="mt-4 text-gray-600">

        Welcome to the WAMP Platform Owner Console.

      </p>

      <div className="mt-8">

        <button

          onClick={() => setOpen(true)}

          className="rounded bg-blue-600 px-4 py-2 text-white"

        >

          + Create Super Admin

        </button>

      </div>

      <div className="mt-8 rounded-lg border p-6">

        <h2 className="text-xl font-semibold">

          Future Modules

        </h2>

        <ul className="mt-4 list-disc space-y-2 pl-6">

          <li>License Management</li>

          <li>Audit Logs</li>

          <li>System Settings</li>

          <li>Application Health</li>

        </ul>

      </div>

      <CreateSuperAdminDialog

        open={open}

        onClose={() => setOpen(false)}

      />

    </div>

  );

}