# WAMP Coding Standards

**Project:** Workforce & Activity Management Platform (WAMP)

Version: 2.0

Status: Active

Last Updated: 20 July 2026

---

# Purpose

This document defines the coding standards used throughout WAMP.

Every new feature must follow these standards.

The purpose is to maintain:

- Readability
- Maintainability
- Scalability
- Consistency

---

# General Principles

Code should be:

- Simple
- Readable
- Reusable
- Modular
- Maintainable

Avoid clever code.

Prefer understandable code.

---

# Naming Conventions

## Files

Use PascalCase for React components.

Examples

```
UserManagement.tsx

CreateUserDialog.tsx

DashboardHeader.tsx
```

---

Non-component files use kebab-case.

Examples

```
user.service.ts

user.repository.ts

user.types.ts

user.validation.ts
```

---

Folders use lowercase.

Examples

```
users

dialogs

repository

services

hooks
```

---

# React Components

Each component should have a single responsibility.

Good

```
UserTable

UserForm

UserFilters
```

Bad

```
UserManagementEverything
```

---

# Function Naming

Functions should describe an action.

Good

```
createUser()

updateUser()

deleteRole()

loadInstitutes()

assignRole()

syncUserServices()
```

Bad

```
process()

execute()

run()

temp()
```

---

# Variable Naming

Use meaningful names.

Good

```
selectedInstitute

currentUser

assignedActions

availableRoles
```

Bad

```
a

b

temp

value
```

---

# Constants

Never hardcode repeated values.

Use constants.

Good

```
ROLE_CODES

ACTION_CODES

SERVICE_CODES
```

---

# TypeScript

Avoid using:

```
any
```

Use proper interfaces and types.

Good

```
interface User {

    id: string;

    email: string;

}
```

---

# Component Size

Recommended maximum:

200-300 lines.

If larger,

split into smaller components.

---

# Service Responsibilities

Services contain:

- Business rules
- Validation
- Orchestration
- Workflow

Services must NOT contain UI.

---

# Repository Responsibilities

Repositories contain only:

- Database queries
- CRUD operations

Repositories must never contain business rules.

---

# Platform Responsibilities

Platform contains:

- Authentication

- Authorization

- Logging

- Notifications

- Configuration

- Storage

- Realtime

Platform should never know business rules.

---

# Business Modules

Business modules own:

- UI

- Services

- Repository

- Types

- Validation

Business modules must not communicate directly with the database.

---

# React Hooks

Custom hooks should begin with:

```
use
```

Examples

```
useUsers()

useInstitutes()

useDashboard()
```

---

# Imports

Preferred order

1.

React

2.

Third-party libraries

3.

Platform

4.

Shared

5.

Modules

6.

Relative imports

Example

```ts
import { useState } from "react";

import { Button } from "@/shared/components";

import { UserService } from "@/modules/users/services";

import "./styles.css";
```

---

# Comments

Avoid unnecessary comments.

Write self-explanatory code.

Good

```
Create user profile
```

Bad

```
Increment i
```

---

# Error Handling

Always return meaningful errors.

Never silently ignore exceptions.

Good

```
throw new Error("User not found.");
```

---

# Logging

Console logs are allowed only during development.

Production code should use the Platform Logger.

---

# Replace Entire File Rule

During migration,

prefer replacing an entire file rather than applying multiple patches.

This reduces merge conflicts and avoids partial migrations.

---

# Legacy Code

Do not modify legacy code unless necessary.

Legacy implementations should be moved to:

```
app/legacy
```

Legacy code is reference only.

---

# Git Commit Rules

Every completed feature should compile.

Commit after:

Build

↓

Verification

↓

Testing

↓

Commit

Commit messages should be meaningful.

Examples

```
feat(users): implement user service

refactor(platform): introduce provider abstraction

fix(tasks): resolve assignment issue
```

---

# Code Review Checklist

Before committing verify:

✓ Builds successfully

✓ No TypeScript errors

✓ No ESLint errors

✓ No duplicated code

✓ Business logic inside services

✓ Database access only in repositories

✓ Naming follows standards

✓ Folder structure follows architecture

---

# WAMP Development Workflow

Every implementation follows:

1. Objective

2. Reason

3. Files to Create / Replace

4. Replace Entire File

5. Verification

6. Git Commit

---

# Enterprise Principles

Prefer

- Composition over duplication

- Configuration over hardcoding

- Services over business logic inside UI

- Reusable components over copy-paste

- Small focused files over large monolithic files

---

# Coding Standards Freeze

These standards apply to all future development.

Temporary implementation shortcuts must never become permanent coding standards.