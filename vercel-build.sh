#!/bin/sh

set -eu

START_DIR="$(pwd)"

if [ -f "$START_DIR/pnpm-workspace.yaml" ]; then
  REPO_ROOT="$START_DIR"
elif [ -f "$START_DIR/../pnpm-workspace.yaml" ]; then
  REPO_ROOT="$(cd "$START_DIR/.." && pwd)"
else
  echo "Unable to locate pnpm workspace root from $START_DIR" >&2
  exit 1
fi

cd "$REPO_ROOT"

pnpm --filter @byzantium/core build
NUXT_IGNORE_LOCK=1 pnpm --filter playground generate

rm -rf "$START_DIR/dist"
cp -R "$REPO_ROOT/playground/.output/public" "$START_DIR/dist"
