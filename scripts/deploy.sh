#!/bin/bash
# Deploy script — pulls latest, rebuilds frontend, restarts server
# Run this on the EC2 instance after pushing to main.
set -e

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_DIR"

echo "=== Pulling latest code ==="
git pull origin main

echo "=== Installing dependencies ==="
npm ci

echo "=== Building production bundle ==="
NODE_OPTIONS="--max-old-space-size=4096" GENERATE_SOURCEMAP=false npm run build

echo "=== Restarting server ==="
pm2 restart frontend-server 2>/dev/null || systemctl restart frontend 2>/dev/null || echo "⚠  Restart your server manually: pm2 restart frontend-server"

echo "=== Done: frontend deployed ==="
