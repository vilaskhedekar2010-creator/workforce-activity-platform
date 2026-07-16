BEGIN;

CREATE TABLE IF NOT EXISTS role_action_history
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    role_id UUID NOT NULL
        REFERENCES roles(id)
        ON DELETE CASCADE,

    action_id UUID NOT NULL
        REFERENCES actions(id)
        ON DELETE CASCADE,

    operation TEXT NOT NULL
        CHECK (operation IN ('GRANTED','REVOKED')),

    performed_by UUID NULL,

    remarks TEXT NULL,

    performed_at TIMESTAMPTZ NOT NULL
        DEFAULT NOW()
);

CREATE INDEX idx_role_action_history_role
ON role_action_history(role_id);

CREATE INDEX idx_role_action_history_action
ON role_action_history(action_id);

CREATE INDEX idx_role_action_history_operation
ON role_action_history(operation);

CREATE INDEX idx_role_action_history_performed_at
ON role_action_history(performed_at DESC);

COMMIT;