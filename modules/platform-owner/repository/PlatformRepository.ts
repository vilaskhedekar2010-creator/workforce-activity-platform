import type { CreateSuperAdminRequest } from "../types/platform";

export class PlatformRepository {
  async createSuperAdmin(
    request: CreateSuperAdminRequest
  ) {
    const response = await fetch(
      "/api/platform/create-super-admin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error || "Failed to create Super Admin."
      );
    }

    return result;
  }
}

export const platformRepository =
  new PlatformRepository();