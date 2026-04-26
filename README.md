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

## Env Setup

This template uses `dotenvx` from the repo root so local dev, builds, deploys, and Convex all read from the same small set of env files.

- `.env.local`: local app runtime values and local deploy credentials
- `.env.convex`: local Convex deployment target used by `convex dev` / `convex codegen`
- `.env.prod`: production deploy values for Pages and Convex
- `.env.keys`: private `dotenvx` decryption keys; this file is gitignored and should never be committed

Typical flow:

```bash
pnpm install

# edit placeholders in the checked-in env files
$EDITOR .env.local
$EDITOR .env.convex
$EDITOR .env.prod

# keep private dotenvx keys local only
$EDITOR .env.keys

# start local development
pnpm dev
```

If you want encrypted env files instead of plain placeholders, use `dotenvx` directly:

```bash
npx dotenvx set FOO bar -f .env.local
npx dotenvx encrypt -f .env.local
```

The root scripts already run through `dotenvx`, so you usually do not need to prefix commands manually.

## Cloudflare Setup

The default deployment model is split across two repos:

- `cf-infra`: Terraform creates Cloudflare Pages projects, attaches custom domains, and manages DNS
- app repo: `scripts/deploy.sh` builds the app and uploads it with `wrangler pages deploy`

That split is intentional. Infra changes happen in `cf-infra`; normal code deploys happen from the app repo.

Default assumptions in this template:

- there are two Cloudflare Pages projects, one for `marketing` and one for `dashboard`
- project names follow `<project-name>-marketing` and `<project-name>-dashboard`
- `scripts/deploy.sh` deploys each app to its matching Pages project
- Cloudflare credentials come from `.env.local` for preview-style deploys and `.env.prod` for production deploys

Example flow for a new project:

1. Add the Pages projects and domains in `cf-infra`.
2. Run `terraform plan` / `terraform apply` there.
3. Set `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` in this repo.
4. Run `pnpm deploy` or `pnpm deploy:marketing` / `pnpm deploy:dashboard`.

One important constraint from the current `cf-infra` setup: Terraform owns the Pages project and domain wiring, while this repo only owns the uploaded build output.

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
