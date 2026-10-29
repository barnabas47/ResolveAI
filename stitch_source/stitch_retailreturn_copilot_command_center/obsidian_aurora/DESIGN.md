---
name: Obsidian Aurora
colors:
  surface: '#131317'
  surface-dim: '#131317'
  surface-bright: '#39393d'
  surface-container-lowest: '#0e0e12'
  surface-container-low: '#1b1b1f'
  surface-container: '#1f1f23'
  surface-container-high: '#2a292e'
  surface-container-highest: '#353439'
  on-surface: '#e5e1e7'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e5e1e7'
  inverse-on-surface: '#303034'
  outline: '#849495'
  outline-variant: '#3a494b'
  surface-tint: '#00dce6'
  primary: '#e0fdff'
  on-primary: '#00373a'
  primary-container: '#00f2fe'
  on-primary-container: '#006a70'
  inverse-primary: '#00696f'
  secondary: '#dbb8ff'
  on-secondary: '#470083'
  secondary-container: '#6807ba'
  on-secondary-container: '#d0a6ff'
  tertiary: '#fff6f0'
  on-tertiary: '#4a2800'
  tertiary-container: '#ffd3aa'
  on-tertiary-container: '#8c5200'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ff6ff'
  primary-fixed-dim: '#00dce6'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f53'
  secondary-fixed: '#efdbff'
  secondary-fixed-dim: '#dbb8ff'
  on-secondary-fixed: '#2b0052'
  on-secondary-fixed-variant: '#6600b7'
  tertiary-fixed: '#ffdcbd'
  tertiary-fixed-dim: '#ffb86f'
  on-tertiary-fixed: '#2c1600'
  on-tertiary-fixed-variant: '#693c00'
  background: '#131317'
  on-background: '#e5e1e7'
  surface-variant: '#353439'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.03em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.025em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.015em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: -0.01em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
  label-mono-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.02em
  label-mono-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: -0.01em
  label-mono-xs:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '400'
    lineHeight: 12px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system targets enterprise retail technologists, cloud architects, and operations leads orchestrating autonomous reverse logistics. It marries rigorous AWS-grade telemetry with high-end generative AI product intelligence. The aesthetic rejects typical utilitarian enterprise density in favor of an **ultra-minimalist, hyper-tactile glassmorphism** set against an obsidian deep void.

The interface evokes silent computing power, uncompromising precision, and ambient technological awareness. Surfaces do not shout; they emit controlled, atmospheric radial auras through structural glass layers. Fine micro-details—such as sub-pixel translucent borders, monospaced computational telemetry, and dot-matrix visual anchors—create an institutional, secure, yet undeniably bleeding-edge aesthetic.

## Colors

The palette is engineered specifically for deep-void OLED panels and high-refresh ambient workflows:

- **Deep Void Background (`#050508`)**: The ultimate non-reflective canvas. Absorbs visual clutter and provides infinite depth contrast.
- **Glass Elevated Surfaces**:
  - `Surface Level 1` (`#0c0d14` at 70% opacity): Foundational paneling, secondary sidebars, and structural drawers.
  - `Surface Level 2` (`#121420` at 60% opacity): Interactive bento cards, floating inspect modals, and preview phone envelopes.
  - `Surface Level 3` (`#191b2c` at 50% opacity): Hover highlights, active control chips, and elevated contextual menus.
- **Ambient Aurora Accents**:
  - **Electric Cyan (`#00f2fe`)**: The primary vector. Represents active inference streams, real-time agent status, validated paths, and focus rings.
  - **Vivid Violet (`#7928ca`)**: Secondary agent orchestrator state, Bedrock foundation model nodes, and neural decision paths.
  - **AWS Gold/Orange (`#ff9900`)**: Architectural hooks, AWS CDS integration points, event bridge bridges, and operational caution states.
  - **Subtle Neon Magenta (`#f72585`)**: Escalations, autonomous exception alerts, anomalies, and edge-case interventions.
- **Borders & Overlays**: Ultra-fine white translucent delineations (`rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.14)`), shifting to focused cyan glow boundaries (`rgba(0, 242, 254, 0.45)`) upon active state.

## Typography

The typographic hierarchy establishes clear structural tension between human-facing summaries and machine-level telemetry:

1. **Headlines (Plus Jakarta Sans)**: Rendered with a tight tracking signature (`-0.03em`) and precise geometric curves. Delivers immediate authority without corporate stiffness.
2. **Body & Interface (Inter)**: Handles complex narrative breakdowns, agent explanations, customer returns reasoning, and transactional logs with maximum neutral readability.
3. **Telemetry & Meta Labels (JetBrains Mono)**: Applied universally to AWS CDS webhook endpoints, Bedrock inference latencies (e.g., `42ms`), token counter traces (`418 prompt / 92 completion`), and status badges.

## Layout & Spacing

The layout operates on a modular 12-column fluid grid tailored for data-dense dashboards with embedded device simulator viewports. 

- **Desktop (1280px+)**: 12-column grid with `1.25rem` (20px) gutters and `2rem` (32px) margins. Enables asymmetric bento arrangements—for instance, 8 columns dedicated to real-time agent workflow telemetry and 4 columns allocated to an interactive live smartphone preview viewport.
- **Tablet (768px – 1279px)**: 8-column layout. Spatially consolidates phone preview chrome into a collapsible slide-over inspector, prioritizing operational tables and metrics.
- **Mobile (< 768px)**: 4-column layout with `0.75rem` (12px) gutters and `1rem` (16px) canvas safe margins. Stacks bento modules vertically.

An underlying **fine dot matrix pattern** (`radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 0)`) with a 24px grid pitch sits between canvas and surfaces, grounding floating glass modules in visible spatial logic.

## Elevation & Depth

Depth is defined purely through **refractive glass, backdrop filtration, and subtle directional aurora glows** rather than traditional drop shadows:

- **Level 0 (Canvas Base)**: Deep void `#050508` layered with atmospheric ambient lights—soft, oversized radial glows (`radial-gradient(circle at 80% 10%, rgba(121, 40, 202, 0.12) 0%, transparent 60%)` and `radial-gradient(circle at 20% 90%, rgba(0, 242, 254, 0.08) 0%, transparent 50%)`).
- **Level 1 (Structural Bento Panels)**: `background: rgba(12, 13, 20, 0.65)`, `backdrop-filter: blur(24px) saturate(180%)`, framed with a continuous 1px boundary of `rgba(255, 255, 255, 0.07)`.
- **Level 2 (Hover / Elevated Cards / Phone Chassis)**: `background: rgba(18, 20, 32, 0.75)`, `backdrop-filter: blur(32px)`, bordered by `rgba(255, 255, 255, 0.12)`. Subtle inward top-edge light leak: `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.15)`.
- **Level 3 (Focused State / Active Inference)**: Borders transition from neutral to electric cyan: `1px solid rgba(0, 242, 254, 0.5)`. Underpinned by a soft peripheral glow: `box-shadow: 0 0 24px -4px rgba(0, 242, 254, 0.25)`.

## Shapes

The design system adopts **Level 2 (Rounded)** curvature to soften technical rigor while maintaining high structural precision:

- Small elements (pills, inline status tags, mono tags): `0.375rem` (6px) or fully rounded pill configurations for telemetry badges.
- Interactive controls (inputs, secondary buttons, dropdown selectors): `0.5rem` (8px).
- Structural containers (bento grid cards, charts, drawer containers): `1rem` (16px).
- Embedded Device Simulators (iOS/Android preview chassis): Outer bezel styled at `2.5rem` (40px) to mimic physical hardware specifications.

## Components

### Buttons
- **Primary Action (Aurora Surge)**: Obsidian background layered with a tight inner gradient, bounded by `1px solid rgba(0, 242, 254, 0.6)`. Text is pure white. On hover, triggers a concentrated ambient aura: `box-shadow: 0 0 20px rgba(0, 242, 254, 0.35)`.
- **Secondary Ghost**: `background: rgba(255, 255, 255, 0.03)`, `border: 1px solid rgba(255, 255, 255, 0.08)`. On hover: `background: rgba(255, 255, 255, 0.07)`, `border-color: rgba(255, 255, 255, 0.16)`.
- **Bedrock AI Trigger**: Deep violet gradient base with electric cyan active indicator dot, featuring a subtle sweeping shimmer animation during generation cycles.

### Chips & Telemetry Tags
- Compact, monospaced items utilizing `JetBrains Mono`.
- Built with pill geometry, a dark glass core (`rgba(0, 0, 0, 0.4)`), and sub-pixel status borders.
- Equipped with a 6px pulsating circular indicator for live streams:
  - *Bedrock Autonomous Loop*: Electric Cyan glow (`#00f2fe`)
  - *AWS CDS Webhook Stream*: AWS Warm Gold (`#ff9900`)
  - *Fraud / Anomaly Flag*: Neon Magenta (`#f72585`)

### Bento Metrics Cards
- Encased in `backdrop-blur-2xl` glass.
- Include micro-header bars housing a label, source node icon, and monospaced latency metric.
- Dynamic bottom edges reveal a 1px colored accent line corresponding to the active status category when selected or active.

### Input Fields
- Understated obsidian troughs (`background: rgba(5, 5, 8, 0.8)`), framed with `1px solid rgba(255, 255, 255, 0.1)`.
- On focus, transitions cleanly to `border-color: #00f2fe`, with an inner glow of `box-shadow: inset 0 0 12px rgba(0, 242, 254, 0.1)`. Placeholder text rests at `rgba(255, 255, 255, 0.3)`.

### Lists & Activity Feeds
- Borderless rows separated by `1px solid rgba(255, 255, 255, 0.04)`.
- Hover reveals a gentle gradient highlight across the full row with smooth deceleration.
- Left-aligned mono timestamps coupled with color-coded classification tags for instant visual triage.

### Phone Preview Chrome (Omnichannel Simulation)
- Ultra-thin simulated smartphone bezel (`border: 2px solid rgba(255, 255, 255, 0.12)`).
- Features an authentic top camera island / dynamic cutout and a glossy reflection gradient across the upper-right corner.
- Houses the rendered conversational AI interface representing WhatsApp, Apple Messages, or custom mobile SDK customer-return flows.