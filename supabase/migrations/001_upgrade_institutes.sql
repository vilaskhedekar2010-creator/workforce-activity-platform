/*
============================================================
WAMP Enterprise Platform
Sprint 3.1
Institute Master Upgrade
============================================================
*/

BEGIN;

------------------------------------------------------------
-- 1. Add New Columns
------------------------------------------------------------

ALTER TABLE public.institutes
ADD COLUMN IF NOT EXISTS code VARCHAR(20);

ALTER TABLE public.institutes
ADD COLUMN IF NOT EXISTS description TEXT;

ALTER TABLE public.institutes
ADD COLUMN IF NOT EXISTS email VARCHAR(255);

ALTER TABLE public.institutes
ADD COLUMN IF NOT EXISTS phone VARCHAR(20);

ALTER TABLE public.institutes
ADD COLUMN IF NOT EXISTS website VARCHAR(255);

ALTER TABLE public.institutes
ADD COLUMN IF NOT EXISTS address_line1 TEXT;

ALTER TABLE public.institutes
ADD COLUMN IF NOT EXISTS address_line2 TEXT;

ALTER TABLE public.institutes
ADD COLUMN IF NOT EXISTS city VARCHAR(100);

ALTER TABLE public.institutes
ADD COLUMN IF NOT EXISTS state VARCHAR(100);

ALTER TABLE public.institutes
ADD COLUMN IF NOT EXISTS country VARCHAR(100);

ALTER TABLE public.institutes
ADD COLUMN IF NOT EXISTS postal_code VARCHAR(20);

ALTER TABLE public.institutes
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'ACTIVE';

ALTER TABLE public.institutes
ADD COLUMN IF NOT EXISTS is_system BOOLEAN DEFAULT FALSE;

ALTER TABLE public.institutes
ADD COLUMN IF NOT EXISTS created_by UUID;

ALTER TABLE public.institutes
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ;

ALTER TABLE public.institutes
ADD COLUMN IF NOT EXISTS updated_by UUID;

ALTER TABLE public.institutes
ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ;

ALTER TABLE public.institutes
ADD COLUMN IF NOT EXISTS archived_by UUID;

------------------------------------------------------------
-- 2. Populate Existing Records
------------------------------------------------------------

UPDATE public.institutes
SET code = CASE
    WHEN short_name = 'MITSOC' THEN 'MIT-SOC'
    WHEN short_name = 'MITSOE' THEN 'MIT-SOE'
    WHEN short_name = 'MITSHD' THEN 'MIT-SHD'
    ELSE UPPER(REPLACE(short_name,' ','-'))
END
WHERE code IS NULL;

UPDATE public.institutes
SET status='ACTIVE'
WHERE status IS NULL;

UPDATE public.institutes
SET is_system=FALSE
WHERE is_system IS NULL;

------------------------------------------------------------
-- 3. Constraints
------------------------------------------------------------

ALTER TABLE public.institutes
ALTER COLUMN code SET NOT NULL;

ALTER TABLE public.institutes
ALTER COLUMN status SET NOT NULL;

ALTER TABLE public.institutes
ALTER COLUMN is_system SET NOT NULL;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname='uq_institutes_code'
    ) THEN

        ALTER TABLE public.institutes
        ADD CONSTRAINT uq_institutes_code
        UNIQUE(code);

    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname='chk_institutes_status'
    ) THEN

        ALTER TABLE public.institutes
        ADD CONSTRAINT chk_institutes_status
        CHECK(status IN ('ACTIVE','ARCHIVED'));

    END IF;
END $$;

------------------------------------------------------------
-- 4. Indexes
------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_institutes_name
ON public.institutes(name);

CREATE INDEX IF NOT EXISTS idx_institutes_code
ON public.institutes(code);

CREATE INDEX IF NOT EXISTS idx_institutes_status
ON public.institutes(status);

CREATE INDEX IF NOT EXISTS idx_institutes_city
ON public.institutes(city);

COMMIT;