import { platformRepository } from "../repository/PlatformRepository";

import type {
  CreateSuperAdminRequest,
} from "../types/platform";

export class PlatformService {

  async createSuperAdmin(
    request: CreateSuperAdminRequest
  ) {
    return await platformRepository
      .createSuperAdmin(request);
  }

}

export const platformService =
  new PlatformService();