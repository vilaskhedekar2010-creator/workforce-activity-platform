import { supabase } from "@/lib/supabase-client";
import type { Group } from "../types/group.types";

export class GroupRepository {

  async getAll(): Promise<Group[]> {

    const { data, error } = await supabase
      .from("groups")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    return (data ?? []).map((group: any) => ({
      id: group.id,
      instituteId: group.institute_id,
      departmentId: group.department_id,
      name: group.name,
      code: group.code,
      description: group.description,
      groupType: group.group_type,
      status: group.status,
      createdBy: group.created_by,
      createdAt: group.created_at,
    }));
  }

  async createGroup(
    name: string,
    groupType: string = "CUSTOM",
    instituteId?: string,
    departmentId?: string,
    description?: string,
    createdBy?: string
  ) {

    const { data, error } = await supabase
      .from("groups")
      .insert([
        {
          name,
          group_type: groupType,
          institute_id: instituteId,
          department_id: departmentId,
          description,
          created_by: createdBy,
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  async updateGroup(
  id: string,
  name: string
) {

  const { data, error } = await supabase
    .from("groups")
    .update({
      name,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;

}
}