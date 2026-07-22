import {
  roleActionRepository,
} from "../repository/RoleActionRepository";

import {
  syncRolePermissions,
} from "@/modules/permissions/services/user-permission.service";

export interface SaveRoleActionsRequest {
  roleId: string;
  actionIds: string[];
}

export interface SaveRoleActionsResponse {
  success: boolean;
  message: string;
}

export async function saveRoleActions(
  request: SaveRoleActionsRequest,
  currentUserId: string
): Promise<SaveRoleActionsResponse> {

  const {
    roleId,
    actionIds,
  } = request;

  // Save Role -> Action Mapping
  await roleActionRepository.saveRoleActions(
    roleId,
    actionIds,
    currentUserId
  );

  // Synchronize all existing users of this role
  await syncRolePermissions(
    roleId,
    currentUserId
  );

  return {
    success: true,
    message: "Role actions updated successfully.",
  };

}