> Core MVP revalidation 2026-11-04: **185/185 tests,14/14 E2E,27/27 web tests passed**; server/web types and production build passed. Current actual scenario data, Checker results, raw and normalized impacts, complexity and F018 are recorded in [core-mvp/scenarios.json](evidence/core-mvp/scenarios.json); [commands/output](handoffs/FIX-1.md). All12 captured ready decisions match exact VALID Checker candidates. No extra JSON/CSV synthetic profiles. Policy remains PROTOTYPE_ONLY; synthetic tests do not calibrate empirical benefit. Historical results below are retained as history and are superseded by this evidence.

# FinAgent (Vela) v1.1 — Отчёт по 14 обязательным E2E-сценариям и синтетическому аудиту (`synthetic-report.md`)

> **Повторная проверка 2026-11-04 (T-09):** все14 обязательных сценариев снова PASS в общем прогоне **111/111 тестов,8 файлов**. Подробные команды, границы mock/live/HTTP и новые регрессии — [T-09](handoffs/T-09.md), реальный вывод — [integration-tests.txt](evidence/T-09/integration-tests.txt). Дальнейший текст сохраняет исторический32-тестовый отчёт; это не новая эмпирическая калибровка. Дополнительных профилей JSON/CSV в user-inputs/synthetic нет.

> **Статус:** Все 14 обязательных сквозных сценариев (`server/tests/e2e/finagent-14-scenarios.test.ts`) и 18 юнит/контрактных тестов Фазы 1 (`server/tests/phase1-foundation.test.ts`) выполнены и успешно пройдены (**32 / 32 passed**).
> **Конфигурация политики:** `prototype_policy_bundle_v1.1` (`status: PROTOTYPE_ONLY`, `empiricallyValidated: false`, `server/config/prototype-policy.json`).

---

## 1. Сводная таблица 14 сквозных E2E-сценариев

| № | Сценарий | `snapshotId` | Активный профиль весов | `Critical` триггеры | Выбранное действие (`ActionType`) | `DecisionStatus` / `PriorityClass` | Детерминированный эффект (`R / F / G`) | Нормализованные `v_R, v_F, v_G` | Сложность `c_C(a)` (`F016`) | Итоговый `Score` (`F017`) / `Stability` (`F018`) | Статус |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **1** | Дефицит средств перед обязательным счётом за аренду (`€650` через 3 дня при `€400` ликвидности) | `snap_shortfall_01` | `liquidity_protection` (`0.50/0.35/0.15`) | `A005, A020` | `A005` / `A020` (`CRITICAL`) | `RECOMMENDATION_READY` (`CRITICAL`) | Опциональное накопление `A007` отклонено `Checker` (`INSUFFICIENT_AVAILABLE_CASH_OR_BILL_SHORTFALL`) | N/A (Шаг 5A Priority Policy) | N/A | N/A (Critical bypass) | **PASS** |
| **2** | Долг по карте с высоким `24% APR` и нехваткой денег даже на минимальный платёж (`€65` при `€20` кэша) | `snap_s2_hardship` | `liquidity_protection` | `A005, A020` | `A005` (`FINANCIAL_ACTION`) | `RECOMMENDATION_READY` (`CRITICAL`) | Защита от просрочки (`R008`, `S004`, `C017–C020`); `A002` заблокирован | N/A (Шаг 5A Priority Policy) | N/A | N/A (Critical bypass) | **PASS** |
| **3** | Долг с неизвестным `APR = null` и `minimumPayment = null` | `snap_unknown_debt_01` | `liquidity_protection` | — | `A004` (`VERIFICATION_ACTION`) | `RECOMMENDATION_READY` (`VERIFICATION_UNLOCK`) | `NULL` (без фиктивных `R/F/G`); `A002` в статусе `NEEDS_DATA` (`debt_apr, debt_minimum_payment`) | `NULL` | `NULL` | `NULL` | **PASS** |
| **4** | Перевод между двумя одинаково ликвидными личными счетами (`acc_checking_eur` $\rightarrow$ `acc_secondary_checking_eur`) | `snap_baseline_01` | `liquidity_protection` | — | `A010` (`FINANCIAL_ACTION`) | `COMPUTED` (`NORMAL`) | $\Delta R = 0\text{ мес.}$, $\Delta F = €0$, $\Delta G = 0$ | $v_R = 0, v_F = 0, v_G = 0$ | `0.1500` | `0.0000` / `100%` | **PASS** |
| **5** | Профиль с `0` активных финансовых целей (`goals = []`, $M = 2.0$, $\text{APR} = 9.9\%$) | `snap_zero_goals_01` | `balanced` (`0.34/0.33/0.33`, не `goal_advancement`!) | — | `A002` (`FINANCIAL_ACTION`) | `RECOMMENDATION_READY` (`NORMAL`) | `A012` отклонён `Checker` (`NO_ACTIVE_GOAL`, `R012`); $\Delta G = 0$ | $v_G = 0$ | `0.1625` | `0.0800` / `100%` | **PASS** |
| **6** | `AI Suggestion Generator` пропускает критическое действие при опасном автопереводе (`€450`), вызывающем кассовый разрыв (`F004 < 0`) | `snap_risky_autotransfer_01` | `liquidity_protection` | `A011` (`CRITICAL_COVERAGE`) | `A011` (`FINANCIAL_ACTION`) | `RECOMMENDATION_READY` (`CRITICAL`) | `Critical Action Coverage` независимо находит и добавляет `A011`, предотвращая дефицит `€250` | N/A (Шаг 5A Priority Policy) | N/A | N/A (Critical bypass) | **PASS** |
| **7** | `AI Evaluation Call` возвращает невалидный (`1.85`) или `UNKNOWN` балл для `T, S, O` | `snap_s7_complexity` | `liquidity_protection` | — | `A007` (`FINANCIAL_ACTION`) | `RECOMMENDATION_READY` (`NORMAL`) | Детерминированный фоллбэк к `baseline_complexity` каталога (`usedCatalogFallback = true`, `hasUnknownComponents = true`) | `uncertaintyScore = 0.75` | `0.1250` (`F016`) | `0.1800` / `100%` | **PASS** |
| **8** | `VERIFICATION_ACTION` (`A014`) разблокирует `FINANCIAL_ACTION` (`A015` — отмена подписки `€29.99/мес.`) в следующем цикле | `snap_s8_sub_unlock` | `liquidity_protection` | — | Цикл 1: `A014` (`VERIFICATION_ACTION`) $\rightarrow$ Цикл 2: `A015` (`FINANCIAL_ACTION`) | Цикл 1: `VERIFICATION_UNLOCK` $\rightarrow$ Цикл 2: `RECOMMENDATION_READY` (`NORMAL`) | Цикл 2: 90-дневная экономия `€89.97` (`3 × €29.99`), 12-месячная `F011` экономия `€359.88` | $v_R = 0, v_F = 1.0, v_G = 0$ | `0.2125` (`F016`) | `0.3288` / `100%` | **PASS** |
| **9** | Одновременное срабатывание нескольких `Critical Actions` (`A011` + `A001` + диагностическое `A020`) | `snap_risky_autotransfer_01` | `liquidity_protection` | `A011` (rank 1), `A001` (rank 3), `A020` (rank 4) | `A011` (`FINANCIAL_ACTION`) | `RECOMMENDATION_READY` (`CRITICAL`) | Действия, напрямую устраняющие дефицит (`A011, A001`, `resolvesCriticalProblemDirectly = true`), ранжируются строго выше `A020` (`false`) | N/A (Шаг 5A Priority Policy) | N/A | N/A (Critical bypass) | **PASS** |
| **10** | Обновление `PI` (`snapshotVersion`) во время расчёта + подавление дублей и кэширование `Stale(y)` | `snap_baseline_01` | `liquidity_protection` | — | `A008` / `A007` | Run 1: `COMPLETED` $\rightarrow$ Run 2: `DUPLICATE_SUPPRESSED` $\rightarrow$ Run 3: `SUPERSEDED_BY_NEWER_SNAPSHOT` | Устаревший прогон не перезаписывает Today (`publishedToToday = false`); `BehaviorAgent` и `DebtAgent` переиспользуют кэш (`cachedReused = true`) | Валидный расчёт `v_R, v_F, v_G` | `0.1250` | `0.2625` / `100%` | **PASS** |
| **11** | Обратная связь пользователя (`Accept` / `Adjust` с ре-валидацией `Checker` / `Decline`) | `snap_baseline_01` | `liquidity_protection` | — | `A008` (declined) $\rightarrow$ `A007` | `ACCEPTED` $\rightarrow$ `ADJUSTMENT_REJECTED` (`€2500`) $\rightarrow$ `ADJUSTED` (`€60`) $\rightarrow$ `DECLINED_AND_RERUN` | `Accept` не списывает баланс; опасный `Adjust €2500` блокируется `Checker`; `Decline` исключает отклонённое действие и выбирает следующее | Пересчитано для альтернативы | `0.1250` | `0.2625` / `100%` | **PASS** |
| **12** | Близкое решение `F018` ($\Delta S < 0.03$) + Гистерезис `liquidity_protection` ($M = 1.15$) | `snap_baseline_01` | `liquidity_protection` (`hysteresisApplied = true` при $M = 1.15$) | — | `A007` (выиграл tie-breaker у `A008` с `UNKNOWN` фактором) | `RECOMMENDATION_READY` (`NORMAL`) | Tie-breaker выбирает кандидата с меньшей неопределённостью и риском, затем меньшей сложностью **без повторного вычитания $\lambda_C c_C(a)$** | $v_R = 0.4, v_F = 0, v_G = 0.5$ | `0.1125` | `0.2638` / `200 sims` | **PASS** |
| **13** | Мультивалютный профиль с отсутствующим курсом `KGS` в Frankfurter ECB и устаревшим курсом `HUF` (>48ч) | `snap_multicurrency_01` | `liquidity_protection` | — | `A008` / `A007` | `RECOMMENDATION_READY` (`dataQualityStatus = 'FX_WARNING'`) | `KGS` помечен `UNAVAILABLE` (`rate = 0`, не выдумывается курс `1:1`); `HUF` помечен `STALE` | Расчёт строго по проверенной базовой валюте `EUR` | `0.1250` | `0.2625` / `100%` | **PASS** |
| **14** | Безопасность: изоляция пользователей (`403 Forbidden`), шифрование `AES-256-GCM` в SQLite и минимизация `PI` (`R015, S019`) | `snap_baseline_01` | `liquidity_protection` | — | `A008` / `A007` + `AI Assistant` (`AK051–AK060`) | `403 FORBIDDEN_CROSS_USER_ACCESS` для чужого `userId` | `pi_states.encrypted_payload` хранит `enc:v1:...`; `minimizePIForLLM` очищает `institution`, `notes`, `concernNotes` перед отправкой в LLM | Полная изоляция подтверждена | `0.1250` | `0.2625` / `100%` | **PASS** |

---

## 2. Реальный вывод тестового прогона

```text
 RUN  v3.2.7 C:/Users/sanat/OneDrive/Desktop/vela1/server

 ✓ tests/phase1-foundation.test.ts (18 tests) 135ms
 ✓ tests/e2e/finagent-14-scenarios.test.ts (14 tests) 222ms

 Test Files  2 passed (2)
      Tests  32 passed (32)
```

## UI-ZERO-1 / SDK58-PHONE — 2026-11-04

- New human-input profile: user-inputs/synthetic/ui-zero/profile.json; not a server snapshot or uploadable JSON profile. Normal, empty, unknown debt, shortfall, mixed-funds and no-goal manual branches are documented in docs/testing/UI-ZERO-GUIDE-RU.md. These branches are not claimed as completed device tests.
- Parser fixtures executed with the production parser: 8 main operations; 1 savings transfer leg; same file adds 0; overlap adds 1 and skips 1; malformed CSV accepts -12.50 and retains 2 rejected rows; unsupported text adds 0. Seven new tests passed.
- Full server suite: 15 files, 192 tests passed. Mandatory scenarios: 14/14 passed. Detailed snapshotId/readiness/profile/checker/impacts/complexity/score/stability traces are retained in evidence/core-mvp/scenarios.json from FINAGENT_CAPTURE_EVIDENCE=1.
- For parser-only/manual-input fixtures, recommendation score, action selection, complexity and stability are not applicable until a review cycle receives a completed snapshot; no values fabricated. This batch does not calibrate policy parameters or validate empirical suitability.
- Expo: typecheck passed; Android Hermes export passed. External tunnel and local Android manifest HTTP 200. Browser preview confirmed first-step welcome, empty name/email, validation blocks empty Continue, valid synthetic input advances to step 3, reload starts at step 1. Physical-device/full UI acceptance remains manual.
- No canonical AS fields, formulas, prototype-policy thresholds or backend network boundary changed.

## Latest beta verification
249 tests / 21 suites passed in the full deterministic run. Final post-fix focused run: beta-http7 + beta-financial8 =15 passed. Native Android/iOS/web export and typecheck passed. HTTPS API and Expo Android manifest each returned HTTP200. Current QR: evidence/beta/expo-qr.png. Guide: docs/testing/BETA-TEST-RU.md. Actual device run not performed. No new calibration or canonical policy approval claimed.
