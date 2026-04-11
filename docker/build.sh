#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
#  Build aitroop-home image
#
#  Usage:
#    bash docker/build.sh [TAG]
#
#  Default tag: aitroop-home:latest
# ─────────────────────────────────────────────────────────────
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
TAG="${1:-aitroop-home:latest}"

echo "▶ Building image: $TAG"
docker build \
  --platform linux/amd64 \
  --progress=plain \
  -t "$TAG" \
  -f "$SCRIPT_DIR/Dockerfile" \
  "$PROJECT_ROOT"

echo ""
echo "✓ Image built: $TAG"
echo "  Run: docker run -d -p 8080:8080 --name aitroop-home $TAG"
