<?php

/**
 * Penerima deploy: ekstrak release.zip ke app root lalu salin folder public/ ke docroot.
 * Dipanggil workflow GitHub Actions: /deploy-unzip.php?secret=...
 * Secret tidak disimpan di file ini — hanya hash-nya, di ../.deploy_secret (luar docroot).
 */
declare(strict_types=1);

$secretFile = getenv('PD_SECRET_FILE') ?: dirname(__DIR__) . '/.deploy_secret';
$appRoot    = getenv('PD_APP_ROOT') ?: dirname(__DIR__);
$publicRoot = getenv('PD_PUBLIC_ROOT') ?: __DIR__;
$zipFile    = getenv('PD_ZIP') ?: $appRoot . '/release.zip';

header('Content-Type: text/plain; charset=utf-8');
set_time_limit(600);

$expected = is_file($secretFile) ? trim((string) file_get_contents($secretFile)) : '';
$given    = hash('sha256', (string) ($_GET['secret'] ?? ''));
if ($expected === '' || !hash_equals($expected, $given)) {
    http_response_code(403);
    exit("Forbidden\n");
}

if (!is_file($zipFile)) {
    http_response_code(500);
    exit("release.zip tidak ditemukan: $zipFile\n");
}

$zip = new ZipArchive();
if ($zip->open($zipFile) !== true) {
    http_response_code(500);
    exit("Gagal membuka release.zip\n");
}

// Ekstrak ke app root, tapi lewati folder public/ (disalin manual ke docroot).
$skip = ['public/'];
$ok = 0;
for ($i = 0; $i < $zip->numFiles; $i++) {
    $name = $zip->getNameIndex($i);
    foreach ($skip as $prefix) {
        if (str_starts_with($name, $prefix)) {
            continue 2;
        }
    }
    if ($zip->extractTo($appRoot, $name)) {
        $ok++;
    }
}
$total = $zip->numFiles;

// Salin isi public/ (build, dokumen, favicon, index.php) ke docroot DAN ke $appRoot/public. .htaccess tidak disentuh.
$targets = array_unique([$publicRoot, $appRoot . '/public']);
$copied = 0;
for ($i = 0; $i < $zip->numFiles; $i++) {
    $name = $zip->getNameIndex($i);
    if (!str_starts_with($name, 'public/') || str_ends_with($name, '/')) {
        continue;
    }
    $rel = substr($name, strlen('public/'));
    if ($rel === '.htaccess') {
        continue;
    }
    $content = $zip->getFromIndex($i);
    foreach ($targets as $base) {
        $target = $base . '/' . $rel;
        if (!is_dir(dirname($target))) {
            mkdir(dirname($target), 0755, true);
        }
        if (file_put_contents($target, $content) !== false) {
            $copied++;
        }
    }
}
$zip->close();
@unlink($zipFile);

// Cache config/route/views lama harus dibuang supaya update terbaca.
$cleared = 0;
foreach (glob($appRoot . '/bootstrap/cache/*.php') ?: [] as $f) {
    if (unlink($f)) {
        $cleared++;
    }
}
foreach (glob($appRoot . '/storage/framework/views/*.php') ?: [] as $f) {
    if (unlink($f)) {
        $cleared++;
    }
}
if (function_exists('opcache_reset')) {
    @opcache_reset();
}

// Migrasi opsional (?migrate=1): jalankan migrator tanpa butuh SSH/CLI.
$migrated = 'skipped';
if (($_GET['migrate'] ?? '') === '1') {
    try {
        require $appRoot . '/vendor/autoload.php';
        $app = require $appRoot . '/bootstrap/app.php';
        $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
        Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
        $migrated = trim(Illuminate\Support\Facades\Artisan::output()) ?: 'ok';
    } catch (Throwable $e) {
        $migrated = 'error: ' . $e->getMessage();
    }
}

echo "app_files=$ok/$total public_files=$copied cache_cleared=$cleared\n";
echo "migrate=$migrated\n";
echo 'php=' . PHP_VERSION . " app_root=$appRoot public_root=$publicRoot\n";
