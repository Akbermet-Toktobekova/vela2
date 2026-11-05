---
name: vela-ask-user
description: >-
  Use this skill whenever a requirement, threshold, or rule is ambiguous or missing from
  docs/SPEC.md, docs/coordination/DECISIONS.md, or FinAgent_Normalized_Database.json.
---

# Vela Ask User Protocol

## Steps

1. Never guess or silently invent financial rules, action parameters, or policy thresholds.
2. Log the exact question in `docs/coordination/QUESTIONS.md` with:
   - **Context**: module, step (1–7), and formula/rule/action ID (`Fxxx`, `Rxxx`, `Axxx`).
   - **Why it matters**: what calculation or safety gate is affected.
   - **Minimal justified options**: 2–3 concrete options with trade-offs.
3. Mark the dependent code path with `PENDING_USER_DECISION` or return a structured `NEEDS_DATA` / configuration error until the user's answer is recorded verbatim in `docs/coordination/DECISIONS.md`.
