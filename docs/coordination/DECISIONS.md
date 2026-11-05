# Журнал решений и разграничения статуса параметров (`DECISIONS.md`)

> Все записи ниже разделены на:
> - `DB_FACT` — неизменяемые данные из `FinAgent_Final_Database_Package.zip`;
> - `PRODUCT_DECISION` — утверждённые вами архитектурные и продуктовые правила;
> - `PROTOTYPE_ONLY` (`PROTOTYPE_POLICY`) — предварительные инженерные параметры, не имеющие эмпирической валидации (`G004–G006`) и требующие калибровки.

---

## История решений

### D-001 (`PRODUCT_DECISION`, 2026-11-03 18:53) — Бэкенд и хранилище
- **Решение:** Node.js + TypeScript бэкенд с локальной базой SQLite (`node:sqlite`); слой хранения изолирован за репозиторием для последующего переноса в Supabase.

### D-002 (`PRODUCT_DECISION`, 2026-11-03 18:53 / 19:42 / 20:53) — Модели LLM и квоты
- **Решение:** Использовать Gemini API (`Gemini 3.1 Flash Lite` и `Gemini 3.5 Flash Lite`) с ключом из `user-inputs/secrets/.env` + адаптер под OpenAI.
- **Уточнение (20:53):** Проверять фактическую доступность model IDs через API при старте и адаптивно обрабатывать rate limits (не зашивать `15 RPM / 500 RPD` как универсальную константу).

### D-003 (`PRODUCT_DECISION`, 2026-11-03 18:53) — Координация агентов
- **Решение:** Координатор + параллельные субагенты с жёстким владением файлами (`BOARD.md`), общими zod-контрактами (`shared/contracts/`) и обязательной финальной интеграционной и E2E-проверкой после объединения.

### D-004 (`DB_FACT` + `PRODUCT_DECISION`, 2026-11-03 19:42 / 20:36 / 20:53) — Импорт AS и Approved Action Catalog (`A001–A026`)
- **Решение:**
  1. Использовать реальный архив `FinAgent_Final_Database_Package.zip` (`24` источника `S001–S024`, `33` утверждения `C001–C033`, `18` правил `R001–R018`, `20` формул `F001–F020`, `26` шаблонов `A001–A026`).
  2. Сохранить без изменений оригинальные поля `status = 'PENDING_REVIEW'`, `approved_for_production = 'NO'` и `PENDING_ORIGINAL_REOPEN` (`C032, C033`).
  3. Разделить флаги `approved_for_production` (`NO`), `prototype_enabled` (`true` только для изолированного прототипа на синтетических/демо-данных) и `today_enabled`.
  4. `AK051–AK060` — это строки таблицы `agent_knowledge_mapping`, связывающие `AI Assistant` с действиями, а не самостоятельные `action_id`. Связь с `AI Assistant` не исключает действие из Today; доступность для Today определяется на уровне каталога действий.
  5. Разделить действия на три типа: `FINANCIAL_ACTION`, `VERIFICATION_ACTION` (без фиктивных $\Delta R, \Delta F, \Delta G$, выбираются по rule-based логике для снятия неопределённости), `EDUCATIONAL_ACTION` (показываются в `AI Assistant` или как доп. пояснение, не соревнуются в `F017`).

### D-005 (`PRODUCT_DECISION`, 2026-11-03 20:36 / 20:53) — Critical Action Coverage (Шаг 4 и 5A)
- **Решение:**
  1. Независимо от `AI Suggestion Generator` проверять условные `Critical Actions` по текущему `PI`:
     - `A001` — обязательный минимальный платёж с риском просрочки;
     - `A005` — пользователь не может покрыть минимум (`shortfall > 0`), требуются hardship options;
     - `A011` — риск кассового разрыва из-за запланированного автоматического перевода;
     - `A020` — выявленный предстоящий дефицит перед обязательным платежом (диагностическое действие, не считается автоматическим устранением дефицита).
  2. `Critical Actions` не проходят через обычный `W/V`-рейтинг, если требуют приоритетной обработки, но обязаны проходить все применимые `safety checks`.

### D-006 (`PROTOTYPE_ONLY`, 2026-11-03 20:36 / 20:53) — Весовые профили (Шаг 5B, `weight_policy_v1_prototype`)
- **Решение:**
  - Четыре предварительных профиля:
    - `Liquidity`: $w_R = 0.50,\; w_F = 0.35,\; w_G = 0.15$ — гистерезис: вход при $M < 1.0$, выход при $M \ge 1.25$;
    - `Expensive Debt`: $w_R = 0.20,\; w_F = 0.60,\; w_G = 0.20$ — при $M$ вне `Liquidity` и реальном начислении процентов по долгу с $\text{APR} \ge 15\%$;
    - `Goal`: $w_R = 0.20,\; w_F = 0.20,\; w_G = 0.60$ — при наличии активной незакрытой цели;
    - `Balanced`: $w_R = 0.34,\; w_F = 0.33,\; w_G = 0.33$ — в остальных случаях.

### D-007 (`PROTOTYPE_ONLY`, 2026-11-03 20:36 / 20:53) — Симуляция эффектов и нормализация (Шаг 5C, `normalization_policy_v1_prototype`)
- **Решение:**
  - Горизонт $H = 90\text{ дней}$ (+ отдельный 12-месячный прогноз по долгам для объяснений).
  - $K_R = 0.25\text{ мес}$, $K_F(x) = 0.05 \times E_{\text{month}}(x)$, $K_G = 0.20$.
  - Не использовать произвольный `K_F_min`: если $E_{\text{month}}(x)$ отсутствует или не позволяет надёжную нормализацию, возвращать статус отсутствующих данных (`NEEDS_DATA`).

### D-008 (`PRODUCT_DECISION` + `PROTOTYPE_ONLY`, 2026-11-03 20:53) — AI Evaluation Call и сложность $c_C(a)$ (Шаг 5C–5D, `effort_rubric_v1_prototype`)
- **Решение:**
  - Один отдельный `AI Evaluation Call` на цикл оценки для всех валидных кандидатов.
  - AI оценивает 4 компонента в `[0, 1]`: $T$ (`Time Requirement`), $S$ (`Steps & Procedural Complexity`), $D$ (`External Dependencies & Documentation`), $O$ (`Ongoing Effort`) с обоснованием, фактами из `PI/AS/Catalog` и флагами недостающей информации (`UNKNOWN`).
  - Код считает $c_C(a) = 0.25\,T + 0.25\,S + 0.25\,D + 0.25\,O$ (`PROTOTYPE_ONLY`, связан с `F016`).
  - Финансовые эффекты `R / F / G` AI не оценивает.

### D-009 (`PROTOTYPE_ONLY`, 2026-11-03 20:36 / 20:53) — Скоринг `F017` и Устойчивость `F018` (Шаг 5D–5E, `robustness_policy_v1_prototype`)
- **Решение:**
  - $S(a) = w_R v_R + w_F v_F + w_G v_G - \lambda_C c_C(a)$ при предварительном $\lambda_C = 0.10$.
  - 200 воспроизводимых симуляций с фиксированным `seed`, изменение весов $\pm 10\%$ вокруг выбранного профиля с нормализацией суммы до 1, предварительный порог $\operatorname{Stability} \ge 0.80$.
  - Анализ близких решений при $\Delta S < 0.03$: предпочтение меньшей неопределённости и риску, затем меньшей сложности (без повторного вычитания штрафа за сложность). Низкая `Stability` сама по себе не равна `NEEDS_DATA`.

### D-010 (`PRODUCT_DECISION`, 2026-11-03 20:36 / 20:53) — Мультивалютность, безопасность и фазирование Expo SDK 58
- **Решение:**
  - Frankfurter API (`?base=<CURRENCY>`, актуальные и исторические курсы с сохранением даты курса).
  - Аутентификация, авторизация на уровне `userId` (изоляция пользователей), шифрование чувствительных полей в БД и минимизация `PI` перед отправкой в LLM.
  - Никакого автоматического движения реальных денег.
  - Обновление `expo-mobile-app/` до Expo SDK 58 выделяется в **отдельную финальную фазу** после полной проверки бэкенда, веб-интерфейса и 14 сквозных сценариев.

### D-011 (`PRODUCT_DECISION`, 2026-11-04) — Immediate local-only prototype
- User answer verbatim: «Локальный прототип на моём компьютере — закрыть внешний доступ сейчас, полноценный вход позже».
- Backend must listen on loopback and reject nonlocal hosts/origins/remote peers; browser API access is limited to the approved local development/preview origins. No public deployment or new authentication provider in this batch.
- Client-asserted identity remains a local prototype mechanism, not real authentication or secure multi-user isolation. Real accounts/session authentication are deferred and must not be described as implemented.

### D-012 (`PRODUCT_DECISION`, 2026-11-04) — Windows per-user protected local encryption key
- User answer verbatim: «Автоматически защищать ключ средствами Windows для моей учётной записи; при переносе базы потребуется перенос ключа».
- Local persistent SQLite storage uses a random key protected under the Windows user's DPAPI context; no universal default encryption key for new records. Explicit environment keys remain an optional override, not printed in logs.
- Existing prototype records must be migrated without deleting data, and migration must be transactional/fail closed. A wrong or unavailable key must never trigger a silent database reset or plaintext fallback.
- Protect sensitive persisted agent outputs, decisions/traces, recommendations, feedback and chat as well as PI. Browser storage remains a separate boundary requiring additional work; SQLite encryption is not claimed to protect all browser copies.

### D-013 (PRODUCT_DECISION, 2026-11-05) — User-authorized full beta
User approved implementation of B01–B15: free registration name/email/password without verification code or invitations; password recovery by emailed link; no AI spending caps; Android+iPhone; Windows-hosted server+SQLite through HTTPS tunnel; real statements CSV/XLSX/XLS/text PDF, no OCR. Authenticated beta is a separate runtime/database; legacy local-only prototype D-011 remains separate. Session-derived identity required, DPAPI protection per D-012. AI context processing requires consent. Canonical AS statuses and unapproved financial action gates remain intact. Actual email delivery needs configured sender credentials; missing configuration must be explicit, never simulated as delivery.

### D-014 (PRODUCT_DECISION, 2026-11-05) — Seven-block experimental beta and reference UI
User explicitly selected experimental recommendations on real data and archive/design-source/design_reference.png Soft Glass UI. Enable recommendations only after per-user explicit opt-in, separate from AI consent. Preserve all AS source statuses and prototype-policy parameters. Full trace, agent cache and feedback persist encrypted. Accept is intention, Complete is separately confirmed bookkeeping without automatic money movement. Safety/data/affordability checks remain mandatory. This supersedes unconditional beta releaseGate and read-only chat restriction only for opted-in experimental accounts. No empirical validation or canonical production approval is implied.
