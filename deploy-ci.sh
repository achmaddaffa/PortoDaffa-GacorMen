#!/bin/bash
# Deploy PortoDaffa ke achmaddaffa.my.id tanpa SSH (FTP + webhook extract).
# Pakai: bash deploy-ci.sh
# Butuh: npm, composer, zip, curl. Kredensial dibaca dari .deploy-credentials.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"
CRED="$ROOT/.deploy-credentials"
[ -f "$CRED" ] || { echo "file .deploy-credentials tidak ada"; exit 1; }

get() { grep -E "^$1=" "$CRED" | head -1 | cut -d= -f2-; }
FTP=$(get FTP)                      # 103.247.8.72:21  user=achp5832  pass=...
FTP_HOST=$(echo "$FTP" | sed -E 's/^([0-9.]+):.*/\1/')
FTP_USER=$(echo "$FTP" | sed -E 's/.*user=([^ ]+).*/\1/')
FTP_PASS=$(echo "$FTP" | sed -E 's/.*pass=([^ ]+).*/\1/')
DOMAIN=$(echo "$(get URL)" | sed -E 's#https?://##')
SECRET=$(get DEPLOY_SECRET)
[ -n "$SECRET" ] || { echo "DEPLOY_SECRET belum diisi di .deploy-credentials"; exit 1; }

echo "[1/5] build"
composer install --no-dev --optimize-autoloader --no-scripts --no-interaction -q
npm ci --no-audit --silent
npm run build --silent

echo "[2/5] package"
rm -f release.zip
zip -qr release.zip . \
  -x '.git/*' -x '.github/*' -x 'node_modules/*' -x 'tests/*' \
  -x '.env' -x '.env.*' -x '.deploy-credentials' -x 'storage/logs/*' \
  -x 'bootstrap/cache/*.php' -x '*.zip' -x 'vendor.backup/*' -x '*.bak' -x '*.backup' -x '*.original'
printf '%s' "$SECRET" | shasum -a 256 | cut -d' ' -f1 > .deploy_secret

echo "[3/5] upload"
ftp_put() { curl -sS --ftp-pasv --ftp-create-dirs --connect-timeout 30 --max-time 600 --retry 3 --retry-delay 5 \
  -T "$1" "ftp://$FTP_HOST/$2" --user "$FTP_USER:$FTP_PASS"; }
ftp_put release.zip release.zip
ftp_put .deploy_secret .deploy_secret
ftp_put public/deploy-unzip.php public_html/deploy-unzip.php

echo "[4/5] extract"
curl -sS --max-time 600 "https://$DOMAIN/deploy-unzip.php?secret=$SECRET"

echo "[5/5] bersihkan zip lokal"
rm -f release.zip .deploy_secret
curl -sS --ftp-pasv "ftp://$FTP_HOST/" --user "$FTP_USER:$FTP_PASS" -Q "-DELE release.zip" -o /dev/null || true
echo "selesai — https://$DOMAIN"
