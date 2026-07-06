export const SERVICES = {
  HOME: "HOME",

  GROUPS: "GROUPS",

  SEND_MESSAGE: "SEND_MESSAGE",

  MESSAGE_ANALYTICS: "MESSAGE_ANALYTICS",

  TASKS: "TASKS",

  TASK_DASHBOARD: "TASK_DASHBOARD",

  EVENTS: "EVENTS",

  INBOX: "INBOX",

  PROFILE: "PROFILE",

  USER_MANAGEMENT: "USER_MANAGEMENT",

  GROUP_MANAGEMENT: "GROUP_MANAGEMENT",

  CATEGORY_MANAGEMENT: "CATEGORY_MANAGEMENT",

  INSTITUTE_MANAGEMENT: "INSTITUTE_MANAGEMENT",

  DEPARTMENT_MANAGEMENT: "DEPARTMENT_MANAGEMENT",

  ROLE_MANAGEMENT: "ROLE_MANAGEMENT",

  REPORTS: "REPORTS",
} as const;

export const ALL_SERVICES = [

  {
    code: SERVICES.HOME,
    name: "Home",
  },

  {
    code: SERVICES.GROUPS,
    name: "Assigned Groups",
  },

  {
    code: SERVICES.SEND_MESSAGE,
    name: "Send Message",
  },

  {
    code: SERVICES.MESSAGE_ANALYTICS,
    name: "Message Analytics",
  },

  {
    code: SERVICES.TASKS,
    name: "Task Management",
  },

  {
    code: SERVICES.TASK_DASHBOARD,
    name: "Class Dashboard",
  },

  {
    code: SERVICES.EVENTS,
    name: "Event Management",
  },

  {
    code: SERVICES.PROFILE,
    name: "Profile",
  },

  {
    code: SERVICES.CATEGORY_MANAGEMENT,
    name: "Category Management",
  },

  {
    code: SERVICES.USER_MANAGEMENT,
    name: "User Management",
  },

  {
    code: SERVICES.GROUP_MANAGEMENT,
    name: "Group Management",
  },

  {
    code: SERVICES.INSTITUTE_MANAGEMENT,
    name: "Institute Management",
  },

  {
    code: SERVICES.DEPARTMENT_MANAGEMENT,
    name: "Department Management",
  },

  {
    code: SERVICES.ROLE_MANAGEMENT,
    name: "Role Management",
  },

  {
    code: SERVICES.REPORTS,
    name: "Reports",
  },

];