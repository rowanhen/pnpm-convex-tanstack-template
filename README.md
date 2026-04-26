# pnpm-convex-tanstack-template

Minimal monorepo template modeled on the `shareder` / `leitware` setup:

- `pnpm` workspace
- `tanstack-start` apps for `marketing` and `dashboard`
- root `convex/` backend
- `dotenvx` root env flow
- `oxlint` + `prettier`
- GitHub Actions for build/lint/typecheck and Convex deploy
- Cloudflare Pages deploy script

## Structure

```text
apps/
  marketing/
  dashboard/
packages/
  shared/
convex/
scripts/
.github/workflows/
```

## Setup

1. Run `pnpm install`.
2. Replace placeholder values in `.env.local`, `.env.convex`, `.env.prod`, and `.env.keys`.
3. If you want encrypted envs, run `dotenvx set ...` / `dotenvx encrypt`.
4. Start local dev with `pnpm dev`.

## Scripts

- `pnpm dev`
- `pnpm build`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm format`
- `pnpm deploy`
- `pnpm env:sync`

## Notes

- `marketing` runs on port `3000`.
- `dashboard` runs on port `3001`.
- `scripts/deploy.sh` assumes Cloudflare Pages project names:
  - `pnpm-convex-tanstack-template-marketing`
  - `pnpm-convex-tanstack-template-dashboard`
- `scripts/sync-env-to-convex.sh` syncs a small starter set of runtime vars. Expand it as your backend grows.
