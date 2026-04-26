#!/usr/bin/env bash
# Sync environment variables from dotenvx to a Convex deployment.

set -euo pipefail

CONVEX_RUNTIME_VARS=(
  SITE_URL
  VITE_CONVEX_SITE_URL
)

ENV_FILE=".env.local"
if [[ "${1:-}" == "--prod" ]]; then
  ENV_FILE=".env.prod"
fi

echo "Syncing env vars from $ENV_FILE to Convex..."

for var in "${CONVEX_RUNTIME_VARS[@]}"; do
  value=$(dotenvx get "$var" -f "$ENV_FILE" 2>/dev/null || true)
  if [[ -n "$value" ]]; then
    dotenvx run -f "$ENV_FILE" -- npx convex env set "$var=$value" 2>/dev/null
    echo "  ✔ $var"
  else
    echo "  ⏭ $var (not set in $ENV_FILE, skipping)"
  fi
done

echo "Done."
