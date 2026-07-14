import { supabase } from "@/lib/supabase-client";

import type {
  Institute,
  CreateInstituteRequest,
  UpdateInstituteRequest,
} from "../types/institute";

export class InstituteRepository {
  /**
   * Get all institutes
   */
  async getAll(): Promise<Institute[]> {
    const { data, error } = await supabase
      .from("institutes")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    return (data ?? []).map((institute: any) => ({
      id: institute.id,

      code: institute.code,

      name: institute.name,

      shortName: institute.short_name,

      description: institute.description,

      email: institute.email,

      phone: institute.phone,

      website: institute.website,

      addressLine1: institute.address_line1,

      addressLine2: institute.address_line2,

      city: institute.city,

      state: institute.state,

      country: institute.country,

      postalCode: institute.postal_code,

      status: institute.status,

      isSystem: institute.is_system,

      createdAt: institute.created_at,

      createdBy: institute.created_by,

      updatedAt: institute.updated_at,

      updatedBy: institute.updated_by,

      archivedAt: institute.archived_at,

      archivedBy: institute.archived_by,
    }));
  }

  /**
   * Get institute by id
   */
  async getById(id: string): Promise<Institute | null> {
    const { data, error } = await supabase
      .from("institutes")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return null;
    }

    return {
      id: data.id,

      code: data.code,

      name: data.name,

      shortName: data.short_name,

      description: data.description,

      email: data.email,

      phone: data.phone,

      website: data.website,

      addressLine1: data.address_line1,

      addressLine2: data.address_line2,

      city: data.city,

      state: data.state,

      country: data.country,

      postalCode: data.postal_code,

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

  /**
   * Create institute
   */
  async create(request: CreateInstituteRequest) {
    const { data, error } = await supabase
      .from("institutes")
      .insert([
        {
          code: request.code,
          name: request.name,
          short_name: request.shortName,
          description: request.description,
          email: request.email,
          phone: request.phone,
          website: request.website,
          address_line1: request.addressLine1,
          address_line2: request.addressLine2,
          city: request.city,
          state: request.state,
          country: request.country,
          postal_code: request.postalCode,

          status: "ACTIVE",
          is_system: false,
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  /**
   * Update institute
   */
  async update(request: UpdateInstituteRequest) {
    const { data, error } = await supabase
      .from("institutes")
      .update({
        name: request.name,
        short_name: request.shortName,
        description: request.description,
        email: request.email,
        phone: request.phone,
        website: request.website,
        address_line1: request.addressLine1,
        address_line2: request.addressLine2,
        city: request.city,
        state: request.state,
        country: request.country,
        postal_code: request.postalCode,

        updated_at: new Date().toISOString(),
      })
      .eq("id", request.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  /**
   * Archive institute
   */
  async archive(id: string) {
    const { data, error } = await supabase
      .from("institutes")
      .update({
        status: "ARCHIVED",
        archived_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  /**
   * Restore institute
   */
  async restore(id: string) {
    const { data, error } = await supabase
      .from("institutes")
      .update({
        status: "ACTIVE",
        archived_at: null,
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