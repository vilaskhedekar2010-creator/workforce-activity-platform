import { User } from "../types/user";

type EditUserModalData = {
  showEditUserModal: boolean;
  selectedUser: User | null;

  fullName: string;
  mobileNumber: string;
  address: string;
  facultyId: string;
  enrollmentNumber: string;
  role: string;
  status: string;

  setShowEditUserModal: (value: boolean) => void;

  setFullName: (value: string) => void;
  setMobileNumber: (value: string) => void;
  setAddress: (value: string) => void;
  setFacultyId: (value: string) => void;
  setEnrollmentNumber: (value: string) => void;
  setRole: (value: string) => void;
  setStatus: (value: string) => void;

  handleUpdateUser: () => void;
};

type Props = {
  editUser: EditUserModalData;
};

export default function EditUserModal({
  editUser,
}: Props) {

  const {
    showEditUserModal,
    selectedUser,

    fullName,
    mobileNumber,
    address,
    facultyId,
    enrollmentNumber,
    role,
    status,

    setShowEditUserModal,

    setFullName,
    setMobileNumber,
    setAddress,
    setFacultyId,
    setEnrollmentNumber,
    setRole,
    setStatus,

    handleUpdateUser,
  } = editUser;

  if (!showEditUserModal || !selectedUser)
    return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-lg">

        <h2 className="mb-5 text-2xl font-bold">
          Edit User
        </h2>

        <input
          className="mb-3 w-full rounded border p-3"
          value={fullName}
          placeholder="Full Name"
          onChange={(e)=>setFullName(e.target.value)}
        />

        <input
          className="mb-3 w-full rounded border p-3 bg-gray-100"
          value={selectedUser.email}
          readOnly
        />

        <input
          className="mb-3 w-full rounded border p-3"
          value={mobileNumber}
          placeholder="Mobile Number"
          onChange={(e)=>setMobileNumber(e.target.value)}
        />

        <textarea
          className="mb-3 w-full rounded border p-3"
          rows={3}
          value={address}
          placeholder="Address"
          onChange={(e)=>setAddress(e.target.value)}
        />

        <select
          className="mb-3 w-full rounded border p-3"
          value={role}
          onChange={(e)=>setRole(e.target.value)}
        >
          <option value="STUDENT">STUDENT</option>
          <option value="FACULTY">FACULTY</option>
          <option value="COORDINATOR">COORDINATOR</option>
          <option value="DEPARTMENT_ADMIN">DEPARTMENT_ADMIN</option>
          <option value="INSTITUTE_ADMIN">INSTITUTE_ADMIN</option>
        </select>

        {
          role==="FACULTY" &&

          <input
            className="mb-3 w-full rounded border p-3"
            value={facultyId}
            placeholder="Faculty ID"
            onChange={(e)=>setFacultyId(e.target.value)}
          />
        }

        {
          role==="STUDENT" &&

          <input
            className="mb-3 w-full rounded border p-3"
            value={enrollmentNumber}
            placeholder="Enrollment Number"
            onChange={(e)=>setEnrollmentNumber(e.target.value)}
          />
        }

        <select
          className="mb-5 w-full rounded border p-3"
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
          <option value="SUSPENDED">SUSPENDED</option>
        </select>

        <div className="flex justify-end gap-3">

          <button
            onClick={()=>setShowEditUserModal(false)}
            className="rounded bg-gray-500 px-4 py-2 text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdateUser}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}