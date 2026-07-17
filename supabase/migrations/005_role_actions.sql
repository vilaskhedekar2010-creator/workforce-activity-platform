/*
============================================================
WAMP Enterprise Platform
Sprint 3.5
Role Action Assignment
============================================================
*/

BEGIN;

-- ----------------------------------------------------------
-- Update profiles table
-- ----------------------------------------------------------

ALTER TABLE public.profiles
DROP COLUMN IF EXISTS role;

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS role_id UUID;

ALTER TABLE public.profiles
ADD CONSTRAINT profiles_role_id_fkey
FOREIGN KEY (role_id)
REFERENCES public.roles(id)
ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_profiles_role_id
ON public.profiles(role_id);

-- ----------------------------------------------------------
-- Role Actions
-- ----------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.role_actions (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    role_id UUID NOT NULL,

    action_id UUID NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    created_by UUID,

    CONSTRAINT fk_role_actions_role
        FOREIGN KEY(role_id)
        REFERENCES public.roles(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_role_actions_action
        FOREIGN KEY(action_id)
        REFERENCES public.actions(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_role_action
        UNIQUE(role_id, action_id)

);

CREATE INDEX IF NOT EXISTS idx_role_actions_role
ON public.role_actions(role_id);

CREATE INDEX IF NOT EXISTS idx_role_actions_action
ON public.role_actions(action_id);

COMMIT;