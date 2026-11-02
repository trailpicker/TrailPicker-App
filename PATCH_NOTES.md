# TrailPicker reliability patch

This patch contains **changed files only**, extracted from the latest source-text export. It does **not** include the omitted `lib/weather/canada.json`, generated Prisma files, node_modules or a database.

## Apply

1. Back up or commit your existing project.
2. Overlay files in this ZIP onto the project root, keeping the paths intact.
3. From the real repository, run `npm install` (or regenerate and commit `package-lock.json`, then use `npm ci`), `npx prisma generate`, `npm run typecheck`, `npm run lint`, `npm test` and `npm run build`.
4. Manually test editing, import/replace/merge, history restore/undo, guest claims, public sharing, route planning and rapid quantity changes against a **test PostgreSQL database** before deploying.

## Key changes

- Build writes + history snapshots use a PostgreSQL per-build transaction lock and commit together (requires PostgreSQL; your datasource already uses it).
- Concurrent quantity mutations use an atomic conditional update with an invariant of 1–999.
- Import merge, add gear and gear-library actions respect the same maximum, under the lock.
- Build creation and custom gear values use shared strict validation.
- Logistics import, regular save and history restoration use one schema parser.
- Undo uses a freshness check before applying a revision.
- Public page passes an explicit safe build DTO; account IDs, trip logistics, reservations and day notes are excluded from serialization.
- Unified test/typecheck commands and CI workflow were added.

## Migration caveat

The supplied export includes only `prisma/migrations/migration_lock.toml`, and the complete existing database migration history is unavailable. This patch intentionally does **not** invent a baseline migration: that risks resetting or corrupting an existing database. The reliability changes above require no schema change. In your real repository, ensure historical migration SQL files are version-controlled and validate `npx prisma migrate deploy` against a disposable database before production.

## Follow-up / limits

- Existing legacy mock-based action tests were updated for the new transaction wrapper; they are not a substitute for real PostgreSQL integration tests.
- A real repository/dependency installation was not provided. Verify generated Prisma client types, lint, and the Next.js build locally.
- Large view components remain suitable for a separate UI-only refactor once the data integrity patch has passed tests. Avoid combining deep UI refactors with this database-transaction migration.
- The transaction lock only serializes writers that use this shared helper. New build write paths must also call `mutateBuildWithRevision`.
