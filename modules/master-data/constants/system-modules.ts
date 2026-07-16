export interface SystemModule {
  module: string;
  code: string;
  scope: "PLATFORM" | "INSTITUTE" | "DEPARTMENT" | "GROUP";
  actions: string[];
}

export const SYSTEM_MODULES: SystemModule[] = [
  {
    module: "Institute",
    code: "INSTITUTE",
    scope: "PLATFORM",
    actions: [
      "VIEW",
      "CREATE",
      "UPDATE",
      "ARCHIVE",
      "RESTORE",
    ],
  },
  {
    module: "Department",
    code: "DEPARTMENT",
    scope: "INSTITUTE",
    actions: [
      "VIEW",
      "CREATE",
      "UPDATE",
      "ARCHIVE",
      "RESTORE",
    ],
  },
  {
    module: "Role",
    code: "ROLE",
    scope: "PLATFORM",
    actions: [
      "VIEW",
      "CREATE",
      "UPDATE",
      "ARCHIVE",
      "RESTORE",
    ],
  },
  {
    module: "User",
    code: "USER",
    scope: "DEPARTMENT",
    actions: [
      "VIEW",
      "CREATE",
      "UPDATE",
      "ARCHIVE",
      "RESTORE",
    ],
  },
  {
    module: "Message",
    code: "MESSAGE",
    scope: "GROUP",
    actions: [
      "VIEW",
      "SEND",
      "REPLY",
      "DELETE",
    ],
  },
  {
    module: "Task",
    code: "TASK",
    scope: "GROUP",
    actions: [
      "VIEW",
      "CREATE",
      "ASSIGN",
      "UPDATE",
      "COMPLETE",
    ],
  },
  {
    module: "Event",
    code: "EVENT",
    scope: "GROUP",
    actions: [
      "VIEW",
      "CREATE",
      "APPROVE",
      "PUBLISH",
    ],
  },
];