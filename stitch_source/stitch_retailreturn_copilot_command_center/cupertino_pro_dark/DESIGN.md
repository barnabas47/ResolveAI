---
name: Cupertino Pro Dark
colors:
  surface: '#121317'
  surface-dim: '#121317'
  surface-bright: '#38393d'
  surface-container-lowest: '#0d0e12'
  surface-container-low: '#1a1b1f'
  surface-container: '#1e1f23'
  surface-container-high: '#292a2e'
  surface-container-highest: '#343539'
  on-surface: '#e3e2e7'
  on-surface-variant: '#c1c6d7'
  inverse-surface: '#e3e2e7'
  inverse-on-surface: '#2f3034'
  outline: '#8b90a0'
  outline-variant: '#414755'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e69'
  primary-container: '#4b8eff'
  on-primary-container: '#00285c'
  inverse-primary: '#005bc1'
  secondary: '#c2c1ff'
  on-secondary: '#1c0b9f'
  secondary-container: '#3834b6'
  on-secondary-container: '#b2b1ff'
  tertiary: '#53e16f'
  on-tertiary: '#003911'
  tertiary-container: '#00a741'
  on-tertiary-container: '#00320e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004493'
  secondary-fixed: '#e2dfff'
  secondary-fixed-dim: '#c2c1ff'
  on-secondary-fixed: '#0c006a'
  on-secondary-fixed-variant: '#3631b4'
  tertiary-fixed: '#72fe88'
  tertiary-fixed-dim: '#53e16f'
  on-tertiary-fixed: '#002107'
  on-tertiary-fixed-variant: '#00531c'
  background: '#121317'
  on-background: '#e3e2e7'
  surface-variant: '#343539'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.022em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.019em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 26px
    letterSpacing: -0.012em
  title-sm:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: -0.008em
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: -0.002em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.01em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: -0.01em
  code-xs:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '400'
    lineHeight: 14px
    letterSpacing: 0em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.5rem
  gutter-lg: 1.5rem
  margin: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system channels the refined, high-precision aesthetic of Apple's professional creative suites (macOS Sonoma, iPadOS, Final Cut Pro, and Xcode). Built for demanding, data-dense workflows, it prioritizes optical clarity, functional restraint, and spatial balance over superficial decoration.

The experience is defined by:
- **Material Authenticity:** Surface depth is generated using calibrated translucency, background saturation blurs, and whisper-thin specular perimeter highlights rather than heavy artificial drop shadows.
- **Utilitarian Elegance:** Information is foregrounded. Controls exist to serve workflow focus, remaining visually quiet until engaged.
- **Restraint Over Spectacle:** Explicitly devoid of neon drop shadows, aggressive glow gradients, or exaggerated cyberpunk tropes. Visual accents mirror native Apple System tints used strictly for state verification, focal anchors, and precision data mapping.

## Colors

The palette leverages pure obsidian and graded neutral darks to create optical hierarchy across multi-window and paned surfaces, accented by pure iOS system tints.

### Surface System
- **Canvas Base:** `#000000` — Pure absolute black for high-contrast presentation views and hardware frames.
- **Base Surface:** `#0D0D0F` — Root desktop background and primary pane anchor.
- **Secondary Surface:** `#16161A` — Sidebars, contextual panels, segmented track wells, and dynamic drawers.
- **Elevated Material:** `#1C1C21` — Floating cards, popovers, context menus, and active tool palettes.
- **Translucent Fill (Material Overlay):** `rgba(255, 255, 255, 0.04)` to `rgba(255, 255, 255, 0.08)` for unselected states, inset wells, and frosted chrome.

### Accent & Functional Tints
- **System Blue (Primary):** `#007AFF` — Primary actions, active segmented controls, keyboard focus rings.
- **System Indigo (Secondary):** `#5856D6` — Deep computational tags, secondary toolbars, indexing.
- **System Mint (Tertiary / Success):** `#34C759` — Operational metrics, positive trends, verified indicators.
- **System Destructive:** `#FF453A` — Critical state alerts, deletions, error indicators.

### Typography & Border Colors
- **Text Primary:** `#FFFFFF` — 100% white for headline values, primary inputs, and titles.
- **Text Secondary:** `#E5E5EA` — High-readability secondary labels, standard body copy.
- **Text Tertiary / Muted:** `#86868B` — Sub-labels, keyboard shortcut glyphs, disabled placeholders.
- **Specular Border Highlight:** `rgba(255, 255, 255, 0.08)` — Standard hairline card and panel boundary.
- **Subtle Inset Stroke:** `rgba(255, 255, 255, 0.04)` — Divider rules and structural column delimiters.

## Typography

Typography operates with the micro-tuned optical metrics characteristic of San Francisco and Inter. Tracking tightens slightly as sizing increases to eliminate typographic friction in pro-grade viewports.

- **Primary Interface Font:** `Inter` handles all display headings, body narratives, control labels, and modal titles. Weight usage is strictly limited to 400 (Regular), 500 (Medium), and 600 (Semibold) to avoid clunky boldness.
- **Telemetry & Monospaced Font:** `JetBrains Mono` handles timestamp trackers, hash digests, coordinate panels, and code execution blocks. It integrates seamlessly alongside Inter without disproportionate vertical height shifts.
- **Optical Text Rules:** Never apply artificial text shadows or glow treatments to typography. High contrast against dark surfaces is achieved exclusively through font weight and calibrated tint tiers (`#FFFFFF`, `#E5E5EA`, `#86868B`).

## Layout & Spacing

Layout adheres to an 8-point base spatial model with a fine-grained 4-point micro-scale for compact enterprise tool palettes and inspector panes.

### Window & Grid Paradigm
- **Desktop (macOS Layout):** Fixed-to-collapsible primary sidebar (240px–280px), multi-stage work canvas (fluid), and dynamic inspector drawer (280px–320px). Internal work areas employ a 12-column layout with 16px (`gutter`) gutters and 32px (`margin-desktop`) padding.
- **Tablet / Split View (iPadOS):** Stage Manager grid or responsive 2-column split with 16px margins, adapting dynamically when floating split controllers enter view.
- **Mobile (iOS Standalone & Frame Preview):** 16px (`margin-mobile`) horizontal canvas margin with edge-to-edge grouped inset list patterns.

## Elevation & Depth

Visual hierarchy does not use diffuse, murky drop shadows. Elevation is achieved through physical material transitions and surface luminosity steps:

1. **Specular Highlights:** Elements at elevation 1 or above feature a crisp 1px exterior perimeter stroke (`rgba(255, 255, 255, 0.08)`). On top edges, an internal specular line (`rgba(255, 255, 255, 0.05)`) catches subtle simulated overhead downlight.
2. **Backdrop Vibrancy:** Floating bars, inspectors, dynamic navigation docks, and context sheets utilize backdrop filter blurs (`backdrop-filter: blur(20px) saturate(180%)`) over an alpha-tinted fill (`rgba(22, 22, 26, 0.72)`).
3. **Surface Stacking Scale:**
   - **Level 0 (Canvas):** `#000000` (Pure substrate).
   - **Level 1 (Recessed/Track):** `#0D0D0F` (Base windows, timeline troughs).
   - **Level 2 (In-Window Panels):** `#16161A` with `1px solid rgba(255, 255, 255, 0.06)`.
   - **Level 3 (Floating Windows, Modals & Sheets):** `#1C1C21` with `1px solid rgba(255, 255, 255, 0.12)` accompanied by an ambient containment shadow (`box-shadow: 0 12px 32px rgba(0, 0, 0, 0.65), 0 2px 6px rgba(0, 0, 0, 0.4)`).

## Shapes

The geometry uses Apple-style continuous corners (squircle curvature) with standardized corner radii across structural sizes:

- **Precision Controls & Inputs:** 8px (`0.5rem`) radius for text inputs, menu items, segmented tabs, and compact tool toggles.
- **Cards, Panels & Windows:** 16px (`1rem`) radius for grouped containers, floating cards, inspector tool groups, and sheets.
- **Major Device Frames & Modal Dialogs:** 24px (`1.5rem`) to 32px (`2rem`) radius for modal presentation sheets, desktop app outer boundaries, and mobile device enclosures.
- **Pills:** Full circular radius (`9999px`) used strictly for state badges, filter capsules, and message bubble tails.

## Components

### Buttons
- **Primary:** Filled `#007AFF`, text `#FFFFFF`, 8px corner radius. Hover shifts to `#0A84FF`. Pressed state scales down to `0.98` with opacity `0.85`.
- **Secondary / Pro Neutral:** Fill `rgba(255, 255, 255, 0.08)`, border `1px solid rgba(255, 255, 255, 0.06)`, text `#E5E5EA`. Hover: `rgba(255, 255, 255, 0.12)`.
- **Ghost:** Fill `transparent`, text `#86868B`. Hover: text `#FFFFFF`, fill `rgba(255, 255, 255, 0.04)`.

### Segmented Controls (macOS / iPadOS Pro Style)
- Trough background `#0D0D0F`, inset padding 2px, radius 8px, border `1px solid rgba(255, 255, 255, 0.06)`.
- Active segment: `#1C1C21` fill, border `1px solid rgba(255, 255, 255, 0.1)`, box-shadow `0 2px 4px rgba(0, 0, 0, 0.35)`, text `#FFFFFF`.
- Inactive segments: text `#86868B`, hover text `#E5E5EA`.

### Form Controls & Inputs
- Height 32px (Compact Pro) or 40px (Standard).
- Background `#16161A`, border `1px solid rgba(255, 255, 255, 0.08)`, corner radius 8px.
- Focus state: Border transitions to `#007AFF` with a clean `0 0 0 3px rgba(0, 122, 255, 0.25)` ring. No ambient neon haze.
- Checkboxes & Switches: Switches feature `#34C759` when on, with an authentic off-state fill of `rgba(255, 255, 255, 0.15)`.

### Lists & Inset Grouped Panels
- Grouped insets feature 16px radius, background `#16161A`, and specular hairline outline.
- Separators: `1px solid rgba(255, 255, 255, 0.05)`, indented 16px to align with item labels.
- Interactive list rows display an active highlight of `rgba(0, 122, 255, 0.12)` with left indicator notch.

### Cards & Telemetry Blocks
- Surface background `#16161A` or frosted glass (`rgba(22, 22, 26, 0.8)`).
- Specular boundary `1px solid rgba(255, 255, 255, 0.08)`.
- Telemetry modules embed `JetBrains Mono` for latency, FPS, memory allocation, and status readouts with text `#86868B` and values in `#E5E5EA` or `#34C759`.

### Native Frame & Messaging Primitives (Preview Enclosure)
- **Device Frame:** `#000000` housing with rounded corner radius (44px), bezel boundary `1px solid rgba(255, 255, 255, 0.15)`.
- **Dynamic Island:** Centered pill shape (`#000000`), height 32px, corner radius 20px, featuring subtle camera lens reflection detail.
- **iMessage / RCS Bubbles:**
  - Sent: `#007AFF` (or `#34C759` for SMS/RCS mode), text `#FFFFFF`, corner radius 18px with trailing corner taper.
  - Received: `#26262B` background, text `#E5E5EA`, border `1px solid rgba(255, 255, 255, 0.05)`.