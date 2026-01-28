#!/bin/bash

# Load nvm and node environment for Vercel CLI
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Resume Auto-Sync Script
# Copies resume from Documents to codebase and deploys to Vercel

SOURCE="$HOME/Documents/Aadit-Shah-Resume.pdf"
DEST="$HOME/Documents/aaditshah.me/public/resume.pdf"
REPO_DIR="$HOME/Documents/aaditshah.me"
LOG_FILE="$HOME/Documents/aaditshah.me/scripts/resume-sync.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

notify() {
    osascript -e "display notification \"$1\" with title \"Resume Sync\""
}

notify "Resume change detected..."
log "Script triggered"

# Check if source file exists
if [ ! -f "$SOURCE" ]; then
    log "ERROR: Source file not found: $SOURCE"
    exit 1
fi

# Check if file actually changed (compare checksums)
if [ -f "$DEST" ]; then
    SOURCE_HASH=$(md5 -q "$SOURCE")
    DEST_HASH=$(md5 -q "$DEST")
    if [ "$SOURCE_HASH" = "$DEST_HASH" ]; then
        log "No changes detected, skipping sync"
        exit 0
    fi
fi

log "Starting resume sync..."

# Copy the file
cp "$SOURCE" "$DEST"
if [ $? -ne 0 ]; then
    log "ERROR: Failed to copy file"
    exit 1
fi
log "Copied resume to codebase"

# Git commit and push
cd "$REPO_DIR"

git add public/resume.pdf
git commit -m "Update resume

Auto-synced from ~/Documents/Aadit-Shah-Resume.pdf"

if [ $? -eq 0 ]; then
    git push origin main
    log "Pushed to git"
else
    log "No git changes to commit (or commit failed)"
fi

# Deploy with Vercel CLI
vercel --prod --yes
if [ $? -eq 0 ]; then
    log "Vercel deployment triggered successfully"
else
    log "ERROR: Vercel deployment failed"
    exit 1
fi

log "Resume sync completed successfully"

notify "Resume updated and deployed to aaditshah.me"
