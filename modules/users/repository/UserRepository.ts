import { supabase } from "@/lib/supabase-client";

import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
} from "../types/user";

export class UserRepository {

  async getUsers(): Promise<User[]> {

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) throw error;

    return (data ?? []) as User[];

  }

  async getUserById(
    id: string
  ): Promise<User | null> {

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data as User;

  }

  async createUser(
    request: CreateUserRequest
  ) {

    const { data, error } = await supabase
      .from("profiles")
      .insert({

        institute_id: request.institute_id,

        department_id: request.department_id,

        full_name: request.full_name,

        email: request.email,

        role: request.role,

        faculty_id:
          request.faculty_id ?? null,

        enrollment_number:
          request.enrollment_number ?? null,

        mobile_number:
          request.mobile_number ?? null,

        address:
          request.address ?? null,

        status: "ACTIVE",

        must_change_password: true,

      })
      .select()
      .single();

    if (error) throw error;

    return data;

  }

  async updateUser(
    request: UpdateUserRequest
  ) {

    const { data, error } = await supabase
      .from("profiles")
      .update({

        institute_id: request.institute_id,

        department_id: request.department_id,

        full_name: request.full_name,

        role: request.role,

        faculty_id:
          request.faculty_id ?? null,

        enrollment_number:
          request.enrollment_number ?? null,

        mobile_number:
          request.mobile_number ?? null,

        address:
          request.address ?? null,

        status: request.status,

      })
      .eq("id", request.id)
      .select()
      .single();

    if (error) throw error;

    return data;

  }

  async updateStatus(
    userId: string,
    status: string
  ) {

    const { error } = await supabase
      .from("profiles")
      .update({
        status,
      })
      .eq("id", userId);

    if (error) throw error;

  }

  async deleteUser(
    userId: string
  ) {

    const { error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", userId);

    if (error) throw error;

  }

}

export const userRepository =
  new UserRepository();