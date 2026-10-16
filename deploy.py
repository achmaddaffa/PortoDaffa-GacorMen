#!/usr/bin/env python3
"""
Deploy script for PortoDaffa to Rumahweb via FTP
Usage: python3 deploy.py [--upload|--list|--test]
"""

import os
import sys
import zipfile
from pathlib import Path

# === KONFIGURASI ===
FTP_HOST = "ftp.rumahweb.net"
FTP_USER = "achp5832"
FTP_PASS = "Q9pDVgTTjT2547"
TARGET_DIR = "/www/portodaffa"  # /www es symlink a public_html

APP_PATH = Path(__file__).parent
ZIP_PATH = APP_PATH / "portodaffa.zip"
UNZIP_SCRIPT = APP_PATH / "unzip.php"

# Patrones a excluir
EXCLUDE_PATTERNS = {
    ".git", "node_modules", "vendor", ".env", "*.db",
    ".gitignore", ".DS_Store", "Thumbs.db"
}

def should_exclude(path):
    """Check if path should be excluded from upload."""
    parts = Path(path).parts
    for part in parts:
        for pattern in EXCLUDE_PATTERNS:
            if pattern.startswith("*"):
                if part.endswith(pattern[1:]):
                    return True
            elif part == pattern:
                return True
    return False

def test_ftp():
    """Test FTP connection."""
    from ftplib import FTP
    print("Testing FTP connection...")
    try:
        ftp = FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        print(f"✓ Connected to {FTP_HOST}")
        print(f"✓ Logged in as {FTP_USER}")
        # List root
        print("\nRoot directory contents:")
        ftp.retrlines("LIST")
        # Test TARGET_DIR
        try:
            ftp.cwd(TARGET_DIR)
            print(f"✓ TARGET_DIR exists: {TARGET_DIR}")
        except Exception as e:
            print(f"✗ TARGET_DIR not accessible: {e}")
            print("  Creating directory...")
            try:
                ftp.mkd(TARGET_DIR)
                print(f"✓ Created {TARGET_DIR}")
            except Exception as e2:
                print(f"✗ Could not create {TARGET_DIR}: {e2}")
        ftp.quit()
        return True
    except Exception as e:
        print(f"✗ Connection failed: {e}")
        return False

def upload_files():
    """Upload files to FTP server."""
    from ftplib import FTP
    import io
    
    print("\nStarting upload...")
    try:
        ftp = FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        print(f"✓ Connected to {FTP_HOST}")
        
        # Create target dir
        try:
            ftp.cwd(TARGET_DIR)
            print(f"✓ Working in {TARGET_DIR}")
        except:
            print(f"Creating {TARGET_DIR}...")
            ftp.mkd(TARGET_DIR)
            ftp.cwd(TARGET_DIR)
            print(f"✓ Created and entered {TARGET_DIR}")
        
        # Upload zip first
        if ZIP_PATH.exists():
            print(f"\nUploading {ZIP_PATH.name}...")
            with open(ZIP_PATH, "rb") as f:
                ftp.storbinary(f"STOR {ZIP_PATH.name}", f)
            print(f"✓ Uploaded {ZIP_PATH.name} ({ZIP_PATH.stat().st_size / 1024:.1f} KB)")
        else:
            print(f"✗ ZIP not found at {ZIP_PATH}")
            return False
        
        # Upload unzip.php
        if UNZIP_SCRIPT.exists():
            print(f"\nUploading {UNZIP_SCRIPT.name}...")
            with open(UNZIP_SCRIPT, "rb") as f:
                ftp.storbinary("STOR unzip.php", f)
            print(f"✓ Uploaded {UNZIP_SCRIPT.name}")
        
        # Upload .env.production.example
        env_example = APP_PATH / ".env.production.example"
        if env_example.exists():
            print(f"\nUploading {env_example.name}...")
            with open(env_example, "rb") as f:
                ftp.storbinary("STOR .env.production.example", f)
            print(f"✓ Uploaded {env_example.name}")
        
        print("\n" + "="*50)
        print("UPLOAD COMPLETE!")
        print("="*50)
        print(f"\nNext steps:")
        print(f"1. Access: https://achmaddaffa.my.id/unzip.php?token=portodaffa2024")
        print(f"2. Update .env with database credentials")
        print(f"3. Run migrations via cPanel Terminal or SSH")
        
        ftp.quit()
        return True
        
    except Exception as e:
        print(f"\n✗ Upload failed: {e}")
        return False

def list_files():
    """List current files on server."""
    from ftplib import FTP
    print("\nListing server files...")
    try:
        ftp = FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        
        # List root
        print("\n=== ROOT ===")
        try:
            ftp.cwd("/")
            ftp.retrlines("LIST")
        except:
            pass
        
        # List www
        print("\n=== WWW ===")
        try:
            ftp.cwd("/www")
            ftp.retrlines("LIST")
        except Exception as e:
            print(f"  Could not access /www: {e}")
        
        # List portodaffa
        print("\n=== PORTODAFFA ===")
        try:
            ftp.cwd("/www/portodaffa")
            ftp.retrlines("LIST")
        except Exception as e:
            print(f"  Could not access /www/portodaffa: {e}")
        
        ftp.quit()
    except Exception as e:
        print(f"✗ Listing failed: {e}")

def main():
    command = sys.argv[1] if len(sys.argv) > 1 else "test"
    
    print(f"\n{'='*50}")
    print(f"PortoDaffa Deploy Script")
    print(f"{'='*50}\n")
    
    if command == "test":
        test_ftp()
    elif command == "upload":
        # First create the zip
        print("Creating ZIP package...")
        with zipfile.ZipFile(ZIP_PATH, "w", zipfile.ZIP_DEFLATED) as zf:
            for root, dirs, files in os.walk(APP_PATH):
                # Skip excluded directories
                dirs[:] = [d for d in dirs if not should_exclude(d)]
                for file in files:
                    if should_exclude(file):
                        continue
                    file_path = Path(root) / file
                    arcname = file_path.relative_to(APP_PATH)
                    if ".git" not in arcname.parts and "node_modules" not in arcname.parts:
                        zf.write(file_path, arcname)
        print(f"✓ ZIP created: {ZIP_PATH} ({ZIP_PATH.stat().st_size / 1024:.1f} KB)")
        upload_files()
    elif command == "list":
        list_files()
    else:
        print(f"Usage: python3 {sys.argv[0]} [test|upload|list]")
        sys.exit(1)

if __name__ == "__main__":
    main()
