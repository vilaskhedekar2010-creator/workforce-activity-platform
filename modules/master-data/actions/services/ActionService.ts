import { ActionRepository } from "../repository/ActionRepository";

import type {
  Action,
  CreateActionRequest,
  UpdateActionRequest,
} from "../types/action";

export class ActionService {
  private repository = new ActionRepository();

  async getAll(): Promise<Action[]> {
    return this.repository.getAll();
  }

  async create(request: CreateActionRequest) {
    return this.repository.create(request);
  }

  async update(request: UpdateActionRequest) {
    return this.repository.update(request);
  }

  async archive(id: string) {
    return this.repository.archive(id);
  }

  async restore(id: string) {
    return this.repository.restore(id);
  }
}

export const actionService = new ActionService();