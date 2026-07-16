BEGIN;

INSERT INTO actions
(
    module,
    action,
    code,
    description,
    status,
    is_system
)

VALUES

-- Institute

('Institute','View','INSTITUTE_VIEW','View Institute','ACTIVE',TRUE),
('Institute','Create','INSTITUTE_CREATE','Create Institute','ACTIVE',TRUE),
('Institute','Update','INSTITUTE_UPDATE','Update Institute','ACTIVE',TRUE),
('Institute','Archive','INSTITUTE_ARCHIVE','Archive Institute','ACTIVE',TRUE),
('Institute','Restore','INSTITUTE_RESTORE','Restore Institute','ACTIVE',TRUE),

-- Department

('Department','View','DEPARTMENT_VIEW','View Department','ACTIVE',TRUE),
('Department','Create','DEPARTMENT_CREATE','Create Department','ACTIVE',TRUE),
('Department','Update','DEPARTMENT_UPDATE','Update Department','ACTIVE',TRUE),
('Department','Archive','DEPARTMENT_ARCHIVE','Archive Department','ACTIVE',TRUE),
('Department','Restore','DEPARTMENT_RESTORE','Restore Department','ACTIVE',TRUE),

-- Role

('Role','View','ROLE_VIEW','View Role','ACTIVE',TRUE),
('Role','Create','ROLE_CREATE','Create Role','ACTIVE',TRUE),
('Role','Update','ROLE_UPDATE','Update Role','ACTIVE',TRUE),
('Role','Archive','ROLE_ARCHIVE','Archive Role','ACTIVE',TRUE),
('Role','Restore','ROLE_RESTORE','Restore Role','ACTIVE',TRUE),

-- User

('User','View','USER_VIEW','View User','ACTIVE',TRUE),
('User','Create','USER_CREATE','Create User','ACTIVE',TRUE),
('User','Update','USER_UPDATE','Update User','ACTIVE',TRUE),
('User','Archive','USER_ARCHIVE','Archive User','ACTIVE',TRUE),
('User','Restore','USER_RESTORE','Restore User','ACTIVE',TRUE),

-- Message

('Message','View','MESSAGE_VIEW','View Message','ACTIVE',TRUE),
('Message','Send','MESSAGE_SEND','Send Message','ACTIVE',TRUE),
('Message','Reply','MESSAGE_REPLY','Reply Message','ACTIVE',TRUE),
('Message','Delete','MESSAGE_DELETE','Delete Message','ACTIVE',TRUE),

-- Task

('Task','View','TASK_VIEW','View Task','ACTIVE',TRUE),
('Task','Create','TASK_CREATE','Create Task','ACTIVE',TRUE),
('Task','Assign','TASK_ASSIGN','Assign Task','ACTIVE',TRUE),
('Task','Update','TASK_UPDATE','Update Task','ACTIVE',TRUE),
('Task','Complete','TASK_COMPLETE','Complete Task','ACTIVE',TRUE),

-- Event

('Event','View','EVENT_VIEW','View Event','ACTIVE',TRUE),
('Event','Create','EVENT_CREATE','Create Event','ACTIVE',TRUE),
('Event','Approve','EVENT_APPROVE','Approve Event','ACTIVE',TRUE),
('Event','Publish','EVENT_PUBLISH','Publish Event','ACTIVE',TRUE);

COMMIT;