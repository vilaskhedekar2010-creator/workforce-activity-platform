import { formatDateTime } from "@/lib/utils/dateTime";

type AnalyticsSectionProps = {

  analyticsSearch: string;
  setAnalyticsSearch: (value: string) => void;

  analyticsClassFilter: string;
  setAnalyticsClassFilter: (value: string) => void;

  analyticsCategoryFilter: string;
  setAnalyticsCategoryFilter: (value: string) => void;

  analyticsStatusFilter: string;
  setAnalyticsStatusFilter: (value: string) => void;

  analyticsSort: string;
  setAnalyticsSort: (value: string) => void;

  classes: any[];
  analyticsCategories: any[];

  filteredAnalyticsMessages: any[];

  analytics: any;

    expandedAnalyticsId: string;
    setExpandedAnalyticsId: (value: string) => void;

    selectedAnalyticsView: any;
    setSelectedAnalyticsView: (value: any) => void;

    allStudentAnalytics: any;

};

export default function AnalyticsSection({
  analyticsSearch,
  setAnalyticsSearch,
  analyticsClassFilter,
  setAnalyticsClassFilter,
  analyticsCategoryFilter,
  setAnalyticsCategoryFilter,
  analyticsStatusFilter,
  setAnalyticsStatusFilter,
  analyticsSort,
  setAnalyticsSort,
  classes,
  analyticsCategories,
  filteredAnalyticsMessages,
  analytics,
  expandedAnalyticsId,
  setExpandedAnalyticsId,
  selectedAnalyticsView,
  setSelectedAnalyticsView,
  allStudentAnalytics
}: AnalyticsSectionProps) {
  return (
          <div className="min-h-[60vh]">

            <div className="rounded-2xl bg-white p-10 shadow-xl">

              {/* HEADER */}

              <h1 className="text-5xl font-bold text-blue-700">

                Message Analytics

              </h1>

              <p className="mt-6 text-2xl text-gray-600">

                Advanced analytics dashboard

              </p>

              {/* TOP INFO CARDS */}



              {/* FILTERS */}

              <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-5">

                {/* SEARCH */}

                <input
                  type="text"
                  placeholder="Search messages..."
                  value={analyticsSearch}
                  onChange={(e) =>
                    setAnalyticsSearch(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-4 outline-none focus:border-blue-500"
                />

                {/* CLASS */}

                <select
                  value={analyticsClassFilter}
                  onChange={(e) =>
                    setAnalyticsClassFilter(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-4"
                >

                  <option value="ALL">

                    All Classes

                  </option>

                  {
                    classes.map((cls: any) => (

                      <option
                        key={cls.id}
                        value={cls.id}
                      >

                        {cls.name}
                        {" "}
                        {cls.section}

                      </option>

                    ))
                  }

                </select>

                {/* CATEGORY */}

                <select
                  value={analyticsCategoryFilter}
                  onChange={(e) =>
                    setAnalyticsCategoryFilter(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-4"
                >

                  <option value="ALL">

                    All Categories

                  </option>

                  {
                    analyticsCategories.map((cat: any) => (

                      <option
                        key={cat.id}
                        value={cat.id}
                      >

                        {cat.name}

                      </option>

                    ))
                  }

                </select>

                {/* STATUS */}

                <select
                  value={analyticsStatusFilter}
                  onChange={(e) =>
                    setAnalyticsStatusFilter(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-4"
                >

                  <option value="ALL">

                    All Status

                  </option>

                  <option value="PENDING">

                    Pending

                  </option>

                  <option value="COMPLETED">

                    Completed

                  </option>

                </select>

                {/* SORT */}

                <select
                  value={analyticsSort}
                  onChange={(e) =>
                    setAnalyticsSort(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-4"
                >

                  <option value="LATEST">

                    Latest First

                  </option>

                  <option value="OLDEST">

                    Oldest First

                  </option>

                </select>

              </div>

              {/* ANALYTICS MESSAGE LIST */}

              <div className="mt-10 space-y-8">

                {
                  filteredAnalyticsMessages.length === 0 ? (

                    <div className="rounded-2xl bg-gray-50 p-12 text-center">

                      <h2 className="text-3xl font-bold text-gray-700">

                        No Analytics Found

                      </h2>

                      <p className="mt-3 text-gray-500">

                        No messages match current filters

                      </p>

                    </div>

                  ) : (

                    filteredAnalyticsMessages.map(
                      (msg: any) => {

                        const stats =
                          analytics[msg.id];

                        return (

                          <div
                            key={msg.id}
                            className="overflow-hidden rounded-2xl border bg-white shadow-md transition hover:shadow-xl"
                          >

                            {/* HEADER */}

                            <div className="p-8">

                              {/* TOP */}

                              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                                {/* LEFT */}

                                <div>

                                  <h2 className="text-3xl font-bold text-blue-700">

                                    {msg.title}

                                  </h2>
                      


                                  <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">

                                    {/* CLASS */}

                                    <div>

                                      <p className="text-sm font-semibold text-gray-500">

                                        Class / Group

                                      </p>

                                      <p className="mt-1 text-lg font-semibold text-gray-800">

                                        {
                                          classes.find(
                                            (cls) =>
                                              cls.id ===
                                              msg.class_id
                                          )?.name
                                        }

                                      </p>

                                    </div>

                                    {/* CATEGORY */}

                                    <div>

                                      <p className="text-sm font-semibold text-gray-500">

                                        Category

                                      </p>

                                      <p className="mt-1 text-lg font-semibold text-gray-800">

                                      {
                                        analyticsCategories.find(
                                          (cat) =>
                                            cat.id === msg.category_id
                                        )?.name
                                      }

                                      </p>

                                    </div>

                                    {/* POSTED */}

                                    <div>

                                      <p className="text-sm font-semibold text-gray-500">

                                        Posted

                                      </p>

                                      <p className="mt-1 text-lg font-semibold text-gray-800">

                                        {
                                          formatDateTime(
                                            msg.created_at
                                          )
                                        }

                                      </p>

                                    </div>

                                    {/* DEADLINE */}

                                    <div>

                                      <p className="text-sm font-semibold text-gray-500">

                                        Deadline

                                      </p>

                                      <p className="mt-1 text-lg font-semibold text-gray-800">

                                          {
                                            msg.acknowledgement_deadline

                                              ?

                                              formatDateTime(
                                                msg.acknowledgement_deadline
                                              )

                                              :

                                              "No Deadline"
                                          }

                                      </p>

                                    </div>

                                  </div>

                                </div>

                                {/* STATUS */}

                                <div>

                                  {
                                    stats?.pending === 0 ? (

                                      <div className="rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">

                                        Completed

                                      </div>

                                    ) : (

                                      <div className="rounded-full bg-red-100 px-5 py-2 text-sm font-semibold text-red-700">

                                        Pending

                                      </div>

                                    )
                                  }

                                </div>

                              </div>
                              
                                      {/* =========================================
                                          Condition - After Click on Analytics Card, Show/Hide Details
                                          ========================================= */}
                              
                                {
                                  expandedAnalyticsId ===
                                  msg.id && (

                                    <>

                                      {/* ANALYTICS SUMMARY */}

                                      <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">

                                        <div className="rounded-2xl bg-blue-50 p-6 text-center">

                                          <h2 className="text-5xl font-bold text-blue-700">

                                            {
                                              stats?.total || 0
                                            }

                                          </h2>

                                          <p className="mt-3 font-semibold text-gray-700">

                                            Total

                                          </p>

                                        </div>

                                        <div
                                          onClick={() =>
                                            setSelectedAnalyticsView(
                                              (prev:any) => ({
                                                ...prev,
                                                [msg.id]:
                                                  "ACKNOWLEDGED"
                                              })
                                            )
                                          }
                                          className="cursor-pointer rounded-2xl bg-green-50 p-6 text-center transition hover:scale-105"
                                        >
 
                                          <h2 className="text-5xl font-bold text-green-700">

                                            {
                                              stats?.acknowledged || 0
                                            }

                                          </h2>

                                          <p className="mt-3 font-semibold text-gray-700">

                                            Acknowledged

                                          </p>

                                        </div>

                                        <div
                                            onClick={() =>
                                              setSelectedAnalyticsView(
                                                (prev:any) => ({
                                                  ...prev,
                                                  [msg.id]:
                                                    "PENDING"
                                                })
                                              )
                                            }
                                            className="cursor-pointer rounded-2xl bg-red-50 p-6 text-center transition hover:scale-105"
                                          >
                                          <h2 className="text-5xl font-bold text-red-700">

                                            {
                                              stats?.pending || 0
                                            }

                                          </h2>

                                          <p className="mt-3 font-semibold text-gray-700">

                                            Pending

                                          </p>

                                        </div>

                                        <div
                                            onClick={() =>
                                              setSelectedAnalyticsView(
                                                (prev:any) => ({
                                                  ...prev,
                                                  [msg.id]:
                                                    "LATE"
                                                })
                                              )
                                            }
                                            className="cursor-pointer rounded-2xl bg-yellow-50 p-6 text-center transition hover:scale-105"
                                          >

                                          <h2 className="text-5xl font-bold text-yellow-700">

                                            {
                                              stats?.late || 0
                                            }

                                          </h2>

                                          <p className="mt-3 font-semibold text-gray-700">

                                            Late

                                          </p>

                                        </div>

                                      </div>

                                    </>
                                  )
                                }
                                {/* STUDENT ANALYTICS TABLE */}

                                {
                                  expandedAnalyticsId ===
                                  msg.id

                                  &&

                                  selectedAnalyticsView[
                                    msg.id
                                  ] && (

                                    <div className="mt-10 overflow-x-auto rounded-2xl border">

                                      <div className="border-b bg-gray-50 p-5">

                                        <h2 className="text-2xl font-bold text-gray-800">

                                          {
                                            selectedAnalyticsView[
                                              msg.id
                                            ]
                                          }

                                          {" "}

                                          Students

                                        </h2>

                                      </div>

                                      <table className="min-w-full">

                                        <thead className="bg-gray-100">

                                          <tr>

                                            <th className="border p-4 text-left">

                                              Enrollment No

                                            </th>

                                            <th className="border p-4 text-left">

                                              Student Name

                                            </th>

                                            <th className="border p-4 text-left">

                                              Email

                                            </th>

                                            <th className="border p-4 text-left">

                                              Mobile

                                            </th>

                                            <th className="border p-4 text-left">

                                              Status

                                            </th>

                                          </tr>

                                        </thead>

                                        <tbody>

                                          {
                                            (
                                              allStudentAnalytics[
                                                msg.id
                                              ] || []
                                            )

                                            .filter(
                                              (student:any) => {

                                                const selectedType =
                                                  selectedAnalyticsView[
                                                    msg.id
                                                  ];

                                                if (
                                                  selectedType ===
                                                  "ACKNOWLEDGED"
                                                ) {

                                                  return (
                                                    student.acknowledgement
                                                    === "Yes"
                                                  );
                                                }

                                                if (
                                                  selectedType ===
                                                  "PENDING"
                                                ) {

                                                  return (
                                                    student.acknowledgement
                                                    === "Pending"
                                                  );
                                                }

                                                if (
                                                  selectedType ===
                                                  "LATE"
                                                ) {

                                                  return (
                                                    student.acknowledgement
                                                    === "Late"
                                                  );
                                                }

                                                return true;
                                              }
                                            )

                                            .map(
                                              (
                                                student:any,
                                                index:number
                                              ) => (

                                                <tr
                                                  key={index}
                                                  className="hover:bg-gray-50"
                                                >

                                                  <td className="border p-4">

                                                    {
                                                      student.enrollment_number
                                                      || "--"
                                                    }

                                                  </td>

                                                  <td className="border p-4 font-semibold">

                                                          <pre className="text-xs">

                                                            {
                                                            student.name
                                                            || "--"
                                                          }

                                                          </pre>

                                                  </td>

                                                  <td className="border p-4">

                                                    {
                                                      student.email
                                                      || "--"
                                                    }

                                                  </td>

                                                  <td className="border p-4">

                                                    {
                                                      student.mobile
                                                      || "--"
                                                    }

                                                  </td>

                                                  <td className="border p-4">

                                                    {
                                                      student.acknowledgement
                                                      === "Yes"

                                                        ?

                                                        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

                                                          Acknowledged

                                                        </span>

                                                        :

                                                        student.acknowledgement
                                                        === "Late"

                                                        ?

                                                        <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">

                                                          Late

                                                        </span>

                                                        :

                                                        <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">

                                                          Pending

                                                        </span>
                                                    }

                                                  </td>

                                                </tr>

                                              ))
                                          }

                                        </tbody>

                                      </table>

                                    </div>
                                )}
                                  {/* TOGGLE */}

                                  <div className="mt-8 text-right">

                                    <button
                                      onClick={() =>

                                        setExpandedAnalyticsId(

                                          expandedAnalyticsId ===
                                          msg.id

                                            ? ""

                                            : msg.id
                                        )
                                      }
                                      className="font-semibold text-blue-600"
                                    >

                                      {
                                        expandedAnalyticsId ===
                                        msg.id

                                          ?

                                          "Hide Details ▲"

                                          :

                                          "View Details ▼"
                                      }

                                    </button>

                                  </div>

                            </div>

                          </div>
                        );
                      })
                  )
                }

              </div>

            </div>

          </div>
  );
}