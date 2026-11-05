# FinAgent (Vela) — Техническая и математическая спецификация (v1.1 Consolidated)

> **Статус документа:** Каноническая спецификация проекта. Объединяет архитектуру 7-шагового проактивного пайплайна, реальный пакет базы знаний `FinAgent_Final_Database_Package.zip` (`deliverable_version: 0.1-rebuilt`, `2026-11-01`) и утверждённые продуктовые и инженерные решения (`docs/coordination/DECISIONS.md`).
>
> **Разграничение уровней истины (обязательно для всех агентов и модулей):**
> 1. **ФАКТЫ ИЗ БАЗЫ (`DB_FACT`):** записи из `FinAgent_Normalized_Database.json` / CSV (`S001–S024`, `C001–C033`, `M001–M034`, `R001–R018`, `F001–F020`, `A001–A026`, `AE001–AE044`, `AR001–AR036`, `AF001–AF049`, `AK001–AK060`, `G001–G014`, `VA001–VA057`). Запрещено изменять их исходные статусы (`PENDING_REVIEW`, `PENDING_ORIGINAL_REOPEN`, `approved_for_production = NO`) ради обхода проверок.
> 2. **ПРИНЯТЫЕ ПРОДУКТОВЫЕ РЕШЕНИЯ (`PRODUCT_DECISION`):** архитектурные правила, состав 7 шагов, разделение типов действий, правила безопасности и пользовательского контроля, зафиксированные в `DECISIONS.md`.
> 3. **ПРЕДВАРИТЕЛЬНЫЕ ИНЖЕНЕРНЫЕ ПАРАМЕТРЫ (`PROTOTYPE_ONLY` / `PROTOTYPE_POLICY`):** численные веса профилей, пороги гистерезиса, коэффициенты $K_R, K_F, K_G$, веса рубрики сложности $0.25$, $\lambda_C = 0.10$, параметры 200 симуляций $\pm 10\%$ и порог $\operatorname{Stability} \ge 0.80$. Они **не являются эмпирически доказанными** (`G004, G005, G006`), явно версионируются и подлежат калибровке на синтетических и экспертных сценариях.

---

## 1. Семь операционных шагов пайплайна

| Шаг | Компонент | Ответственность | Выход |
|---|---|---|---|
| **1** | `Automatic Review Orchestrator` | Отслеживание событий `PI`, расчёт устаревания $\operatorname{Stale}(y) = \operatorname{InputChanged}(y) \lor \operatorname{PolicyChanged}(y) \lor \operatorname{Expired}(y)$, идемпотентный запуск только затронутых агентов | Запрос оценки, привязанный к неизменяемой версии `FinancialSnapshot` |
| **2** | `Financial Analyzer` | `FX Service` (Frankfurter API) + `Behavior Agent` (LLM) + `Debt Agent` (LLM + формулы долга) + `Shared Financial Calculator` (`F001–F015, F019, F020`) | Валидированный `FinancialSnapshot` с датами, курсами валют, неподтверждёнными полями и прогнозом ликвидности |
| **3** | `AI Suggestion Generator` | Генерация до 3 разнообразных кандидатов из `A001–A026` на основе минимизированного `PI`, проверенных записей `AS` (`VERIFIED`) и истории `feedback` | До 3 `CandidateAction` (только обнаружение возможностей, без выбора победителя) |
| **4** | `Checker + Critical Action Coverage` | Проверка `Catalog eligibility`, `Data sufficiency`, `Affordability` ($C_a(d) \ge B_{\min}(d)$), `Safety` (`R001–R018`), защита от двойного расходования + независимый поиск `Critical Actions` (`A001, A005, A011, A020`) и детерминированный fallback | Набор `VALID` кандидатов + лог `REJECTED` и `NEEDS_DATA` |
| **5** | `Final Recommendation Engine` | `5A Priority Policy` $\rightarrow$ `5B Weight Calculator` (4 профиля с гистерезисом) $\rightarrow$ `5C Action Impact Calculator` ($H=90$ дн.) + `AI Evaluation Call` (сложность `T, S, D, O`) $\rightarrow$ `5D Scoring Engine` (`F017`) $\rightarrow$ `5E Robustness Check` (`F018`, 200 симуляций) | Одно решение (`RECOMMENDATION_READY / NEEDS_DATA / NO_RECOMMENDATION`) + `DecisionTrace` |
| **6** | `Proactive Recommendation (Today)` | `Explanation Generator` (только перевод `DecisionTrace` в понятный текст без новых расчётов) + карточка на Today | Карточка Today (максимум 1 основное действие, его эффект, источники `AS`, кнопки `Accept / Adjust / Decline`) |
| **7** | `Feedback + PI Update` | Жизненный цикл `Proposed → Accepted / Adjusted / Declined → Completed / Expired` (`Accepted ≠ Completed`; `Adjusted` обязательно проходит повторный `Checker`) | Обновление `PI` и запуск нового цикла при существенных изменениях |

**`AI Assistant`** — отдельный диалоговый интерфейс, использующий `FinancialSnapshot`, сохранённые `decision_traces` и базу `AS` (`AK051–AK060`) для ответов на вопросы и образовательных объяснений.

---

## 2. Единственные владельцы формул `F001–F020`

Чтобы исключить расхождения и двойной счёт, каждая формула из `financial_formulas.csv` имеет **ровно одного владельца в коде**:

| ID | Формула в базе `AS` | Единственный модуль-владелец | Правило применения и согласование горизонтов |
|---|---|---|---|
| `F001` | `L = sum(accessible_cash_like_accounts) - restricted_amounts` | `SharedFinancialCalculator` (`liquidity.ts`) | Считает доступные ликвидные средства и отдельно защищённый резерв. Перевод между одинаково ликвидными счетами даёт $\Delta R = 0$ |
| `F002` | `M = L / E_month` | `SharedFinancialCalculator` (`liquidity.ts`) | Покрытие обязательных расходов в месяцах ($E_{\text{month}} > 0$, иначе `NEEDS_DATA`) |
| `F003` | `A = max(0, cash + confirmed_inflows_before_horizon - mandatory_outflows_before_horizon - buffer_floor)` | `SharedFinancialCalculator` (`cashflow.ts`) | Доступный кэш **для опциональных действий**. Не затирает отрицательный прогноз в `F004`/`F019` |
| `F004` | `cash_t = cash_0 + SUM(inflows_<=t) - SUM(outflows_<=t)` | `SharedFinancialCalculator` (`cashflow.ts`) | Подневная траектория кэша $C(d)$ на горизонте $H = 90$ дней **без** `max(0, ...)` — сохраняет отрицательный кассовый остаток (дефицит) |
| `F005` | `daily_rate = APR_decimal / 365` | `SharedFinancialCalculator` (`debtMath.ts`) | Дневная ставка при известном `APR` (если `APR === null` $\rightarrow$ `NEEDS_DATA`) |
| `F006` | `interest_day = principal_day * daily_rate` | `SharedFinancialCalculator` (`debtMath.ts`) | Начисление процентов по дням с учётом флага реального начисления процентов |
| `F007` | `P = B*r/(1-(1+r)^(-n))` | `SharedFinancialCalculator` (`debtMath.ts`) | Аннуитетный платёж для фиксированных кредитов |
| `F008` | `delta_I = interest_baseline - interest_after_action` | `SharedFinancialCalculator` (`debtMath.ts`) | Сэкономленные проценты отдельно на $H = 90$ дней (для score) и на $12$ месяцев (для объяснения). Выплата тела долга экономией не считается |
| `F009` | `n = -ln(1-B*r/P)/ln(1+r)` | `SharedFinancialCalculator` (`debtMath.ts`) | Срок погашения при фиксированном платеже (аналитическая метрика для `Debt Agent` и объяснений) |
| `F010` | `avoidable_cost = future_interest_and_fees_if_no_action - after_action_cost` | `SharedFinancialCalculator` (`debtMath.ts`) | Полная избежанная стоимость долга (проценты + комиссии/штрафы) за $H = 90$ дней |
| `F011` | `annual_saving = monthly_cancelled_cost * 12 - exit_fees - replacement_cost` | `SharedFinancialCalculator` (`recurringSavings.ts`) | Адаптируется к двум горизонтам: **1)** для `Impact Calculator` ($H = 90$ дней) считается по фактическим датам списаний внутри 90 дней минус `exit_fees` и 90-дневный `replacement_cost`; **2)** годовое значение `F011` сохраняется отдельно для карточки объяснения |
| `F012` | `goal_pct = min(1, max(0, saved_amount / target_amount))` | `SharedFinancialCalculator` (`goals.ts`) | Доля выполнения цели при `target_amount > 0` |
| `F013` | `required = max(0, target - current_saving) / months_remaining` | `SharedFinancialCalculator` (`goals.ts`) | Требуемый ежемесячный взнос для проверки достижимости дедлайна (`R012`, `A012`, `A013`) |
| `F014` | `delta_M = months_after_action - months_before_action` | `ImpactCalculator` (`impactCalculator.ts`) | $\Delta R(a,x) = M(x_H^a) - M(x_H^0)$ через вызов `F002` на состояниях $x_H^a$ и $x_H^0$ |
| `F015` | `delta_G = progress_after - progress_before` | `ImpactCalculator` (`impactCalculator.ts`) | $\Delta G(a,x) = G(x_H^a) - G(x_H^0)$ через вызов `F012` без двойного учёта с денежной экономией |
| `F016` | `C = documented_task_steps_or_minutes + calibrated_user_burden_model` | `ComplexityEvaluator` (`complexityEvaluator.ts`) | Связана с 4-факторной рубрикой `effort_rubric_v1_prototype`: $c_C(a) = 0.25\,T + 0.25\,S + 0.25\,D + 0.25\,O$ (`PROTOTYPE_ONLY`) |
| `F017` | `S(a) = w_R*v_R(a) + w_F*v_F(a) + w_G*v_G(a) - lambda_C*c_C(a)` | `ScoringEngine` (`scoringEngine.ts`) | Расчёт итогового балла для `FINANCIAL_ACTION` при $\lambda_C = 0.10$ (`PROTOTYPE_POLICY`) |
| `F018` | `p_win(i) = count(i is argmax S under sampled parameters) / N` | `RobustnessEngine` (`robustnessChecker.ts`) | 200 воспроизводимых симуляций ($\pm 10\%$ вокруг выбранного профиля весов, фиксированный `seed`) |
| `F019` | `shortfall = max(0, mandatory_due - liquid_available_by_due)` | `SharedFinancialCalculator` (`cashflow.ts`) | Дефицит перед обязательным платежом по дате; триггер для `A001, A005, A020` |
| `F020` | `fee_delta = future_baseline_fees - future_fees_after_change` | `SharedFinancialCalculator` (`recurringSavings.ts`) | Сэкономленные комиссии за горизонт $H = 90$ дней (только при подтверждённом тарифе) |

---

## 3. Классификация и правила каталога `A001–A026`

1. **Сохранение исходных статусов (`DB_FACT`):**
   Все 26 записей `A001–A026` импортируются с оригинальными `status = 'PENDING_REVIEW'` и `approved_for_production = 'NO'`.
2. **Разделение флагов доступа:**
   - `approved_for_production`: `'NO'` (из базы знаний — не изменяется).
   - `prototype_enabled`: `true` (разрешает работу в изолированном прототипе на синтетических и демо-данных).
   - `today_enabled`: `true` для `FINANCIAL_ACTION` и `VERIFICATION_ACTION`; `false` для чистых `EDUCATIONAL_ACTION` (`A021, A022, A023`).
3. **Связи `AK051–AK060` (`agent_knowledge_mapping`):**
   Записи `AK051–AK060` связывают `AI Assistant` с действиями `A004, A005, A006, A009, A013, A021, A022, A023, A025, A026` для объяснений и консультаций. Они **не являются отдельными action IDs** и **не блокируют** показ действия на Today, если у самого действия в каталоге `today_enabled = true` (например, `A005` при hardship или `A013` при недостижимом сроке цели).
4. **Три типа действий (`action_type`):**
   - `FINANCIAL_ACTION`: `A001, A002, A005, A007, A008, A010, A011, A012, A013, A015, A018, A019`.
   - `VERIFICATION_ACTION`: `A003, A004, A006, A009, A014, A016, A017, A020, A024, A025, A026`. Не получают искусственных денежных значений $\Delta R, \Delta F, \Delta G$; выбираются по rule-based логике, когда нужно устранить критическую неопределённость или разблокировать расчёт финансового действия.
   - `EDUCATIONAL_ACTION`: `A021, A022, A023`. Используются в `AI Assistant` или как сопутствующее пояснение (`today_enabled = false`), не конкурируют в формуле `F017`.

---

## 4. Critical Action Coverage и Priority Policy (Шаг 4 и Шаг 5A)

`Critical Action Coverage` выполняется детерминированным кодом **независимо от AI Suggestion Generator** по текущему состоянию `PI` и условиям триггера:

| ID | Действие | Тип | Условие срабатывания `Critical` ($P(a,x)=1$) по `PI` | Особое правило обработки |
|---|---|---|---|---|
| `A001` | Make required card minimum | `FINANCIAL_ACTION` | Обязательный минимальный платёж по карте наступает в пределах горизонта (напр., $\le 7$ дней), ещё не оплачен, и ликвидных средств достаточно для оплаты без нарушения `R001` | Идёт вне обычного `W/V`-рейтинга как приоритетное исполнение обязательства |
| `A005` | Request card hardship options | `FINANCIAL_ACTION` / `HARDSHIP` | Обязательный минимальный платёж наступает, но подтверждённый `shortfall > 0` (`F019`: средств не хватает даже на минимум, `R008`) | Приоритезируется вместо неподъёмного платежа; требует подтверждённого эмитента |
| `A011` | Pause risky automatic transfer | `FINANCIAL_ACTION` | Запланированный автоматический перевод на дату $d$ приводит к кассовому разрыву $C(d) < B_{\min}(d)$ перед обязательным платежом (`R001, R004`) | Устраняет рукотворный кассовый разрыв до его наступления |
| `A020` | Identify upcoming cash shortfall | `VERIFICATION_ACTION` | Прогноз $C(d)$ (`F004, F019`) показывает предстоящий дефицит перед обязательным счётом, и нет прямого автоматического перевода (`A011`), пауза которого сама полностью закрывает разрыв | **Диагностическое действие:** сигнализирует о дефиците и запрашивает недостающие данные/шаги, но **не считается автоматическим устранением дефицита** |

- Если найдены валидные `Critical Actions`, они **не проходят через обычный `W/V`-рейтинг**, а ранжируются по: **1) серьёзности риска (просрочка/овердрафт), 2) близости срока `due_date`, 3) способности реально устранить или снизить дефицит** (поэтому действие, реально закрывающее проблему, такое как `A001` или `A011`, стоит выше чисто диагностического `A020`). Все применимые `safety checks` и `data sufficiency` сохраняются.

---

## 5. Детальная математическая модель Шага 5B–5E (`PROTOTYPE_POLICY`)

### 5B. Персонализированные весовые профили $W = (w_R, w_F, w_G)$ с гистерезисом
1. **Liquidity protection** (`0.50 / 0.35 / 0.15`):
   - Вход в профиль при $M < 1.0\text{ мес}$ (`F002`).
   - **Гистерезис:** выход из профиля происходит только при $M \ge 1.25\text{ мес}$. Если в предыдущем цикле оценки у пользователя был активен профиль `Liquidity` и сейчас $1.0 \le M < 1.25$, сохраняется профиль `Liquidity`.
2. **Expensive debt** (`0.20 / 0.60 / 0.20`):
   - Применяется, когда пользователь не в профиле `Liquidity`, и есть хотя бы один подтверждённый долг с $\text{APR} \ge 15\%$, по которому **реально начисляются проценты** (либо истекает льготный `promo_end` внутри горизонта).
3. **Goal advancement** (`0.20 / 0.20 / 0.60`):
   - Применяется, когда не выполнены условия `Liquidity` и `Expensive debt`, и у пользователя есть **хотя бы одна активная незавершённая цель** ($A_j < T_j$, `target_amount > 0`). Если активной цели нет, этот профиль не выбирается.
4. **Balanced** (`0.34 / 0.33 / 0.33`):
   - Применяется во всех остальных случаях.

### 5C. Симуляция эффектов $V(a,x)$ и отдельный `AI Evaluation Call` для сложности $c_C(a)$

#### Детерминированный расчёт $v_R, v_F, v_G$ (только для `FINANCIAL_ACTION`):
- Горизонт симуляции: **$H = 90\text{ дней}$** (одинаковый для всех кандидатов цикла).
- Базовая траектория $x_H^0 = \operatorname{Simulate}(x, \varnothing, 90\text{d})$ и траектория с действием $x_H^a = \operatorname{Simulate}(x, a, 90\text{d})$.
- Эталоны нормализации (`normalization_policy_v1_prototype`, `PROTOTYPE_ONLY`):
  - $K_R = 0.25\text{ мес}$;
  - $K_F(x) = 0.05 \times E_{\text{month}}(x)$ (в `baseCurrency`). **Без произвольного `K_F_min`:** если $E_{\text{month}}(x)$ отсутствует, $\le 0$ или не позволяет надёжную нормализацию, возвращается статус недостающих данных (`NEEDS_DATA`), а не придуманный порог;
  - $K_G = 0.20$ (если у пользователя нет активной цели, $\Delta G = 0 \Rightarrow v_G = 0$).
- Нормализация:
  $$
  v_i(a,x) = \operatorname{clip}\!\left(\frac{\Delta M_i(a,x)}{K_i(x)},\; -1,\; 1\right)
  $$
- Сохраняются и `rawImpacts` (`months`, `currency`, `percentage_points`, плюс отдельный 12-месячный прогноз по долгам `debt12mProjection`), и нормализованные $v_R, v_F, v_G$, и флаги насыщения `isClipped`.

#### Отдельный `AI Evaluation Call` для оценки сложности $c_C(a)$ (`effort_rubric_v1_prototype`, связь с `F016`):
- Выполняется **один раз за цикл оценки** для пачки всех валидных кандидатов после `Checker` и `Critical Coverage`.
- Вход: минимизированный `PI snapshot`, релевантные результаты агентов, проверенные записи `AS` (`source_id`, `rule_id`), характеристики из `Action Catalog` и список валидных кандидатов.
- AI оценивает **4 компонента от `0` до `1`** (или возвращает `UNKNOWN`, если данных недостаточно):
  - $T \in [0,1]$ — `Time Requirement` (затраты времени);
  - $S \in [0,1]$ — `Steps & Procedural Complexity` (количество шагов и процедурная сложность);
  - $D \in [0,1]$ — `External Dependencies & Documentation` (зависимость от банка/кредитора/документов);
  - $O \in [0,1]$ — `Ongoing Effort` (необходимость регулярного контроля/повторения).
- Для каждого компонента AI обязан вернуть `rationale`, `supporting_facts` и `missing_info`.
- **Код** вычисляет итоговую сложность (`PROTOTYPE_ONLY` рубрика, с сохранением ссылки на `F016`):
  $$
  c_C(a) = 0.25\,T + 0.25\,S + 0.25\,D + 0.25\,O
  $$
- Если AI вернул `UNKNOWN` или некорректный формат по компоненту — код использует детерминированный профиль сложности из каталога и выставляет флаг `complexity_uncertainty = true` (не выдумывая ограничений пользователя).

### 5D. Итоговый скоринг (`F017`)
$$
S(a,x) = w_R(x)\,v_R(a,x) + w_F(x)\,v_F(a,x) + w_G(x)\,v_G(a,x) - \lambda_C\,c_C(a)
$$
где начальное $\lambda_C = 0.10$ (`PROTOTYPE_POLICY`).

### 5E. Проверка устойчивости (`F018 Robustness`)
- Реализуется как **новый модуль по спецификации** (не копируя глобальный `Dirichlet(1,1,1)` из `build_finagent.py`):
  1. $N = 200$ воспроизводимых симуляций с фиксированным `simulation_seed`.
  2. В каждой симуляции базовые веса выбранного на Шаге 5B профиля $(w_R, w_F, w_G)$ независимо варьируются в пределах $\pm 10\%$ ($w'_i = w_i \cdot (1 + \delta_i),\; \delta_i \in [-0.10, +0.10]$) и нормализуются так, чтобы $\sum w'_i = 1$.
  3. Дополнительно рассчитывается матрица чувствительности для $\lambda_C \in \{0, 0.05, 0.10, 0.15\}$ (для аналитики в `DecisionTrace`, без требования победы при всех $\lambda_C$).
  4. Предварительный порог публикации: $\operatorname{Stability}(a_1) \ge 0.80$ (`PROTOTYPE_POLICY`).
  5. Если $\Delta S = S(a_1) - S(a_2) < 0.03$, решение помечается как близкое (`isCloseDecision = true`): приоритет отдаётся кандидату с **меньшей неопределённостью данных и меньшим финансовым риском**, затем — с меньшей сложностью $c_C(a)$ (без повторного вычитания $\lambda_C c_C$).
  6. Низкая `Stability < 0.80` сама по себе **не приравнивается автоматически к `NEEDS_DATA`**: движок классифицирует причину (`MISSING_PI_DATA` $\rightarrow$ `NEEDS_DATA` / `VERIFICATION_ACTION`; `UNSTABLE_ASSUMPTIONS` $\rightarrow$ запрос уточнения или консервативный вариант; `CLOSE_VALID_ALTERNATIVES` $\rightarrow$ tie-breaker или сохранение текущей активной рекомендации).
