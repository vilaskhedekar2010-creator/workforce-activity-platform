import { GroupRepository } from "../repository/group.repository";
import type { Group } from "../types/group.types";

export class GroupService {

  private repository = new GroupRepository();

  async getGroups(): Promise<Group[]> {

    return this.repository.getAll();

  }

  async createGroup(
    name: string,
    groupType: string = "CUSTOM",
    instituteId?: string,
    departmentId?: string,
    description?: string,
    createdBy?: string
  ) {

    return this.repository.createGroup(
      name,
      groupType,
      instituteId,
      departmentId,
      description,
      createdBy
    );

  }

  async updateGroup(
    id: string,
    name: string
  ) {

    return this.repository.updateGroup(
      id,
      name
    );

  }

  async archiveGroup(
    id: string
  ) {

    return this.repository.archiveGroup(id);

  }

  async restoreGroup(
    id: string
  ) {

    return this.repository.restoreGroup(id);

  }

}