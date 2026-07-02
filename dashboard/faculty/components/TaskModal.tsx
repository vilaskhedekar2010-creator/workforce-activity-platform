type TaskModalProps = {

  setShowTaskModal: (value: boolean) => void;

  selectedTaskClass: string;
  setSelectedTaskClass: (value: string) => void;

  fetchTaskStudents: (classId: string) => void;

  classes: any[];

  selectedStudent: string;
  setSelectedStudent: (value: string) => void;

  classStudents: any[];

  taskTitle: string;
  setTaskTitle: (value: string) => void;

  taskDescription: string;
  setTaskDescription: (value: string) => void;

  taskPriority: string;
  setTaskPriority: (value: string) => void;

  taskDeadline: string;
  setTaskDeadline: (value: string) => void;

  handleCreateTask: () => void;

};

export default function TaskModal({

  setShowTaskModal,

  selectedTaskClass,
  setSelectedTaskClass,

  fetchTaskStudents,

  classes,

  selectedStudent,
  setSelectedStudent,

  classStudents,

  taskTitle,
  setTaskTitle,

  taskDescription,
  setTaskDescription,

  taskPriority,
  setTaskPriority,

  taskDeadline,
  setTaskDeadline,

  handleCreateTask,

}: TaskModalProps) {

  return (

    <>

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

              <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl">

                {/* HEADER */}

                <div className="mb-6 flex items-center justify-between">

                  <div>

                    <h2 className="text-3xl font-bold text-gray-800">

                      Create Task

                    </h2>

                    <p className="mt-1 text-gray-500">

                      Assign task to student

                    </p>

                  </div>

                  <button
                    onClick={() =>
                      setShowTaskModal(
                        false
                      )
                    }
                    className="text-2xl font-bold text-gray-500 hover:text-gray-700"
                  >



                  </button>

                </div>

                {/* FORM */}

                <div className="space-y-5">

                  {/* CLASS */}

                  <div>

                    <label className="mb-2 block font-semibold text-gray-700">

                      Select Class

                    </label>

                    <select
                      value={
                        selectedTaskClass
                      }
                      onChange={(e) => {

                        setSelectedTaskClass(
                          e.target.value
                        );

                        fetchTaskStudents(
                          e.target.value
                        );
                      }}
                      className="w-full rounded-xl border p-3"
                    >

                      <option value="">

                        Select Class

                      </option>

                      {
                        classes.map(
                          (
                            cls: any
                          ) => (

                            <option
                              key={cls.id}
                              value={cls.id}
                            >

                              {
                                cls.name
                              }{" "}

                              {
                                cls.section
                              }

                            </option>
                          )
                        )
                      }

                    </select>

                  </div>

                  {/* STUDENT */}

                  <div>

                    <label className="mb-2 block font-semibold text-gray-700">

                      Select Student

                    </label>

                    <select
                      value={
                        selectedStudent
                      }
                      onChange={(e) =>
                        setSelectedStudent(
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border p-3"
                    >

                      <option value="">

                        Select Student

                      </option>

                      {
                        classStudents.map(
                          (
                            student: any
                          ) => (

                            <option
                              key={student.id}
                              value={student.id}
                            >

                              {
                                student.full_name
                              }{" "}
                              (
                              {
                                student.enrollment_number
                              }
                              )

                            </option>
                          )
                        )
                      }

                    </select>

                  </div>

                  {/* TITLE */}

                  <div>

                    <label className="mb-2 block font-semibold text-gray-700">

                      Task Title

                    </label>

                    <input
                      type="text"
                      value={taskTitle}
                      onChange={(e) =>
                        setTaskTitle(
                          e.target.value
                        )
                      }
                      placeholder="Enter task title"
                      className="w-full rounded-xl border p-3"
                    />

                  </div>

                  {/* DESCRIPTION */}

                  <div>

                    <label className="mb-2 block font-semibold text-gray-700">

                      Description

                    </label>

                    <textarea
                      value={
                        taskDescription
                      }
                      onChange={(e) =>
                        setTaskDescription(
                          e.target.value
                        )
                      }
                      placeholder="Enter task description"
                      rows={5}
                      className="w-full rounded-xl border p-3"
                    />

                  </div>

                  {/* PRIORITY */}

                  <div>

                    <label className="mb-2 block font-semibold text-gray-700">

                      Priority

                    </label>

                    <select
                      value={
                        taskPriority
                      }
                      onChange={(e) =>
                        setTaskPriority(
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border p-3"
                    >

                      <option value="LOW">

                        LOW

                      </option>

                      <option value="MEDIUM">

                        MEDIUM

                      </option>

                      <option value="HIGH">

                        HIGH

                      </option>

                    </select>

                  </div>

                  {/* DEADLINE */}

                  <div>

                    <label className="mb-2 block font-semibold text-gray-700">

                      Deadline

                    </label>

                    <input
                      type="datetime-local"
                      value={
                        taskDeadline
                      }
                      onChange={(e) =>
                        setTaskDeadline(
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border p-3"
                    />

                  </div>

                  {/* ACTIONS */}

                  <div className="flex justify-end gap-4 pt-4">

                    <button
                      onClick={() =>
                        setShowTaskModal(
                          false
                        )
                      }
                      className="rounded-xl bg-gray-300 px-5 py-3 font-semibold text-gray-800"
                    >

                      Cancel

                    </button>

                    <button
                      onClick={
                        handleCreateTask
                      }
                      className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                    >

                      Create Task

                    </button>

                  </div>

                </div>

              </div>

            </div>

    </>

  );

}