import { formatDateTime } from "@/lib/utils/dateTime";
type PendingTasksModalProps = {

  selectedStudentName: string;

  setShowPendingTasksModal: (value: boolean) => void;

  selectedStudentPendingTasks: any[];

};

export default function PendingTasksModal({

  selectedStudentName,
  setShowPendingTasksModal,
  selectedStudentPendingTasks

}: PendingTasksModalProps) {

  return (

    <>

                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      
                    <div className="w-full max-w-5xl rounded-2xl bg-white p-8 shadow-2xl">
      
                      {/* HEADER */}
      
                      <div className="mb-6 flex items-center justify-between">
      
                        <div>
      
                          <h2 className="text-3xl font-bold text-blue-700">
      
                            Pending Tasks
      
                          </h2>
      
                          <p className="text-gray-500">
      
                            {selectedStudentName}
      
                          </p>
      
                        </div>
      
                        <button
                          onClick={() =>
                            setShowPendingTasksModal(false)
                          }
                          className="text-2xl font-bold text-gray-500 hover:text-red-600"
                        >
      
                        </button>
      
                      </div>
      
                      {/* TABLE */}
      
                      <div className="overflow-x-auto">
      
                        <table className="min-w-full border">
      
                          <thead className="bg-gray-100">
      
                            <tr>
      
                              <th className="border p-3">
                                Task Title
                              </th>
      
                              <th className="border p-3">
                                Priority
                              </th>
      
                              <th className="border p-3">
                                Status
                              </th>
      
                              <th className="border p-3">
                                Progress
                              </th>
      
                              <th className="border p-3">
                                Deadline
                              </th>
      
                            </tr>
      
                          </thead>
      
                          <tbody>
      
                            {
                              selectedStudentPendingTasks.length === 0 ? (
      
                                <tr>
      
                                  <td
                                    colSpan={5}
                                    className="p-6 text-center text-gray-500"
                                  >
      
                                    No Pending Tasks
      
                                  </td>
      
                                </tr>
      
                              ) : (
      
                                selectedStudentPendingTasks.map(
                                  (task: any) => (
      
                                    <tr key={task.id}>
      
                                      <td className="border p-3">
      
                                        {task.title}
      
                                      </td>
      
                                      <td className="border p-3 text-center">
      
                                        {task.priority}
      
                                      </td>
      
                                      <td className="border p-3 text-center">
      
                                        {task.status}
      
                                      </td>
      
                                      <td className="border p-3 text-center">
      
                                        {task.current_progress || 0}%
      
                                      </td>
      
                                      <td className="border p-3 text-center">
      
                                        {
                                          formatDateTime(
                                            task.deadline
                                          )
                                        }
      
                                      </td>
      
                                    </tr>
      
                                  )
                                )
      
                              )
                            }
      
                          </tbody>
      
                        </table>
      
                      </div>
      
                    </div>
      
                  </div>

    </>

  );

}