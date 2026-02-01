#!/bin/bash

# Directus Backup & Restore Script
# Usage:
#   bash scripts/backup-directus.sh              # Create backup
#   bash scripts/backup-directus.sh restore <file>  # Restore backup

set -e

BACKUP_DIR="${1:-.}/backups"
DB_USER="${DB_USER:-directus}"
DB_NAME="${DB_NAME:-directus}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/directus_backup_$TIMESTAMP.sql"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Function: Create backup
backup() {
    echo "🔄 Starting Directus database backup..."
    echo "📁 Backup destination: $BACKUP_FILE"
    
    docker-compose exec -T postgres pg_dump \
        -U "$DB_USER" \
        -d "$DB_NAME" \
        --format=plain \
        --verbose \
        > "$BACKUP_FILE"
    
    BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    echo "✅ Backup complete!"
    echo "   File: $BACKUP_FILE"
    echo "   Size: $BACKUP_SIZE"
    echo "   Time: $(date)"
    
    # Create compressed backup
    COMPRESSED="$BACKUP_FILE.gz"
    gzip -f "$BACKUP_FILE"
    COMPRESSED_SIZE=$(du -h "$COMPRESSED" | cut -f1)
    echo "   Compressed: $COMPRESSED_SIZE"
}

# Function: Restore backup
restore() {
    if [ -z "$1" ]; then
        echo "❌ Restore file not specified"
        echo "Usage: bash scripts/backup-directus.sh restore <backup_file>"
        exit 1
    fi
    
    RESTORE_FILE="$1"
    
    if [ ! -f "$RESTORE_FILE" ]; then
        echo "❌ Backup file not found: $RESTORE_FILE"
        exit 1
    fi
    
    # Check if file is compressed
    if [[ "$RESTORE_FILE" == *.gz ]]; then
        TEMP_FILE="/tmp/directus_restore_$TIMESTAMP.sql"
        echo "📦 Decompressing $RESTORE_FILE..."
        gunzip -c "$RESTORE_FILE" > "$TEMP_FILE"
        RESTORE_FILE="$TEMP_FILE"
    fi
    
    echo "🔄 Starting Directus database restore..."
    echo "📁 Restore source: $RESTORE_FILE"
    echo "⚠️  WARNING: This will replace all current data!"
    echo "Press Enter to continue or Ctrl+C to cancel..."
    read
    
    docker-compose exec -T postgres psql \
        -U "$DB_USER" \
        -d "$DB_NAME" \
        < "$RESTORE_FILE"
    
    echo "✅ Restore complete!"
    echo "   Timestamp: $(date)"
    
    # Cleanup temp file
    if [ -n "$TEMP_FILE" ] && [ -f "$TEMP_FILE" ]; then
        rm "$TEMP_FILE"
    fi
}

# Function: List backups
list_backups() {
    echo "📋 Available backups:"
    if [ ! -d "$BACKUP_DIR" ]; then
        echo "No backups found. Create one with: bash scripts/backup-directus.sh"
        exit 0
    fi
    
    ls -lh "$BACKUP_DIR"/ 2>/dev/null || echo "No backups found"
}

# Function: Cleanup old backups
cleanup() {
    DAYS="${1:-30}"
    echo "🧹 Cleaning up backups older than $DAYS days..."
    
    find "$BACKUP_DIR" -name "directus_backup_*.sql*" -mtime +$DAYS -delete
    
    echo "✅ Cleanup complete"
}

# Main logic
case "${1:-backup}" in
    backup)
        backup
        ;;
    restore)
        restore "$2"
        ;;
    list)
        list_backups
        ;;
    cleanup)
        cleanup "${2:-30}"
        ;;
    *)
        echo "Usage:"
        echo "  bash scripts/backup-directus.sh               # Create backup"
        echo "  bash scripts/backup-directus.sh list          # List backups"
        echo "  bash scripts/backup-directus.sh restore FILE  # Restore backup"
        echo "  bash scripts/backup-directus.sh cleanup DAYS  # Remove old backups (default: 30)"
        exit 1
        ;;
esac
