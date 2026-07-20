# WAMP Enterprise Platform
# Future Roadmap & Deferred Architecture Decisions

**Version:** 2.0  
**Status:** Approved  
**Last Updated:** July 2026

---

# Purpose

This document records architectural decisions that have been approved but intentionally deferred.

These features are **part of the WAMP vision**, however they are **not included in the current development milestone**.

The current objective is to stabilize the platform foundation before introducing enterprise multi-tenant automation.

---

# Current Development Goal

The current milestone focuses on validating the core architecture.

The objective is to successfully implement:

- Platform Bootstrap
- Platform Owner
- Super Admin
- Universal Dashboard
- Permission Engine
- Scope Engine
- Institute Management
- Department Management
- Role Management
- Default Role Actions
- Group Management
- User Management

Once these modules are stable, the platform foundation will be considered complete.

---

# AD-007 : Enterprise Multi-Tenant Architecture

## Status

Approved

## Implementation

Deferred

## Decision

WAMP shall evolve into a true multi-tenant SaaS platform.

The platform will contain one central Platform Database.

Every customer organization will have its own dedicated database.

```
                    WAMP Platform
                          │
          ─────────────────────────────────
                 Platform Database
          ─────────────────────────────────
                          │
        ┌─────────────────┼──────────────────┐
        │                 │                  │
        ▼                 ▼                  ▼
   Organization A    Organization B    Organization C
        │                 │                  │
        ▼                 ▼                  ▼
     Database A        Database B        Database C
```

Business data will never be shared across organizations.

---

# AD-008 : Tenant Isolation

## Status

Approved

## Decision

Each organization shall have its own independent application database.

Benefits:

- Complete data isolation
- Better security
- Independent backup
- Independent restore
- Independent upgrades
- Independent scaling
- Customer-specific infrastructure

Failure in one organization must never impact another organization.

---

# AD-009 : Database Provider Abstraction

## Status

Approved

## Implementation

Deferred

Business modules shall never directly depend upon Supabase.

Future supported providers may include:

- Supabase
- PostgreSQL
- MySQL
- SQL Server
- Oracle
- Azure SQL
- AWS RDS
- On-Prem PostgreSQL

The Provider Layer will decide which implementation is active.

Business modules must remain provider-independent.

---

# AD-010 : Tenant Provisioning Engine

## Status

Approved

## Implementation

Deferred

Future onboarding workflow:

Platform Owner

↓

Register Organization

↓

Automatically Create Database

↓

Run Database Migrations

↓

Seed Master Data

↓

Create First Super Admin

↓

Configure Storage

↓

Configure Hosting

↓

Activate Organization

Current implementation will perform these activities manually.

The architecture must not prevent future automation.

---

# AD-011 : Platform Database

## Status

Approved

## Implementation

Deferred

A dedicated Platform Database will eventually be introduced.

This database will store only platform-level information.

Examples:

- Organizations
- Subscription
- License
- Tenant Status
- Database Provider
- Database Connection
- Storage Provider
- Hosting Provider
- Billing
- Audit
- Platform Configuration

Business data shall never be stored inside the Platform Database.

---

# AD-012 : Organization Registration

## Status

Approved

## Implementation

Deferred

Future workflow:

Platform Owner

↓

Register Organization

↓

Tenant Provisioning

↓

Database Creation

↓

Create Super Admin

↓

Organization Activated

Current implementation intentionally skips this module.

---

# AD-013 : Platform Owner

## Status

Approved

## Decision

Platform Owner is a Platform Role.

Platform Owner never belongs to an organization.

Platform Owner exists above every organization.

Responsibilities include:

- Platform Bootstrap
- Platform Configuration
- Future Organization Management
- Future Subscription Management
- Future Tenant Provisioning

Current implementation will have only one Platform Owner.

---

# AD-014 : Universal Dashboard

## Status

Approved

Dashboard rendering shall never depend upon role-specific pages.

Dashboard shall always be generated using:

- Effective Permissions
- Assigned Services
- User Scope
- Subscription
- Feature Availability

Future tenant architecture shall not require any dashboard redesign.

---

# Deferred Modules

The following modules are intentionally postponed.

- Organization Management
- Tenant Management
- Tenant Provisioning
- Subscription Management
- Billing
- License Management
- Hosting Automation
- Database Provisioning
- Storage Provisioning
- Email Provisioning
- Domain Management
- Customer Self Registration

These modules are part of the long-term roadmap.

---

# Current Development Flow

```
Bootstrap Wizard
        │
        ▼
Create Platform Owner
        │
        ▼
Platform Owner Login
        │
        ▼
Create Super Admin
        │
        ▼
Super Admin Login
        │
        ▼
Institute Management
        │
        ▼
Department Management
        │
        ▼
Role Management
        │
        ▼
Default Role Actions
        │
        ▼
Group Management
        │
        ▼
User Management
        │
        ▼
Universal Dashboard
```

This flow has been approved for the current implementation milestone.

---

# Future Enhancement

Once the platform foundation becomes stable, the onboarding process will evolve into:

```
Platform Owner

↓

Register Organization

↓

Automatic Tenant Provisioning

↓

Automatic Database Creation

↓

Automatic Infrastructure Configuration

↓

Create Super Admin

↓

Organization Activated

↓

Ready to Use
```

This enhancement will not require changes to business modules because the Provider Layer will abstract the infrastructure.

---

# Final Decision

The team has intentionally postponed enterprise tenant automation.

Current priority is delivering a stable, extensible, enterprise-grade platform foundation.

No new infrastructure automation work should begin until the Universal Dashboard, Permission Engine, Scope Engine, and Super Admin workflow are fully operational.