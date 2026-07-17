"use client";

import { useEffect, useMemo, useState } from "react";

import { userService } from "../services/UserService";

import type {
  User,
  UserFilters,
  UserStatistics,
  CreateUserRequest,
  UpdateUserRequest,
} from "../types/user";

export function useUsers() {

  const [users, setUsers] =
    useState<User[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [filters, setFilters] =
    useState<UserFilters>({
      search: "",
      role: "ALL",
      status: "ALL",
    });

  async function loadUsers() {

    setLoading(true);

    const data =
      await userService.getUsers();

    setUsers(data);

    setLoading(false);

  }

  useEffect(() => {

    loadUsers();

  }, []);

  async function createUser(
    request: CreateUserRequest
  ) {

    await userService.createUser(request);

    await loadUsers();

  }

  async function updateUser(
    request: UpdateUserRequest
  ) {

    await userService.updateUser(request);

    await loadUsers();

  }

  async function updateUserStatus(
    userId: string,
    status: string
  ) {

    await userService.updateUserStatus(
      userId,
      status
    );

    await loadUsers();

  }

  async function deleteUser(
    userId: string
  ) {

    await userService.deleteUser(
      userId
    );

    await loadUsers();

  }

  const filteredUsers =
    useMemo(() => {

      return userService.filterUsers(

        users,

        filters.search,

        filters.role,

        filters.status

      );

    }, [

      users,

      filters,

    ]);

  const statistics:
    UserStatistics =
    useMemo(() => {

      return userService
        .calculateStatistics(
          filteredUsers
        );

    }, [

      filteredUsers,

    ]);

  return {

    loading,

    users,

    filteredUsers,

    statistics,

    filters,

    setFilters,

    loadUsers,

    createUser,

    updateUser,

    updateUserStatus,

    deleteUser,

  };

}