# WAMP Legacy Architecture

This folder contains the deprecated role-based implementation of WAMP.

Reason:
The platform has migrated to an enterprise service-based architecture.

Old Flow

Login
→ Role
→ Role Dashboard
→ Features

New Flow

Login
→ user_roles
→ role_actions
→ user_services
→ Universal Dashboard

This folder is retained only for historical reference and migration.
No new development should be done here.