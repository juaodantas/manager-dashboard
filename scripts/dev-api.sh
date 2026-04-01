#!/bin/bash
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
API_DIR="$ROOT/apps/api"

# Load .env
set -a
# shellcheck source=/dev/null
source "$API_DIR/.env"
set +a

# Start postgres (idempotent)
docker compose -f "$ROOT/docker-compose.yml" up -d

# Wait for postgres to be healthy
echo "[api] Waiting for PostgreSQL..."
until docker compose -f "$ROOT/docker-compose.yml" exec -T db pg_isready -U manager -d manager_db > /dev/null 2>&1; do
  sleep 1
done
echo "[api] PostgreSQL ready"

# Run migrations
echo "[api] Running migrations..."
cd "$API_DIR"
npx typeorm-ts-node-commonjs migration:run -d src/infrastructure/database/typeorm/data-source.ts

# Run seed
echo "[api] Running seed..."
npx ts-node -r tsconfig-paths/register src/infrastructure/database/typeorm/seeds/seed.ts

# Start dev server
exec npx nest start --watch
