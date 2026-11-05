# Vela / FinAgent

Локальный прототип: сервер, веб-приложение и детерминированные финансовые расчёты.

## Запуск

В двух отдельных терминалах из корня проекта:

```powershell
cd server
npm ci
npm run dev
```

```powershell
cd react-app
npm ci
npm run dev
```

Откройте локальный адрес, который выведет Vite. Сервер по умолчанию использует порт 3001. Настройки и ключи провайдера: [user-inputs/README.md](user-inputs/README.md). Секреты не добавляйте в Git.

## Проверка

```powershell
cd server
npm run typecheck
npm test
```

```powershell
cd react-app
npx tsc --noEmit
npm run build
```

Веб-регрессии находятся в `server/tests/web-*.test.ts` и выполняются вместе с серверными тестами.

## Структура

- `react-app/` — текущее веб-приложение; рабочие иконки находятся в `react-app/public/assets/`.
- `server/` — API, SQLite, пайплайн рекомендаций и тесты.
- `shared/` — общие контракты, типы и финансовый калькулятор.
- `expo-mobile-app/` — отдельный мобильный прототип.
- `user-inputs/` — исходные материалы, локальные настройки и синтетические профили.
- `docs/SPEC.md`, `docs/coordination/DECISIONS.md` — спецификация и принятые решения.
- `archive/` — сохранённые материалы раннего прототипа и дизайна; текущая сборка их не использует.

Канонические записи AS и предварительные параметры политики имеют разные статусы. Правила работы с ними описаны в [AGENTS.md](AGENTS.md).

## Мобильный прототип — Expo SDK 58

```powershell
cd expo-mobile-app
npm ci
npm start -- --localhost
```

Для просмотра на этом компьютере: `npm run web -- --localhost` (обычно http://localhost:8081).
Проверки: `npm run typecheck`, `npx expo install --check`, `npx expo-doctor`, `npx expo export --platform all`.
Мобильное приложение пока является отдельным интерфейсным демо с демонстрационными данными, без подключения к серверу. Работа на физическом устройстве требует отдельной проверки и совместимого клиента Expo SDK 58. Сервер остаётся доступен только на этом компьютере.


## Authenticated mobile beta (work in progress)

The new API is separate from the original local prototype. From `server`, run `npm run beta`. Its database is `server/data/beta.sqlite`; Windows protects its key with DPAPI. Keep the database and protected key together for backup/restore under the same Windows account. Do not delete either file to resolve an error.

Copy `server/.env.beta.example` to `server/.env.beta.local` to configure password email. No message is sent until a real SMTP sender is configured. SMTP uses TLS. Set `BETA_RESET_URL` to your public HTTPS API address plus `/reset`.

Expose only port 3002 through an HTTPS tunnel; legacy port 3001 must stay local. In the mobile app, enter the HTTPS address ending in `/api/beta`, or set `EXPO_PUBLIC_API_URL` before starting Expo. Run `npm run friends` from `expo-mobile-app` for Expo Go access. The API and Expo tunnels have different addresses and both must remain running. Never enter your computer's localhost address on a phone.

Accounts use name, email and a 12–128 character password, with no email verification code. Sessions persist in native secure storage. Real-data financial recommendations remain gated pending policy approval; read-only records, import and analysis are available. Generic PDF tables may require manual CSV mapping; scanned PDFs are not OCR-supported.

Source documents remain until deletion. No scheduled backup rotation is enabled yet; any manually created backups remain until the operator removes them. Account/file deletion removes active data, not separately created offline backups. Physical Android/iPhone acceptance and SMTP delivery must still be verified before calling the full beta complete.
