export type GroupType =
  | "CLASS"
  | "CLUB"
  | "TEAM"
  | "PROJECT"
  | "COMMITTEE"
  | "CUSTOM";

export type MembershipRole =
  | "COORDINATOR"
  | "MEMBER"
  | "ASSISTANT"
  | "OBSERVER";

export interface Group {

  id: string;

  instituteId?: string;

  departmentId?: string;

  name: string;

  code?: string;

  description?: string;

  groupType: GroupType;

  status: string;

  createdBy?: string;

  createdAt?: string;

}

export interface GroupMember {

  id: string;

  groupId: string;

  userId: string;

  membershipRole: MembershipRole;

  joinedAt?: string;

  isActive: boolean;

}