#!/bin/bash
# Deploy script untuk Rumahweb - Portofolio-Daffa
# Gunakan: bash deploy.sh [deploy|test]

set -e

# === KONFIGURASI RUMAHWEB ===
FTP_HOST="ftp.rumahweb.net"
FTP_USER="achp5832"
FTP_PASS="Q9pDVgTTjT2547"
FTP_ROOT="/public_html/portodaffa"  # Ubah sesuai folder tujuan
APP_URL="https://portodaffa.rumahweb.net"  # Ubah sesuai domain

# === KONFIGURASI DATABASE (setelah hosting aktif) ===
DB_HOST="localhost"
DB_DATABASE=""  # Isi nama database dari cPanel
DB_USERNAME=""  # Isi username database
DB_PASSWORD=""  # Isi password database

# === PATH ===
APP_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BUILD_PATH="$APP_PATH/public/build"

# === WARNA ===
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

err() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# === CHECK DEPENDENCIES ===
check_deps() {
    log "Checking dependencies..."
    
    command -v npm >/dev/null 2>&1 || err "npm not found. Install Node.js first."
    command -v composer >/dev/null 2>&1 || err "composer not found. Install Composer first."
    command -v curl >/dev/null 2>&1 || err "curl not found."
    
    log "Dependencies OK"
}

# === BUILD ASSETS ===
build_assets() {
    log "Building assets..."
    cd "$APP_PATH"
    npm ci --silent
    npm run build
    log "Assets built successfully"
}

# === INSTALL DEPENDENCIES ===
install_dependencies() {
    log "Installing dependencies..."
    cd "$APP_PATH"
    composer install --no-dev --optimize-autoloader --no-scripts --quiet
    log "Dependencies installed"
}

# === TEST CONNECTION ===
test_connection() {
    log "Testing FTP connection..."
    
    # Test connectivity to FTP host
    if ! curl -s --connect-timeout 5 "ftp://$FTP_HOST/" >/dev/null 2>&1; then
        warn "Cannot connect to $FTP_HOST on port 21"
        warn "Possible reasons:"
        warn "  - Firewall blocking port 21"
        warn "  - Hosting not activated yet"
        warn "  - Wrong hostname"
        return 1
    fi
    
    # Test login
    if curl -s --connect-timeout 5 -u "$FTP_USER:$FTP_PASS" "ftp://$FTP_HOST/" >/dev/null 2>&1; then
        log "FTP connection successful!"
        return 0
    else
        err "FTP login failed. Check username/password."
    fi
}

# === UPLOAD VIA FTP ===
upload_files() {
    log "Uploading files to $FTP_HOST$FTP_ROOT..."
    
    # Create upload list (exclude git, node_modules, vendor, storage)
    local exclude_pattern="^.git$|node_modules$|vendor$|^storage/$|^bootstrap/cache$|^\.env$"
    
    # Use curl to upload files
    find "$APP_PATH" -type f \
        ! -path "*/.git/*" \
        ! -path "*/node_modules/*" \
        ! -path "*/vendor/*" \
        ! -path "*/storage/*" \
        ! -path "*/bootstrap/cache/*" \
        ! -name ".env" \
        ! -name "*.db" \
        -print0 | while IFS= read -r -d '' file; do
            # Get relative path
            local rel_path="${file#$APP_PATH/}"
            
            # Skip if path contains excluded patterns
            if [[ "$rel_path" =~ $exclude_pattern ]]; then
                continue
            fi
            
            # Upload file
            local upload_url="ftp://$FTP_USER:$FTP_PASS@$FTP_HOST$FTP_ROOT/$rel_path"
            curl -s --ftp-create-dirs -T "$file" "$upload_url" >/dev/null 2>&1
            
            if [ $? -eq 0 ]; then
                printf "."
            else
                echo -e "\n${RED}Failed to upload: $rel_path${NC}"
            fi
        done
    
    echo ""
    log "Upload complete!"
}

# === GENERATE ENV FILE ===
generate_env() {
    log "Generating .env.production..."
    
    cat > "$APP_PATH/.env.production" << EOF
APP_NAME="PortoDaffa"
APP_ENV=production
APP_KEY=${APP_KEY:-$(php artisan key:generate --show 2>/dev/null)}
APP_DEBUG=false
APP_URL=$APP_URL

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=$DB_HOST
DB_PORT=3306
DB_DATABASE=$DB_DATABASE
DB_USERNAME=$DB_USERNAME
DB_PASSWORD=$DB_PASSWORD

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=database

VITE_APP_NAME="\${APP_NAME}"
EOF
    
    log ".env.production generated"
}

# === MAIN DEPLOY ===
deploy() {
    log "Starting deployment to Rumahweb..."
    echo ""
    
    check_deps
    build_assets
    install_dependencies
    generate_env
    
    # Upload .env.production separately
    cp "$APP_PATH/.env.production" "$APP_PATH/.env"
    upload_files
    
    # Restore original .env
    if [ -f "$APP_PATH/.env.backup" ]; then
        cp "$APP_PATH/.env.backup" "$APP_PATH/.env"
    fi
    
    echo ""
    log "Deployment complete!"
    echo ""
    warn "IMPORTANT: Run migrations via cPanel or SSH after hosting is active:"
    warn "  php artisan migrate --force"
    warn "  php artisan config:cache"
    warn "  php artisan route:cache"
}

# === SHOW STATUS ===
show_status() {
    echo "=== Deployment Status ==="
    echo ""
    echo "Host: $FTP_HOST"
    echo "User: $FTP_USER"
    echo "Root: $FTP_ROOT"
    echo "App URL: $APP_URL"
    echo ""
    echo "Database:"
    echo "  Host: $DB_HOST"
    echo "  Database: ${DB_DATABASE:-[NOT SET]}"
    echo "  Username: ${DB_USERNAME:-[NOT SET]}"
    echo ""
    echo "Status: $(test_connection && echo 'FTP OK' || echo 'FTP FAILED')"
}

# === MAIN ===
case "${1:-deploy}" in
    deploy)
        deploy
        ;;
    test)
        test_connection
        ;;
    status)
        show_status
        ;;
    *)
        echo "Usage: $0 {deploy|test|status}"
        echo ""
        echo "Commands:"
        echo "  deploy  - Full deployment (build + upload)"
        echo "  test    - Test FTP connection only"
        echo "  status  - Show current configuration"
        ;;
esac
