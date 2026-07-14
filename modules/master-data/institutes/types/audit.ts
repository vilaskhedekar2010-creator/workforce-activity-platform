/**
 * ============================================================
 * WAMP Enterprise Platform
 * Audit Model
 * ============================================================
 * Version : 1.0
 * Sprint  : 3.1
 *
 * Shared audit fields used by all Master Data entities.
 *
 * Examples:
 * - Institute
 * - Department
 * - Category
 * - Campus
 * - Designation
 * - Service
 * - Role
 * ============================================================
 */

export interface AuditFields {
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