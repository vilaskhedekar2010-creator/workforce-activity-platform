import {
  roleActionRepository,
  ActionDto,
  RoleDto,
} from "../repository/RoleActionRepository";

export class RoleActionService {

  getRoles(): Promise<RoleDto[]> {
    return roleActionRepository.getRoles();
  }

  getActions(): Promise<ActionDto[]> {
    return roleActionRepository.getActions();
  }

  getRoleActionIds(
    roleId: string
  ): Promise<string[]> {
    return roleActionRepository.getRoleActionIds(roleId);
  }

  saveRoleActions(
    roleId: string,
    actionIds: string[]
  ) {
    return roleActionRepository.saveRoleActions(
      roleId,
      actionIds
    );
  }

}

export const roleActionService =
  new RoleActionService();