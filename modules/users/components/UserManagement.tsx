// UserManagement.tsx
import AddUserModal from "../dialogs/AddUserModal";
import ResetPasswordModal from "../dialogs/ResetPasswordModal";
import ManageServicesDialog from "../dialogs/ManageServicesDialog";
import { useState } from "react";
import UserStatistics from "./UserStatistics";

type UserManagementProps = {
  userManagement: {
    totalUsers:number;
    totalFaculty:number;
    totalStudents:number;
    activeUsers:number;
    inactiveUsers:number;
    suspendedUsers:number;
    searchTerm:string;
    setSearchTerm:(v:string)=>void;
    roleFilter:string;
    setRoleFilter:(v:string)=>void;
    statusFilter:string;
    setStatusFilter:(v:string)=>void;
    filteredUsers:any[];
    updateUserStatus:(id:string,status:string)=>void;
    setSelectedUserId:(id:string)=>void;
    setShowResetPasswordModal:(v:boolean)=>void;
    setShowAddUserModal:(v:boolean)=>void;
    addUser:any;
    resetPasswordModal:any;
  }
};

export default function UserManagement({
  userManagement,
}: UserManagementProps) {

  const {
    totalUsers,
    totalFaculty,
    totalStudents,
    activeUsers,
    inactiveUsers,
    suspendedUsers,
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    filteredUsers,
    updateUserStatus,
    setSelectedUserId,
    setShowResetPasswordModal,
    setShowAddUserModal,
    addUser,
    resetPasswordModal,
  } = userManagement;

  // =========================================
  // MANAGE SERVICES DIALOG
  // =========================================

  const [
    showManageServicesDialog,
    setShowManageServicesDialog,
  ] = useState(false);

  const [
    selectedUser,
    setSelectedUser,
  ] = useState<any>(null);

return (
<>
<div className="rounded-2xl bg-white p-8 shadow-lg">
<h2 className="mb-6 text-3xl font-bold">User Management</h2>

<button
onClick={()=>setShowAddUserModal(true)}
className="rounded bg-blue-600 px-4 py-2 text-white">
+ Add User
</button>

<UserStatistics
  totalUsers={totalUsers}
  totalFaculty={totalFaculty}
  totalStudents={totalStudents}
  activeUsers={activeUsers}
  inactiveUsers={inactiveUsers}
  suspendedUsers={suspendedUsers}
/>

<div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
<input className="rounded border p-3"
placeholder="Search by name or email..."
value={searchTerm}
onChange={e=>setSearchTerm(e.target.value)}/>
<select className="rounded border p-3"
value={roleFilter}
onChange={e=>setRoleFilter(e.target.value)}>
<option value="ALL">All Roles</option>
<option value="SUPER_ADMIN">SUPER_ADMIN</option>
<option value="FACULTY">FACULTY</option>
<option value="STUDENT">STUDENT</option>
</select>

<select className="rounded border p-3"
value={statusFilter}
onChange={e=>setStatusFilter(e.target.value)}>
<option value="ALL">All Status</option>
<option value="ACTIVE">ACTIVE</option>
<option value="INACTIVE">INACTIVE</option>
<option value="SUSPENDED">SUSPENDED</option>
</select>
</div>

<div className="overflow-x-auto rounded border">
<table className="w-full">
<thead className="bg-gray-100">
<tr>
<th className="p-3 text-left">Name</th>
<th className="p-3 text-left">Email</th>
<th className="p-3 text-left">Role</th>
<th className="p-3 text-left">Status</th>
<th className="p-3 text-left">Actions</th>
</tr>
</thead>
<tbody>
{filteredUsers.map((user:any)=>(
<tr key={user.id} className="border-t">
<td className="p-3">{user.full_name||"--"}</td>
<td className="p-3">{user.email}</td>
<td className="p-3">{user.role||"--"}</td>
<td className="p-3">{user.status||"ACTIVE"}</td>
<td className="p-3">
{user.role==="SUPER_ADMIN"?
<span className="font-bold text-red-600">Protected</span>:
<div className="flex gap-2">
<button onClick={()=>updateUserStatus(user.id,"ACTIVE")} className="rounded bg-green-600 px-3 py-1 text-white">Activate</button>
<button onClick={()=>updateUserStatus(user.id,"INACTIVE")} className="rounded bg-yellow-600 px-3 py-1 text-white">Deactivate</button>
<button onClick={()=>updateUserStatus(user.id,"SUSPENDED")} className="rounded bg-red-600 px-3 py-1 text-white">Suspend</button>
<button onClick={()=>{
setSelectedUserId(user.id);
setShowResetPasswordModal(true);
}} className="rounded bg-blue-600 px-3 py-1 text-white">Reset Password</button>
<button
  onClick={() => {
    setSelectedUser(user);
    setShowManageServicesDialog(true);
  }}
  className="rounded bg-indigo-600 px-3 py-2 text-white"
>
  Manage Services
</button>

</div>}
</td>
</tr>
))}
</tbody>
</table>
</div>
</div>

<AddUserModal addUser={addUser}/>
<ResetPasswordModal resetPasswordModal={resetPasswordModal}/>

<ManageServicesDialog
  open={showManageServicesDialog}
  onClose={() => setShowManageServicesDialog(false)}
  user={selectedUser}
/>
</>
);
}
