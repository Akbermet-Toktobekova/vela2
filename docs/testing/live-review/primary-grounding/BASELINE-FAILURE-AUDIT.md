# Primary generator baseline failure audit

This audit reads the original 36 saved model outputs and Checker traces. Only Gemini 3.5 Flash Lite and Gemma 4 31B are benchmark baselines. The other two models were inspected offline for root cause.

The frozen runs used prototype_policy_bundle_v1.4. The task description names v1.3. The repository and saved Checker inputs identify v1.4, so the comparison retains v1.4 and its coefficients. All three requests identify the profile as EU. Their eligible evidence consists of C012, C022, C023, C028 and C029. C004 and C017 are US guidance and were outside those requests.

Schema below refers to the required proposal shape, assessed independently from the historical verdict. A useful clarification is a concrete question that would resolve a real decision-relevant gap. The editorial assessment can identify a useful underlying question even if its original intent or format was wrong.

## gemini-3.5-flash-lite

### Debt

[Saved request and raw draft](../runs/2026-11-08T16-41-15-473Z/debt/suggestion-generator.json) · [Recorded Checker](../runs/2026-11-08T16-41-15-473Z/debt/checker.json)

1. **Review energy obligation due date alignment** (REVIEW). Review the upcoming energy obligation due on 2026-11-18 relative to your salary income date on 2026-11-25.
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (pattern-findings, obligation-1, income-1).
   - AS and applicability. No claim cited. Direct support and applicability were not established.
   - Intent and usefulness. Review fits the wording and dates, but misses the earlier card shortfall.
   - Recorded Checker **REJECTED**. Unverified or unknown AS reference.
2. **Review credit card debt terms and balance** (REVIEW). Review the credit card debt details including the balance, APR, and next due date.
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (debt-analysis, debt-1).
   - AS and applicability. No claim cited. Direct support and applicability were not established.
   - Intent and usefulness. Review fits the wording, but asks to repeat known terms instead of addressing the minimum-payment gap.
   - Recorded Checker **REJECTED**. Unverified or unknown AS reference.
3. **Clarify additional financial accounts or income sources** (CLARIFY). Provide details on any other potential income sources or accounts available to cover upcoming expenses.
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (profile).
   - AS and applicability. No claim required for clarification.
   - Intent and usefulness. Useful clarification about alternate funds, although it could cite the dated card minimum and available cash directly.
   - Recorded Checker **NEEDS_DATA**. Missing: Additional accounts, Supplementary income sources

### Strong

[Saved request and raw draft](../runs/2026-11-08T16-41-15-473Z/strong/suggestion-generator.json) · [Recorded Checker](../runs/2026-11-08T16-41-15-473Z/strong/checker.json)

1. **Review account service charges** (REVIEW). Review the observed account service charge outflows on the main account in EUR and fee outflows on the HUF account.
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (pattern-findings).
   - AS and applicability. No claim cited. Direct support and applicability were not established.
   - Intent and usefulness. Review fits a fee investigation, but it has no decision about the education goal.
   - Recorded Checker **REJECTED**. Unverified or unknown AS reference.
2. **Clarify financial education preferences** (CLARIFY). Verify whether the user wants to apply general financial education principles to manage their recurring obligations.
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (profile).
   - AS and applicability. No claim required for clarification.
   - Intent and usefulness. Asks about a real preference, but generic education does not resolve a financial decision for Strong.
   - Recorded Checker **NEEDS_DATA**. Missing: User interest in financial education resources or topics
3. **Clarify budget review scheduling** (CLARIFY). Confirm the preferred timing and scope for reviewing the budget based on the tentative plan.
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (profile).
   - AS and applicability. No claim required for clarification.
   - Intent and usefulness. Clarification follows the tentative chat plan. It is peripheral to the funding and reserve decision.
   - Recorded Checker **NEEDS_DATA**. Missing: Preferred date and scope for the budget review

### Nora

[Saved request and raw draft](../runs/2026-11-08T16-41-15-473Z/nora/suggestion-generator.json) · [Recorded Checker](../runs/2026-11-08T16-41-15-473Z/nora/checker.json)

1. **Review** (REVIEW). Review the upcoming rent obligation.
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (obligation-1).
   - AS and applicability. No claim cited. Direct support and applicability were not established.
   - Intent and usefulness. Review fits the surface wording. Generic and ignores the stale funding balance and imminent rent.
   - Recorded Checker **REJECTED**. Unverified or unknown AS reference.
2. **Check** (REVIEW). Check the energy utility obligation details.
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (obligation-2).
   - AS and applicability. No claim cited. Direct support and applicability were not established.
   - Intent and usefulness. Review fits the surface wording. No specific missing detail is identified.
   - Recorded Checker **REJECTED**. Unverified or unknown AS reference.
3. **Verify** (REVIEW). Verify the internet obligation details.
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (obligation-3).
   - AS and applicability. No claim cited. Direct support and applicability were not established.
   - Intent and usefulness. Review fits the surface wording. No specific missing detail is identified.
   - Recorded Checker **REJECTED**. Unverified or unknown AS reference.

## gemini-3.1-flash-lite

### Debt

[Saved request and raw draft](../runs/2026-11-08T17-26-37-103Z/debt/gemini-3.1-flash-lite-suggestion-generator.json) · [Recorded Checker](../runs/2026-11-08T17-26-37-103Z/debt/gemini-3.1-flash-lite-checker.json)

1. **Review credit card debt repayment strategy** (REVIEW). Examine the credit card debt with a 24% APR and a minimum payment due on 2026-11-08 to understand the impact of interest and payoff timeline.
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (debt-1, debt-analysis).
   - AS and applicability. C023 was supplied, verified and international. Its population-level education evidence does not support this individual repayment analysis.
   - Intent and usefulness. Review fits as analysis. Known APR and date are grounded, but C023 does not support an individualized payoff strategy. The minimum-payment shortfall is more urgent.
   - Recorded Checker **NEEDS_DATA**. Advice requires executable financial checks or contains a monetary amount or rate.
2. **Clarify monthly budget allocation for upcoming obligations** (CLARIFY). Confirm if there are additional income sources or savings to cover the utility obligation due on 2026-11-18, given the current account balance.
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (obligation-1, account-1, income-1).
   - AS and applicability. No claim required for clarification.
   - Intent and usefulness. Useful clarification about the funding gap before salary. The later utility bill is secondary to the card minimum.
   - Recorded Checker **NEEDS_DATA**. Missing: Are there other liquid assets or income sources available to cover the utility bill due on 2026-11-18?
3. **Clarify emergency reserve and savings goals** (CLARIFY). Identify if there are specific targets for building an emergency reserve, as the current coverage is zero months.
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (financial-metrics, data-quality).
   - AS and applicability. No claim required for clarification.
   - Intent and usefulness. The reserve target is an uncertain preference and the clarification is concrete. It does not address the immediate payment gap.
   - Recorded Checker **NEEDS_DATA**. Missing: What is the target amount or duration for an emergency reserve fund?

### Strong

[Saved request and raw draft](../runs/2026-11-08T17-26-37-103Z/strong/gemini-3.1-flash-lite-suggestion-generator.json) · [Recorded Checker](../runs/2026-11-08T17-26-37-103Z/strong/gemini-3.1-flash-lite-checker.json)

1. **Review recurring account fees** (REVIEW). Examine the recurring service charges and fees identified on both your EUR and HUF accounts to determine if they can be reduced or eliminated.
   - Shape invalid. missingInfo invalid scalar or null. PI and target supplied and consistent (pattern-findings, behavior-findings).
   - AS and applicability. No claim cited. Direct support and applicability were not established.
   - Intent and usefulness. The intent reads as non-executing review. Confirm fee terms before describing recurring contractual fees or savings.
   - Recorded Checker **REJECTED**. Malformed proposal: missingInfo.
2. **Check upcoming obligation payments** (REVIEW). Verify the status and payment timing for your unpaid energy and 'other' obligations due on November 15th and 20th respectively.
   - Shape invalid. missingInfo invalid scalar or null. PI and target supplied and consistent (obligation-2, obligation-3).
   - AS and applicability. No claim cited. Direct support and applicability were not established.
   - Intent and usefulness. The requested confirmation of payment method and date-specific liquidity fits CLARIFY better. Useful information gap despite schema failure.
   - Recorded Checker **REJECTED**. Malformed proposal: missingInfo.
3. **Clarify emergency reserve strategy** (CLARIFY). Define your target for an emergency reserve, as current data indicates zero coverage months.
   - Shape invalid. missingInfo invalid scalar or null. PI and target supplied and consistent (data-quality).
   - AS and applicability. No claim required for clarification.
   - Intent and usefulness. CLARIFY fits the unresolved reserve preference. The wording should say dedicated reserve coverage, given positive liquid coverage.
   - Recorded Checker **REJECTED**. Malformed proposal: missingInfo.

### Nora

[Saved request and raw draft](../runs/2026-11-08T17-26-37-103Z/nora/gemini-3.1-flash-lite-suggestion-generator.json) · [Recorded Checker](../runs/2026-11-08T17-26-37-103Z/nora/gemini-3.1-flash-lite-checker.json)

1. **Execute payment for rent obligation** (EXECUTE). Allocate 980 EUR from account-1 to settle the unpaid rent obligation due on 2026-11-06.
   - Shape invalid. missingInfo invalid scalar or null. PI and target supplied and consistent (account-1, obligation-1).
   - AS and applicability. No claim cited. Direct support and applicability were not established.
   - Intent and usefulness. EXECUTE matches the instruction to pay. The funding account is stale and there is no claim support. No affordability assessment was reached.
   - Recorded Checker **REJECTED**. Malformed proposal: missingInfo.
2. **Review credit card debt repayment strategy** (REVIEW). Evaluate the impact of paying more than the 55 EUR minimum on the 850 EUR credit card balance to mitigate the 21.9% APR.
   - Shape invalid. missingInfo invalid scalar or null. PI and target supplied and consistent (debt-1, account-1).
   - AS and applicability. C023 was supplied, verified and international. Its population-level education evidence does not support this individual repayment analysis.
   - Intent and usefulness. Review matches a request to analyze, but interest accrual and fresh cash are unknown and C023 gives no support for an individualized extra-payment estimate.
   - Recorded Checker **REJECTED**. Malformed proposal: missingInfo.
3. **Clarify emergency cushion contribution plan** (CLARIFY). Confirm the monthly allocation amount intended to reach the 3000 EUR emergency cushion goal by 2027-06-30.
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (goal-1, income-1).
   - AS and applicability. No claim required for clarification.
   - Intent and usefulness. Useful CLARIFY about the intended allocation. Current balances and rent are more immediate.
   - Recorded Checker **NEEDS_DATA**. Missing: Specific monthly contribution amount planned for the emergency cushion goal.

## gemma-4-26b-a4b-it

### Debt

[Saved request and raw draft](../runs/2026-11-08T17-26-37-103Z/debt/gemma-4-26b-a4b-it-suggestion-generator.json) · [Recorded Checker](../runs/2026-11-08T17-26-37-103Z/debt/gemma-4-26b-a4b-it-checker.json)

1. **Review credit card debt details** (REVIEW). Review the current credit card balance of 900 EUR and the upcoming minimum payment of 65 EUR due on 2026-11-08.
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (debt-1).
   - AS and applicability. No claim cited. Direct support and applicability were not established.
   - Intent and usefulness. Review fits the surface wording and repeats known card figures. It does not address the immediate shortfall.
   - Recorded Checker **REJECTED**. Unverified or unknown AS reference.
2. **Verify energy obligation payment timing** (CLARIFY). Confirm if the 65 EUR energy obligation due on 2026-11-18 can be covered by the current account balance of 20 EUR before the next salary on 2026-11-25.
   - Shape invalid. missingInfo invalid scalar or null. PI and target supplied and consistent (obligation-1, income-1, account-1).
   - AS and applicability. No claim required for clarification.
   - Intent and usefulness. Useful funding clarification supported by dated PI despite the scalar field. The earlier card payment is more urgent.
   - Recorded Checker **REJECTED**. Malformed proposal: missingInfo.
3. **Identify potential financial education resources** (REVIEW). Explore financial education topics to improve knowledge and downstream financial behaviors.
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (profile).
   - AS and applicability. C022 was supplied, verified and international. It supports general education with heterogeneous effects.
   - Intent and usefulness. REVIEW is appropriate for general education. C022 directly supports the educational topic at population level. It does little for the immediate cash gap.
   - Recorded Checker **VALID**. The provided meta-analysis supports the rationale that financial education has positive effects on knowledge and financial behaviors, justifying the suggestion to identify educational resources for the user.

### Strong

[Saved request and raw draft](../runs/2026-11-08T17-26-37-103Z/strong/gemma-4-26b-a4b-it-suggestion-generator.json) · [Recorded Checker](../runs/2026-11-08T17-26-37-103Z/strong/gemma-4-26b-a4b-it-checker.json)

1. **Review unpaid energy and other obligations** (REVIEW). Verify the status and payment details for the unpaid energy obligation (150 EUR) and other obligation (250 EUR) due in November 2026.
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (obligation-2, obligation-3).
   - AS and applicability. No claim cited. Direct support and applicability were not established.
   - Intent and usefulness. Review fits the wording, but the described verification would be more useful as a specific payment-status clarification.
   - Recorded Checker **REJECTED**. Unverified or unknown AS reference.
2. **Identify savings allocation for general savings goal** (REVIEW). Determine how to allocate funds from the current EUR account balance toward the high-priority general savings goal of 6,000 EUR.
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (goal-1, account-1).
   - AS and applicability. No claim cited. Direct support and applicability were not established.
   - Intent and usefulness. Analysis fits REVIEW if no transfer is directed. A specific funding choice or reserve confirmation would be more actionable.
   - Recorded Checker **REJECTED**. Unverified or unknown AS reference.
3. **Clarify emergency reserve requirements** (CLARIFY). What is your preferred target amount or duration for an emergency reserve in EUR?
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (data-quality, financial-metrics).
   - AS and applicability. No claim required for clarification.
   - Intent and usefulness. Useful CLARIFY about a concrete reserve preference relevant to goal funding.
   - Recorded Checker **NEEDS_DATA**. Missing: target emergency reserve amount, target emergency reserve duration

### Nora

[Saved request and raw draft](../runs/2026-11-08T17-26-37-103Z/nora/gemma-4-26b-a4b-it-suggestion-generator.json) · [Recorded Checker](../runs/2026-11-08T17-26-37-103Z/nora/gemma-4-26b-a4b-it-checker.json)

1. **Review emergency cushion progress** (REVIEW). Evaluate the current emergency cushion of 600 EUR against the high-priority goal of 3000 EUR by June 30, 2027.
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (goal-1, financial-metrics).
   - AS and applicability. No claim cited. Direct support and applicability were not established.
   - Intent and usefulness. Review describes actual reserve progress but mostly restates known figures.
   - Recorded Checker **REJECTED**. Unverified or unknown AS reference.
2. **Verify credit card interest accrual status** (CLARIFY). Confirm whether interest is currently accruing on the credit card balance of 850 EUR to better understand the debt situation.
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (debt-1).
   - AS and applicability. No claim required for clarification.
   - Intent and usefulness. Useful CLARIFY about explicitly missing interest accrual.
   - Recorded Checker **NEEDS_DATA**. Missing: interestAccruing
3. **Identify subscription renewal dates** (REVIEW). Review the specific billing dates for the observed recurring subscriptions (Sound Library and Screen Library) to manage cash flow.
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (behavior, subscription-1, subscription-2).
   - AS and applicability. No claim cited. Direct support and applicability were not established.
   - Intent and usefulness. Billing-date confirmation is better classified as CLARIFY. Observed repeat activity cannot establish future contractual billing dates.
   - Recorded Checker **REJECTED**. Unverified or unknown AS reference.

## gemma-4-31b-it

### Debt

[Saved request and raw draft](../runs/2026-11-08T17-35-42-174Z/debt/gemma-4-31b-it-suggestion-generator.json) · [Recorded Checker](../runs/2026-11-08T17-35-42-174Z/debt/gemma-4-31b-it-checker.json)

1. **Review Credit Card Debt** (REVIEW). Review the details of your credit card debt, including the 24% APR and the upcoming payment due on 2026-11-08.
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (debt-1).
   - AS and applicability. No claim cited. Direct support and applicability were not established.
   - Intent and usefulness. Review fits the wording and known card terms. It omits the immediate funding gap.
   - Recorded Checker **REJECTED**. Unverified or unknown AS reference.
2. **Review Energy Bill Obligation** (REVIEW). Review the unpaid energy obligation of 65 EUR due on 2026-11-18.
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (obligation-1).
   - AS and applicability. No claim cited. Direct support and applicability were not established.
   - Intent and usefulness. Review fits the wording but repeats a known bill and gives no concrete verification target.
   - Recorded Checker **REJECTED**. Unverified or unknown AS reference.
3. **Clarify Spending Habits** (CLARIFY). Could you provide details on your monthly spending for categories like rent, groceries, and transport?
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (behavior).
   - AS and applicability. No claim required for clarification.
   - Intent and usefulness. CLARIFY is appropriate for missing spend detail. It is broad and secondary to the minimum-payment shortfall.
   - Recorded Checker **NEEDS_DATA**. Missing: Actual spending amounts for monthly categories

### Strong

[Saved request and raw draft](../runs/2026-11-08T17-31-07-957Z/strong/gemma-4-31b-it-suggestion-generator.json) · [Recorded Checker](../runs/2026-11-08T17-31-07-957Z/strong/gemma-4-31b-it-checker.json)

1. **Review unpaid obligations** (REVIEW). Review the outstanding payments for energy (150 EUR) and other categories (250 EUR) due by November 20, 2026.
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (obligation-2, obligation-3).
   - AS and applicability. No claim cited. Direct support and applicability were not established.
   - Intent and usefulness. Review fits checking the two dated bills, but could ask a concrete question about payment status.
   - Recorded Checker **REJECTED**. Unverified or unknown AS reference.
2. **Review account service charges** (REVIEW). Review the recurring service charges and fees observed on both the EUR and HUF accounts.
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (pattern-findings).
   - AS and applicability. No claim cited. Direct support and applicability were not established.
   - Intent and usefulness. Review fits checking observed fees. Repeat activity does not establish contract terms.
   - Recorded Checker **REJECTED**. Unverified or unknown AS reference.
3. **Clarify savings goal allocation** (CLARIFY). Would you like to allocate a specific amount from your current liquid balance to your high-priority general savings goal of 6,000 EUR?
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (goal-1).
   - AS and applicability. No claim required for clarification.
   - Intent and usefulness. Useful CLARIFY about the intended contribution amount. It could distinguish dedicated reserves from total liquidity.
   - Recorded Checker **NEEDS_DATA**. Missing: Desired monthly or one-time allocation amount for the savings goal

### Nora

[Saved request and raw draft](../runs/2026-11-08T17-31-07-957Z/nora/gemma-4-31b-it-suggestion-generator.json) · [Recorded Checker](../runs/2026-11-08T17-31-07-957Z/nora/gemma-4-31b-it-checker.json)

1. **Review Credit Card Debt** (REVIEW). Review the current balance of 850 EUR and the 21.9% APR on your credit card to determine a payoff strategy.
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (debt-1).
   - AS and applicability. C023 was supplied, verified and international. Its population-level education evidence does not support this individual repayment analysis.
   - Intent and usefulness. Review fits an analysis request. C023 concerns education effects, not an individualized payoff strategy. Independent verification did not return a usable verdict.
   - Recorded Checker **REJECTED**. Independent verification unavailable or incomplete.
2. **Verify Emergency Fund Progress** (REVIEW). Verify the current allocation of 600 EUR toward the 3,000 EUR emergency cushion goal.
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (goal-1, financial-metrics).
   - AS and applicability. No claim cited. Direct support and applicability were not established.
   - Intent and usefulness. Review restates recorded reserve allocation and target. No specific missing fact or applicable claim is cited.
   - Recorded Checker **REJECTED**. Unverified or unknown AS reference.
3. **Clarify Account Balance Recency** (CLARIFY). Could you please confirm if the balances for your daily spending and savings accounts are up to date, as the records are marked as stale?
   - Shape valid. missingInfo array of strings. PI and target supplied and consistent (account-1, account-2).
   - AS and applicability. No claim required for clarification.
   - Intent and usefulness. Useful CLARIFY. Both cited balances were explicitly stale and current dated balances are needed for upcoming decisions.
   - Recorded Checker **NEEDS_DATA**. Missing: Current updated balances for account-1 and account-2

## Root causes

- Historical verdicts: 23 REJECTED, 12 NEEDS_DATA and 1 VALID. 30/36 match the required shape, 30/36 supply a string array for missingInfo and 36/36 have valid supplied PI references and target membership.
- Six malformed missingInfo values reached the envelope parser because proposal fields were validated only after generation. These failures include otherwise useful questions and an unsupported rent payment. They are separate from actual affordability decisions.
- The five eligible claims do not support most personalized reviews. C023 was repeatedly stretched beyond education. The only validated draft relied on C022 and was low priority for Debt.
- Weak prioritization produced repeated checks of known bills and generic education or budgeting instead of targeted confirmation of cash, dates, funding or interest accrual.
- Gemma 31B Nora had an unavailable independent semantic verdict for the C023 debt draft. That transport failure is recorded separately from the editorial evidence assessment.
- The historical trace did not validate CLARIFY claim IDs and target membership before assigning NEEDS_DATA. The supplied cases happened to cite valid PI.

## Frozen two-model baseline

- Gemini 3.5 Flash Lite: 9 shaped, 6 REJECTED, 3 NEEDS_DATA, 0 VALID. One useful decision-relevant clarification.
- Gemma 4 31B: 9 shaped, 6 REJECTED, 3 NEEDS_DATA, 0 VALID. Two useful decision-relevant clarifications.
