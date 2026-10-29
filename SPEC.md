# SPEC.md — RetailReturn Copilot (AWS CDS Hackathon)

## 1. Project Overview
- **Project Name**: RetailReturn Copilot
- **Tagline**: Autonomous Omnichannel Reverse Logistics Command Center powered by AWS CDS & Amazon Bedrock AgentCore
- **Hackathon Track**: AWS CDS Agentic AI Partner Hackathon
- **Target Audience / Judges**: Enterprise retail operations, logistics managers, AWS solution architects, and hackathon judges evaluating agentic AI autonomy, omnichannel fluidity, and customer experience.

## 2. Core Architecture & Differentiators
1. **Omnichannel Handoff without Context Loss**:
   - Customer starts on **WhatsApp** (submits return inquiry + photo).
   - Agent validates condition via **Amazon Bedrock Multimodal Vision** (Claude 3.5 Sonnet Vision).
   - Seamlessly promotes session to **RCS Business Messaging** for interactive rich cards (QR/Locker barcode, 1-tap locker reserved).
   - Automated zero-label shipping manifest delivered via **Amazon SES** and tracking notifications via **SMS (AWS End User Messaging - EUM)**.
2. **Bedrock AgentCore Autonomous Graph**:
   - Real-time deterministic execution graph with 5 key nodes:
     - Node 01: AWS CDS Inbound Webhook
     - Node 02: Bedrock Multimodal Vision Agent (Condition Grade A+)
     - Node 03: ERP ActionGroup Tool Execution (`InventoryERP.check_and_reserve()`)
     - Node 04: Dynamic CDS RCS Handoff (Locker PIN generation)
     - Node 05: SES Slip & UPS QR Generation
3. **Deep Trace & Webhook Analytics**:
   - OpenTelemetry EUM CDS v2.4 telemetry stream.
   - Live socket latency monitoring (jitter, vision eval, CDS API roundtrips).
   - Raw JSON Event payload inspector and HAR export.
4. **Judge Demo Mode (Instant Wow Factor)**:
   - Scenario 1: Wrong Shoe Size Exchange (WhatsApp ➔ RCS Rich Card)
   - Scenario 2: Damaged Jacket Claim (Visual AI Inspection & Defect Detection)
   - Scenario 3: 1-Click Autonomous Instant Demo (Animated full journey)
   - Live AI Inspector floating telemetry pill & drawer.

## 3. UI/UX Design System (Anti-Slop Standards)
- **Palette**: Obsidian Aurora (`#09090b` / `#131317` base, `#00f2fe` primary cyan, `#dbb8ff` secondary violet, `#30d158` success green).
- **Typography**: Plus Jakarta Sans (Headlines), Inter (Body), JetBrains Mono (Telemetry & Code).
- **Depth & Surface**: Multilayered rim lighting (`inset 0 1px 0 rgba(255,255,255,0.1)`), translucent glassmorphism with backdrop blur, subtle dot matrix background.
- **Componentry**:
  - Interactive iPhone 16 Pro mockup with live WhatsApp, RCS, and SMS switching.
  - Interactive ActionGroup flow nodes with status badges and raw payload viewer.
  - Bento metric telemetry grid with sparklines and cost-per-ticket comparison.
  - Vault Lego components: `live-ai-inspector`, `bento-metric-grid`, `voice-command-pill`, `glass-card`, `shimmer-button`.

## 4. Technology Stack
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS 3 + Custom Obsidian Theme Extensions
- **Icons**: Lucide React + Material Symbols Outlined
- **Motion**: Framer Motion
- **Verification**: Playwright CLI Visual QA Loop
