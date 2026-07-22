"use client";

import UserManagement from "@/modules/users/components/UserManagement";
import { useUsers } from "@/modules/users/hooks/useUsers";

export default function UsersPage() {
  const userManagement = useUsers();

  return <UserManagement userManagement={userManagement} />;
}