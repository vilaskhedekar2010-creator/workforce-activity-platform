import { userRepository } from "../repository/UserRepository";

import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserStatistics,
} from "../types/user";

export class UserService {

  async getUsers(): Promise<User[]> {
    return await userRepository.getUsers();
  }

  async getUserById(
    id: string
  ): Promise<User | null> {
    return await userRepository.getUserById(id);
  }

  /**
   * Enterprise User Creation
   *
   * User creation is performed through the
   * server-side API so that:
   *
   * - Supabase Admin API remains server-side
   * - Auth User is created
   * - Profile is created
   * - Role is assigned
   * - Default permissions are synchronized
   */
  async createUser(
    request: CreateUserRequest
  ) {

    const response = await fetch(
      "/api/create-user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({

          ...request,

          // Temporary password
          // Later this will come from
          // Password Policy Service.
          password: "ChangeMe@123",

          // Temporary until authentication
          // integration is completed.
          performedBy: "SYSTEM",

        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error);
    }

    return result;
  }

  async updateUser(
    request: UpdateUserRequest
  ) {
    return await userRepository.updateUser(request);
  }

  async updateUserStatus(
    userId: string,
    status: string
  ) {
    await userRepository.updateStatus(
      userId,
      status
    );
  }

  async deleteUser(
    userId: string
  ) {
    await userRepository.deleteUser(
      userId
    );
  }

  calculateStatistics(
    users: User[]
  ): UserStatistics {

    return {

      totalUsers: users.length,

      totalFaculty: users.filter(
        user => user.role === "FACULTY"
      ).length,

      totalStudents: users.filter(
        user => user.role === "STUDENT"
      ).length,

      activeUsers: users.filter(
        user => user.status === "ACTIVE"
      ).length,

      inactiveUsers: users.filter(
        user => user.status === "INACTIVE"
      ).length,

      suspendedUsers: users.filter(
        user => user.status === "SUSPENDED"
      ).length,

    };
  }

  filterUsers(
    users: User[],
    search: string,
    role: string,
    status: string
  ): User[] {

    return users.filter(user => {

      const matchesSearch =

        search === "" ||

        user.full_name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||

        user.email
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesRole =

        role === "ALL" ||

        user.role === role;

      const matchesStatus =

        status === "ALL" ||

        user.status === status;

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );

    });

  }

}

export const userService =
  new UserService();