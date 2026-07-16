import { supabase } from "@/lib/supabase-client";

import type {
  Role,
  CreateRoleRequest,
  UpdateRoleRequest,
} from "../types/role";

export class RoleRepository {
  async getAll(): Promise<Role[]> {
    const { data, error } = await supabase
      .from("roles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return (data ?? []).map((role: any) => ({
      id: role.id,

      code: role.code,
      name: role.name,
      description: role.description,

      status: role.status,
      isSystem: role.is_system,

      createdAt: role.created_at,
      createdBy: role.created_by,

      updatedAt: role.updated_at,
      updatedBy: role.updated_by,

      archivedAt: role.archived_at,
      archivedBy: role.archived_by,
    }));
  }

  async getById(id: string): Promise<Role | null> {
    const { data, error } = await supabase
      .from("roles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    if (!data) return null;

    return {
      id: data.id,

      code: data.code,
      name: data.name,
      description: data.description,

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

  async create(request: CreateRoleRequest) {
    const { data, error } = await supabase
      .from("roles")
      .insert([
        {
          code: request.code,
          name: request.name,
          description: request.description,

          status: "ACTIVE",
          is_system: false,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async update(request: UpdateRoleRequest) {
    const { data, error } = await supabase
      .from("roles")
      .update({
        name: request.name,
        description: request.description,

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
      .from("roles")
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
      .from("roles")
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