$headers = @{
    'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    'Accept'     = 'application/json, text/plain, */*'
}

$testUrls = @(
    "https://portal.bpo.bg/bpo-registers/api/marks/search?number=65418",
    "https://portal.bpo.bg/bpo-registers/api/marks/view?id=BG_N_2003_65418",
    "https://portal.bpo.bg/bpo-registers/api/marks/BG_N_2003_65418",
    "https://portal.bpo.bg/bpo-registers/bpo-registers/api/marks/BG_N_2003_65418",
    "https://portal.bpo.bg/bpo-registers/static/js/main.bf4634e1.js"
)

foreach ($u in $testUrls) {
    try {
        $res = Invoke-RestMethod -Uri $u -Headers $headers -TimeoutSec 5
        Write-Host "Success ($u):"
        if ($res -is [string] -and $res.Length -gt 200) {
            Write-Host $res.Substring(0, 200)
        } else {
            $res | ConvertTo-Json -Depth 3
        }
    } catch {
        Write-Host "Failed ($u): $($_.Exception.Message)"
    }
}
