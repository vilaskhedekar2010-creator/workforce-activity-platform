/*
============================================================
WAMP Enterprise Platform
Sprint 3.4
Action Management
============================================================
*/

BEGIN;

CREATE TABLE IF NOT EXISTS public.actions (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    module VARCHAR(100) NOT NULL,

    action VARCHAR(100) NOT NULL,

    code VARCHAR(150) NOT NULL UNIQUE,

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

CREATE INDEX IF NOT EXISTS idx_actions_module
ON public.actions(module);

CREATE INDEX IF NOT EXISTS idx_actions_code
ON public.actions(code);

CREATE INDEX IF NOT EXISTS idx_actions_status
ON public.actions(status);

COMMIT;