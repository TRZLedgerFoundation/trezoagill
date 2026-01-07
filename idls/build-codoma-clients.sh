#!/usr/bin/env bash
set -euo pipefail

# generate all the codoma clients (per their respective config files)
pnpm codoma run js --config ./idls/token_metadata/codoma.json

# run the repo's prettier settings on the generated files
pnpm prettier --write './packages/trezoagill/src/programs/**/generated/{*,**/*}.{ts,js}'
