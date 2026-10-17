# Status Deploy PortoDaffa — achmaddaffa.my.id

## LIVE (17 Okt 2026)

- URL: https://achmaddaffa.my.id
- Hosting: Rumahweb cPanel `achp5832` (IP 103.247.8.72, PHP 8.4.21)
- Docroot: `/home/achp5832/public_html` — app root di `/home/achp5832` (BUKAN public_html)
- DB: MySQL `achp5832_porto` / user `achp5832_porto` (localhost)
- Migrasi + seed OK: profiles=1 projects=5 skills=12 experiences=8 users=1
- Admin: `/login` — `admin@daffa.eng`, password ada di `.deploy-credentials` (gitignored)

## Cara deploy update

FTP port 21 terbuka. SSH port 22 closed. `exec/shell_exec/popen` di-disable di PHP,
jadi artisan tidak bisa dipanggil dari web biasa — pakai script bootstrap manual
(`require vendor/autoload.php` + `bootstrap/app.php` + Console Kernel), lalu hapus lagi.

1. `npm run build`
2. Upload `public/build/assets/*` + `manifest.json` ke DUA tempat:
   - `public_html/build/` (dipakai Vite manifest saat runtime)
   - `public/build/` di app root (cadangan kalau path berubah)
3. Kalau file PHP berubah: zip app → extract ke `/home/achp5832` (lewati vendor kalau tidak berubah)
4. Kalau `.env` berubah: hapus `bootstrap/cache/*.php` (config cache lama)

## Catatan penting

- Folder `public/cv/` bentrok dengan route `GET /cv` → dipindah ke `public/dokumen/`
- `.htaccess` docroot memblokir `/vendor`, `/resources`, `/storage`, `/bootstrap`, `/app`,
  `/config`, `/database`, `/routes` + file `.env|.sqlite|.db|.log|.md|.lock|.json`
- Semua script helper (unzip/extract/info.php/pd_setup) sudah dihapus dari server
- Workflow `.github/workflows/deploy-rumahweb.yml` belum dipakai (secrets belum diisi,
  dan alurnya upload source penuh tiap push — lebih lambat dari sync asset manual)
