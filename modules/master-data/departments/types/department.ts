import { BaseEntity } from "../../shared/base-entity";

/**
 * Department Entity
 */
export interface Department extends BaseEntity {
  instituteId: string;

  instituteDisplay?: string;

  email?: string | null;

  phone?: string | null;
}

/**
 * Create Department Request
 */
export interface CreateDepartmentRequest {
  instituteId: string;

  code: string;

  name: string;

  shortName?: string;

  description?: string;

  email?: string;

  phone?: string;
}

/**
 * Update Department Request
 */
export interface UpdateDepartmentRequest
  extends Partial<CreateDepartmentRequest> {
  id: string;
}