type AddUserModalData = {
  showAddUserModal: boolean;

  newUserName: string;
  newUserEmail: string;
  newUserMobile: string;
  newUserPassword: string;
  newUserRole: string;

  enrollmentNumber: string;
  facultyId: string;

  setShowAddUserModal: (value: boolean) => void;

  setNewUserName: (value: string) => void;
  setNewUserEmail: (value: string) => void;
  setNewUserMobile: (value: string) => void;
  setNewUserPassword: (value: string) => void;
  setNewUserRole: (value: string) => void;

  setEnrollmentNumber: (value: string) => void;
  setFacultyId: (value: string) => void;

  handleCreateUser: () => void;
};

type AddUserModalProps = {
  addUser: AddUserModalData;
};

export default function AddUserModal({
  addUser,
}: AddUserModalProps) {

  const {
    showAddUserModal,

    newUserName,
    newUserEmail,
    newUserMobile,
    newUserPassword,
    newUserRole,

    enrollmentNumber,
    facultyId,

    setShowAddUserModal,

    setNewUserName,
    setNewUserEmail,
    setNewUserMobile,
    setNewUserPassword,
    setNewUserRole,

    setEnrollmentNumber,
    setFacultyId,

    handleCreateUser,
  } = addUser;

  if (!showAddUserModal) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">

        <h2 className="mb-5 text-2xl font-bold">

          Add User

        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={newUserName}
          onChange={(e) =>
            setNewUserName(
              e.target.value
            )
          }
          className="mb-3 w-full rounded border p-3"
        />

        <input
          type="email"
          placeholder="Email"
          value={newUserEmail}
          onChange={(e) =>
            setNewUserEmail(
              e.target.value
            )
          }
          className="mb-3 w-full rounded border p-3"
        />

        <input
          type="text"
          placeholder="Mobile Number"
          value={newUserMobile}
          onChange={(e) =>
            setNewUserMobile(
              e.target.value
            )
          }
          className="mb-3 w-full rounded border p-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={newUserPassword}
          onChange={(e) =>
            setNewUserPassword(
              e.target.value
            )
          }
          className="mb-3 w-full rounded border p-3"
        />

        <select
          value={newUserRole}
          onChange={(e) =>
            setNewUserRole(
              e.target.value
            )
          }
          className="mb-4 w-full rounded border p-3"
        >

          <option value="STUDENT">
            STUDENT
          </option>

          <option value="FACULTY">
            FACULTY
          </option>

        </select>

        {newUserRole === "STUDENT" && (

          <input
            type="text"
            placeholder="Enrollment Number"
            value={enrollmentNumber}
            onChange={(e) =>
              setEnrollmentNumber(
                e.target.value
              )
            }
            className="mb-3 w-full rounded border p-3"
          />

        )}

        {newUserRole === "FACULTY" && (

          <input
            type="text"
            placeholder="Faculty ID"
            value={facultyId}
            onChange={(e) =>
              setFacultyId(
                e.target.value
              )
            }
            className="mb-3 w-full rounded border p-3"
          />

        )}

        <div className="flex justify-end gap-3">

          <button
            onClick={() =>
              setShowAddUserModal(
                false
              )
            }
            className="rounded bg-gray-500 px-4 py-2 text-white"
          >

            Cancel

          </button>

          <button
            onClick={handleCreateUser}
            className="rounded bg-green-600 px-4 py-2 text-white"
          >

            Create User

          </button>

        </div>

      </div>

    </div>

  );

}