import { supabase } from "@/lib/supabase-client";

import type {
  Department,
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
} from "../types/department";

export class DepartmentRepository {
  async getAll(): Promise<Department[]> {
    const { data, error } = await supabase
      .from("departments")
      .select(`
        *,
        institutes (
          id,
          code,
          name
        )
      `)
      .order("created_at", {
        ascending: false,
      });

    if (error) throw error;

    return (data ?? []).map((department: any) => ({
      id: department.id,

      instituteId: department.institute_id,

      instituteDisplay: department.institutes
        ? `${department.institutes.code} | ${department.institutes.name}`
        : "",

      code: department.code,

      name: department.name,

      shortName: department.short_name,

      description: department.description,

      email: department.email,

      phone: department.phone,

      status: department.status,

      isSystem: department.is_system,

      createdAt: department.created_at,

      createdBy: department.created_by,

      updatedAt: department.updated_at,

      updatedBy: department.updated_by,

      archivedAt: department.archived_at,

      archivedBy: department.archived_by,
    }));
  }

  async getById(id: string): Promise<Department | null> {
    const { data, error } = await supabase
      .from("departments")
      .select(`
        *,
        institutes (
          id,
          code,
          name
        )
      `)
      .eq("id", id)
      .single();

    if (error) throw error;

    if (!data) return null;

    return {
      id: data.id,

      instituteId: data.institute_id,

      instituteDisplay: data.institutes
        ? `${data.institutes.code} | ${data.institutes.name}`
        : "",

      code: data.code,

      name: data.name,

      shortName: data.short_name,

      description: data.description,

      email: data.email,

      phone: data.phone,

      status: data.status,

      isSystem: data.is_system,

      createdAt: data.created_at,

      createdBy: data.created_by,

      updatedAt: data.updated_at,

      updatedBy: data.updated_by,

      archivedAt: data.archived_at,

      archivedBy: data.archived_by,
    };
  }

  async create(request: CreateDepartmentRequest) {
    const { data, error } = await supabase
      .from("departments")
      .insert([
        {
          institute_id: request.instituteId,
          code: request.code,
          name: request.name,
          short_name: request.shortName,
          description: request.description,
          email: request.email,
          phone: request.phone,
          status: "ACTIVE",
          is_system: false,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async update(request: UpdateDepartmentRequest) {
    const { data, error } = await supabase
      .from("departments")
      .update({
        institute_id: request.instituteId,
        name: request.name,
        short_name: request.shortName,
        description: request.description,
        email: request.email,
        phone: request.phone,
        updated_at: new Date().toISOString(),
      })
      .eq("id", request.id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async archive(id: string) {
    const { data, error } = await supabase
      .from("departments")
      .update({
        status: "ARCHIVED",
        archived_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async restore(id: string) {
    const { data, error } = await supabase
      .from("departments")
      .update({
        status: "ACTIVE",
        archived_at: null,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }
}