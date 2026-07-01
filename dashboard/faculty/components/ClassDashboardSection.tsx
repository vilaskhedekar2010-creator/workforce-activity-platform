type ClassDashboardSectionProps = {

  dashboardSummary: any;

  dashboardClassFilter: string;
  setDashboardClassFilter: (value: string) => void;

  dashboardStudentFilter: string;
  setDashboardStudentFilter: (value: string) => void;

  dashboardCompletedFilter: string;
  setDashboardCompletedFilter: (value: string) => void;

  dashboardPendingFilter: string;
  setDashboardPendingFilter: (value: string) => void;

  classes: any[];

  filteredDashboardData: any[];

  viewPendingTasks: (
    studentId: string,
    studentName: string
  ) => void;

};

export default function ClassDashboardSection({

  dashboardSummary,

  dashboardClassFilter,
  setDashboardClassFilter,

  dashboardStudentFilter,
  setDashboardStudentFilter,

  dashboardCompletedFilter,
  setDashboardCompletedFilter,

  dashboardPendingFilter,
  setDashboardPendingFilter,

  classes,

  filteredDashboardData,

  viewPendingTasks,

}: ClassDashboardSectionProps) {

  return (

              <div className="rounded-2xl bg-white p-8 shadow-lg">

              <h1 className="mb-8 text-4xl font-bold text-gray-800">

                Class Dashboard

              </h1>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-6">

                <div className="rounded-xl bg-blue-50 p-5">

                  <h3 className="text-sm text-gray-500">

                    Total Students

                  </h3>

                  <p className="text-3xl font-bold text-blue-700">

                    {
                      dashboardSummary
                      .totalStudents
                    }

                  </p>

                </div>

                <div className="rounded-xl bg-green-50 p-5">

                  <h3 className="text-sm text-gray-500">

                    Active Students

                  </h3>

                  <p className="text-3xl font-bold text-green-700">

                    {
                      dashboardSummary
                      .activeStudents
                    }

                  </p>

                </div>

                <div className="rounded-xl bg-yellow-50 p-5">

                  <h3 className="text-sm text-gray-500">

                    Free Students

                  </h3>

                  <p className="text-3xl font-bold text-yellow-700">

                    {
                      dashboardSummary
                      .freeStudents
                    }

                  </p>

                </div>

                <div className="rounded-xl bg-purple-50 p-5">

                  <h3 className="text-sm text-gray-500">

                    Total Tasks

                  </h3>

                  <p className="text-3xl font-bold text-purple-700">

                    {
                      dashboardSummary
                      .totalTasks
                    }

                  </p>

                </div>

                <div className="rounded-xl bg-green-50 p-5">

                  <h3 className="text-sm text-gray-500">

                    Completed

                  </h3>

                  <p className="text-3xl font-bold text-green-700">

                    {
                      dashboardSummary
                      .completedTasks
                    }

                  </p>

                </div>

                <div className="rounded-xl bg-red-50 p-5">

                  <h3 className="text-sm text-gray-500">

                    Pending

                  </h3>

                  <p className="text-3xl font-bold text-red-700">

                    {
                      dashboardSummary
                      .pendingTasks
                    }

                  </p>

                </div>

              </div>

              <div className="mt-8 mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">

                {/* CLASS */}

                <select
                  value={dashboardClassFilter}
                  onChange={(e) =>
                    setDashboardClassFilter(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-3"
                >

                  <option value="ALL">
                    All Classes
                  </option>

                  {
                    classes.map(
                      (cls:any) => (

                        <option
                          key={cls.id}
                          value={cls.id}
                        >

                          {cls.name} - {cls.section}

                        </option>
                      )
                    )
                  }

                </select>

                {/* STUDENT */}

                <input
                  type="text"
                  placeholder="Search Student..."
                  value={dashboardStudentFilter}
                  onChange={(e) =>
                    setDashboardStudentFilter(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-3"
                />

                {/* COMPLETED */}

                <select
                  value={dashboardCompletedFilter}
                  onChange={(e) =>
                    setDashboardCompletedFilter(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-3"
                >

                  <option value="ALL">
                    All Completed
                  </option>

                  <option value="YES">
                    Has Completed Tasks
                  </option>

                  <option value="NO">
                    No Completed Tasks
                  </option>

                </select>

                {/* PENDING */}

                <select
                  value={dashboardPendingFilter}
                  onChange={(e) =>
                    setDashboardPendingFilter(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-3"
                >

                  <option value="ALL">
                    All Pending
                  </option>

                  <option value="YES">
                    Has Pending Tasks
                  </option>

                  <option value="NO">
                    No Pending Tasks
                  </option>

                </select>

              </div>
              
              {/* ========Class Dashboard table Header ======== */}
              
              <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">

                <table className="min-w-full">

                  <thead className="bg-gray-100">

                    <tr>

                      <th className="border-b px-4 py-3 text-center font-bold w-16">
                        Sr No
                      </th>

                      <th className="border-b px-4 py-3 text-left font-bold w-48">
                        Enrollment No
                      </th>

                      <th className="border-b px-4 py-3 text-left font-bold min-w-[250px]">
                        Student Name
                      </th>

                      <th className="border-b px-4 py-3 text-center font-bold w-28">
                        Total Tasks
                      </th>

                      <th className="border-b px-4 py-3 text-center font-bold w-28">
                        Completed
                      </th>

                      <th className="border-b px-4 py-3 text-center font-bold w-28">
                        Pending
                      </th>

                      <th className="border-b px-4 py-3 text-center font-bold w-56">
                        Progress
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      
                      filteredDashboardData.map(
                        (
                          row:any,
                          index:number
                        ) => (

                          <tr
                            key={row.student_id}
                            className="hover:bg-blue-50 transition"
                          >
                            {/* SR NO */}

                            <td className="border-b px-4 py-3 text-center">

                              {index + 1}

                            </td>

                            {/* ENROLLMENT */}

                            <td className="border-b px-4 py-3 font-medium">

                              {row.enrollment_number || "--"}

                            </td>

                            {/* NAME */}

                            <td className="border-b px-4 py-3 font-medium">

                              {row.student_name}

                            </td>

                            {/* TOTAL TASKS */}

                            <td className="border-b px-4 py-3 text-center font-semibold">

                              {row.total_tasks}

                            </td>

                            {/* COMPLETED */}

                            <td className="border-b px-4 py-3 text-center">

                              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700">

                                {row.completed_tasks}

                              </span>

                            </td>

                            {/* PENDING */}

                            <td className="border-b px-4 py-3 text-center">

                                <button
                                  onClick={() =>
                                    viewPendingTasks(
                                      row.student_id,
                                      row.student_name
                                    )
                                  }
                                  className="rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-700 hover:bg-red-200"
                                >
                                  {row.pending_tasks}
                                </button>

                            </td>

                            {/* PROGRESS */}

                            <td className="border-b px-4 py-3">

                              <div className="flex items-center gap-3">

                                <div className="h-4 flex-1 rounded-full bg-gray-200 overflow-hidden">

                                  <div
                                    className={`h-4 rounded-full ${
                                      row.average_progress >= 80
                                        ? "bg-green-500"
                                        : row.average_progress >= 50
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                    }`}
                                    style={{
                                      width: `${row.average_progress}%`,
                                    }}
                                  />

                                </div>

                                <span className="w-12 text-right font-semibold">

                                  {row.average_progress}%

                                </span>

                              </div>

                            </td>

                          </tr>

                        )
                      )
                    }

                  </tbody>

                </table>

              </div>

            </div>
  );
}