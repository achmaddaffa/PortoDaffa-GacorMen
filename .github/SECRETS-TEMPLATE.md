# Rumahweb Deployment Secrets
# Tambahkan di GitHub Repository → Settings → Secrets and variables → Actions

FTP_HOST: ftp.getmasjid.com          # Host FTP Rumahweb
FTP_USER: username@getmasjid.com     # Username FTP
FTP_PASS: password123                # Password FTP
FTP_ROOT: /public_html/portodaffa   # Folder tujuan (contoh)
APP_DOMAIN: getmasjid.com           # Domain target
APP_URL: https://portodaffa.getmasjid.com

# Database MySQL Rumahweb
DB_HOST: localhost
DB_PORT: 3306
DB_DATABASE: db_portodaffa
DB_USERNAME: user_db
DB_PASSWORD: db_password
DB_CHARSET: utf8mb4
DB_COLLATION: utf8mb4_unicode_ci

# App Key (generate dengan: php artisan key:generate --show)
APP_KEY: base64:your-generated-key-here

DEPLOY_TOKEN: random-token-untuk-unzip
