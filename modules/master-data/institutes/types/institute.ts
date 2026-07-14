/**
 * ============================================================
 * WAMP Enterprise Platform
 * Institute Domain Model
 * ============================================================
 * Version : 1.0
 * Sprint  : 3.1
 *
 * Represents an Institute within the WAMP platform.
 * ============================================================
 */

import { BaseEntity } from "../../shared/base-entity";

/**
 * Institute Entity
 */
export interface Institute extends BaseEntity {
  /**
   * Contact Information
   */
  email?: string | null;

  phone?: string | null;

  website?: string | null;

  /**
   * Address Information
   */
  addressLine1?: string | null;

  addressLine2?: string | null;

  city?: string | null;

  state?: string | null;

  country?: string | null;

  postalCode?: string | null;
}

/**
 * Create Institute Request
 */
export interface CreateInstituteRequest {
  code: string;

  name: string;

  shortName?: string;

  description?: string;

  email?: string;

  phone?: string;

  website?: string;

  addressLine1?: string;

  addressLine2?: string;

  city?: string;

  state?: string;

  country?: string;

  postalCode?: string;
}

/**
 * Update Institute Request
 */
export interface UpdateInstituteRequest
  extends Partial<CreateInstituteRequest> {
  id: string;
}