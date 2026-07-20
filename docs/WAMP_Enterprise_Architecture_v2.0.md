# WAMP - Enterprise Architecture v2.0
## Architecture Freeze Document

**Project:** Workforce Activity Management Platform (WAMP)

**Status:** Frozen

**Version:** 2.0

---

# 1. Vision

WAMP is an Enterprise Workforce Activity Management Platform.

It is NOT an Education ERP.

Education is only one implementation of the platform.

The platform should support:

- Universities
- Schools
- IT Companies
- Manufacturing
- Hospitals
- NGOs
- Government
- Startups
- Any Organization

---

# 2. Core Principles

## Universal Platform

One platform.

One authentication system.

One dashboard.

One permission engine.

One navigation engine.

One architecture.

---

## No Role-Based Dashboards

The following architecture is permanently discontinued.

```
Login
    ↓
Role
    ↓
Role Dashboard
```

Examples:

- Super Admin Dashboard
- Faculty Dashboard
- Student Dashboard
- Institute Admin Dashboard
- Department Admin Dashboard

These dashboards are considered LEGACY.

---

# 3. Authorization Architecture

Authentication and authorization follow the pipeline below.

```
User
    ↓
user_roles
    ↓
role_actions
    ↓
user_services
    ↓
Universal Dashboard
```

Explanation

User

↓

Assigned Role

↓

Role has Actions

↓

Actions synchronized into user_services

↓

Dashboard generated dynamically

---

# 4. Universal Dashboard

Only ONE dashboard exists.

```
/dashboard
```

The dashboard is NOT role based.

The dashboard is permission based.

Menus are generated dynamically from:

```
user_services
```

No hardcoded menu.

No role checking.

No if(role == ...)

---

# 5. Navigation Architecture

Application routing follows module based navigation.

```
/
├── login
├── change-password
├── dashboard
├── users
├── roles
├── actions
├── role-actions
├── institutes
├── departments
├── messages
├── tasks
├── events
└── settings
```

Dashboard is only the landing page.

Business modules exist independently.

---

# 6. Dashboard Responsibilities

Dashboard should contain only:

- Welcome
- User Profile
- Quick Statistics
- Recent Activity
- Favorite Services
- Navigation

Business functionality belongs to modules.

---

# 7. Platform vs Business Separation

Platform Layer

Responsible for:

- Authentication
- Authorization
- Dashboard
- Navigation
- Layout
- Header
- Sidebar
- Notifications
- Common Components
- Shared Services

Business Layer

Responsible for:

- Users
- Roles
- Actions
- Institutes
- Departments
- Messages
- Tasks
- Events

Platform should never contain business logic.

---

# 8. Folder Structure

```
app/
platform/
shared/
modules/
lib/
types/
```

Business modules remain inside:

```
modules/
```

Platform code remains inside:

```
platform/
```

---

# 9. Dashboard Folder Structure

```
app/
└── dashboard/
    ├── layout.tsx
    ├── page.tsx
    ├── loading.tsx
    ├── error.tsx
    ├── not-found.tsx
    └── components/
        ├── Header.tsx
        ├── Sidebar.tsx
        ├── Breadcrumb.tsx
        ├── ProfileMenu.tsx
        ├── NotificationBell.tsx
        └── Footer.tsx
```

---

# 10. Legacy Code Policy

Old role-based implementation must never be deleted immediately.

Move it to:

```
app/legacy/
```

Examples:

```
app/legacy/dashboard/
    department-admin/
    faculty/
    institute-admin/
    platform-owner/
    student/
    super-admin/
```

Purpose:

Reference only.

No new development.

---

# 11. Development Rules

New development must follow these rules.

Rule 1

Replace entire files.

Avoid partial edits.

Rule 2

Remove obsolete code.

Do not keep unused legacy code.

Rule 3

No backward compatibility unless explicitly required.

Rule 4

One milestone at a time.

Complete.

Verify.

Commit.

Then proceed.

Rule 5

Platform first.

Business modules later.

---

# 12. Standard Development Workflow

Every implementation should follow:

1. Objective

2. Reason

3. Files to Create / Replace

4. Replace Entire File

5. Verification Steps

6. Git Commit

---

# 13. Sprint Roadmap

Sprint 2.1

Platform UI

- Dashboard Layout
- Header
- Sidebar
- Footer
- Breadcrumb
- Profile Menu
- Loading Screen

Sprint 2.2

Navigation Engine

- Navigation Configuration
- Dynamic Sidebar
- Active Menu
- Route Mapping

Sprint 2.3

Security

- Authentication
- Authorization
- Route Protection
- Unauthorized Page

Sprint 2.4

Module Framework

Standard template for:

- Page
- Components
- Services
- Repository

Sprint 3

Business Modules

1. Users

2. Roles

3. Actions

4. Role Actions

5. Institutes

6. Departments

7. Messages

8. Tasks

9. Events

---

# 14. Enterprise Design Principles

WAMP should follow:

- Modular Architecture
- Service-Based Design
- Permission-Based UI
- Route-Based Navigation
- Platform/Business Separation
- Provider Abstraction
- Reusable Components
- Enterprise Folder Structure
- Clean Code
- Scalable Design

---

# 15. Architecture Freeze

The following decisions are frozen.

✓ Universal Dashboard

✓ Service-Based Navigation

✓ Permission-Based UI

✓ Module-Based Pages

✓ Platform vs Business Separation

✓ Route-Based Navigation

✓ Dynamic Sidebar

✓ Replace Entire File Development

✓ Legacy Code Archived

✓ Enterprise Architecture

Future development must align with this document.