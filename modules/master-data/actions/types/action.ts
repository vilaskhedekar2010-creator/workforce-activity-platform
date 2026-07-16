import { BaseEntity } from "../../shared/base-entity";

/**
 * Action Entity
 */
export interface Action extends BaseEntity {
  module: string;

  action: string;
}

/**
 * Create Action Request
 */
export interface CreateActionRequest {
  module: string;

  action: string;

  code: string;

  description?: string;
}

/**
 * Update Action Request
 */
export interface UpdateActionRequest
  extends Partial<CreateActionRequest> {
  id: string;
}