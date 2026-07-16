import { RoleRepository } from "../repository/RoleRepository";

import type {
  Role,
  CreateRoleRequest,
  UpdateRoleRequest,
} from "../types/role";

export class RoleService {
  private repository = new RoleRepository();

  async getAll(): Promise<Role[]> {
    return this.repository.getAll();
  }

  async getById(id: string): Promise<Role | null> {
    return this.repository.getById(id);
  }

  async create(request: CreateRoleRequest) {
    return this.repository.create(request);
  }

  async update(request: UpdateRoleRequest) {
    return this.repository.update(request);
  }

  async archive(id: string) {
    return this.repository.archive(id);
  }

  async restore(id: string) {
    return this.repository.restore(id);
  }
}

export const roleService = new RoleService();