---
name: vela-handoff
description: >-
  Use this skill when completing any task on BOARD.md to record verified deliverables,
  exact test commands, and real test output in docs/coordination/handoffs/.
---

# Vela Task Handoff

## Checklist Before Marking DONE

1. Run `npx tsc --noEmit` and `npx vitest run` for your module's test suite.
2. Verify all 8 self-check rules from `vela-no-invention` (no hardcoded prototype parameters, no modified canonical AS statuses, single formula ownership).
3. Write `docs/coordination/handoffs/<TASK-ID>.md` containing:
   - **Modified/Created Files**
   - **Implemented Requirements & Decisions Used (`D-xxx`)**
   - **Exact Verification Commands & Real Output**
   - **Discovered Formula/Rule Limitations or Edge Cases**
