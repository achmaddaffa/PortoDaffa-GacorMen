#!/bin/bash
# Manual deploy ke Rumahweb via FTP

set -e

FTP_HOST="ftp.getmasjid.com"
FTP_USER="username@getmasjid.com"
FTP_PASS="password"
FTP_ROOT="/public_html/portodaffa"

echo "Building assets..."
npm run build

echo "Installing dependencies..."
composer install --no-dev --optimize-autoloader --no-scripts

echo "Uploading via FTP..."
lftp -u $FTP_USER,$FTP_PASS sftp://$FTP_HOST << EOS
set ssl:verify-certificate no
cd $FTP_ROOT
mirror -R --exclude-glob=".git*" --exclude=glob="node_modules" --exclude=glob="vendor" --exclude=glob="storage/*" --exclude=glob="bootstrap/cache/*" . .
quit
EOS

echo "Deployment complete!"
echo "Next: run migrations via SSH or cPanel"
