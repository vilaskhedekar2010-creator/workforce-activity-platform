import { userRepository } from "../repository/UserRepository";
import { userRoleRepository } from "../repository/UserRoleRepository";

import { syncUserServicesFromRole } from "@/modules/permissions/services/user-permission.service";

import type { CreateUserRequest } from "../types/user";

export class UserOnboardingService {

  /**
   * Enterprise User Onboarding
   *
   * Flow
   * ----
   * 1. Validate Request
   * 2. Create Profile
   * 3. Assign Role
   * 4. Synchronize Default Role Permissions
   */
  async createUser(
    request: CreateUserRequest
  ) {

    this.validateRequest(request);

    // Step 1
    const profile =
      await userRepository.createUser(request);

    /**
     * IMPORTANT
     *
     * Current UI sends role as Role ID.
     *
     * If later UI changes,
     * only this line needs updating.
     */
    const roleId = request.role;

    // Step 2
    await userRoleRepository.assignRole(
      profile.id,
      roleId
    );

    // Step 3
    await syncUserServicesFromRole(
      profile.id,
      roleId,
      "SYSTEM"
    );

    return profile;
  }

  private validateRequest(
    request: CreateUserRequest
  ): void {

    if (!request.full_name?.trim()) {
      throw new Error(
        "Full name is required."
      );
    }

    if (!request.email?.trim()) {
      throw new Error(
        "Email is required."
      );
    }

    if (!request.role?.trim()) {
      throw new Error(
        "Role is required."
      );
    }

    if (!request.institute_id?.trim()) {
      throw new Error(
        "Institute is required."
      );
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(request.email)) {
      throw new Error(
        "Invalid email address."
      );
    }

  }

}

export const userOnboardingService =
  new UserOnboardingService();