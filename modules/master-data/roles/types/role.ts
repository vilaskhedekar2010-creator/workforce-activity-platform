import { BaseEntity } from "../../shared/base-entity";

/**
 * Role Entity
 */
export interface Role extends BaseEntity {}

/**
 * Create Role Request
 */
export interface CreateRoleRequest {
  code: string;

  name: string;

  description?: string;
}

/**
 * Update Role Request
 */
export interface UpdateRoleRequest
  extends Partial<CreateRoleRequest> {
  id: string;
}