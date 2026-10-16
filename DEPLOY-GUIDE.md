# Deployment Guide - PortoDaffa ke Rumahweb

## Status Saat Ini
- ✅ Code sudah siap di folder `~/Downloads/Magang PT Tiga Serangkai/PortoDaffa`
- ✅ Workflow GitHub Actions sudah dibuat
- ⏳ Menunggu aktivasi hosting Rumahweb

---

## Langkah-langkah Deploy

### 1. Setelah Membeli Hosting Rumahweb

#### A. Catat Informasi dari Email
Rumahweb akan mengirim email berisi:
- **Username cPanel** (contoh: achp5832)
- **Password cPanel**
- **Hostname cPanel** (contoh: server1.rumahweb.net:2083)
- **FTP Host** (contoh: ftp.rumahweb.net)
- **FTP Username** (contoh: achp5832@domain.com)
- **FTP Password**

#### B. Buat Database MySQL
1. Login ke cPanel
2. Klik **MySQL Databases**
3. Buat database baru (catat nama database)
4. Buat user + password (catat keduanya)
5. Assign user ke database → ALL PRIVILEGES

#### C. Buat FTP Account (opsional)
1. Klik **FTP Accounts** di cPanel
2. Buat akun FTP baru dengan password

---

### 2. Setup GitHub Secrets

Masuk ke: https://github.com/raffiatalla90/Portofolio-Daffa/settings/secrets/actions

Tambahkan secrets berikut:

| Secret Name | Value |
|-------------|-------|
| `FTP_HOST` | ftp.rumahweb.net (atau hostname dari email) |
| `FTP_USER` | username@domain.com atau username cPanel |
| `FTP_PASS` | password FTP |
| `FTP_ROOT` | /public_html/portodaffa |
| `DB_HOST` | localhost |
| `DB_DATABASE` | nama_database |
| `DB_USERNAME` | user_database |
| `DB_PASSWORD` | pass_database |
| `APP_URL` | https://portodaffa.domain.com |
| `APP_KEY` | generate dengan `php artisan key:generate --show` |
| `DEPLOY_TOKEN` | random token untuk unlock.php |

---

### 3. Deploy Otomatis via GitHub

```bash
# Di folder PortoDaffa
git add .
git commit -m "feat: ready for rumahweb deployment"
git push origin main
```

GitHub Actions akan:
1. Build assets (Vite)
2. Install composer dependencies
3. Upload via FTP
4. Run migration otomatis

---

### 4. Deploy Manual (Opsional)

Jika mau deploy manual, gunakan script:

```bash
# 1. Build assets
cd ~/Downloads/Magang\ PT\ Tiga\ Serangkai/PortoDaffa
npm run build

# 2. Generate .env.production
cp .env.production.example .env.production
# Edit .env.production dengan credential yang benar

# 3. Upload via curl/curlftpfs
curl -T - ftp://achp5832:Q9pDVgTTjT2547@ftp.rumahweb.net/public_html/portodaffa/ << 'EOF'
isi file
EOF

# 4. Atau gunakan FileZilla
# Host: ftp.rumahweb.net
# User: achp5832
# Pass: Q9pDVgTTjT2547
# Upload semua file (kecuali .git, node_modules, vendor)
```

---

### 5. Jalankan Migrations

Setelah upload, jalankan migrations via cPanel:
1. Masuk ke **Terminal** di cPanel (jika ada)
2. Atau gunakan **SSH** jika enabled:
   ```bash
   cd /home/achp5832/public_html/portodaffa
   php artisan migrate --force
   php artisan config:cache
   php artisan route:cache
   ```

---

## Troubleshooting

| Masalah | Solusi |
|---------|--------|
| FTP connection timeout | Port 21 mungkin diblokir firewall. Coba port 2121 atau gunakan SFTP port 2223 |
| 502 Bad Gateway | Cek PHP version (harus 8.3+), cek error log di cPanel |
| SQLSTATE[HY000] [1045] | Cek credential database di .env |
| Class 'PDO' not found | Aktifkan extension pdo_mysql di cPanel → PHP Settings |
| Storage not writable | chmod 777 storage bootstrap/cache |

---

## Catatan Penting

1. **Domain**: Ganti `portodaffa.domain.com` dengan domain asli
2. **SSL**: Rumahweb menyediakan SSL gratis Let's Encrypt
3. **Backup**: Selalu backup database sebelum migrasi
4. **Queue**: Jika pakai queue worker, setup cron job di cPanel

---

## Struktur Folder Target

```
/home/achp5832/public_html/portodaffa/
├── app/
├── bootstrap/
├── config/
├── database/
├── public/
│   ├── index.php
│   └── build/         ← assets dari Vite
├── resources/
├── routes/
├── storage/           ← wajib writable (chmod 777)
├── vendor/            ← diinstall via composer
├── .env               ← environment config
└── composer.json
```
