# auto-deploy.ps1 - Simple file watcher with loop
$watchFolder = Get-Location
$waitSeconds = 2
$lastRun = (Get-Date).AddSeconds(-$waitSeconds)

Write-Host "Watching folder: $watchFolder" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop." -ForegroundColor Yellow

while ($true) {
    # Get all files changed in the last $waitSeconds seconds
    $changed = Get-ChildItem -Recurse -File | Where-Object {
        $_.LastWriteTime -gt (Get-Date).AddSeconds(-$waitSeconds)
    }
    
    if ($changed) {
        Write-Host "`nChange detected at $(Get-Date -Format 'HH:mm:ss')" -ForegroundColor Green
        
        # Git add
        git add .
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Git add failed" -ForegroundColor Red
        }
        
        # Commit
        $commitMsg = "Auto-deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
        git commit -m $commitMsg
        if ($LASTEXITCODE -ne 0 -and $LASTEXITCODE -ne 1) {
            Write-Host "Commit failed or nothing to commit" -ForegroundColor Yellow
        } else {
            Write-Host "Committed: $commitMsg" -ForegroundColor Green
        }
        
        # Push
        git push
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Push failed" -ForegroundColor Red
        } else {
            Write-Host "Pushed to remote" -ForegroundColor Green
        }
        
        # Optional: Vercel deploy (uncomment if vercel CLI is installed)
        # vercel --prod --yes
        # if ($LASTEXITCODE -eq 0) { Write-Host "Vercel deployed" -ForegroundColor Magenta }
    }
    
    Start-Sleep -Seconds $waitSeconds
}