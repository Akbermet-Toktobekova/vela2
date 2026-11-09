# Gemma 4 31B model switch

The application default and local model configuration now use gemma-4-31b-it through the Google API. The selected model is pinned to one candidate. Explicit legacy Gemini overrides retain their existing rotation behavior.

Model changes invalidate the review and agent caches. The previous completed recap and seven-stage report are preserved as GEMINI-RECAP.md and GEMINI-SEVEN-STAGES.md. Original stage captures remain in their existing run directories.

Verification completed server typecheck and 295 tests in 28 files, excluding the separately executed live integration suite. A live structured JSON smoke request returned ok=true with modelUsed=gemma-4-31b-it. Google models listing returned the same model with generateContent support.

The three-profile Gemma capture was stopped when D-018 selected Gemini 3.5 Flash Lite. The partial capture is retained at docs/testing/live-review/runs/2026-11-08T16-30-14-108Z. Debt has completed with A005. Several calls encountered Google API 500/503 overload responses, and the reports preserve the deterministic fallback provenance. Those fallbacks must not be interpreted as Gemma-generated advice.

Official reference https://ai.google.dev/gemma/docs/core/gemma_on_gemini_api
