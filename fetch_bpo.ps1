$headers = @{
    'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    'Accept' = 'application/json, text/plain, */*'
}

Write-Host "--- Fetching BPO Mark BG_N_2003_65418 ---"
$urls = @(
    "https://portal.bpo.bg/bpo-registers/api/marks/BG_N_2003_65418",
    "https://portal.bpo.bg/bpo-registers/api/marks/details/BG_N_2003_65418",
    "https://portal.bpo.bg/bpo-registers/api/v1/marks/BG_N_2003_65418",
    "https://portal.bpo.bg/bpo-registers/api/trade-marks/BG_N_2003_65418"
)

foreach ($u in $urls) {
    try {
        $res = Invoke-RestMethod -Uri $u -Headers $headers -TimeoutSec 5
        Write-Host "SUCCESS: $u"
        $res | ConvertTo-Json -Depth 5
        break
    } catch {
        Write-Host "Failed: $u -> $($_.Exception.Message)"
    }
}

Write-Host "`n--- Searching TMView for WO500000001438596 ---"
try {
    $res2 = Invoke-RestMethod -Uri "https://www.tmdn.org/tmview/services/trademarks/detail/WO500000001438596" -Headers $headers -TimeoutSec 5
    $res2 | ConvertTo-Json -Depth 5
} catch {
    Write-Host "TMView detail failed: $($_.Exception.Message)"
}
