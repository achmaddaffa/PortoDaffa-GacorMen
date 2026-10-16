# Status Deploy PortoDaffa ke Rumahweb

## ❌ BELUM BISA Deploy

### Alasan:
1. **Port 21 FTP diblokir** oleh firewall Rumahweb
2. **Domain belum aktif** - akun achp5832 belum punya hosting aktif
3. **Belum ada server** untuk dituju

---

## ✅ Yang Sudah Siap:

### Files yang dibuat:
```
.github/workflows/deploy-rumahweb.yml   ← GitHub Actions utama
deploy.sh                               ← Script manual
DEPLOY-CHECKLIST.md                     ← Panduan lengkap
.env.production.example                 ← Template environment
```

### App state:
- Assets sudah di-build (`public/build/`)
- Composer dependencies ready
- SQLite database (akan diganti MySQL setelah beli hosting)

---

## 📋 Langkah Selanjutnya:

### 1. Beli Hosting Rumahweb
- Pilih paket **Unlimited S** atau yang support SSH/FTP
- Bayar via VA/QRIS (langsung aktif)

### 2. Tunggu Aktivasi
- Biasanya 5-30 menit
- Dapat email dengan:
  - Username cPanel
  - Password cPanel
  - FTP credentials
  - Domain/subdomain

### 3. Setup GitHub Secrets
Masuk ke: https://github.com/raffiatalla90/Portofolio-Daffa/settings/secrets/actions

Tambahkan secrets:
| Secret | Value |
|--------|-------|
| `FTP_HOST` | ftp.rumahweb.net atau IP server |
| `FTP_USER` | username@domain.com |
| `FTP_PASS` | password FTP |
| `FTP_ROOT` | /public_html/portodaffa |
| `DB_HOST` | localhost |
| `DB_DATABASE` | nama_db |
| `DB_USERNAME` | user_db |
| `DB_PASSWORD` | pass_db |
| `APP_URL` | https://portodaffa.domain.com |
| `APP_KEY` | base64:xxxx |

### 4. Push Code
```bash
git add .
git commit -m "feat: ready for rumahweb deployment"
git push origin main
```

### 5. Workflow Jalan Otomatis
- Build assets
- Upload via FTP
- Migrate database
- Optimize

---

## 🚨 Troubleshooting

| Masalah | Solusi |
|---------|--------|
| FTP timeout | Cek port 21 terbuka di firewall |
| 502 Bad Gateway | PHP version harus 8.3+ |
| DB error | Cek credential MySQL di cPanel |
| Assets 404 | Pastikan public/build ter-upload |

---

## 💡 Alternatif Tanpa Rumahweb

Kalau mau coba dulu sebelum beli, bisa deploy ke:
- **Render.com** (sudah jalan sekarang)
- **Fly.io** (free tier)
- **Railway.app** (free tier)

---

**Status:** Menunggu pembelian hosting Rumahweb.
