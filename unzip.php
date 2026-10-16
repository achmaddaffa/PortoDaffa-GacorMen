<?php
/**
 * Auto-unzip & Setup Script
 * Akses via browser: https://achmaddaffa.my.id/unzip.php?token=TOKEN
 */

$token = $_GET['token'] ?? '';
$secret_token = 'portodaffa2024'; // Ganti dengan token random

if ($token !== $secret_token) {
    http_response_code(403);
    die('Access denied');
}

set_time_limit(300);
ini_set('memory_limit', '512M');

$output = [];
$return = 0;

echo "<h2>PortoDaffa Deployment Script</h2>\n";
echo "<pre>\n";

// 1. Unzip file
echo "1. Extracting zip file...\n";
exec('unzip -q portodaffa.zip -d . 2>&1', $output, $return);
echo implode("\n", $output) . "\n";
$output = [];

// 2. Set permissions
echo "\n2. Setting permissions...\n";
exec('chmod 777 storage bootstrap/cache public 2>&1', $output, $return);
echo implode("\n", $output) . "\n";
$output = [];

// 3. Copy .env.production.example to .env
echo "\n3. Creating .env file...\n";
if (file_exists('.env.production.example')) {
    copy('.env.production.example', '.env');
    echo ".env created from .env.production.example\n";
} else {
    echo "WARNING: .env.production.example not found!\n";
}

echo "\n";
echo "Deployment complete!\n";
echo "\nIMPORTANT: Update .env file with your database credentials.\n";
echo "Then run migrations via cPanel Terminal or wait for GitHub Actions.\n";
echo "\n<h3>Next Steps:</h3>\n";
echo "<ol>\n";
echo "  <li>Update .env with database credentials</li>\n";
echo "  <li>Run migrations: <code>php artisan migrate --force</code></li>\n";
echo "  <li>Generate app key: <code>php artisan key:generate</code></li>\n";
echo "  <li>Clear cache: <code>php artisan config:cache</code></li>\n";
echo "</ol>\n";

echo "</pre>\n";

// Cleanup zip
unlink('portodaffa.zip');
