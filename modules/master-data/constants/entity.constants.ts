/**
 * ============================================================
 * WAMP Enterprise Platform
 * Master Data Constants
 * ============================================================
 * Version : 1.0
 * Sprint  : 3.1
 *
 * This file contains reusable constants shared by all
 * Master Data modules such as:
 *
 * - Institutes
 * - Departments
 * - Categories
 * - Campuses
 * - Designations
 * - Roles
 * - Services
 *
 * Do NOT hardcode these values elsewhere.
 * ============================================================
 */

/* ============================================================
 * Entity Status
 * ============================================================
 */

export const ENTITY_STATUS = {
  ACTIVE: "ACTIVE",
  ARCHIVED: "ARCHIVED",
} as const;

export type EntityStatus =
  (typeof ENTITY_STATUS)[keyof typeof ENTITY_STATUS];

/* ============================================================
 * Entity Lifecycle
 * ============================================================
 */

export const ENTITY_LIFECYCLE = {
  ACTIVE: "ACTIVE",
  ARCHIVED: "ARCHIVED",
  DELETED: "DELETED",   // Future
  PURGED: "PURGED",     // Future
} as const;

/* ============================================================
 * Sort Direction
 * ============================================================
 */

export const SORT_DIRECTION = {
  ASC: "asc",
  DESC: "desc",
} as const;

export type SortDirection =
  (typeof SORT_DIRECTION)[keyof typeof SORT_DIRECTION];

/* ============================================================
 * Default Pagination
 * ============================================================
 */

export const DEFAULT_PAGE_SIZE = 10;

export const PAGE_SIZE_OPTIONS = [
  10,
  20,
  50,
  100,
] as const;

/* ============================================================
 * Search Configuration
 * ============================================================
 */

export const MIN_SEARCH_LENGTH = 2;

export const MAX_SEARCH_LENGTH = 100;

/* ============================================================
 * Common Labels
 * ============================================================
 */

export const COMMON_LABELS = {
  CREATE: "Create",
  UPDATE: "Update",
  EDIT: "Edit",
  VIEW: "View",
  SAVE: "Save",
  CANCEL: "Cancel",
  CLOSE: "Close",
  DELETE: "Delete",
  ARCHIVE: "Archive",
  RESTORE: "Restore",
  SEARCH: "Search",
  RESET: "Reset",
  FILTER: "Filter",
  REFRESH: "Refresh",
  EXPORT: "Export",
} as const;

/* ============================================================
 * Common Messages
 * ============================================================
 */

export const COMMON_MESSAGES = {
  LOADING: "Loading...",
  NO_DATA: "No records found.",
  SOMETHING_WENT_WRONG: "Something went wrong.",
  SAVE_SUCCESS: "Record saved successfully.",
  UPDATE_SUCCESS: "Record updated successfully.",
  ARCHIVE_SUCCESS: "Record archived successfully.",
  RESTORE_SUCCESS: "Record restored successfully.",
} as const;