# PortoDaffa - Deployment Guide ke Rumahweb

## Quick Deploy (Rekomendasi)

### 1. Setup GitHub Secrets
Masukkan di repository Settings → Secrets and variables → Actions:
- `FTP_HOST` - Host FTP Rumahweb (contoh: `ftp.getmasjid.com`)
- `FTP_USER` - Username FTP
- `FTP_PASS` - Password FTP
- `FTP_ROOT` - Folder tujuan (contoh: `/public_html/portodaffa`)
- `APP_DOMAIN` - Domain target
- `APP_URL` - Full URL aplikasi
- `DB_HOST` - Host database (biasanya `localhost`)
- `DB_DATABASE` - Nama database MySQL
- `DB_USERNAME` - User database
- `DB_PASSWORD` - Password database
- `APP_KEY` - Key aplikasi (generate: `php artisan key:generate --show`)

### 2. Workflow otomatis
Push ke branch `main` akan trigger:
1. Build assets (Vite)
2. Install dependencies
3. Upload via FTP
4. Jalankan migrate & optimize

### 3. Manual Deploy
```bash
# Generate app key
php artisan key:generate --show

# Deploy manual
./deploy.sh
```

## Persiapan di Rumahweb

### 1. Buat Database MySQL
- Login cPanel → MySQL Databases
- Buat database baru (contoh: `db_portodaffa`)
- Buat user + password
- Assign user ke database dengan ALL PRIVILEGES

### 2. Upload Files
- Upload via FTP: FileZilla atau terminal `lftp`
- Extract ke folder domain (contoh: `/public_html/portodaffa`)

### 3. Setting .env
Copy `.env.production.example` jadi `.env`:
```
APP_ENV=production
APP_DEBUG=false
APP_URL=https://portodaffa.getmasjid.com
DB_CONNECTION=mysql
DB_HOST=localhost
DB_DATABASE=nama_database
DB_USERNAME=username
DB_PASSWORD=password
```

Generate APP_KEY:
```bash
php artisan key:generate
```

### 4. Migrasi Database
```bash
php artisan migrate --force
php artisan optimize
```

### 5. Symlink Storage (jika perlu)
```bash
php artisan storage:link
```

## Troubleshooting

### Error: "SQLSTATE[HY000] [1045] Access denied"
→ Cek credential database di .env

### Error: "Class 'PDO' not found"
→ Aktifkan extension pdo_mysql di cPanel → PHP Settings

### Error: "Storage not writable"
→ chmod 777 storage bootstrap/cache

### 502 Bad Gateway
→ Cek PHP version, harus 8.3+
→ Cek error log di cPanel

## Catatan Penting

1. **Database**: Gunakan MySQL (bukan SQLite) untuk production
2. **Node.js**: Tidak dipakai di runtime, hanya untuk build assets
3. **Queue**: Jika pakai queue worker, aktifkan di cPanel → Cron Jobs
4. **SSL**: Sudah auto dari Let's Encrypt di Rumahweb

## Struktur Folder Target

```
/public_html/portodaffa/
├── app/
├── bootstrap/
├── config/
├── database/
├── public/          ← Web root (symlink atau copy)
│   ├── index.php
│   └── build/
├── resources/
├── routes/
├── storage/         ← Wajib writable
├── vendor/
├── .env
└── composer.json
```
