/**
 * ============================================================
 * WAMP Enterprise Platform
 * Base Entity Model
 * ============================================================
 * Every Master Data entity extends this interface.
 * ============================================================
 */

import { BaseAudit } from "./base-audit";
import { EntityStatus } from "../constants/entity.constants";

export interface BaseEntity extends BaseAudit {
  /**
   * Technical Primary Key
   */
  id: string;

  /**
   * Immutable Business Identifier
   */
  code: string;

  /**
   * Business Name
   */
  name: string;

  /**
   * Short Display Name
   */
  shortName?: string | null;

  /**
   * Description
   */
  description?: string | null;

  /**
   * Record Status
   */
  status: EntityStatus;

  /**
   * Indicates whether this is a protected
   * system-defined record.
   */
  isSystem: boolean;
}