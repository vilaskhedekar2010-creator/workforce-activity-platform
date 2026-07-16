/*
============================================================
WAMP Enterprise Platform
Sprint 3.3
Role Management
============================================================
*/

BEGIN;

CREATE TABLE IF NOT EXISTS public.roles (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    code VARCHAR(30) NOT NULL UNIQUE,

    name VARCHAR(200) NOT NULL,

    description TEXT,

    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'
        CHECK (status IN ('ACTIVE','ARCHIVED')),

    is_system BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    created_by UUID,

    updated_at TIMESTAMPTZ,

    updated_by UUID,

    archived_at TIMESTAMPTZ,

    archived_by UUID
);

CREATE INDEX IF NOT EXISTS idx_roles_name
ON public.roles(name);

CREATE INDEX IF NOT EXISTS idx_roles_code
ON public.roles(code);

CREATE INDEX IF NOT EXISTS idx_roles_status
ON public.roles(status);

COMMIT;