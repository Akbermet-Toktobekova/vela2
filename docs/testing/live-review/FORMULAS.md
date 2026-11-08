# How Vela derives financial values and the final score

This guide follows the deterministic implementation and recorded policy. Values labelled PROTOTYPE_POLICY are preliminary engineering choices. The worked example is an actual capture from 2026-11-08T15-45-05-944Z with a financial reference date of 2026-11-05. Later acceptance reports may contain different model outputs.

## From user records to a score

The system first checks whether an action is supported, safe and affordable. Critical actions follow priority rules. Eligible ordinary financial actions receive three calculated effects, R, F and G. The effects are normalized, weighted, and combined with execution complexity. Source-backed review and verification actions use their own selection rules and have no financial score.

The calculation follows these steps.

1. Read accessible personal balances, confirmed schedules, debt terms, goals and allocations from PI.
2. Convert applicable amounts to the profile currency using the recorded FX quotation.
3. Simulate the same dated cash flows with and without the proposed action.
4. Derive the change in reserve coverage, avoided cost and goal progress.
5. Divide each change by its versioned reference scale and clip to [-1, 1].
6. Select the weight profile from financial facts.
7. Combine the values and complexity using F017.
8. Check how frequently the selected candidate wins when weights vary.

## Currency and financial time

Frankfurter EUR-to-HUF quotations mean one EUR buys the quoted number of HUF. Consequently HUF converts to EUR by division. Strong had EUR 9,000 and HUF 185,000. The corrected historical quote is 363.18 HUF per EUR dated 2026-11-05.

\[
185000/363.18=509.39\text{ EUR},\qquad L=9000+509.39=9509.39\text{ EUR}
\]

The valuation date and actual execution time are separate. The quote must be valid for the valuation date. Conversion uses cents rounding. Missing or stale required FX is reported explicitly.

The original baseline used 363.9 dated 2026-11-06 for a 2026-11-05 snapshot. It reported EUR 9,508.38. The corrected example reports EUR 9,509.39, a EUR 1.01 difference. The published Strong allocation stayed EUR 4,550 because candidate sizing rounds to policy increments.

See the [corrected FX capture](runs/2026-11-08T15-45-05-944Z/strong/fx.md) and [original FX capture](runs/2026-11-07T15-16-44-438Z/strong/fx.md).

## Liquidity and cash capacity

### Accessible funds and reserves — F001/F002

Accessible liquidity comes from account summaries after ownership and availability rules. Restricted work or third-party funds cannot be treated as personal cash. Explicit emergency-goal allocations are tracked separately from total accessible money. Unpaid obligations and other allocations constrain the uncommitted amount.

Coverage divides a chosen money measure by essential monthly expense E.

\[
M=L/E
\]

The metric name identifies the numerator. Strong's liquid expense coverage is 9509.39 / 1500 = 6.3396 months. Strong has no dedicated emergency allocation, so dedicated emergency coverage is zero. These answer different questions.

Current weight selection uses total accessible liquid coverage with essential expenses converted to the same currency. Its trace reports 6.34 months. The preceding 2026-11-08T15-30-44-228Z capture had used uncommitted liquidity and reported 5.34 months. The correction preserves the goal profile for Strong while aligning the coverage basis across components.

Emergency allocations can be capped by available liquid funds after mandatory bills. A transfer between two equally accessible personal accounts preserves total liquidity. An earmark changes the amount designated for a purpose and reduces money available for other actions.

### Daily trajectory — F004

\[
C(d)=C(0)+\sum_{t\leq d}\mathrm{income}(t)-\sum_{t\leq d}\mathrm{outflows}(t)
\]

Starting spendable cash excludes existing goal earmarks and accepted pending commitments. Known monthly income is expanded into dated occurrences. Obligations and required debt payments are expanded into their supported schedules. Irregular unconfirmed income is excluded from guaranteed inflows. Negative balances remain visible.

A monthly essential-expense estimate is a normalization and coverage input. It does not supply payment dates. Optional actions require sufficient dated mandatory outflows to substantiate that estimate. Missing dates produce a missing-data result.

Strong's 90-day trajectory includes EUR 12,600 of salary and EUR 4,500 of dated obligations.

\[
C(90)=9509.39+12600-4500=17609.39
\]

### Available cash — F003

\[
A=\max(0,\mathrm{cash}+\mathrm{confirmed\ inflows}-\mathrm{mandatory\ outflows}-\mathrm{floor})
\]

Strong's horizon-wide A is EUR 17,609.39. A new immediate action also needs to fit the lowest projected dated balance. The minimum in this capture is EUR 9,109.39 on 2026-11-20. The candidate builder therefore limits an immediate outflow by both values.

\[
\mathrm{maxImmediate}=\max(0,\min(A,\min_d C(d)-\mathrm{floor}))=9109.39
\]

Debt illustrates why the dated check matters. It has EUR 20, a EUR 65 card minimum due 2026-11-08, and a later salary. Its optionalActionCash field reports F003 horizon capacity of EUR 5,030, which includes later confirmed income. This amount must be read together with the daily trajectory and does not establish an immediate spending allowance. The EUR 45 imminent shortfall remains visible. Checker uses the dated trajectory and blocks unaffordable optional payments.

### Shortfall — F019

\[
\mathrm{shortfall}=\max(0,\mathrm{paymentDue}-\mathrm{availableByDue})
\]

Debt's first payment has shortfall max(0, 65 - 20) = EUR 45. Critical coverage selects A005 hardship contact. The action has no ordinary financial ranking score.

See the [Debt financial capture](runs/2026-11-08T15-45-05-944Z/debt/financial-calculator.md).

## R — Resilience effect

R measures a change in coverage of essential expenses from dedicated emergency reserve, evaluated at the same terminal date in both scenarios.

\[
R_0=\min(\mathrm{dedicatedReserve}_0,\max(0,L_{H,0}))/E
\]
\[
R_a=\min(\mathrm{dedicatedReserve}_a,\max(0,L_{H,a}))/E
\]
\[
\Delta R=R_a-R_0
\]

The current impact calculation uses emergency-purpose earmarks. A007/A008 can increase that earmark when targeting an emergency-cushion goal. A012 for education changes education-goal progress, so its resilience effect is zero. An account-to-account transfer with equally accessible money also produces zero resilience gain.

Resilience is recorded in months. For a purely illustrative arithmetic example, a verified EUR 300 emergency allocation with essential expenses of EUR 1,500 would add 0.2 months if the terminal cash cap allowed the entire allocation. Dividing by K_R = 0.25 gives v_R = 0.8 before weighting. This is an explanation of F002/F014, not an additional test result or an approved action amount.

The reserve-based R effect and total-liquid coverage used for profile selection are separately labelled. The former evaluates a candidate's emergency earmark effect. The latter describes overall liquid resources.

## F — Financial benefit

F is avoided cost over the common 90-day horizon.

\[
\Delta F=\mathrm{costWithoutAction}_{90d}-\mathrm{costWithAction}_{90d}
\]

For debt, cost is modelled interest under verified terms and dated payments. For confirmed subscription cancellation it includes supported future charges, replacement cost and exit fees. Merely moving money or paying principal creates no avoided-cost amount.

### Debt calculations — F005–F010

The daily rate is APR / 100 / 365. Each day adds principal multiplied by that rate. On known payment dates the simulation pays accrued interest and then principal. Extra payment changes the future principal path. The simulator assumes no new borrowing and uses its documented simple-interest model.

Debt's verified balance is EUR 900, APR is 24%, minimum is EUR 65 and next due date is 2026-11-08. Its daily rate is 0.24 / 365. Its baseline modelled interest is EUR 46.99 over 90 days and EUR 133.61 over 12 calendar months. These are costs of the baseline, not avoided costs. Avoided interest needs a separately calculated action trajectory.

An additional deterministic illustration was calculated directly from the captured Debt inputs with a hypothetical EUR 100 extra payment on the reference date. The calculator returned baseline interest EUR 46.99, after-action interest EUR 40.95 and avoided interest EUR 6.04. With Debt's essential expenses of EUR 950, K_F is EUR 47.50, giving v_F = 6.04 / 47.50 = 0.1272 after rounding. The EUR 100 principal payment is excluded from the EUR 6.04 benefit. Debt's actual EUR 20 cash balance cannot fund this hypothetical payment, so this arithmetic illustration is ineligible for publication and the actual recommendation remains critical hardship contact.

The illustration was verified with SharedFinancialCalculator.computeDebtInterestAvoided using extraPaymentDay0 = 100, horizonDays = 90, referenceDateIso = 2026-11-05 and the captured verified interestAccruing = true.

For a monthly fixed payment P and monthly rate r, F009 estimates payoff periods using:

\[
n=-\ln(1-Br/P)/\ln(1+r)
\]

The captured Debt estimate is 16.37 months. The formula requires known inputs and a payment that can amortize the balance. Zero rate has the separate principal/payment case. The monthly payoff formula and dated daily-interest simulation have different purposes and timing assumptions.

Nora's final capture preserves the original EUR 600 emergency allocation. Total liquid coverage is 4177.01 / 1450 = 2.8807 months, while emergency-reserve coverage is 600 / 1450 = 0.4138 months. Its horizon optionalActionCash is EUR 7,111.01 after existing earmarks. The prior incomplete fixture had lost the allocation during server-controlled state import, and the runner now seeds it through the repository.

Nora's captured APR is known but interest-accrual status is missing. Its debt calculation returns NEEDS_DATA with null interest and payoff values. The original baseline had reported EUR 41.82 and EUR 126.43 by assuming accrual. The corrected capture exposes the missing term.

See the [Debt calculation](runs/2026-11-08T15-45-05-944Z/debt/debt-calculator.md) and [Nora calculation](runs/2026-11-08T15-45-05-944Z/nora/debt-calculator.md).

## G — Goal-progress effect

For a positive goal target T and already allocated amount B, F012 computes:

\[
G_0=\mathrm{clip}(B/T,0,1)
\]

The action simulation computes G_a with the proposed extra allocation. F015 then returns:

\[
\Delta G=G_a-G_0
\]

Strong's education target is EUR 6,000 with zero allocated. The selected candidate allocates EUR 4,550.

\[
G_0=0/6000=0,\qquad G_a=4550/6000=0.7583,\qquad\Delta G=0.7583
\]

A fraction of 0.7583 corresponds to 75.83 percentage points of progress. The implementation sets the scored G gain to zero for an emergency-cushion goal when that gain is already represented in R. A goal allocation preserves total liquid wealth while earmarking part of it.

F013 separately calculates the monthly contribution required for a deadline, using the remaining goal gap divided by remaining months. It helps identify an infeasible timeline. It does not itself determine the amount in Strong's candidate.

### Where EUR 4,550 came from

The candidate builder uses the supported immediate capacity and existing prototype sizing policy. The policy uses an optional-outflow fraction of 0.5 and a EUR 5 rounding increment.

\[
\lfloor(9109.39\times0.5)/5\rfloor\times5=4550
\]

The candidate is capped by the remaining goal gap and capacity and checked for applicable minimum sizing. Gemini selects from the supplied catalog pool in this branch. The arithmetic selects the amount.

See the [catalog candidate](runs/2026-11-08T15-45-05-944Z/strong/catalog-selector.md).

## Normalization — from raw effects to V

The score combines unlike units, so the raw effects are divided by versioned reference scales.

\[
v_R=\mathrm{clip}(\Delta R/K_R,-1,1),\quad
v_F=\mathrm{clip}(\Delta F/K_F,-1,1),\quad
v_G=\mathrm{clip}(\Delta G/K_G,-1,1)
\]

The current preliminary scales are K_R = 0.25 months, K_F = 0.05 × essential monthly expenses in base currency, and K_G = 0.20 goal-progress fraction. Strong therefore has K_F = 0.05 × 1500 = EUR 75.

Strong's A012 has raw effects (0 months, EUR 0, 0.7583). Dividing yields (0, 0, 3.7915). Clipping yields (0, 0, 1). Its G_clipped flag is true. More than 20 percentage points of progress reaches the maximum normalized goal contribution under this prototype policy. The raw progress remains in the trace.

The scales are configured engineering settings. They are not estimated from the three profiles or generated by AI.

## W — Importance weights

Weights specify how much each normalized criterion contributes. The existing profiles, in priority order, are:

- Liquidity protection uses (0.50, 0.35, 0.15). Enter below one month of total-liquid expense coverage. An existing liquidity profile remains until coverage reaches 1.25 months.
- Expensive debt uses (0.20, 0.60, 0.20) when the preceding liquidity condition is absent and a qualifying high-APR debt has verified accrual or promotion expiry under policy.
- Goal advancement uses (0.20, 0.20, 0.60) when an unfinished valid goal exists and preceding conditions do not apply.
- Balanced uses (0.34, 0.33, 0.33) otherwise.

Strong has sufficient liquid coverage, no debt and an unfinished education goal. Its chosen W is (0.2, 0.2, 0.6). These weight values and thresholds come from the prototype policy. The profile is selected by code.

## Complexity and score — F016/F017

AI supplies contextual estimates or UNKNOWN for T, S, D and O. Code computes the average with policy weights of 0.25. Missing factors use an explicitly marked catalog baseline.

Strong's captured factors were UNKNOWN after validation. The baseline values were T = 0.10, S = 0.15, D = 0.10 and O = 0.10.

\[
c_C=0.25(0.10+0.15+0.10+0.10)=0.1125
\]

The configured complexity coefficient is lambda_C = 0.10.

\[
S=0.2\times0+0.2\times0+0.6\times1-0.1\times0.1125=0.58875
\]

The trace contains weightedBenefit = 0.6, complexityPenalty = 0.01125 and finalScore = 0.58875. This score is a decision index. It has no currency unit and is not a probability of success.

See the [actual scored candidate](runs/2026-11-08T15-45-05-944Z/strong/scoring.md).

## Robustness — F018

The seeded simulation varies each base weight by up to ±10%, renormalizes the three weights to sum to one and recomputes F017. Impacts, proposed amounts and user cash flows remain fixed during this check.

\[
\mathrm{Stability}(a)=\mathrm{wins}(a)/200
\]

Strong had only one scored candidate. It won all 200 simulations and stability was 1. The result therefore provides no comparison against a second financial alternative. It does not measure income reliability or sensitivity to an exchange-rate shock.

The captured complexity-penalty sensitivity was 0.6 at lambda_C = 0, 0.594375 at 0.05, 0.58875 at 0.10 and 0.583125 at 0.15. The same sole candidate remained selected.

For multiple candidates with a score margin below 0.03, the implementation considers unknown complexity, uncertainty, reserve-drawdown risk and complexity before falling back to score and a stable identifier. It does not deduct the complexity penalty twice.

See the [robustness capture](runs/2026-11-08T15-45-05-944Z/strong/robustness.md).

## Reading a complete result

Debt follows a critical protection branch, so its score is null. Strong follows ordinary financial ranking and has a recorded score. Nora follows a verification-unlock branch and has no invented financial score. The common output includes the branch, checked evidence, missing fields and reasoning. The [recap](RECAP.md) and seven-stage report link the current acceptance capture.

## Implementation references

- Shared formulas and cash-flow simulation are implemented in [SharedFinancialCalculator](../../../shared/calculator/index.ts).
- Counterfactual effects and normalization are implemented in [ImpactCalculator](../../../server/src/decision/impactCalculator.ts).
- Profile selection is implemented in [WeightCalculator](../../../server/src/decision/weightCalculator.ts).
- F017 arithmetic is implemented in [ScoringEngine](../../../server/src/decision/scoringEngine.ts).
- Sensitivity and close-decision selection are implemented in [RobustnessEngine](../../../server/src/decision/robustnessChecker.ts).
- Preliminary parameters are read from [prototype-policy.json](../../../server/config/prototype-policy.json).

This document was verified against the source code and saved JSON captures. It does not assert a new empirical calibration of policy settings.
