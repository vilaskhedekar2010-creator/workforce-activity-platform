import { supabase } from "@/lib/supabase-client";

import type {
  Action,
  CreateActionRequest,
  UpdateActionRequest,
} from "../types/action";

export class ActionRepository {
  async getAll(): Promise<Action[]> {
    const { data, error } = await supabase
      .from("actions")
      .select("*")
      .order("module")
      .order("action");

    if (error) throw error;

    return (data ?? []).map((item: any) => ({
      id: item.id,

      module: item.module,
      action: item.action,

      code: item.code,
      name: item.code,
      description: item.description,

      status: item.status,
      isSystem: item.is_system,

      createdAt: item.created_at,
      createdBy: item.created_by,

      updatedAt: item.updated_at,
      updatedBy: item.updated_by,

      archivedAt: item.archived_at,
      archivedBy: item.archived_by,
    }));
  }

  async create(request: CreateActionRequest) {
    const { data, error } = await supabase
      .from("actions")
      .insert([
        {
          module: request.module,
          action: request.action,
          code: request.code,
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

  async update(request: UpdateActionRequest) {
    const { data, error } = await supabase
      .from("actions")
      .update({
        module: request.module,
        action: request.action,
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
      .from("actions")
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
      .from("actions")
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