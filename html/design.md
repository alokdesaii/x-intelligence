# X-Intelligence — AML/Compliance Portal
## CLAUDE.md — Design & Development Reference

> **Brand:** Xirni Limited (Xirni)
> **Product Name:** X-Intelligence
> **Design System:** HnH Design System (Figma: `afnJspYOcdwu9rpX6XoIgh`)
> **Reference Tool:** LSEG World-Check One (see screenshots for UX patterns)
> **Portals:** Customer Portal + Admin Portal (two separate authenticated experiences)

---

## 1. Project Overview

X-Intelligence is a professional AML (Anti-Money Laundering) and compliance screening web portal built for Xirni's clients and internal administrators. It provides name screening, bulk screening, ongoing monitoring, case management, and reporting — comparable in depth to LSEG World-Check One, but with Xirni's own branding, workflow logic, and subscription management layer.

The portal has two distinct front-ends sharing a common design system:

| Portal | Audience | Key Focus |
|---|---|---|
| **Customer Portal** | Xirni's end-clients (compliance officers, AML analysts) | Screening, case management, reporting |
| **Admin Portal** | Xirni internal admins | Masters, subscriptions, packages, user management |

---

## 2. Design System

### 2.1 Brand Identity Principles
- **Brand name in UI:** "X-Intelligence" (product), "Xirni" or "Xirni" (company)
- **Tone:** Professional, authoritative, data-dense but clean. Compliance software must inspire trust.
- **Mode:** Light mode primary. Dark mode tokens also defined below (use for future dark mode support).
- **Density:** Compact / high. Tables, filters, and data grids are core to the UX — avoid over-whitespace. Prefer **smaller fonts (13px body, 11px table headers)** and **semibold** labels + key data cells. Form/field labels 13px semibold; option/control labels 13px; tight table rows (`py-2`). This dense, sharp treatment is the standing direction — apply it to every new screen.
- **Figma file key:** `afnJspYOcdwu9rpX6XoIgh` (HnH Design System) — for component reference only; all tokens are embedded below.

---

### 2.2 Color Palette — Primitive Tokens

These are the raw brand color ramps. Do not use directly in components — use semantic tokens (Section 2.3).

```css
/* Primary (Deep Navy Blue) */
--color-primary-50:  #eaeff2;
--color-primary-100: #d9e2e7;
--color-primary-200: #b3c5d0;
--color-primary-300: #809eb1;
--color-primary-400: #5a8199;
--color-primary-500: #346482;
--color-primary-600: #1b5172;
--color-primary-700: #001741;   /* ← Main brand primary */
--color-primary-800: #000f33;
--color-primary-900: #000b21;
--color-primary-950: #001827;

/* Secondary (Teal) */
--color-secondary-50:  #ebfbf5;
--color-secondary-100: #d8f5f3;
--color-secondary-200: #9df0cc;
--color-secondary-300: #6eeab2;
--color-secondary-400: #4cd2c9;
--color-secondary-500: #00dc8d;  /* ← Main brand secondary / "brand" token */
--color-secondary-600: #00c47e;
--color-secondary-700: #007c74;
--color-secondary-800: #005f59;
--color-secondary-900: #00423e;
--color-secondary-950: #002623;

/* Neutral (Grey scale) */
--color-neutral-0:    #ffffff;
--color-neutral-50:   #fafafa;
--color-neutral-100:  #f5f5f5;
--color-neutral-200:  #e5e5e5;
--color-neutral-300:  #d4d4d4;
--color-neutral-400:  #a3a3a3;
--color-neutral-500:  #737373;
--color-neutral-600:  #525252;
--color-neutral-700:  #404040;
--color-neutral-800:  #262626;
--color-neutral-900:  #171717;
--color-neutral-950:  #0a0a0a;
--color-neutral-1000: #000000;

/* Red */
--color-red-50:  #fef2f2;
--color-red-100: #fee2e2;
--color-red-300: #fca5a5;
--color-red-500: #ef4444;
--color-red-700: #b91c1c;
--color-red-900: #7f1d1d;

/* Green */
--color-green-50:  #f0fdf4;
--color-green-100: #dcfce7;
--color-green-300: #86efac;
--color-green-500: #22c55e;
--color-green-700: #15803d;
--color-green-900: #14532d;

/* Amber */
--color-amber-50:  #fffbeb;
--color-amber-100: #fef3c7;
--color-amber-300: #fcd34d;
--color-amber-500: #f59e0b;
--color-amber-700: #b45309;
--color-amber-900: #78350f;
```

---

### 2.3 Semantic Tokens — Light Mode

These are the tokens to reference in all components. They map from primitives above.

```css
:root {
  /* ── Backgrounds ── */
  --background:        #ffffff;   /* Page background */
  --card:              #ffffff;   /* Card / panel surface */
  --popover:           #ffffff;   /* Dropdown, tooltip surface */
  --muted:             #f5f5f5;   /* Subtle bg: table striping, empty state */
  --sidebar:           #fafafa;   /* Sidebar background */

  /* ── Foregrounds / Text ── */
  --foreground:        #0a0a0a;   /* Primary body text */
  --card-foreground:   #0a0a0a;   /* Text on cards */
  --popover-foreground:#0a0a0a;   /* Text in popovers */
  --muted-foreground:  #737373;   /* Secondary / placeholder text */

  /* ── Brand Colors ── */
  --primary:           #001741;   /* Navy — primary CTA, active nav, links */
  --primary-foreground:#ffffff;   /* Text on primary bg */
  --brand:             #00dc8d;   /* Teal — accent, highlights, brand badge */
  --brand-foreground:  #ffffff;   /* Text on brand bg */

  /* ── UI Surface Colors ── */
  --secondary:         #f5f5f5;   /* Secondary button background */
  --secondary-foreground: #171717;/* Text on secondary bg */
  --accent:            #f5f5f5;   /* Hover state background */
  --accent-foreground: #171717;   /* Text on accent bg */

  /* ── Borders & Inputs ── */
  --border:            #e5e5e5;   /* Default border colour */
  --input:             #e5e5e5;   /* Input field border */
  --ring:              #00dc8d;   /* Focus ring — TEAL/brand (updated June 2026; was navy). Applied as a soft glow via --shadow-focus */

  /* ── Sidebar Specific ── */
  --sidebar-foreground:        #0a0a0a;
  --sidebar-primary:           #001741;
  --sidebar-primary-foreground:#ffffff;
  --sidebar-accent:            #f5f5f5;
  --sidebar-accent-foreground: #171717;
  --sidebar-border:            #e5e5e5;

  /* ── Semantic Status ── */
  --destructive:        #ef4444;  /* Error / danger — false match, high risk */
  --destructive-foreground: #ffffff;
  --destructive-subtle: #fef2f2;  /* Error background tint */
  --destructive-border: #fca5a5;  /* Error border */

  --success:            #15803d;  /* Resolved, true match confirmed */
  --success-subtle:     #f0fdf4;  /* Success background tint */
  --success-border:     #86efac;  /* Success border */

  --warning:            #b45309;  /* Unresolved, pending, caution */
  --warning-subtle:     #fffbeb;  /* Warning background tint */
  --warning-border:     #fcd34d;  /* Warning border */

  --info:               #1b5172;  /* Informational states */
  --info-subtle:        #eaeff2;  /* Info background tint */
  --info-border:        #809eb1;  /* Info border */

  /* ── Charts ── */
  --chart-1:            #001741;  /* Primary data series (navy) */
  --chart-2:            #00dc8d;  /* Secondary data series (teal) */
  /* Extend with amber-500, green-500, red-500 for additional series */
}
```

---

### 2.4 Semantic Tokens — Dark Mode

```css
[data-theme="dark"] {
  --background:        #0a0a0a;
  --card:              #171717;
  --popover:           #171717;
  --muted:             #262626;

  --foreground:        #fafafa;
  --card-foreground:   #fafafa;
  --popover-foreground:#fafafa;
  --muted-foreground:  #a3a3a3;

  --primary:           #001741;   /* Navy stays the same */
  --primary-foreground:#ffffff;
  --brand:             #4cd2c9;   /* Lighter teal for dark bg legibility */
  --brand-foreground:  #ffffff;

  --secondary:         #262626;
  --secondary-foreground: #fafafa;
  --accent:            #262626;
  --accent-foreground: #fafafa;

  --border:            #262626;
  --input:             #262626;
  --ring:              #00dc8d;

  --destructive:        #b91c1c;
  --destructive-foreground: #ffffff;
  --destructive-subtle: #7f1d1d;
  --destructive-border: #b91c1c;

  --success:            #22c55e;
  --success-subtle:     #14532d;
  --success-border:     #15803d;

  --warning:            #f59e0b;
  --warning-subtle:     #78350f;
  --warning-border:     #b45309;

  --info:               #5a8199;
  --info-subtle:        #000b21;
  --info-border:        #001741;
}
```

---

### 2.5 Typography

**Fonts:** `Inter` (UI) + `JetBrains Mono` (code/IDs). Load both from Google Fonts.

```css
/* ── Display / Headings (Inter Semi Bold 600) ── */
/* Display/2xl */ font: 600 24px/32px 'Inter'; letter-spacing: -0.5px;
/* Display/xl  */ font: 600 20px/28px 'Inter'; letter-spacing: -0.3px;
/* Display/lg  */ font: 600 18px/28px 'Inter'; letter-spacing: -0.2px;
/* Display/md  */ font: 600 16px/24px 'Inter'; letter-spacing: -0.1px;
/* Display/sm  */ font: 600 14px/20px 'Inter'; letter-spacing:  0px;

/* ── Body (Inter Regular 400) ── */
/* Body/lg */ font: 400 16px/24px 'Inter'; letter-spacing: 0;
/* Body/md */ font: 400 14px/20px 'Inter'; letter-spacing: 0;   /* ← default body */
/* Body/sm */ font: 400 12px/16px 'Inter'; letter-spacing: 0;
/* Body/xs */ font: 400 10px/14px 'Inter'; letter-spacing: 0;

/* ── Labels (Inter Medium 500 or Semi Bold 600) ── */
/* Label/md */ font: 500 14px/20px 'Inter'; letter-spacing: 0;  /* button text, field labels */
/* Label/sm */ font: 600 12px/16px 'Inter'; letter-spacing: 0;  /* badge text, table headers */

/* ── Monospace (JetBrains Mono Regular 400) ── */
/* Mono/md */ font: 400 13px/20px 'JetBrains Mono'; letter-spacing: 0;  /* IDs, codes */
/* Mono/sm */ font: 400 12px/16px 'JetBrains Mono'; letter-spacing: 0;
```

**Usage guide:**
- Page titles / section headers → `Display/lg` or `Display/xl`
- Card titles → `Display/md`
- Stat card numbers → `Display/2xl`
- Body copy, table cells → `Body/md`
- Table headers, badge labels → `Label/sm`
- Button labels, form labels → `Label/md`
- Search Profile IDs, Case IDs, World-Check IDs → `Mono/md`

---

### 2.6 Spacing

Spacing follows a **4px base unit**. All component spacing uses these named tokens:

```css
--spacing-1:  4px;
--spacing-2:  8px;
--spacing-3:  12px;
--spacing-4:  16px;
--spacing-6:  24px;
/* larger gaps compose from multiples: 32px = spacing-4 × 2, etc. */
```

**Key application rules:**
- Icon-to-text gap in buttons: `--spacing-2` (8px)
- Button horizontal padding: `--spacing-3` (sm), `--spacing-4` (md/lg)
- Card internal padding: `--spacing-6` (24px)
- Section gaps on page: `--spacing-6` to `32px`
- Table cell padding: `--spacing-3` vertical, `--spacing-4` horizontal

---

### 2.7 Border Radius

> **Updated June 2026 (X-Intelligence Rebranding):** Border radius is configured to `0` for all buttons and input fields (including checkboxes). Avatars, indicator dots, and pills remain fully rounded.

```css
--radius-sm:   0px;   /* Checkboxes, small chips */
--radius-md:   0px;   /* Sidebar nav items */
--radius-lg:   6px;   /* Cards, alerts, modals, tabs container */
--radius-xl:   8px;   /* Large cards, hero panels */
--radius-full: 9999px;/* Pills, avatars, full-round badges */

/* Component-specific overrides */
--component-radius-button:   0px;
--component-radius-input:    0px;
--component-radius-badge:    4px;
--component-radius-checkbox: 0px;
```

---

### 2.8 Shadows

```css
/* Shadow/sm — cards, inputs, tabs */
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

/* Shadow/lg — dropdowns, popovers, toasts, modals */
box-shadow:
  0 4px 6px rgba(0, 0, 0, 0.07),
  0 2px 4px rgba(0, 0, 0, 0.06);

/* Shadow/focus — teal input focus glow (--shadow-focus), added June 2026 */
box-shadow: 0 0 0 3px rgba(0, 220, 141, 0.25);
```

---

### 2.9 Component Specifications

#### Buttons

| Style | Background | Text | Hover bg | Use |
|---|---|---|---|---|
| Default (Primary) | `--primary` (#001741) | `--primary-foreground` (#fff) | `--primary-800` (#000f33) | Primary CTA |
| Secondary | `--secondary` (#f5f5f5) | `--secondary-foreground` (#171717) | `--neutral-200` | Secondary actions |
| Destructive | `--destructive` (#ef4444) | `--destructive-foreground` (#fff) | `--red-700` | Delete, reject |
| Outline | transparent | `--foreground` | `--muted` | Tertiary actions |
| Ghost | transparent | `--foreground` | `--muted` | Nav, icon buttons |
| Link | transparent | `--primary` | transparent + underline | Inline links |
| Brand | `--brand` (#00dc8d) | `--brand-foreground` (#fff) | `--secondary-600` | Brand highlights |

Sizes: `sm` = 32px height, `md` = 36px height, `lg` = 40px height, `icon` = 36×36px
Label: **13px semibold** (compact — updated June 2026; was 14px Label/md)

#### Badges

- Border radius: `--component-radius-badge` (10px)
- Font: `Label/sm` (600, 12px)
- Padding: `4px --spacing-2` (4px 8px)

| Variant | Background | Text |
|---|---|---|
| Default (Primary) | `--primary` | `--primary-foreground` |
| Secondary | `--secondary` | `--secondary-foreground` |
| Destructive | `--destructive` | `--destructive-foreground` |
| Outline | transparent | `--foreground`, `--border` border |
| Brand | `--brand` | `--brand-foreground` |

**Hit Type Badges** (custom — build on top of Badge component):

| Hit Type | Background | Text | Border |
|---|---|---|---|
| PEP | `--warning-subtle` (#fffbeb) | `--warning` (#b45309) | `--warning-border` |
| Sanctions | `--destructive-subtle` (#fef2f2) | `--destructive` (#ef4444) | `--destructive-border` |
| Adverse Media | `#f5f3ff` (violet-50) | `#6d28d9` (violet-700) | `#c4b5fd` (violet-300) |
| SOE | `--info-subtle` (#eaeff2) | `--info` (#1b5172) | `--info-border` |
| Bribery / Fraud | `--muted` (#f5f5f5) | `--foreground` (#0a0a0a) | `--border` |
| Resolved | `--success-subtle` | `--success` | `--success-border` |
| Unresolved | `--warning-subtle` | `--warning` | `--warning-border` |

#### Inputs

- Height: 36px (md)
- Border: 1px solid `--input` (#e5e5e5)
- Border radius: `--component-radius-input` (8px)
- Background: `--background` (#ffffff)
- Text: `Body/md`, color `--foreground`
- Placeholder: `--muted-foreground` (#737373)
- Focus ring: 2px `--ring` (#001741)
- Error state: border `--destructive` (#ef4444)

#### Cards

- Background: `--card` (#ffffff)
- Border: 1px solid `--border` (#e5e5e5)
- Border radius: `--radius-xl` (16px)
- Padding: `--spacing-6` (24px)
- Shadow: `Shadow/sm`

#### Tables

- Header: 11px semibold uppercase (tracking-wider), color `--muted-foreground`, background `--info-subtle` (bluer tint — updated June 2026; was `--muted`)
- **Density (compact — standardised June 2026):** cells use `px-3/px-4 py-2`; body text **13px**; **key data cells semibold** (`--foreground`) — names, scope, primary values; secondary/meta cells (dates, IDs) `Mono/sm`–`Body/xs` `--muted-foreground`. No fixed row heights.
- Row hover: background `--muted` (#f5f5f5)
- Border: 1px solid `--border` on rows
- Selected row: background `--info-subtle` (#eaeff2)

#### Sidebar

- Background: `--sidebar` (#fafafa)
- Border-right: 1px solid `--sidebar-border` (#e5e5e5)
- Nav item (default): `Label/md`, color `--sidebar-foreground`
- Nav item (hover): background `--sidebar-accent`, color `--sidebar-accent-foreground`
- Nav item (active): background `--sidebar-primary` (#001741), color `--sidebar-primary-foreground` (#fff)
- Border radius on items: `--radius-md` (8px)

#### Alerts / Status Banners

- Border radius: `--radius-lg` (12px)
- Padding: `--spacing-4` (16px)
- Four variants: destructive, success, warning, info — using the `*-subtle` bg + `*` text + `*-border` border tokens

#### Toasts / Sonner

- Border radius: `--radius-lg` (12px)
- Shadow: `Shadow/lg`
- Background: `--popover` (#ffffff)
- Border: `--border` (#e5e5e5)
- Success icon color: `--success`

---

### 2.10 Hit Type Badge Color Convention (Summary)

Critical for consistency across all screening result views:

| Type | Bg token | Text token |
|---|---|---|
| PEP | `--warning-subtle` | `--warning` |
| Sanctions | `--destructive-subtle` | `--destructive` |
| Adverse Media | violet-50 (`#f5f3ff`) | violet-700 (`#6d28d9`) |
| SOE | `--info-subtle` | `--info` |
| Bribery / Fraud / Other | `--muted` | `--foreground` |
| True Match | `--success-subtle` | `--success` |
| False Match | `--muted` | `--muted-foreground` |
| Unresolved | `--warning-subtle` | `--warning` |
| Resolved | `--success-subtle` | `--success` |

---

## 3. Navigation Architecture

### 3.1 Customer Portal Menu

```
1.0  Dashboard
2.0  Name Screening
3.0  Bulk Screening         ← grouped with Ongoing Monitoring (per Vilas note)
4.0  Ongoing Monitoring     ← same group as Bulk Screening
5.0  Case Manager
6.0  User Profile Manager   ← includes screening/sanction settings
7.0  Reports
```

### 3.2 Admin Portal Menu

```
1.0  Dashboard              ← trackers for daily updates
2.0  Masters
     ├── Product Master
     ├── Country Master DB
     ├── Country Risk Rating
     └── Sanctions
3.0  Subscription Manager   ← customer-wise subscription details
4.0  Package Manager        ← create/group modules into packages with pricing
5.0  Admin Settings
6.0  Admin User Management
7.0  User Manager
8.0  Reports
```

### 3.3 Navigation Component Rules
- Left sidebar, collapsible
- Active state: filled primary color highlight on menu item (`bg-[#001f5c]`) with no left border; instead, a glowing teal orb (`w-2 h-2 bg-teal rounded-full shadow-[0_0_8px_#00dc8d]`) is positioned on the right side of the active tab.
- Sub-items: indented, smaller font, toggled by parent click.
- Brand Header: centered logo using `logo/hh-logo-white.svg` (`h-24`) with spacious padding (`py-8`) for optimal breathing room before the separator.
- Top header: user avatar + name (right), notification bell, environment badge.

---

## 4. Authentication

### 4.1 Login Screen

> **Updated June 2026 — built.** Replaces the earlier "dual customer/admin panes" concept with a single two-pane corporate login + MFA (per the antigravity reference). Customer vs Admin is resolved by the authenticated account/role, not by separate login panes.

**Layout:** Two-pane split. Left = navy brand panel (50%, `hidden xl:flex` — collapses below 1280px). Right = form card on a **light-gray (`--muted`)** page.

**Left — brand panel:** navy diagonal gradient (`primary-700 → 800 → 900`) + faint grid overlay (~6% opacity, radial-masked) + two small, sharp, glowing teal orbs (with white cores) traveling strictly along the 48px grid line paths; `hh-logo-white.svg`; "FCA · FinCEN · FATF Aligned" pill; headline "Intelligent Name & Entity Screening" + subtitle; 4 feature rows (teal icon tiles); stats strip (99.97% Uptime · <80ms Latency · 200M+ Entities); trust line.

**Right — form card** (white, `shadow-panel`, max-w 420px):
- **Step 1 — Credentials:** "Welcome back" heading + subtitle. Corporate Email (autofocus, **Mail** icon suffix) + Password (show/hide **Eye** toggle, "Forgot password?" link by the label). Corporate-domain validation. Primary CTA **"Continue to MFA →" = NAVY** (auth surface intentionally uses navy, not the global teal primary) with spinner. SSO divider + "Continue with SAML / SSO" outline button.
- **Step 2 — MFA/OTP:** replaces the credential form (fade+slide). Six numeric digit boxes — auto-advance, backspace-to-previous, teal tint on fill; **Verify & Access Portal** (navy, disabled until all 6 filled) + spinner; "Resend code"; Back link.
- Security note box (TLS 1.3 / MFA / audit logging) + footer line (Privacy Policy · Terms of Service).
- Mobile (< xl): brand header inside the card; right page shows navy gradient is NOT used — page stays light.

**Focus:** all inputs/OTP use the **teal focus glow** (`--ring` teal + `--shadow-focus`).

### 4.2 Auth Rules
- Session timeout after inactivity (configurable by admin)
- Role-based access within Customer Portal (e.g., Analyst vs. Approver vs. Admin)
- OTP via email or authenticator app (configurable)

---

## 5. Screen Specifications

---

### 5.1 CUSTOMER DASHBOARD

**Purpose:** Overview of screening activity for the logged-in company/client.

**Timeline Selector (top of page):**
- Buttons: `Today` | `This Week` | `This Month` | `This Year` | `Custom Range` | `Since Inception`
- Default: Current Year
- Only show service tabs (API / Web Portal / etc.) based on services the client has subscribed to
- Changing timeline updates ALL dashboard widgets

**Key Metrics Row (clickable stat cards):**
The five key metrics cards utilize relevant soft pastel background colors to highlight their status domains, featuring white circle icons with colored text and custom hover borders:
- **Total Profiles Screened** (Teal: background `bg-[#f0fdfd]`, hover border `hover:border-teal`) — links to Case Manager
- **Total Alert Disposed** (Green: background `bg-[#f2fdf6]`, hover border `hover:border-green-400`) — links to Case Manager
- **Unresolved Hits** (Red: background `bg-[#fff5f5]`, hover border `hover:border-red-400`) — links to Case Manager
- **True Matches** (Rose: background `bg-[#fff1f2]`, hover border `hover:border-rose-400`) — links to Case Manager
- **False Matches** (Slate: background `bg-[#f8fafc]`, hover border `hover:border-slate-400`) — links to Case Manager

> Clicking any stat card opens Case Manager with pre-applied filters matching that stat.

**Sub-sections:**

**a) True Hit Breakdown (by type)**
- Chart showing: PEP | Sanctions | Adverse Media | SOE | Bribery | Fraud | Other
- Clicking a hit type → Case Manager filtered to that hit type + selected timeline
- If a case has two hit types, it appears in both counts

**b) Database Updates Panel**
- Shows Xirni-managed databases (OFAC, EU, UN, UK, etc.) and last update timestamp
- Most recently updated database shown at top (descending by update date)
- Auto-updates when Xirni (Xini/backend team) refreshes the database
- Timeline filter does NOT apply here — always shows latest state

**c) Screening Charts**
- True Hit vs. False Hit trend (line or bar chart)
- Hovering on chart lines shows exact numbers
- Checkbox filters for database types — unchecking a DB removes it from the chart
- Clicking a bar/point → Case Manager filtered by that criteria + timeline

**d) Ongoing Monitoring Summary** *(only visible to clients with Ongoing Monitoring subscription)*
- Stats: Profiles in ongoing monitoring | Alerts Disposed | Unresolved from ongoing screening
- Clicking numbers → Case Manager filtered to ongoing monitoring cases

---

### 5.2 NAME SCREENING

**Purpose:** Single-entity screening against AML databases.

#### 5.2.1 Screening Settings Panel

**Mode Toggle:**
- `Single` | `Batch` (Batch redirects to Bulk Screening section)

**Entity Type Toggle (tab or segmented control):**
- `Individual` | `Organization` | `Vessel` | `Unspecified`

**Check Types (toggles — multi-select, per Excel brief):**
- `Sanction Lists` · `LexisNexis` · `Adverse Media`
- Rendered as toggle rows in the settings rail. Default on: Sanction Lists + LexisNexis.
- *(Note: an interim "single World-Check toggle" was tried June 2026 but reverted to the brief's three after confirming against the source Excel.)*

---

#### 5.2.2 Form: Individual Search

| Field | Type | Mandatory | Notes |
|---|---|---|---|
| First Name | Text | ✅ | Accepts 1–3 names. Reference: date of birth search |
| Middle Name | Text | ⬜ | |
| Last Name | Text | ⬜ | |
| Gender | Dropdown | ⬜ | Male / Female |
| Date of Birth | Text/Date | ⬜ | Year only / DD/MM/YYYY / Age |
| Country | Dropdown | ⬜ | Full country list |
| ID Number | Text | ⬜ | |
| ID Type | Dropdown | ⬜ | |
| Issuing Country | Dropdown | ⬜ | |
| Case ID | Text | ⬜ | |

**Ongoing Screening (checkbox toggle):**
- When enabled, reveals two radio options:
  - `Create New Batch` → shows text input for batch name + Save button
  - `Add to Existing Batch` → shows dropdown of existing individual batches only (not entity/vessel batches)

**Search to Specific Database (checkbox):**
- Default: All Database
- Options: All Database | PEP | Adverse News | Sanctions
- `New Format` option → allows user to select databases + name the template → saved as reusable template in dropdown

---

#### 5.2.3 Form: Organization Search

| Field | Type | Mandatory | Notes |
|---|---|---|---|
| Name | Text | ✅ | |
| Case ID | Text | ⬜ | |
| Registered Country | Dropdown | ⬜ | |
| Registration Number | Text | ⬜ | |
| Registration Date | Text/Date | ⬜ | DD/MM/YYYY or Year |

Ongoing Screening and Database Selection same as Individual (but Existing Batch shows only entity batches).

---

#### 5.2.4 Form: Vessel Search

| Field | Type | Mandatory | Notes |
|---|---|---|---|
| Name | Text | ✅ | |
| Case ID | Text | ⬜ | |
| IMO Number | Text | ⬜ | |

---

### 5.3 SEARCH RESULT — INDIVIDUAL PROFILE (Search Profile Page)

**Triggered by:** Completing a name screening search (results appear regardless of hit/no hit)

**Download:** Excel + PDF format buttons

**Profile Header Block:**

| Field | Value | Notes |
|---|---|---|
| User | `Vilas Limbu` | Logged-in user who ran the search |
| Searched Date & Time | `DD/MM/YYYY, HH:MM:SS AM/PM` | |
| Modified Date & Time | `DD/MM/YYYY, HH:MM:SS AM/PM` | Only shown if any modification was made |
| Searched Name | `Bakar Hasnain` | As entered |
| Searched Details | DOB, Country, etc. | All fields entered at search time |
| Screening Status | `Unresolved` / `Resolved` | Based on actions taken |
| Total Matches Found | `4` | |
| Threshold Rules | Numeric | |
| Search Profile ID | `HHFSLXXXXXXX` | Autogenerated — Company acronym + sequential number |
| Unresolved Cases | `3` | |
| True Match | `3` | |
| False Match | `1` | |

**Checkboxes (sync options):**
- `Action API` — If ticked, comments sync to linked compliance system (only for API subscribers)
- `Update Comments in Batch File` — If ticked, comments reflect in batch file

**User Actions Panel:**
- `Alert Disposal Action` — Dropdown: `True Match` / `False Match`
- `Comments` — Free text
- `Approved` button

**Match Results Table:**

| Select | Case ID | Name | Match % | Type | DOB | Country | Added Date | Modified Date |
|---|---|---|---|---|---|---|---|---|
| ☐ | 1 | Bakar K | 94% | PEP | | | | |
| ☐ | 2 | Baka Bakar | 90% | Sanctions | | | | |
| ☐ | 3 | Bakayat Has Nain | 90% | Bribery | | | | |
| ☐ | 4 | Bakayat Bakrovic | 90% | Fraud | | | | |

- Match % shown as colored bar (green → yellow → red based on strength)
- Type shown as colored badge

---

### 5.4 EACH MATCH DETAIL — INDIVIDUAL

**Triggered by:** Clicking on a specific hit in the Match Results table

**Inherits:** Same header block as Search Profile page

**Additional navigation:** `< PREVIOUS HIT` | `NEXT HIT >` buttons

**Hit Detail Block:**

| Field | Value |
|---|---|
| Name | Bakar K |
| Reason for Hit | Former PEP |
| Gender | Male |
| Country | China |
| Alias | Bakar Has |
| Family Members | Bakar K Xi (Son), Bakar K Ji (Daughter), Bakar K Tam (Wife) |
| Associates | Company: Bakar and Sons Limited; Individual: Bakar K Xi, Bakar K Ji, Bakar K Tam |
| Summary | Free text summary of hit |
| Source Link | URL |
| Image Link | URL / inline image |
| Additional Details | Passport Number, HKID, Foreign Characters, etc. |
| Entered Date | |
| Updated Date | |

**Alert Disposal** and **Approve** button same as Search Profile page.

---

### 5.5 SEARCH RESULT — ENTITY PROFILE

Same structure as Individual Profile with these differences:
- Match table columns: Name | Match % | Type Hit | **Registered Country** | Added Date | Modified Date (no DOB/Gender)
- Hit detail block shows: AKA, Associated Individuals, Associated Companies, Address, Registration Number

---

### 5.6 BULK SCREENING

Two sub-tabs: **Upload Batch File** | **Batch Details**

#### 5.6.1 Upload Tab

**File Upload Area** (drag-and-drop or browse):
- Accepts `.xlsx` format per the batch templates (see Section 5.6.3)

**New vs. Existing (radio/checkbox):**
- `New Upload` → text input for batch name → Save creates the batch
- `Add to Existing Batch` → dropdown of all existing batch names

**Screening Type** (dropdown): Individual | Entity | Vessel

**One-Time vs. Ongoing (checkbox, always visible):**
- `One Time` → screens immediately on upload
- `Ongoing` → reveals Frequency dropdown: Daily | Fortnightly | Monthly | Quarterly | Half Yearly

**Database Screen Against** (multi-select dropdown):
- Default | Sanctions | PEP | Adverse News | [User-created templates, e.g., "Template 1"]

**`Upload and Screen`** primary CTA button

---

#### 5.6.2 Batch Details Tab

Table columns:

| Batch Name | Created | Modified | Type | Last Screened | DB | Frequency | File | Edit | Run | Audit |
|---|---|---|---|---|---|---|---|---|---|---|

- **Edit File:** Opens modal to transfer cases between batches or remove names from batch
- **Run Batch:** Triggers immediate screening run
- **Audit Trail:** Shows history of changes — names added/removed, user who made changes, timestamps

Download button: Export batch details to Excel

---

#### 5.6.3 Batch Upload Templates

**Individual (mandatory fields in red, optional in green):**
`First Name` | Middle Name | Last Name | Gender (M/F) | DoB (DD/MM/YYYY) | Country | ID Number | ID Type | Issuing Country | Case ID

**Company:**
`Name` | Registered Country | Registered Number | Registration Date | Case ID

**Vessel:**
`Name` | IMO | Case ID

---

### 5.7 ONGOING MONITORING

> Per Vilas note: Group with Bulk Screening in nav (same section).

- Only accessible to clients with Ongoing Monitoring subscription
- Shows profiles currently in ongoing monitoring batches
- Alerts surface when a database update causes a new match on a monitored name
- Dashboard stats: Profiles Monitored | New Alerts | Alert Disposed | Unresolved

---

### 5.8 CASE MANAGER

**Purpose:** Central view of all screening activity, searchable and filterable.

#### 5.8.1 Filter Bar (all non-mandatory except Search Name)

| Filter | Type |
|---|---|
| Search Name | Text (mandatory) |
| Search Type | Dropdown: Individual / Entity / Vessel |
| Date From | Date picker |
| Date To | Date picker |
| Ongoing Screening | Dropdown: Yes / No |
| Country | Dropdown (all countries) |
| User | Dropdown (all users in company) |
| Batch File | Dropdown (all batch names) |

**Download:** Export results to Excel

#### 5.8.2 Results Table

| Searched Name | Search Profile ID | Search Type | Total Match Found | Unresolved Alerts | Alert Disposed | Ongoing Screening | Last Searched Date/Time | Last Searched User | Initial Searched Date/Time | Initial Searched User |
|---|---|---|---|---|---|---|---|---|---|---|

- Clicking a row opens the Search Profile page for that case
- Sortable columns
- Pagination

---

### 5.9 USER PROFILE MANAGER (Customer)

- Manage user accounts within the company
- Screening/sanction settings per user or globally
- Role assignment: Analyst | Approver | Admin
- User-level audit trail

---

### 5.10 REPORTS (Customer)

- Generate reports for a date range
- Export to Excel or PDF
- Report types: Screening Summary | True Match Report | False Match Report | Ongoing Monitoring Report | Audit Trail

---

## 6. Admin Portal Screen Specifications

---

### 6.1 ADMIN DASHBOARD

**Daily Data Download Tracker:**

| Source | Total Records | Deleted Count | Updated Count |
|---|---|---|---|
| OFAC | 124,563 | — | — |
| EU | 45,345 | 200 | 300 |
| UN | 345,645 | — | — |
| UK | 56,456 | — | — |

**Cases Screened & Resolved Tracker:**
- Total Cases: 505,645
- Resolved: 432
- Unresolved: 3,453

**Top 10 Names Screened by Customers** (leaderboard table)

**Top 5 Most Active Customers:**

| Customer Name | Daily Screened Count |
|---|---|

> Note: Subscription Overview (MRR, Active Subs, Pending Renewals) can also surface here as a widget.

---

### 6.2 MASTERS

#### 6.2.1 Product Master
CRUD interface for products/services offered

#### 6.2.2 Country Master DB
Full country list management with metadata

#### 6.2.3 Country Risk Rating
| Country | Rating |
|---|---|
| Afghanistan | High |
| Pakistan | Banned |
| Malaysia | Medium |

Editable. Used across screening to flag high-risk jurisdictions.

#### 6.2.4 Sanctions
Manage sanctions list sources, update schedules, enabled/disabled per client

---

### 6.3 SUBSCRIPTION MANAGER

**Dashboard Summary Block (also linkable from Admin Dashboard):**
- Active Subscriptions count
- Pending Renewals (expiring within 30 days)
- Revenue/Cost Summary (MRR)
- Alerts: failed payments, lapsed screenings

**Trial Subscription Creation Flow — 3-Step Wizard:**

**Step 1: Client Details**
- Client Name
- Jurisdiction (dropdown — pre-configures regulatory context: FCA, FINRA, MAS, etc.)
- Primary Contact Name + Email
- Admin Assignment

**Step 2: Define Trial Plan**
- Plan selection cards:
  - Basic PEP (e.g., 30 days)
  - Enterprise AML (e.g., 30 days)
  - Ultimate Compliance (e.g., 30 days)
- Auto-expiration logic built into each card
- Optional AML Module Toggles: Adverse Media | UBO Search | Real-time Monitoring
- Usage Meter: Set hard cap (e.g., 100,000 scans)

**Step 3: Activate**
- Right-hand sidebar "Receipt" panel showing:
  - Trial end date
  - Volume limits
  - Selected modules
- `Activate Trial Account` CTA

---

### 6.4 PACKAGE MANAGER

**UI 1: Plan & Package Builder**
- Card-based layout, one card per package tier (e.g., Basic, Professional, Enterprise)
- Each card shows: tier name, price, included features (checklist)
- `Build New Package` button
- Usage Summary table below cards: recent templates created, last edited

**UI 2: Client-Specific Configuration Drawer**
- `Generate Configuration` main action
- Pricing Structure: Per Scan | Tiered Volume
- Feature toggles: granular add/remove of APIs and screening types
- Screening frequency override
- Template Summary: which base template was used
- Client search field (link to existing client e.g. "Sterling Bank")
- Compliance Score Meter: visual gauge of coverage comprehensiveness
- Save / Apply buttons

---

### 6.5 ADMIN SETTINGS

- System-wide configuration
- OTP settings
- Session timeout
- Notification rules (renewal reminders, failed payment alerts)

---

### 6.6 ADMIN USER MANAGEMENT

- Manage Xirni internal admin users
- Role assignment, permission sets
- Audit trail of admin actions

---

### 6.7 USER MANAGER

- View and manage all end-users across all customer companies
- Search by name, email, company
- Impersonate / support mode

---

### 6.8 REPORTS (Admin)

- Aggregate screening reports across all customers
- Billing and usage reports
- Database update logs

---

## 7. Component Library Reference

These are the primary UI components used across the portal. All should be sourced from the HnH Design System Figma file.

### 7.1 Core Components

| Component | Usage |
|---|---|
| `<Button>` | Primary, Secondary, Danger, Ghost variants |
| `<Badge>` | Hit type labels (PEP, Sanctions, etc.), status labels |
| `<DataTable>` | All list/results views — sortable, paginated, selectable rows |
| `<FilterBar>` | Combination of dropdowns, text inputs, date pickers for search |
| `<StatCard>` | Dashboard metric tiles (clickable) |
| `<Modal>` | Confirmations, detail drawers, wizard steps |
| `<Tabs>` | Sub-navigation within pages (e.g., Upload / Batch Details) |
| `<ProgressStepper>` | Multi-step flows (Trial Creation, etc.) |
| `<MatchStrengthBar>` | Visual bar showing match % (green/yellow/red gradient) |
| `<Sidebar>` | Primary navigation — collapsible |
| `<Breadcrumb>` | Navigation context in nested pages |
| `<Toast/Notification>` | System feedback (success, error, warning) |
| `<EmptyState>` | No results / no data illustrations |
| `<Checkbox>` | Multi-select in tables and forms |
| `<Dropdown>` | All select fields — supports search/typeahead |
| `<DatePicker>` | Date range and single date selection |
| `<ToggleSwitch>` | Feature toggles (Ongoing Screening, Module enables) |
| `<Chart>` | Bar, Line, Donut charts for dashboard (use Recharts or similar) |

---

## 8. Interaction & Behaviour Patterns

### 8.1 Alert Disposal Workflow (core loop)
1. User runs a search → lands on Search Profile page
2. Reviews matches in the table
3. Clicks a match row → opens Each Match Detail
4. Reviews hit details
5. Sets `Alert Disposal Action` (True Match / False Match) + adds Comment
6. Clicks `Approve`
7. Count updates on Search Profile: Unresolved ↓, True/False Match ↑
8. If all hits resolved → Screening Status changes to `Resolved`

### 8.2 Sync Behaviours
- `Action API` checkbox: syncs disposal comments to linked compliance system
- `Update Comments in Batch File` checkbox: syncs to the batch the name belongs to

### 8.3 Dashboard Drilldown Pattern
- ALL clickable numbers on dashboards → navigate to Case Manager with pre-applied filters
- Filters passed as URL query params for deep-linking
- Case Manager always shows the filter applied as a visual indicator

### 8.4 Ongoing Screening Enrollment
- Can be set at time of individual search or batch upload
- Ongoing = name is re-screened at configured frequency
- New hits from ongoing screening surface as alerts in Dashboard and Case Manager

### 8.5 Database Template System
- Users create custom database selection templates in Name Screening
- Templates appear across: Name Screening > Specific Database dropdown, Batch Upload > Database Screen Against dropdown
- Templates are user-scoped (not shared unless admin enables)

---

## 9. Data & ID Conventions

| Entity | ID Format | Example |
|---|---|---|
| Search Profile ID | `[COMPANY_ACRONYM]XXXXXXX` | `HHFSLXXXXXXX` |
| Batch Name | User-defined text | `Key Personnel`, `Client NBFI Client` |
| World-Check ID | Numeric | `2492056` |

**Date/Time Format:** `DD/MM/YYYY, HH:MM:SS AM/PM` — used consistently throughout

**Match Strength:** Numeric percentage (0–100%), displayed as both number and colored bar

---

## 10. Reference Screenshots Summary

The five screenshots show the LSEG World-Check One interface as a UX reference. Key patterns to adopt:

1. **Image 1 (2:04 PM):** Main World-Check screen with case at top, 4 unresolved matches in a table. Match list shows: Name, Matched Alias, Match Strength (bar), Type (PEP/LE/RE/OB badges), Registered Country, Category, World-Check ID, Entered/Updated/Matched dates.

2. **Image 2 (2:07 PM):** Alert Disposal panel overlay — Resolution tab showing Status options (Positive/Possible/False/Unspecified), Risk Level (High/Medium/Low/Unknown), Reason dropdown ("No Match"), with a Resolve button.

3. **Image 3 (2:08 PM):** After resolving 1 match as False — Unresolved count drops from 4 to 3, False (1) now shows in left sidebar.

4. **Image 4 (2:10 PM):** Case filtered to show only False (1) — Sint Maarten Harbour Holding Company N.V. as the single result.

5. **Image 5 (2:10 PM):** Detailed match record for Sint Maarten Harbour Holding Company N.V. — Resolution remark: "No exact match found as per search - full name does not work". Shows Comparison Data section, Key Data tab (PEP badge, Organization Name, Update Categorization C4, SOE sub-category, Registered Country: Sint Maarten).

**Design takeaways from reference:**
- Dark theme shown in reference — X-Intelligence uses light theme but same information density
- Left sidebar has collapsible filter facets (Unresolved/Positive/Possible/False/Unspecified counts)
- Match strength shown as a horizontal coloured bar in the table
- Hit type shown as small coloured pill badges (PEP = red/orange, LE = green, RE = blue, OB = orange)
- Resolution is an inline panel/drawer, not a separate page

---

## 11. Tech Stack Guidance

This section is a recommendation — confirm with the dev team before finalising.

```
Frontend:     React + TypeScript
Styling:      Tailwind CSS + CSS custom properties (design tokens)
Component:    Shadcn/UI base + custom HnH overrides from Figma
Charts:       Recharts
Tables:       TanStack Table (React Table v8)
State:        Zustand or React Query (server state)
Forms:        React Hook Form + Zod
API:          REST or tRPC — TBD
Auth:         JWT + OTP (TOTP via authenticator or email)
Export:       SheetJS (Excel), react-pdf or pdfmake (PDF)
```

---

## 12. File & Folder Structure (Frontend)

```
src/
├── app/                    # Route-level pages
│   ├── (auth)/
│   │   ├── login/
│   │   └── admin-login/
│   ├── (customer)/
│   │   ├── dashboard/
│   │   ├── name-screening/
│   │   ├── bulk-screening/
│   │   ├── ongoing-monitoring/
│   │   ├── case-manager/
│   │   ├── user-profile/
│   │   └── reports/
│   └── (admin)/
│       ├── dashboard/
│       ├── masters/
│       ├── subscription-manager/
│       ├── package-manager/
│       ├── settings/
│       ├── admin-users/
│       ├── user-manager/
│       └── reports/
├── components/
│   ├── ui/                 # Base components from HnH design system
│   ├── screening/          # Screening-specific components
│   ├── case-manager/       # Case management components
│   ├── dashboard/          # Dashboard widgets
│   └── layout/             # Sidebar, header, breadcrumbs
├── lib/
│   ├── api/                # API client functions
│   ├── utils/              # Helpers, formatters
│   └── constants/          # Enums, static data
├── types/                  # TypeScript interfaces
└── styles/
    └── tokens.css          # Design tokens from Figma
```

---

## 13. Open Questions / Items to Clarify

These were surfaced in the Excel `Query` sheet and from reviewing the brief:

1. **Batch Name Input:** Should be a dropdown with typeahead (not free text that allows arbitrary values) — dropdown values come from existing created batches only.

2. **PEP Database Selection:** When "PEP" is selected as a database filter, should the user be able to select which specific PEP database to query against? Same question for Sanctions and Adverse Media. **→ Confirm with Vilas/Xirni.**

3. **Group Section in Name Screening:** Company name should auto-populate from the logged-in user's company profile. **→ Confirm field mapping.**

4. **Full Name as Single String:** If user enters a full name in the "First Name" field, does it count as a single search string or is it tokenized? **→ Confirm search engine behaviour.**

5. **Admin vs Customer Portal URL structure:** Single domain with path-based routing (`/admin/*` vs `/app/*`) or separate subdomains (`admin.x-intelligence.com` vs `app.x-intelligence.com`)? **→ Confirm with tech team.**

6. **World-Check Integration:** Are the screening results powered by LSEG World-Check API, or Xirni's own database? Screenshots suggest World-Check reference data — clarify the data source architecture.

7. **Compliance Score Meter** in Package Manager: Is this a calculated score based on modules selected, or a manual input? Define the scoring formula.

---

## 14. Phase Roadmap (Suggested)

| Phase | Scope |
|---|---|
| **Phase 1 — MVP** | Auth, Name Screening (Individual + Entity), Search Results, Case Manager, Customer Dashboard |
| **Phase 2** | Bulk Screening, Batch Details, Vessel Search, Reports |
| **Phase 3** | Ongoing Monitoring, Admin Portal (Dashboard, Masters, User Manager) |
| **Phase 4** | Subscription Manager, Package Manager, API portal, Advanced Analytics |

---

*Last updated: June 2026 | Prepared for Xirni X-Intelligence Portal Development*
