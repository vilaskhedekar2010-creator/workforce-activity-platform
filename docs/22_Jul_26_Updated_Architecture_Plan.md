From this point onward, WAMP will follow this structure
modules/
│
├── users/
│   ├── application/
│   │      CreateUser.ts
│   │      UpdateUser.ts
│   │      ChangeUserRole.ts
│   │      ArchiveUser.ts
│   │      RestoreUser.ts
│   │      ManageUserPermissions.ts
│   │
│   ├── services/
│   ├── repository/
│   ├── components/
│   ├── dialogs/
│   ├── hooks/
│   └── types/
│
├── role-actions/
│   ├── application/
│   │      SaveRoleActions.ts
│   ├── services/
│   ├── repository/
│   └── ...
Layer Responsibilities (Frozen)
1. UI Layer

Only responsible for:

Forms
Buttons
Tables
Dialogs
Loading
Validation messages

No business logic.

2. Hook Layer

Responsible for:

UI state
Calling Application layer
Refreshing screen

No database access.

3. Application Layer ⭐

This is the heart of the business workflow.

Example:

Create User

↓

Validate

↓

Create Profile

↓

Assign Role

↓

Sync Permissions

↓

Audit

↓

Return Response

Every business use case gets its own file.

4. Service Layer

Reusable business utilities.

Examples

Permission Service

Notification Service

Password Service

Email Service

Execution Context

Audit Service

These are reusable across many application commands.

5. Repository Layer

Database only.

Example

UserRepository

↓

profiles

No business rules.

This matches Clean Architecture
UI

↓

Hook

↓

Application

↓

Service

↓

Repository

↓

Database

I think this will become the standard for every module in WAMP.

Phase 1 – User Management (Finish Completely)
✅ Add User (Done)
✅ Reset Password (Done)
✅ Manage Services (Done)
🔜 Edit User
🔜 Change User Role (including automatic permission synchronization)
🔜 Archive / Restore User
🔜 View User Details
🔜 Audit History
Phase 2 – Role Management
Default role actions
Clone role
Role usage validation
Prevent deletion of system roles
Permission preview
Phase 3 – Communication
Inbox
Send Message
Message Analytics
Phase 4 – Task Management
Create Task
Assign Task
Track Progress
Dashboard
Phase 5 – Event Management
Event CRUD
Registration
Attendance
Dashboard
Development Style

From now on, every feature batch will include:

Complete source files
Full file paths
Database changes (if required)
API routes
Repository
Service
Hook
UI updates
Compile-ready code

No placeholders and no partial snippets.