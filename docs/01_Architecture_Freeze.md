# WAMP Enterprise Architecture

**Project:** Workforce & Activity Management Platform (WAMP)

Version: 2.0 (Enterprise Refactoring)

Status: Active

Last Updated: 18 July 2026

---

# Purpose

This document defines the permanent architectural principles of WAMP.

Every new feature, module, service, or enhancement must follow these rules.

Temporary implementation details must NOT be added here.
Temporary work belongs in:

docs/MIGRATION_TRACKER.md

---

# Vision

WAMP is a modular Enterprise Workforce & Activity Management Platform.

It is NOT an Education ERP.

Education is only one implementation.

The platform must support multiple industries including:

- Universities
- Schools
- IT Companies
- Manufacturing
- Healthcare
- Government
- NGOs
- Startups

The platform architecture must remain industry-independent.

---

# Architecture Layers

```
Application (app)
        │
        ▼
Modules (Business Features)
        │
        ▼
Services
        │
        ▼
Repositories
        │
        ▼
Platform
        │
        ▼
Database Provider
        │
        ▼
Database
```

No UI component should communicate directly with the database.

---

# Folder Responsibilities

## app/

Purpose

- Routing
- Layouts
- Authentication pages
- Dashboard pages

No business logic should exist here.

---

## modules/

Contains all business modules.

Examples

- Users
- Groups
- Role Actions
- Communication
- Tasks
- Dashboard

Each module owns its own business logic.

---

## shared/

Contains reusable components used by multiple modules.

Examples

- DashboardHeader
- DashboardSidebar
- StatCard
- Common Types
- Shared Constants

No business-specific components belong here.

---

## platform/

Contains platform-level services.

Examples

- Authentication
- Authorization
- Database Providers
- Configuration
- Notifications
- Logging
- Storage
- Cache
- Realtime

Platform code must never contain business-specific logic.

---

## core/

Contains reusable business engine and common business rules.

---

## lib/

Contains third-party integrations and helper libraries.

---

## supabase/

Contains database migrations, SQL, and provider configuration.

---

# Standard Module Structure

Every business module should follow this structure whenever applicable.

```
module/

    components/

    dialogs/

    hooks/

    repository/

    services/

    types/

    utils/

    validation/

    index.ts
```

Only create folders that are actually needed.

---

# Dependency Rule

Allowed

```
Page
 ↓
Hook
 ↓
Service
 ↓
Repository
 ↓
Platform
 ↓
Database Provider
```

Not Allowed

```
Component
      ↓
Database
```

```
Hook
    ↓
Database
```

```
Page
   ↓
Supabase Client
```

---

# Business Module Rules

Business modules must:

- be independent
- own their own UI
- own their own services
- own their own repository
- expose only public APIs

Business modules must never depend directly on another module's internal implementation.

---

# Shared Component Rules

Shared components:

- must be reusable
- must not contain business logic
- must not know about users, institutes, departments, or roles

Examples

Good

DashboardHeader

StatCard

ConfirmationDialog

Bad

UserManagement

InstituteManagement

RoleAssignment

---

# Platform Rules

Platform contains:

Authentication

Authorization

Configuration

Database Providers

Notifications

Logging

Storage

Realtime

Caching

Platform must remain business independent.

---

# Repository Pattern

Every database operation should follow:

```
Component

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

Repositories contain database operations only.

Business rules belong inside Services.

---

# Provider Abstraction

Business modules must never communicate directly with Supabase.

Instead

```
Business Module

↓

Repository

↓

Platform Provider

↓

Supabase
```

This allows replacing Supabase with another provider in future.

---

# Architecture Decisions

## AD-001

Each business capability has exactly one implementation.

Duplicate implementations are not allowed.

---

## AD-002

Every business module follows the standard module structure.

---

## AD-003

Reusable UI belongs inside `shared`.

Business UI belongs inside the corresponding module.

---

## AD-004

Authentication, Authorization, Logging, Storage, Notifications, Configuration, Providers and Database infrastructure belong inside `platform`.

---

## AD-005

No new business code shall be added to the legacy top-level `components/` folder.

Existing code will be migrated feature by feature.

---

# Legacy Code Policy

Legacy code will not be deleted immediately.

Migration strategy:

1. Identify usage.
2. Migrate feature.
3. Verify compilation.
4. Commit.
5. Archive legacy implementation.

No bulk deletion.

---

# Migration Strategy

Every migration must follow:

Move

↓

Compile

↓

Fix

↓

Commit

↓

Next Feature

The project should compile after every migration step.

---

# Temporary Changes

Temporary implementation details must never be documented here.

Use

docs/MIGRATION_TRACKER.md

for:

- Temporary fixes
- Hardcoded values
- Compatibility changes
- Migration notes

---

# Development Principles

Priority order:

1. Architecture
2. Folder Structure
3. Compilation
4. Business Logic
5. UI

---

# Enterprise Goals

The final platform should provide:

- Modular Architecture
- Provider Independence
- Service-Oriented Design
- Reusable Components
- Maintainable Codebase
- Enterprise Scalability
- Multi-Tenant Support
- Industry Independence

---

# Document Maintenance

This document contains only permanent architecture decisions.

It should change rarely.

Implementation details belong in code.

Temporary migration details belong in:

docs/MIGRATION_TRACKER.md