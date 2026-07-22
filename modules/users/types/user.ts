export type UserStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "SUSPENDED";

export type UserRole =
  | "SUPER_ADMIN"
  | "INSTITUTE_ADMIN"
  | "DEPARTMENT_ADMIN"
  | "COORDINATOR"
  | "FACULTY"
  | "STUDENT";

export interface User {

  id: string;

  institute_id: string | null;

  department_id: string | null;

  email: string;

  full_name: string | null;

  role: UserRole | string;

  faculty_id: string | null;

  enrollment_number: string | null;

  mobile_number: string | null;

  address: string | null;

  profile_photo: string | null;

  status: UserStatus;

  must_change_password: boolean;

  created_at: string;

}

export interface CreateUserRequest {

  institute_id?: string;

  department_id?: string;

  full_name: string;

  email: string;

  role: UserRole | string;

  faculty_id?: string | null;

  enrollment_number?: string | null;

  mobile_number?: string | null;

  address?: string | null;

}

export interface UpdateUserRequest {

  id: string;

  institute_id: string | null;

  department_id: string | null;

  full_name: string;

  role: UserRole | string;

  faculty_id?: string | null;

  enrollment_number?: string | null;

  mobile_number?: string | null;

  address?: string | null;

  status: UserStatus;

}

export interface UserFilters {

  search: string;

  role: string;

  status: string;

}

export interface UserStatistics {

  totalUsers: number;

  totalFaculty: number;

  totalStudents: number;

  activeUsers: number;

  inactiveUsers: number;

  suspendedUsers: number;

}