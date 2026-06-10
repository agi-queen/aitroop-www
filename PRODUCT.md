# Product

## Register

brand

## Users

AI-first operators, RevOps / GTM leads, solutions architects, and engineering-adjacent PMs who already prompt LLMs as part of their daily work. They arrive with a working chat or workflow in mind and want a way to make it survive past the conversation — runnable by their team, on a schedule, against real tools. Context: they are evaluating Aitroop against in-house glue code and against generic agent platforms, often after being burned by toy demos.

## Product Purpose

Aitroop turns a working agent conversation into a permissioned, schedulable App. Inputs become a typed form. Stages chain agents with their own skills, connects, models. Artifacts ship out, or feed the next stage. Success is when an operator clicks "Save as App" once and the work runs itself thereafter — on cron, on demand, on webhook — with real sandbox execution, not a chat replay.

## Brand Personality

Bold. Energetic. Futuristic. The site should feel like the operator's console, not the marketing page in front of it. Voice: direct, technical-confident, slightly punchy ("Ship your first App before lunch"). Never magical or whimsical. Never apologetic.

## Anti-references

- **Typical 2024 SaaS landing page**: purple-to-blue gradients, hero-metric scaffolding, eight identical icon+heading+text cards, tiny tracked uppercase eyebrow above every section, navy-and-mint palette. The "I've seen this page 200 times" feeling.
- **AI-era magical-glow**: aurora + sparkles + meteors + glassmorphism + conic gradient borders applied as decoration. The current implementation leans on this; it's the trap to escape, not lean further into.
- **Marketing-fluff page**: hollow taglines ("revolutionize your workflow"), fabricated-feeling testimonials with stock avatars, vague stats, no concrete artifact shown.
- **Extreme minimal text-only site**: black text on white with one button. Brand bold-energetic should not collapse into "elegant restraint" as the safe-cool default.

## Design Principles

1. **Show the artifact, not the promise.** Where a section claims "Save chats as Apps," the page should expose a real form, a real stage, a real schedule — not an icon next to the words.
2. **Energy comes from contrast and structure, not decoration.** Bold typography, committed color blocks, sharp grids — the felt energy. Aurora/sparkles/meteors are the lazy substitute and they read as the AI-era cliché.
3. **Operator voice, not marketer voice.** Copy and UI should sound like the people who will use the product write — concrete, technical, no superlatives.
4. **Loud where it earns it, quiet everywhere else.** One drenched hero, one CTA. Section bodies stay disciplined: real content, restrained color, deliberate spacing.
5. **Anti-template by structure, not by labels.** Don't ship the SaaS layout with a different color slapped on. Re-pick the sectioning, the rhythm, the affordances when they default to template grammar.

## Accessibility & Inclusion

- Target WCAG 2.1 AA. Body text ≥ 4.5:1 against background; large/heading text ≥ 3:1.
- Every animation must honor `prefers-reduced-motion`. The current hero, marquee, counters, aurora, sparkles, and meteors must all have a clean static fallback.
- Color is never the sole carrier of meaning (status, emphasis, link state must also carry weight, underline, or icon).
- Keyboard navigation works on every interactive surface: hero pill, skill chips, case cards, FAQ, CTA. Focus rings are visible against both light and tinted-bg sections.
- Internationalization: site already supports zh-CN / zh-TW; layouts must tolerate longer / shorter strings without overflow.
