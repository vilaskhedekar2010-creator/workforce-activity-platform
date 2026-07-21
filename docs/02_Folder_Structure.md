WAMP Enterprise Folder Structure (Version 2.0 - Frozen)
1. Root Project Structure
workforce-activity-platform/
│
├── app/
├── components/
├── platform/
├── services/
├── lib/
├── hooks/
├── types/
├── utils/
├── public/
├── docs/
├── supabase/
├── middleware.ts
├── next.config.ts
├── package.json
└── ...
2. App Router Structure
app/
│
├── login/
│   └── page.tsx
│
├── dashboard/
│   ├── layout.tsx
│   ├── page.tsx
│   │
│   └── components/
│       ├── DashboardHeader.tsx
│       ├── DashboardSidebar.tsx
│       ├── DashboardFooter.tsx
│       ├── Breadcrumb.tsx
│       └── ProfileMenu.tsx
│
├── institutes/
│   └── page.tsx
│
├── departments/
│   └── page.tsx
│
├── groups/
│   └── page.tsx
│
├── users/
│   └── page.tsx
│
├── roles/
│   └── page.tsx
│
├── communication/
│   └── page.tsx
│
├── tasks/
│   └── page.tsx
│
├── events/
│   └── page.tsx
│
├── reports/
│   └── page.tsx
│
├── profile/
│   └── page.tsx
│
├── settings/
│   └── page.tsx
│
├── unauthorized/
│   └── page.tsx
│
├── not-found.tsx
├── error.tsx
└── loading.tsx
3. Business Components

Important Rule

Components are organised by Business Module, NOT by Role.

components/
│
├── common/
│   ├── ConfirmationDialog.tsx
│   ├── DeleteDialog.tsx
│   ├── Loading.tsx
│   ├── EmptyState.tsx
│   └── ErrorState.tsx
│
├── shared/
│   ├── DataTable.tsx
│   ├── SearchBar.tsx
│   ├── Pagination.tsx
│   ├── FilterPanel.tsx
│   ├── ExportButton.tsx
│   └── StatCard.tsx
│
├── institutes/
│   ├── InstituteManagement.tsx
│   ├── AddInstituteModal.tsx
│   ├── EditInstituteModal.tsx
│   └── InstituteDetails.tsx
│
├── departments/
│   ├── DepartmentManagement.tsx
│   ├── AddDepartmentModal.tsx
│   └── EditDepartmentModal.tsx
│
├── groups/
│   ├── GroupManagement.tsx
│   ├── ManageMembersModal.tsx
│   └── GroupDetails.tsx
│
├── users/
│   ├── UserManagement.tsx
│   ├── AddUserModal.tsx
│   ├── EditUserModal.tsx
│   ├── ResetPasswordModal.tsx
│   └── UserProfile.tsx
│
├── roles/
│   ├── RoleManagement.tsx
│   ├── RoleActionMatrix.tsx
│   └── AssignPermissionsModal.tsx
│
├── communication/
│   ├── Inbox.tsx
│   ├── ComposeMessage.tsx
│   ├── CommunicationCategoryManagement.tsx
│   └── MessageDetails.tsx
│
├── tasks/
│   ├── TaskManagement.tsx
│   ├── CreateTaskModal.tsx
│   ├── TaskDashboard.tsx
│   └── TaskProgress.tsx
│
├── events/
│   ├── EventManagement.tsx
│   ├── EventCalendar.tsx
│   └── CreateEventModal.tsx
│
├── reports/
│   ├── Reports.tsx
│   └── ReportViewer.tsx
│
└── ui/
    ├── button.tsx
    ├── input.tsx
    ├── dialog.tsx
    ├── table.tsx
    ├── dropdown-menu.tsx
    ├── alert-dialog.tsx
    └── ...
4. Platform Layer

Everything related to the platform infrastructure.

platform/
│
├── auth/
│   ├── context/
│   ├── hooks/
│   ├── services/
│   └── types/
│
├── authorization/
│   ├── guards/
│   ├── hooks/
│   ├── services/
│   └── utils/
│
├── configuration/
│   ├── module-registry.ts
│   ├── navigation-registry.ts
│   └── app-config.ts
│
├── providers/
│   ├── supabase/
│   ├── storage/
│   └── email/
│
├── database/
│
├── constants/
│
├── types/
│
└── utils/
5. Business Services
services/
│
├── institute.service.ts
├── department.service.ts
├── group.service.ts
├── user.service.ts
├── role.service.ts
├── communication.service.ts
├── task.service.ts
├── event.service.ts
└── report.service.ts
6. Shared Libraries
lib/
│
├── supabase-client.ts
├── supabase-admin.ts
├── api.ts
└── validators.ts
7. Shared Hooks
hooks/
│
├── usePagination.ts
├── useDebounce.ts
├── useSearch.ts
└── useExport.ts
8. Shared Types
types/
│
├── auth.ts
├── user.ts
├── role.ts
├── institute.ts
├── department.ts
├── group.ts
├── communication.ts
├── task.ts
└── common.ts
9. Documentation
docs/
│
├── 01_Architecture_Freeze.md
├── 02_Folder_Structure.md
├── 03_Coding_Standards.md
├── 04_Database_Standards.md
├── 05_UI_Guidelines.md
├── 06_Development_Workflow.md
├── 07_Sprint_Roadmap.md
└── ...
10. Legacy Code (Reference Only)
_archive/
│
└── legacy-components/
    ├── super-admin/
    ├── department-admin/
    └── ...

Rule: This folder is read-only and exists only for reference during migration. No new development should occur here.