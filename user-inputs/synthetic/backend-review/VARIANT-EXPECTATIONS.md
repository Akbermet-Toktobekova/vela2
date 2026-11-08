# Paired recommendation fixtures

Original Debt, Strong and Nora remain the baseline. The runner selects the variants below with `--variant`.

- `debt-funded` changes only the reported available funds from EUR20 to the known minimum EUR65. The next minimum is covered and the critical contact branch must give way to A001. Later utility funding may still need attention.
- `debt-us` changes the profile jurisdiction to US. The existing CFPB C017/S004 source can be used for the hardship contact. The original EU case uses neutral issuer-contact wording.
- `strong-confirmed` adds a confirmed EUR500 contribution from the main EUR account toward Education. The exact confirmed amount must survive primary or catalog selection. Accept and Adjust to EUR400 should be checked with available EUR/HUF rates.
- `strong-missing-fx` uses the same confirmed plan and injects an unavailable FX service. The action must remain blocked and the missing currency input must be visible.
- `nora-fresh` retains each imported balance amount and adds current dated user confirmations. The stale-balance clarification must disappear. Unknown interest accrual and subscription terms may still require clarification.

The EUR500 and EUR400 amounts are synthetic user inputs for acceptance testing. They are not financial policy coefficients. All runs use Gemini 3.5 Flash Lite.
