# WAMP Enterprise Migration Tracker

## Temporary Changes

// TODO (MT-001): Replace hardcoded role after RBAC migration.
role="SUPER_ADMIN"
### MT-001
**File:**
app/dashboard/super-admin/page.tsx

**Temporary Code:**
role="SUPER_ADMIN"

**Reason:**
DashboardHeader now requires the `role` prop, but the Super Admin page still uses the old profile model.

**Permanent Fix:**
Replace with the actual role obtained from:
profiles.role_id → roles.code

**Status:**
OPEN