# PortoDaffa - Deploy Checklist ke Rumahweb

## SEBELUM MEMBELI Hosting

✅ Persiapan selesai:
- Workflow GitHub Actions sudah siap
- Script deploy manual sudah dibuat
- .env.production.example sudah dibuat
- Database menggunakan SQLite (bisa diubah ke MySQL setelah beli)

## SETELAH MEMBELI Hosting Rumahweb

### 1. Setup Database MySQL di cPanel
```
1. Login cPanel Rumahweb
2. Klik "MySQL Databases"
3. Buat database baru: db_portodaffa
4. Buat user + password
5. Assign user ke database dengan ALL PRIVILEGES
6. Catat: nama database, username, password
```

### 2. Setup FTP Credentials
```
1. Di cPanel, klik "FTP Accounts"
2. Buat FTP account baru
3. Folder root: /public_html/portodaffa
4. Catat: username FTP, password
```

### 3. Tambahkan Secrets di GitHub
```
1. Buka: https://github.com/raffiatalla90/Portofolio-Daffa/settings/secrets/actions
2. Add repository secret:
   - FTP_HOST = ftp.getmasjid.com (atau domain Rumahweb)
   - FTP_USER = username@domain.com
   - FTP_PASS = password_ftp
   - FTP_ROOT = /public_html/portodaffa
   - DB_HOST = localhost
   - DB_DATABASE = db_portodaffa
   - DB_USERNAME = user_db
   - DB_PASSWORD = pass_db
   - APP_URL = https://portodaffa.domain.com
   - APP_KEY = [generate dengan php artisan key:generate --show]
```

### 4. Push ke Main Branch
```bash
cd "/Users/raffiatmaja/Documents/Magang PT Tiga Serangkai/PortoDaffa"
git add .
git commit -m "feat: add Rumahweb deployment"
git push origin main
```

Workflow akan otomatis:
- Build assets
- Upload via FTP
- Migrate database

### 5. Verifikasi Deploy
```
1. Buka browser: https://portodaffa.domain.com
2. Cek logs di: cPanel → Metrics → Error Logs
3. Test fitur portfolio, CV upload, dll
```

## ALTERNATIF: Deploy Manual via FileZilla

Jika GitHub Actions bermasalah:

```bash
# 1. Build assets lokal
npm run build

# 2. Install dependencies
composer install --no-dev --optimize-autoloader

# 3. Generate .env.production
cp .env.production.example .env.production
# Edit .env.production dengan credential asli

# 4. Upload via FileZilla
- Host: ftp.getmasjid.com
- User: username@getmasjid.com
- Pass: password
- Folder tujuan: /public_html/portodaffa
- Upload SEMUA file (kecuali .git, node_modules, vendor)

# 5. Jalankan migrate via cPanel Terminal (jika ada)
php artisan migrate --force
php artisan optimize
```

## Troubleshooting

| Masalah | Solusi |
|---------|--------|
| 502 Bad Gateway | Cek PHP version (harus 8.3+), cek error log |
| SQLSTATE[HY000] [1045] | Cek credential database di .env |
| Class 'PDO' not found | Aktifkan extension pdo_mysql di cPanel |
| Storage not writable | chmod 777 storage bootstrap/cache |
| Assets 404 | Pastikan public/build ter-upload |

## Catatan Penting

1. **Database**: Ubah dari SQLite ke MySQL di .env:
```
DB_CONNECTION=mysql
DB_HOST=localhost
DB_DATABASE=nama_db
DB_USERNAME=user
DB_PASSWORD=pass
```

2. **Storage**: Folder storage harus writable (775 atau 777)

3. **Cron Jobs** (opsional):
```
# Untuk queue worker
* * * * * php /path/to/artisan queue:work --stop-when-empty
```

4. **SSL**: Sudah auto dari Let's Encrypt di Rumahweb

5. **Backup**: Selalu backup database sebelum migrasi
