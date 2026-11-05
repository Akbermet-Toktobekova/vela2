# Очередь вопросов к пользователю (`QUESTIONS.md`)

> Все вопросы из фазы планирования закрыты и перенесены в `docs/coordination/DECISIONS.md` (`D-001`…`D-010`). Новые вопросы, если возникнет реальное противоречие в формулах или правилах базы, фиксируются здесь.

## Q-011 — Immediate access scope (resolved 2026-11-04)

Context: HTTP access/security for steps1–7, D-010; authentication is currently a client-asserted user ID.
Why: no approved identity provider/session model exists, so selecting one would invent product architecture.
Question: «Какой вход нужен в ближайшем MVP? Сейчас пользователь может подменить свой ID.»
Options: local computer-only prototype with external access blocked now and real authentication later; or real user accounts with an explicitly chosen authentication provider.
User answer verbatim: «Локальный прототип на моём компьютере — закрыть внешний доступ сейчас, полноценный вход позже».
Recorded as D-011. Real multi-user authentication is deferred, not claimed fixed by network restriction.

## Q-012 — Locale for ambiguous statement amounts (no guess; review required)

Context: CSV ingestion into PI before steps1–2, affects F001/F004 and every downstream monetary calculation. A single separator in `1,234` or `1.234` can mean a decimal or thousands grouping.
Why: a wrong automatic interpretation can multiply an imported financial amount by1000.
Options for a future explicit import-locale feature: user selects statement locale; require bank-specific format metadata; or keep ambiguous rows withheld for review. No new locale-selection feature is authorized in this batch.
Current safe behavior: retain a row warning/needs_review and withhold ambiguous numeric rows rather than invent an amount. Locale inference is PENDING_USER_DECISION if automatic acceptance is later requested. No numeric financial threshold is introduced.

## Q-013 — Local encryption key lifecycle (resolved 2026-11-04)

Context: D-010, sensitive persisted PI/traces/feedback/chat; remove the shared built-in prototype key without losing existing data.
Options: automatic Windows per-user protection (migration requires the protected key), or explicit environment key with user-managed backup.
Question: «Как хранить ключ шифрования локальной базы вместо общего встроенного ключа? Это влияет на перенос и восстановление данных.»
User answer verbatim: «Автоматически защищать ключ средствами Windows для моей учётной записи; при переносе базы потребуется перенос ключа».
Recorded as D-012. Existing records must migrate transactionally without deleting data; wrong/unavailable keys must fail closed.


## Q-014 — Retaining a previous recommendation under unstable assumptions (future scope)
Context: Step5E, F018/D-009. No approved previous-recommendation retention/financial-risk equivalence policy exists.
Question: If F018 reports UNSTABLE_ASSUMPTIONS, should a freshly revalidated previous action be retained, or should publication remain withheld?
Options: retain only after explicit freshness/safety/equivalence criteria are approved; keep current conservative NO_RECOMMENDATION with clarification. Until a policy is approved, retention is PENDING_USER_DECISION and the implemented outcome is non-publishable. This does not block the restricted local MVP or request a new financial threshold.
