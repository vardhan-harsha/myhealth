# Helix

**Helix** (also referred to as **FitnessOS** in product docs) is an AI-powered wellbeing companion. It shifts away from passive health logs toward an **agentic** system that guides, motivates, and adapts to real life—turning static plans into a dynamic engine for long-term fitness and a **“90-year lifestyle.”** The north star is **Superagency**: moving users from passive followers to active architects of their own physiology.

For the full product definition, goals, and constraints, see **[docs/prd.md](docs/prd.md)**.

---

## Philosophy: the double helix

Helix is built on **controlling the controllables**—health as the result of manageable inputs (nutrition, training, sleep) and clear outcomes.

| Strategic strand | Operational focus | Primary mechanism | Desired outcome |
| :--- | :--- | :--- | :--- |
| **Internal system control** | Mastering daily inputs | Calories, protein, training, sleep | A programmable physique |
| **External health value** | Achieving desired outcomes | AI-powered progress tracking and trend analysis | Permanent, sustainable fitness |

---

## Product principles

- **Proactive, agentic assistance** — Identifies needs and offers timely support without requiring explicit commands.
- **Deep personalization** — Adapts to roles, goals, skill gaps, and behavior.
- **Ethical AI and user trust** — Privacy-by-design and explainable decisions.
- **Community-centric** — Social connection and shared experiences to reduce isolation.

---

## Feature modules

Detailed specs live under **[docs/features/](docs/features/)**:

1. [AI-driven onboarding](docs/features/onboarding.md) — Intelligent target setting and time-to-value.
2. [Proactive wellbeing engine](docs/features/proactive_engine.md) — Monitors inputs and delivers nudges.
3. [User dashboard and analytics](docs/features/dashboard.md) — Unified command center with visual intelligence and conversational discovery.
4. [Community and social wellbeing](docs/features/community.md) — Peer matching, mastermind-style groups, and recognition.
5. [AI advisory suite](docs/features/advisory_suite.md) — Coaching personas (e.g. “The Scientist,” “The Motivator”).
6. [Integrations and interoperability](docs/features/integrations.md) — Connected ecosystem, including MCP-based integration patterns.
7. [Monetization and plans](docs/features/monetization.md) — Freemium and tiered subscriptions.

---

## Non-functional requirements (summary)

Per the PRD, the product targets:

- **Security and identity** — Zero-trust mindset, centralized IAM with least privilege, SSO and phishing-resistant MFA as standards.
- **Privacy** — Minimal necessary data, encryption at rest and in transit, and a policy that customer data is not used to train models for unrelated external purposes.
- **Performance** — AI inference latency under **200 ms** at the 99th percentile (target), with scalable cloud architecture for AI workloads.

---

## Repository layout

This repo is a **pnpm** + **Turborepo** monorepo:

- **`apps/web`** — Next.js web app (`@helix/web`).
- **`apps/mobile`** — Expo mobile app (`@helix/mobile`).
- **`packages/*`** — Shared libraries (API, auth, database, UI, etc.).

---

## Local development

Prerequisites: **Node.js**, **pnpm** (see root `packageManager` in [package.json](package.json) for the pinned version).

```bash
# Install dependencies from the repository root
pnpm install

# Run all packages in dev mode (web + mobile + shared tooling as configured)
pnpm dev

# Web only
pnpm dev:web

# Mobile only (Expo)
pnpm dev:mobile
```

Database scripts (`db:generate`, `db:migrate`, `db:push`, `db:studio`) are wired through Turborepo; use the root scripts or the corresponding scripts inside `apps/web` / packages as documented in each app’s README if present.

---

## Documentation

| Document | Purpose |
| :--- | :--- |
| [docs/prd.md](docs/prd.md) | Product requirements: vision, principles, modules, NFRs |
| [docs/features/](docs/features/) | Per-module feature specifications |

---

## Conclusion (from the PRD)

Helix aims to go beyond simple automation: a proactive health system that increases user agency and treats the body as something you **command**, not only inhabit.
