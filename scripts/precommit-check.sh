#!/usr/bin/env bash
set -euo pipefail

# Runs the same checks that should gate every commit.
pnpm run lint
pnpm run format:check
pnpm run test
pnpm run typecheck
pnpm run build
