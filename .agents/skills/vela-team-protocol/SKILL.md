---
name: vela-team-protocol
description: >-
  Use this skill at the start of any FinAgent (Vela) task to coordinate work via
  docs/coordination/BOARD.md, enforce strict file ownership, and follow contract-first integration.
---

# Vela Team Protocol

## Steps

1. Read `AGENTS.md`, `docs/SPEC.md`, `docs/coordination/DECISIONS.md`, and your assigned row in `docs/coordination/BOARD.md`.
2. Edit **only** the files listed in your task row in `BOARD.md`. Shared contracts in `shared/contracts/` are owned by the coordinator.
3. Validate all inputs and outputs with Zod schemas from `shared/contracts/`.
4. Do not cross-review or rewrite another subagent's module while tasks run in parallel; the coordinator runs full integration review and E2E verification after merge.
5. Update your task status in `BOARD.md` (`TODO -> IN_PROGRESS -> DONE` or `BLOCKED`) and write a handoff report using `vela-handoff`.
