# Supabase connection preparation

Create a Supabase project, record the database password locally, and open Connect in its dashboard. Copy the Session pooler connection URI for an IPv4-compatible persistent backend connection.

Copy server/.env.postgres.example to server/.env.postgres.local. Replace its placeholder with the dashboard URI and the URL-encoded database password. Keep SSL enabled. This local file is excluded by Git.

The application currently runs on SQLite. A PostgreSQL integration must implement the repository and encrypted persistence contracts, apply versioned migrations, copy and reconcile existing records, verify user isolation and rerun the seven-stage acceptance profiles. Auth and encryption keys need their own migration plan. The database URL provides database access and should stay in backend configuration.

After saving the local file, tell the implementer its path. Credentials should not be pasted in chat or included in report logs. The backend integration should first verify connectivity, then validate migrations on a disposable target before transferring existing data.

See the [official connection guide](https://supabase.com/docs/guides/database/connecting-to-postgres), [current storage map](testing/live-review/PI-STORAGE.md) and [database schema](DATABASE-SCHEMA.md).
