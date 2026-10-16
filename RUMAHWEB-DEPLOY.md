# PortoDaffa - Rumahweb Deployment

## Status Saat Ini

Belum bisa deploy karena:
- Port 21 FTP diblokir firewall Rumahweb
- Akun achp5832 belum aktif (belum beli hosting)

## Yang Sudah Disiapkan

### Files Deploy
```
.github/workflows/deploy-rumahweb.yml   ← GitHub Actions utama (FTP upload)
.github/workflows/deploy-simple.yml     ← Alternatif sederhana
deploy.sh                               ← Script manual via lftp
.env.production.example                 ← Template environment
DEPLOY-CHECKLIST.md                     ← Panduan langkah demi langkah
```

### App Status
- Assets sudah di-build (`public/build/`)
- Composer dependencies ready
- Database SQLite (akan ganti MySQL setelah hosting aktif)

## Langkah Deploy Setelah Beli Hosting

### 1. Setup di cPanel Rumahweb
- Buat database MySQL
- Buat FTP account
- Catat: host FTP, username, password, folder root

### 2. GitHub Secrets
Masuk ke: https://github.com/raffiatalla90/Portofolio-Daffa/settings/secrets/actions

Tambahkan secrets:
| Secret | Contoh Value |
|--------|--------------|
| `FTP_HOST` | `ftp.rumahweb.net` atau IP server |
| `FTP_USER` | `achp5832@domain.com` |
| `FTP_PASS` | `password` |
| `FTP_ROOT` | `/public_html/portodaffa` |
| `DB_HOST` | `localhost` |
| `DB_DATABASE` | `db_portodaffa` |
| `DB_USERNAME` | `user_db` |
| `DB_PASSWORD` | `pass_db` |
| `APP_URL` | `https://portodaffa.domain.com` |
| `APP_KEY` | `base64:generated-key` |

### 3. Push ke Main
```bash
cd "/Users/raffiatmaja/Documents/Magang PT Tiga Serangkai/PortoDaffa"
git add .
git commit -m "feat: ready for rumahweb deployment"
git push origin main
```

### 4. Workflow Jalan Otomatis
- Build assets (Vite)
- Install composer dependencies
- Upload via FTP
- Migrasi database (via unzip.php atau manual)

## Troubleshooting

| Masalah | Solusi |
|---------|--------|
| FTP timeout port 21 | Coba port 990 (FTP SSL) atau cek firewall |
| 502 Bad Gateway | PHP version harus 8.3+ |
| DB error | Cek credential MySQL di cPanel |
| Assets 404 | Pastikan public/build ter-upload |
| Storage not writable | chmod 777 storage bootstrap/cache |

## Alternatif Tanpa FTP

Jika FTP tetap tidak bisa:
1. Download ZIP dari GitHub Actions
2. Upload manual via cPanel File Manager
3. Jalankan migrate via cPanel Terminal atau SSH
