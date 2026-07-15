import { DepartmentRepository } from "../repository/DepartmentRepository";

import type {
  Department,
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
} from "../types/department";

export class DepartmentService {
  private repository = new DepartmentRepository();

  async getAll(): Promise<Department[]> {
    return this.repository.getAll();
  }

  async getById(id: string): Promise<Department | null> {
    return this.repository.getById(id);
  }

  async create(request: CreateDepartmentRequest) {
    return this.repository.create(request);
  }

  async update(request: UpdateDepartmentRequest) {
    return this.repository.update(request);
  }

  async archive(id: string) {
    return this.repository.archive(id);
  }

  async restore(id: string) {
    return this.repository.restore(id);
  }
}

export const departmentService = new DepartmentService();