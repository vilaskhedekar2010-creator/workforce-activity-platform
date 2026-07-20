# WAMP UI Guidelines

**Project:** Workforce & Activity Management Platform (WAMP)

Version: 2.0

Status: Active

Last Updated: 20 July 2026

---

# Purpose

This document defines the User Interface (UI) standards for WAMP.

Every screen, page, dialog, table, form, and dashboard must follow these guidelines.

The objectives are:

- Consistency
- Simplicity
- Professional appearance
- Reusability
- Enterprise user experience

---

# UI Philosophy

WAMP is an Enterprise Platform.

The UI should be:

- Clean
- Modern
- Fast
- Minimal
- Professional
- Responsive

Avoid unnecessary animations and visual clutter.

---

# Design Principles

The UI should prioritize:

1. Simplicity
2. Readability
3. Productivity
4. Accessibility
5. Consistency

---

# Layout Structure

Every page should follow:

```
+--------------------------------------------------------+
| Header                                                 |
+----------------+---------------------------------------+
|                |                                       |
| Sidebar        |      Main Content                     |
|                |                                       |
|                |                                       |
|                |                                       |
+----------------+---------------------------------------+
| Footer                                                |
+--------------------------------------------------------+
```

---

# Universal Dashboard

The dashboard is a platform landing page.

It should contain:

- Welcome message
- User profile
- Quick statistics
- Recent activity
- Favorite services
- Shortcuts

Business modules must not be implemented inside the dashboard.

---

# Header

The header should contain:

- Application logo
- Page title
- Breadcrumb
- Global search (future)
- Notification icon
- User profile
- Logout

Header remains consistent across all modules.

---

# Sidebar

Sidebar is generated dynamically using:

```
user_services
```

Rules:

- Show only authorized modules.
- Highlight active module.
- Support future nested menus.
- Collapse on mobile devices.

Never hardcode menus.

---

# Breadcrumb

Every module should display a breadcrumb.

Example:

```
Dashboard

↓

Users

↓

Create User
```

---

# Footer

Footer should contain:

- Application name
- Version
- Copyright
- Build information (optional)

---

# Page Structure

Each module page should follow:

```
Title

↓

Action Buttons

↓

Filters

↓

Table / Content

↓

Pagination
```

---

# Cards

Use cards to group related content.

Examples:

- Statistics
- Dashboard widgets
- Forms
- Reports

Cards should have:

- Title
- Optional description
- Content
- Actions (optional)

---

# Tables

All tables should support:

- Pagination
- Sorting
- Search
- Filtering
- Responsive layout

Future enhancements:

- Export
- Column visibility
- Bulk actions

---

# Forms

Forms should be simple.

Recommended layout:

```
Section Title

↓

Input Fields

↓

Validation Messages

↓

Save

Cancel
```

---

# Form Validation

Validation should occur:

1. Client-side
2. Server-side

Validation messages should appear below the field.

Avoid popup alerts for validation.

---

# Dialogs

Dialogs should be used for:

- Create
- Edit
- Delete confirmation
- Assignments
- Quick actions

Avoid full-page navigation for small operations.

---

# Buttons

Primary

- Save
- Create
- Submit

Secondary

- Cancel
- Back

Danger

- Delete
- Remove

Use consistent colors throughout the application.

---

# Icons

Every sidebar item should have an icon.

Examples:

Dashboard

Users

Roles

Institutes

Messages

Tasks

Events

Settings

Icons should remain consistent throughout the application.

---

# Colors

Use a consistent design system.

Primary

Application primary color.

Secondary

Neutral colors.

Success

Green

Warning

Orange

Danger

Red

Information

Blue

Avoid random colors.

---

# Typography

Hierarchy:

Page Title

Section Title

Card Title

Body Text

Caption

Maintain consistent spacing.

---

# Spacing

Use consistent spacing throughout the application.

Recommended spacing scale:

```
4px

8px

12px

16px

24px

32px

48px
```

Avoid arbitrary spacing.

---

# Responsive Design

Application should support:

Desktop

Laptop

Tablet

Mobile

Sidebar should collapse automatically on smaller screens.

---

# Loading States

Every page should have:

Loading Screen

Skeleton Loader

Spinner (only when appropriate)

Never leave blank pages while loading.

---

# Empty States

If no data exists,

show a meaningful message.

Example:

"No users found."

Provide a relevant action when possible.

---

# Error States

Display friendly messages.

Avoid exposing technical errors.

Example:

Unable to load users.

Please try again.

---

# Notifications

Use notifications for:

- Success
- Error
- Warning
- Information

Avoid browser alerts.

---

# Accessibility

All UI should support:

- Keyboard navigation
- Screen readers
- Proper labels
- Sufficient color contrast
- Focus indicators

---

# Performance

Pages should:

- Load quickly
- Lazy load large components
- Paginate large datasets
- Avoid unnecessary re-rendering

---

# UI Component Rules

Reusable UI belongs in:

```
shared/
```

Business-specific UI belongs in:

```
modules/
```

Platform UI belongs in:

```
app/dashboard/components
```

---

# Module UI Responsibilities

Each business module owns:

- Forms
- Tables
- Dialogs
- Filters
- Business widgets

Platform owns:

- Header
- Sidebar
- Footer
- Breadcrumb
- Profile Menu
- Notifications

---

# Future UI Features

Reserved for future implementation:

- Dark Mode
- Theme Switching
- Internationalization
- Keyboard Shortcuts
- Global Search
- Favorites
- Recently Visited
- Custom Dashboard Widgets

---

# UI Review Checklist

Before committing verify:

✓ Responsive

✓ Consistent spacing

✓ Consistent typography

✓ Proper validation

✓ Loading state

✓ Error state

✓ Empty state

✓ Accessibility

✓ Responsive sidebar

✓ Consistent buttons

✓ Icons

✓ Breadcrumb

---

# UI Guidelines Freeze

These guidelines define the permanent UI standards of WAMP.

Every future module should follow these standards to maintain a consistent enterprise user experience.