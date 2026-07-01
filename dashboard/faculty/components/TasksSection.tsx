import { formatDateTime } from "@/lib/utils/dateTime";
type TasksSectionProps = {
    setShowTaskModal: (value: boolean) => void;

  loadingTasks: boolean;

  tasks: any[];

  taskSearch: string;
  setTaskSearch: (value: string) => void;

  taskClassFilter: string;
  setTaskClassFilter: (value: string) => void;

  taskStudentFilter: string;
  setTaskStudentFilter: (value: string) => void;

  taskStatusFilter: string;
  setTaskStatusFilter: (value: string) => void;

  taskPriorityFilter: string;
  setTaskPriorityFilter: (value: string) => void;

  taskSortOption: string;
  setTaskSortOption: (value: string) => void;

  classNames: any;
  studentNames: any;

  filteredTasks: any[];

  expandedTaskId: string;
  setExpandedTaskId: (value: string) => void;

  fetchTaskTimeline: (taskId: string) => void;

  timelineUpdates: any[];
};

export default function TasksSection({

  setShowTaskModal,

  loadingTasks,

  tasks,

  taskSearch,
  setTaskSearch,

  taskClassFilter,
  setTaskClassFilter,

  taskStudentFilter,
  setTaskStudentFilter,

  taskStatusFilter,
  setTaskStatusFilter,

  taskPriorityFilter,
  setTaskPriorityFilter,

  taskSortOption,
  setTaskSortOption,

  classNames,
  studentNames,

  filteredTasks,

  expandedTaskId,
  setExpandedTaskId,

  fetchTaskTimeline,

  timelineUpdates,

}: TasksSectionProps) {

  return (

    <>

                <div className="rounded-2xl bg-white p-8 shadow-lg">

            {/* HEADER */}

            <div className="mb-8 flex items-center justify-between">

              <div>

                <h1 className="text-4xl font-bold text-gray-800">

                  Task Management

                </h1>

                <p className="mt-2 text-gray-500">

                  Assign and monitor student tasks

                </p>

              </div>

              <button
                onClick={() =>
                  setShowTaskModal(
                    true
                  )
                }
                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >

                + Create Task

              </button>

            </div>

            {/* LOADING */}

            {
              loadingTasks && (

              <div className="py-20 text-center text-lg font-semibold text-gray-500">

                Loading tasks...

              </div>
            )}

            {/* EMPTY STATE */}

            {
              !loadingTasks &&

              tasks.length === 0 && (

              <div className="flex min-h-[50vh] items-center justify-center rounded-2xl border-2 border-dashed border-gray-300">

                <div className="text-center">

                  <h2 className="text-3xl font-bold text-gray-700">

                    No Tasks Created

                  </h2>

                  <p className="mt-2 text-gray-500">

                    Create your first task

                  </p>

                </div>

              </div>
            )}
            <div className="mb-6 rounded-2xl border bg-gray-50 p-5">

              <div className="grid grid-cols-1 gap-4 md:grid-cols-6">

                {/* SEARCH */}

                <input
                  type="text"
                  placeholder="Search Tasks..."
                  value={taskSearch}
                  onChange={(e) =>
                    setTaskSearch(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-3"
                />

                {/* CLASS */}

                <select
                  value={taskClassFilter}
                  onChange={(e) =>
                    setTaskClassFilter(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-3"
                >

                  <option value="ALL">

                    All Classes

                  </option>

                  {
                    Object.values(
                      classNames
                    ).map(
                      (cls: any) => (

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

                <select
                  value={taskStudentFilter}
                  onChange={(e) =>
                    setTaskStudentFilter(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-3"
                >

                  <option value="ALL">

                    All Students

                  </option>

                  {
                    Object.values(
                      studentNames
                    ).map(
                      (student: any) => (

                        <option
                          key={student.id}
                          value={student.id}
                        >

                          {student.full_name}

                        </option>
                      )
                    )
                  }

                </select>

                {/* STATUS */}

                <select
                  value={taskStatusFilter}
                  onChange={(e) =>
                    setTaskStatusFilter(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-3"
                >

                  <option value="ALL">
                    All Status
                  </option>

                  <option value="NOT_STARTED">
                    NOT_STARTED
                  </option>

                  <option value="IN_PROGRESS">
                    IN_PROGRESS
                  </option>

                  <option value="COMPLETED">
                    COMPLETED
                  </option>

                  <option value="BLOCKED">
                    BLOCKED
                  </option>

                </select>

                {/* PRIORITY */}

                <select
                  value={taskPriorityFilter}
                  onChange={(e) =>
                    setTaskPriorityFilter(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-3"
                >

                  <option value="ALL">
                    All Priority
                  </option>

                  <option value="HIGH">
                    HIGH
                  </option>

                  <option value="MEDIUM">
                    MEDIUM
                  </option>

                  <option value="LOW">
                    LOW
                  </option>

                </select>

                {/* SORT */}

                <select
                  value={taskSortOption}
                  onChange={(e) =>
                    setTaskSortOption(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-3"
                >

                  <option value="LATEST">
                    Latest First
                  </option>

                  <option value="OLDEST">
                    Oldest First
                  </option>

                </select>

              </div>

            </div>
            {/* TASK LIST */}

            <div className="space-y-6">

              {
                filteredTasks.map(
                  (
                    task: any
                  ) => (

                    <div
                      key={task.id}
                      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                    >

                      {/* TOP */}

                      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                        <div>

                          <h2 className="text-2xl font-bold text-blue-700">

                            {
                              task.title
                            }

                          </h2>

                          <p className="mt-1 text-sm text-gray-500">

                            Created:
                            {" "}

                            {
                              formatDateTime(
                                task.created_at
                              )
                            }

                          </p>

                        </div>

                        <div className="flex items-center gap-2">

                          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-800">

                            {task.current_progress || 0}%

                          </span>

                          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-bold text-yellow-800">

                            {task.status}

                          </span>

                        </div>

                      </div>

                      {/* DETAILS */}

                      <div className="grid gap-5 md:grid-cols-4">

                        {/* STUDENT */}

                        <div>

                          <p className="text-sm font-semibold text-gray-500">

                            Assigned Student

                          </p>

                          <p className="mt-1 text-lg font-bold text-gray-800">

                            {
                                studentNames[
                                  task.assigned_to
                                ]?.full_name
                                || task.assigned_to
                            }

                          </p>

                          <p className="text-sm text-gray-500">

                            {
                              task.profiles
                              ?.enrollment_number
                            }

                          </p>

                          <div className="text-sm text-gray-500">

                          {
                            studentNames[
                              task.assigned_to
                            ]?.enrollment_number
                            || "--"
                          }

                        </div>

                        </div>

                        {/* CLASS */}

                        <div>

                          <p className="text-sm font-semibold text-gray-500">

                            Class

                          </p>

                            <p className="mt-1 text-lg font-bold text-gray-800">

                              {
                                classNames[
                                  task.class_id
                                ]

                                  ?

                                  `${classNames[task.class_id].name} - Section ${classNames[task.class_id].section}`

                                  :

                                  "--"
                              }

                            </p>

                        </div>

                        {/* PRIORITY */}

                        <div>

                          <p className="text-sm font-semibold text-gray-500">

                            Priority

                          </p>

                          <p className="mt-1 text-lg font-bold text-gray-800">

                            {
                              task.priority
                            }

                          </p>

                        </div>

                        {/* DEADLINE */}

                        <div>

                          <p className="text-sm font-semibold text-gray-500">

                            Deadline

                          </p>

                          <p className="mt-1 text-lg font-bold text-gray-800">

                            {
                              formatDateTime(
                                task.deadline
                              )
                            }

                          </p>

                        </div>

                      </div>

                      {/* DESCRIPTION */}

                      <div className="mt-6 rounded-xl bg-gray-50 p-4">

                        <p className="mb-2 text-sm font-semibold text-gray-500">

                          Description

                        </p>

                        <p className="whitespace-pre-line text-gray-700">

                          {
                            task.description
                          }

                        </p>

                      </div>

                      {/* VIEW DETAILS */}

                      <div className="mt-6">

                        <button
                          onClick={async () => {

                            if (
                              expandedTaskId ===
                              task.id
                            ) {

                              setExpandedTaskId(
                                ""
                              );

                            } else {

                              setExpandedTaskId(
                                task.id
                              );

                              await fetchTaskTimeline(
                                task.id
                              );
                            }
                          }}
                          className="font-semibold text-blue-600 hover:text-blue-800"
                        >

                          {
                            expandedTaskId ===
                            task.id

                              ?

                              "Hide Timeline ▲"

                              :

                              "View Timeline ▼"
                          }

                        </button>

                      </div>
                                            {
                        expandedTaskId ===
                        task.id && (

                          <div className="mt-4 rounded-xl bg-gray-50 p-4">

                            <h4 className="mb-4 text-lg font-bold text-gray-700">

                              Progress Timeline

                            </h4>

                            {
                              timelineUpdates.length === 0 && (

                                <div className="rounded-lg border border-dashed border-gray-300 p-4 text-center text-gray-500">

                                  No progress updates yet

                                </div>
                              )
                            }

                            {
                              timelineUpdates.map((update: any) => (

                                  <div
                                    key={
                                      update.id
                                    }
                                    className="mb-4 rounded-xl border-l-4 border-blue-500 bg-white p-4 shadow-sm"
                                  >

                                    <div className="mb-2 flex items-center justify-between">

                                      <span className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">

                                        {
                                          update.status
                                        }

                                      </span>

                                      <span className="text-sm text-gray-500">

                                          {
                                            formatDateTime(
                                              update.created_at
                                            )
                                          }

                                      </span>

                                    </div>

                                    <p className="whitespace-pre-wrap text-gray-700">

                                      {
                                        update.progress_comment
                                      }

                                    </p>

                                  </div>
                                )
                              )
                            }

                          </div>
                        )
                      }

                    </div>
                  )
                )
              }

            </div>

          </div>

    </>

  );

}