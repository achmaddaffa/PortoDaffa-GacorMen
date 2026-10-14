#!/bin/sh
set -e

# Default port to 10000 (Render default) or 8080 if PORT is not set
export PORT="${PORT:-10000}"

echo "Starting container on PORT: $PORT"

# Replace ${PORT} placeholder in nginx config
envsubst '${PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# Ensure storage directories and permissions exist
mkdir -p /var/www/html/storage/framework/cache/data \
         /var/www/html/storage/framework/sessions \
         /var/www/html/storage/framework/views \
         /var/www/html/storage/logs \
         /var/www/html/bootstrap/cache

chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Run Laravel optimizations and migrations
if [ -n "$APP_KEY" ]; then
    echo "Caching configuration and routes..."
    php artisan storage:link --force || true
    php artisan config:cache || true
    php artisan route:cache || true
    php artisan view:cache || true

    if [ -n "$DB_HOST" ] || [ -n "$DB_URL" ]; then
        echo "Running database migrations..."
        php artisan migrate --force || echo "Migration skipped or failed"
        
        echo "Seeding default data (if needed)..."
        php artisan db:seed --force || echo "Seeding skipped or failed"
    fi
fi

echo "Starting Nginx and PHP-FPM via Supervisord..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
