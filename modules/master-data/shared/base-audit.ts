/**
 * ============================================================
 * WAMP Enterprise Platform
 * Base Audit Model
 * ============================================================
 * Shared audit fields used by all entities.
 * ============================================================
 */

export interface BaseAudit {
  /**
   * Record Creation
   */
  createdAt: string;

  createdBy?: string | null;

  /**
   * Record Update
   */
  updatedAt?: string | null;

  updatedBy?: string | null;

  /**
   * Record Archive
   */
  archivedAt?: string | null;

  archivedBy?: string | null;
}