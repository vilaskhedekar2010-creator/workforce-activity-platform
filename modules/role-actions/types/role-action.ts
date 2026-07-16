export interface RoleAction {

  id: string;

  roleId: string;

  actionId: string;

  createdAt?: string;

  createdBy?: string;

}

export interface SaveRoleActionsRequest {

  roleId: string;

  actionIds: string[];

}