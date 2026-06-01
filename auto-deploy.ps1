# auto-deploy.ps1 - File watcher + Git push + Vercel production deploy
$watchFolder = Get-Location
$waitSeconds = 2

Write-Host "Watching folder: $watchFolder" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop." -ForegroundColor Yellow

while ($true) {
    $changed = Get-ChildItem -Recurse -File | Where-Object {
        $_.LastWriteTime -gt (Get-Date).AddSeconds(-$waitSeconds)
    }
    
    if ($changed) {
        Write-Host "`nChange detected at $(Get-Date -Format 'HH:mm:ss')" -ForegroundColor Green
        
        git add .
        if ($LASTEXITCODE -ne 0) { Write-Host "Git add failed" -ForegroundColor Red }
        
        $commitMsg = "Auto-deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
        git commit -m $commitMsg
        if ($LASTEXITCODE -ne 0 -and $LASTEXITCODE -ne 1) {
            Write-Host "Commit failed or nothing to commit" -ForegroundColor Yellow
        } else {
            Write-Host "Committed: $commitMsg" -ForegroundColor Green
        }
        
        git push
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Push failed" -ForegroundColor Red
        } else {
            Write-Host "Pushed to remote" -ForegroundColor Green
            
            # ----- Vercel production deployment -----
            Write-Host "Deploying to Vercel production..." -ForegroundColor Magenta
            vercel --prod --yes
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ Vercel production deployment done" -ForegroundColor Green
            } else {
                Write-Host "⚠️ Vercel deploy failed. Run 'vercel link' first or check token." -ForegroundColor Yellow
            }
        }
    }
    Start-Sleep -Seconds $waitSeconds
}