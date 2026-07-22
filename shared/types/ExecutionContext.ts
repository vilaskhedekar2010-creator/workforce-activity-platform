/**
 * ExecutionContext
 *
 * Carries runtime information about
 * the authenticated user and request.
 *
 * Every Business Service should receive
 * this object instead of individual
 * parameters like currentUserId.
 *
 * Future Extensions:
 * ------------------
 * - organizationId
 * - instituteId
 * - departmentId
 * - tenantId
 * - requestId
 * - correlationId
 * - ipAddress
 * - deviceInfo
 * - locale
 * - timezone
 */

export interface ExecutionContext {

  /**
   * Logged-in user performing
   * the current operation.
   */
  currentUserId: string;

}