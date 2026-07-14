import { InstituteRepository } from "../repository/InstituteRepository";

import type {
  CreateInstituteRequest,
  UpdateInstituteRequest,
  Institute,
} from "../types/institute";

export class InstituteService {
  private repository = new InstituteRepository();

  /**
   * Get all institutes
   */
  async getAll(): Promise<Institute[]> {
    return await this.repository.getAll();
  }

  /**
   * Get institute by Id
   */
  async getById(id: string): Promise<Institute | null> {
    return await this.repository.getById(id);
  }

  /**
   * Create institute
   */
  async create(request: CreateInstituteRequest) {
    // Future
    // Permission Check
    // Duplicate Code Check
    // Duplicate Name Check

    return await this.repository.create(request);
  }

  /**
   * Update institute
   */
  async update(request: UpdateInstituteRequest) {
    // Future
    // Permission Check
    // Business Validation

    return await this.repository.update(request);
  }

  /**
   * Archive institute
   */
  async archive(id: string) {
    // Future
    // Check child dependencies

    return await this.repository.archive(id);
  }

  /**
   * Restore institute
   */
  async restore(id: string) {
    return await this.repository.restore(id);
  }
}

/**
 * Singleton Instance
 */
export const instituteService = new InstituteService();