#!/usr/bin/env bash
# Deploy apps to Cloudflare Pages via direct upload.
#
# Usage:
#   ./scripts/deploy.sh
#   ./scripts/deploy.sh marketing
#   ./scripts/deploy.sh dashboard
#   ./scripts/deploy.sh --preview
#   ./scripts/deploy.sh marketing --preview

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

APP=""
BRANCH="main"
ENV_FILE=".env.prod"

for arg in "$@"; do
  case "$arg" in
    marketing|dashboard) APP="$arg" ;;
    --preview) BRANCH="preview"; ENV_FILE=".env.local" ;;
    *) echo "Unknown argument: $arg"; exit 1 ;;
  esac
done

CLOUDFLARE_ACCOUNT_ID=$(npx dotenvx get CLOUDFLARE_ACCOUNT_ID -f "$ROOT_DIR/$ENV_FILE" 2>/dev/null)
CLOUDFLARE_API_TOKEN=$(npx dotenvx get CLOUDFLARE_API_TOKEN -f "$ROOT_DIR/$ENV_FILE" 2>/dev/null)

if [[ -z "$CLOUDFLARE_ACCOUNT_ID" || -z "$CLOUDFLARE_API_TOKEN" ]]; then
  echo "Error: Could not read CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN from $ENV_FILE"
  echo "Make sure .env.keys exists and contains the correct private key."
  exit 1
fi

export CLOUDFLARE_ACCOUNT_ID
export CLOUDFLARE_API_TOKEN

deploy_app() {
  local app_name="$1"
  local project_name="pnpm-convex-tanstack-template-${app_name}"
  local app_dir="$ROOT_DIR/apps/$app_name"

  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  Deploying: $project_name (branch: $BRANCH)"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""

  echo "→ Building $app_name..."
  (cd "$ROOT_DIR" && npx dotenvx run -f "$ENV_FILE" -- pnpm --filter "$app_name" build)

  echo ""
  echo "→ Deploying to Cloudflare Pages..."
  npx wrangler pages deploy "$app_dir/.output/public" \
    --project-name "$project_name" \
    --branch "$BRANCH"

  echo ""
  echo "✓ $project_name deployed successfully"
}

if [[ -z "$APP" ]]; then
  deploy_app "marketing"
  deploy_app "dashboard"
else
  deploy_app "$APP"
fi
