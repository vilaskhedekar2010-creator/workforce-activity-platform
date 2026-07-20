# WAMP Database Standards

**Project:** Workforce & Activity Management Platform (WAMP)

Version: 2.0

Status: Active

Last Updated: 20 July 2026

---

# Purpose

This document defines the database design standards for WAMP.

Every new table, relationship, migration, and database object must follow these standards.

The objectives are:

- Consistency
- Scalability
- Performance
- Maintainability
- Provider Independence

---

# Database Philosophy

The database stores data.

Business logic belongs in Services.

UI logic belongs in Components.

Database should never contain application-specific business rules.

---

# Naming Convention

## Tables

Use lowercase plural names.

Examples

```
users

roles

actions

user_roles

role_actions

user_services

institutes

departments

messages

tasks

events
```

Avoid:

```
User

tblUsers

USER_MASTER
```

---

## Columns

Use lowercase snake_case.

Examples

```
created_at

updated_at

deleted_at

first_name

last_name

role_id

institute_id
```

---

## Primary Keys

Every table must have:

```
id UUID PRIMARY KEY
```

Use UUID instead of auto-increment integers.

---

## Foreign Keys

Always use:

```
table_name_id
```

Examples

```
user_id

role_id

action_id

department_id

institute_id
```

---

# Standard Audit Columns

Every business table should include:

```
id

created_at

updated_at

created_by

updated_by

is_active
```

Optional

```
deleted_at

deleted_by

is_deleted
```

Soft delete should be preferred over permanent deletion.

---

# Soft Delete Policy

Preferred:

```
is_deleted BOOLEAN

deleted_at TIMESTAMP

deleted_by UUID
```

Never permanently delete business records unless legally required.

---

# Status Fields

Use explicit status values.

Examples

```
ACTIVE

INACTIVE

PENDING

APPROVED

REJECTED

ARCHIVED
```

Avoid magic numbers.

---

# Boolean Fields

Use positive names.

Good

```
is_active

is_default

is_deleted

is_verified
```

Bad

```
active_flag

delete_status

status_flag
```

---

# Junction Tables

Many-to-many relationships must use junction tables.

Examples

```
user_roles

role_actions

group_members

user_services
```

---

# Lookup Tables

Lookup values should be stored in tables whenever they may change.

Examples

```
roles

actions

departments

institutes
```

Avoid hardcoding lookup values in the application.

---

# Constraints

Use database constraints whenever possible.

Examples

- PRIMARY KEY

- FOREIGN KEY

- UNIQUE

- NOT NULL

- CHECK

Do not rely only on application validation.

---

# Unique Constraints

Examples

```
email

role_code

action_code

department_code

institute_code
```

Business identifiers should remain unique.

---

# Indexing Standards

Create indexes for:

- Foreign Keys

- Frequently searched columns

- Frequently filtered columns

Examples

```
email

user_id

role_id

created_at

is_active
```

Avoid unnecessary indexes.

---

# Transactions

Related database operations should execute inside a transaction.

Examples

Create User

↓

Create Profile

↓

Assign Role

↓

Sync User Services

↓

Commit

Rollback if any step fails.

---

# Database Access Rule

Application flow must always follow:

```
UI

↓

Hook

↓

Service

↓

Repository

↓

Platform Provider

↓

Database
```

UI must never access the database directly.

---

# Repository Responsibility

Repositories perform only:

- Insert

- Update

- Delete

- Select

Repositories must not contain business rules.

---

# Service Responsibility

Services contain:

- Validation

- Workflow

- Business Rules

- Transactions

Services orchestrate repositories.

---

# Migration Standards

Every schema change requires a migration.

Never manually modify production schema.

Migration names should be descriptive.

Examples

```
create_roles_table

add_department_table

create_user_services

add_task_priority
```

---

# Seed Data

Default data should be inserted through seed scripts.

Examples

Default Roles

Default Actions

Default Permissions

Default Settings

Never hardcode default values in UI.

---

# Referential Integrity

Every foreign key should enforce relationships.

Avoid orphan records.

Use ON DELETE and ON UPDATE policies carefully.

---

# Permission Model

Authorization follows:

```
users

↓

user_roles

↓

role_actions

↓

user_services
```

Business modules should never bypass this model.

---

# Multi-Tenant Design

All business tables should be designed to support multi-tenancy where applicable.

Examples

```
organization_id

institute_id

department_id
```

Tenant boundaries must be enforced through authorization.

---

# Future Provider Independence

Database implementation must remain independent.

Business modules communicate through:

```
Repository

↓

Platform Provider

↓

Database
```

Changing Supabase should not require changes in business modules.

---

# SQL Standards

SQL should be:

- Readable

- Formatted

- Version controlled

- Reviewed

Avoid long inline SQL inside application code.

---

# Performance Guidelines

Prefer:

- Indexed lookups

- Pagination

- Server-side filtering

- Batch operations

Avoid:

- SELECT *

- Unnecessary joins

- N+1 queries

---

# Database Review Checklist

Before creating a table verify:

✓ Proper naming

✓ UUID primary key

✓ Audit fields

✓ Foreign keys

✓ Indexes

✓ Constraints

✓ Seed requirements

✓ Multi-tenant readiness

✓ Soft delete strategy

---

# Database Standards Freeze

These standards apply to every future database object.

Temporary shortcuts must never become permanent schema design.