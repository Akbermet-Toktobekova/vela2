# Primary contradiction check — live results

This capture ran gemini-3.5-flash-lite with primary.v8 and semantic-checker.v5 against the frozen Debt, Strong and Nora inputs. It replayed the recommendation decision with frozen analysis and complexity inputs. It did not update Today in the authenticated beta database.

[Full beta rerun before the ISO-date guard](../runs/2026-11-08T20-06-05-430Z/RECAP.md) · [System prompt audit](PROMPT-CONTRACT-AUDIT.md) · [Handoff](../../../coordination/handoffs/PRIMARY-CONTRADICTION.md)

## Debt

[Generator](../runs/2026-11-08T20-10-00-710Z/debt/gemini-3.5-flash-lite-suggestion-generator.md) · [JSON](../runs/2026-11-08T20-10-00-710Z/debt/gemini-3.5-flash-lite-suggestion-generator.json) · [Checker](../runs/2026-11-08T20-10-00-710Z/debt/gemini-3.5-flash-lite-checker.md) · [JSON](../runs/2026-11-08T20-10-00-710Z/debt/gemini-3.5-flash-lite-checker.json) · [Catalog](../runs/2026-11-08T20-10-00-710Z/debt/gemini-3.5-flash-lite-catalog-selector.md) · [JSON](../runs/2026-11-08T20-10-00-710Z/debt/gemini-3.5-flash-lite-catalog-selector.json) · [Decision](../runs/2026-11-08T20-10-00-710Z/debt/gemini-3.5-flash-lite-decision.md) · [JSON](../runs/2026-11-08T20-10-00-710Z/debt/gemini-3.5-flash-lite-decision.json)

1. **Review Credit Card Minimum Payment Due** (REVIEW) — **REJECTED**.
   - Model description: Review the upcoming credit card minimum payment due on 2026-11-08 to understand the timeline and terms.
   - Recorded reason: Date 2026-11-05 does not appear in the cited PI facts.
2. **Review Energy Obligation Timing** (REVIEW) — **VALID**.
   - Model description: Review the upcoming energy obligation due on 2026-11-18 relative to the monthly salary receipt date of 2026-11-25.
   - Recorded reason: The suggestion accurately reflects the energy obligation due date of 2026-11-18 and the salary date of 2026-11-25 as stated in obligation-1 and income-1, and aligns with the pattern findings.
3. **Clarify Funding for Debt Payment** (CLARIFY) — **NEEDS_DATA**.
   - Model description: Clarify what funds can be confirmed as available before the payment due on 2026-11-08.
   - Recorded reason: Missing: Available funding by the due date for debt-1

Catalog: SKIPPED. Decision: RECOMMENDATION_READY. Contact Credit card issuer for hardship payment options.

## Strong

[Generator](../runs/2026-11-08T20-10-00-710Z/strong/gemini-3.5-flash-lite-suggestion-generator.md) · [JSON](../runs/2026-11-08T20-10-00-710Z/strong/gemini-3.5-flash-lite-suggestion-generator.json) · [Checker](../runs/2026-11-08T20-10-00-710Z/strong/gemini-3.5-flash-lite-checker.md) · [JSON](../runs/2026-11-08T20-10-00-710Z/strong/gemini-3.5-flash-lite-checker.json) · [Catalog](../runs/2026-11-08T20-10-00-710Z/strong/gemini-3.5-flash-lite-catalog-selector.md) · [JSON](../runs/2026-11-08T20-10-00-710Z/strong/gemini-3.5-flash-lite-catalog-selector.json) · [Decision](../runs/2026-11-08T20-10-00-710Z/strong/gemini-3.5-flash-lite-decision.md) · [JSON](../runs/2026-11-08T20-10-00-710Z/strong/gemini-3.5-flash-lite-decision.json)

1. **Review upcoming energy obligation payment** (REVIEW) — **VALID**.
   - Model description: Review the unpaid energy obligation due on 2026-11-15.
   - Recorded reason: The energy obligation due date is 2026-11-15 with an amount of 150 EUR, which is consistent with the supplied facts and does not contradict any records.
2. **Review upcoming other obligation payment** (REVIEW) — **VALID**.
   - Model description: Review the unpaid other obligation due on 2026-11-20.
   - Recorded reason: The other obligation due date is 20206-11-20 [sic: 2026-11-20] with an amount of 250 EUR, which is consistent with the supplied facts and does not conflict with any records.
3. **Clarify intended contribution to goal-1** (CLARIFY) — **NEEDS_DATA**.
   - Model description: Provide the intended contribution amount and timeline for goal-1.
   - Recorded reason: Missing: Intended contribution to goal-1

Catalog: SKIPPED. Decision: RECOMMENDATION_READY. Review upcoming energy obligation payment.

## Nora

[Generator](../runs/2026-11-08T20-10-00-710Z/nora/gemini-3.5-flash-lite-suggestion-generator.md) · [JSON](../runs/2026-11-08T20-10-00-710Z/nora/gemini-3.5-flash-lite-suggestion-generator.json) · [Checker](../runs/2026-11-08T20-10-00-710Z/nora/gemini-3.5-flash-lite-checker.md) · [JSON](../runs/2026-11-08T20-10-00-710Z/nora/gemini-3.5-flash-lite-checker.json) · [Catalog](../runs/2026-11-08T20-10-00-710Z/nora/gemini-3.5-flash-lite-catalog-selector.md) · [JSON](../runs/2026-11-08T20-10-00-710Z/nora/gemini-3.5-flash-lite-catalog-selector.json) · [Decision](../runs/2026-11-08T20-10-00-710Z/nora/gemini-3.5-flash-lite-decision.md) · [JSON](../runs/2026-11-08T20-10-00-710Z/nora/gemini-3.5-flash-lite-decision.json)

1. **Review debt-1 terms and upcoming due date** (REVIEW) — **NEEDS_DATA**.
   - Model description: Examine the credit card details, including the 21.9% APR, minimum payment, and the upcoming due date on 2026-11-15.
   - Recorded reason: Advice requires executable financial checks or contains a monetary amount or rate.
2. **Review emergency cushion savings goal timeline** (REVIEW) — **NEEDS_DATA**.
   - Model description: Check the progress and target date for the emergency cushion goal of 3000 EUR by 2027-06-30.
   - Recorded reason: Advice requires executable financial checks or contains a monetary amount or rate.
3. **Verify current balances for account-1 and account-2** (CLARIFY) — **NEEDS_DATA**.
   - Model description: Provide the current available balances and balance dates for the personal accounts.
   - Recorded reason: Missing: Current dated account balances

Catalog: SKIPPED. Decision: NO_RECOMMENDATION. No proactive action needed today.

## Findings

- The final run returned nine actual model drafts. Three consistent reviews were VALID, five drafts were NEEDS_DATA, and one was REJECTED for an ISO date absent from its cited facts. All three VALID reviews had empty source lists.
- Catalog was skipped for every profile. The controlled all-rejected test exercised the separate catalog path.
- Debt kept A005 through independent critical coverage. Strong selected an unscored review. Nora had no publishable recommendation in the final replay.
- Strong semantic checking retried once after a provider service error and returned a valid response from the same model. Its reason for the second review contains a date typo with an explicit correction. The model draft date itself matches the cited record. This demonstrates that checker explanation text can still contain errors.
- The earlier paced full beta run exposed a more serious missed date conflict. Debt's model draft mentioned the prior year for salary and the semantic Checker incorrectly approved it. That capture precedes the deterministic date guard and is retained as debugging evidence.
