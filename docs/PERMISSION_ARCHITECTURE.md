# WAMP Permission Architecture

## Purpose

WAMP follows a Role Template + User Permission architecture.

Roles define the default permissions.

Users always operate using their own permissions stored in `user_services`.

---

# Permission Flow

actions
        ↓
role_actions
        ↓
Create User
        ↓
user_services
        ↓
Dashboard

---

# Table Responsibilities

## actions

Master list of all available actions/services.

Example:

- VIEW_MESSAGE
- SEND_MESSAGE
- VIEW_TASK
- CREATE_TASK
- EVENT_CREATE

This table rarely changes.

---

## roles

Stores all system roles.

Examples:

- SUPER_ADMIN
- INSTITUTE_ADMIN
- DEPARTMENT_ADMIN
- FACULTY
- STUDENT

---

## role_actions

Stores the default permissions for each role.

Example:

Faculty

- VIEW_MESSAGE
- SEND_MESSAGE
- VIEW_TASK
- CREATE_TASK

Student

- VIEW_MESSAGE
- VIEW_TASK

This table is a permission template.

It is NOT used directly by the dashboard.

---

## user_roles

Stores which role is assigned to each user.

Example

User
↓

FACULTY

---

## user_services

Stores the actual permissions assigned to an individual user.

This is the only permission table used by the Dashboard and application authorization.

---

# Permission Lifecycle

## 1. Create User

Create Auth User
        ↓
Create Profile
        ↓
Assign Role
        ↓
Copy permissions from role_actions
        ↓
Insert into user_services

---

## 2. Edit Role Actions

Super Admin changes role permissions
        ↓
Update role_actions
        ↓
Find all users assigned to that role
        ↓
Refresh user_services
        ↓
Dashboard automatically reflects changes

---

## 3. Login

User Login
        ↓
Load Profile
        ↓
Load user_services
        ↓
Display only allowed modules/services

---

# Dashboard Rule

Dashboard must NEVER read:

- role_actions
- roles

Dashboard must ALWAYS read:

- user_services

---

# Single Source of Truth

actions
        ↓
role_actions
        ↓
user_services

The Dashboard never bypasses user_services.

---

# Future Development Rule

Whenever a new module is introduced:

1. Add action(s) in `actions`
2. Assign default permissions in `role_actions`
3. User creation automatically copies permissions into `user_services`
4. Dashboard automatically displays the module if permission exists

No dashboard code changes should be required.

---

# Design Principles

- Roles define default permissions.
- Users operate on assigned permissions.
- Dashboard is permission-driven.
- No hardcoded role checks.
- No hardcoded dashboard modules.
- `user_services` is the runtime permission source.
- `role_actions` is the configuration template.