/*
============================================================
WAMP Enterprise Platform
Sprint 3.2
Department Master Upgrade
============================================================
*/

BEGIN;

------------------------------------------------------------
-- Add New Columns
------------------------------------------------------------

ALTER TABLE public.departments
ADD COLUMN IF NOT EXISTS code VARCHAR(20);

ALTER TABLE public.departments
ADD COLUMN IF NOT EXISTS description TEXT;

ALTER TABLE public.departments
ADD COLUMN IF NOT EXISTS email VARCHAR(255);

ALTER TABLE public.departments
ADD COLUMN IF NOT EXISTS phone VARCHAR(20);

ALTER TABLE public.departments
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'ACTIVE';

ALTER TABLE public.departments
ADD COLUMN IF NOT EXISTS is_system BOOLEAN DEFAULT FALSE;

ALTER TABLE public.departments
ADD COLUMN IF NOT EXISTS created_by UUID;

ALTER TABLE public.departments
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ;

ALTER TABLE public.departments
ADD COLUMN IF NOT EXISTS updated_by UUID;

ALTER TABLE public.departments
ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ;

ALTER TABLE public.departments
ADD COLUMN IF NOT EXISTS archived_by UUID;

------------------------------------------------------------
-- Populate Existing Records
------------------------------------------------------------

UPDATE public.departments
SET code = CASE
    WHEN short_name = 'CSE-CORE' THEN 'CSE-CORE'
    WHEN short_name = 'DCE' THEN 'DCE'
    WHEN short_name = 'DME' THEN 'DME'
    ELSE UPPER(REPLACE(short_name,' ','-'))
END
WHERE code IS NULL;

UPDATE public.departments
SET status = 'ACTIVE'
WHERE status IS NULL;

UPDATE public.departments
SET is_system = FALSE
WHERE is_system IS NULL;

------------------------------------------------------------
-- Constraints
------------------------------------------------------------

ALTER TABLE public.departments
ALTER COLUMN code SET NOT NULL;

ALTER TABLE public.departments
ALTER COLUMN status SET NOT NULL;

ALTER TABLE public.departments
ALTER COLUMN is_system SET NOT NULL;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname='uq_departments_institute_code'
    ) THEN

        ALTER TABLE public.departments
        ADD CONSTRAINT uq_departments_institute_code
        UNIQUE(institute_id, code);

    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname='chk_departments_status'
    ) THEN

        ALTER TABLE public.departments
        ADD CONSTRAINT chk_departments_status
        CHECK(status IN ('ACTIVE','ARCHIVED'));

    END IF;
END $$;

------------------------------------------------------------
-- Indexes
------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_departments_name
ON public.departments(name);

CREATE INDEX IF NOT EXISTS idx_departments_code
ON public.departments(code);

CREATE INDEX IF NOT EXISTS idx_departments_status
ON public.departments(status);

CREATE INDEX IF NOT EXISTS idx_departments_institute
ON public.departments(institute_id);

COMMIT;