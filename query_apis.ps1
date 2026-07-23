[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$headers = @{
    'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    'Accept'     = 'application/json'
}

Write-Host "=== Searching TMView for ACTION MONEY ==="
try {
    $tmUrl = "https://www.tmdn.org/tmview/services/trademarks/search?tradeMarkName=ACTION%20MONEY&pageSize=10"
    $tmRes = Invoke-RestMethod -Uri $tmUrl -Headers $headers -TimeoutSec 10
    if ($tmRes.trademarks) {
        $tmRes.trademarks | ForEach-Object {
            Write-Host "TM Name: $($_.tmName) | Country: $($_.country) | AppDate: $($_.appDate) | RegDate: $($_.regDate) | Status: $($_.status) | AppNum: $($_.appNumber) | RegNum: $($_.regNumber)"
        }
    } else {
        Write-Host "No TM results found."
    }
} catch {
    Write-Host "TMView search error: $_"
}

Write-Host "`n=== Searching TMView for applicant EURO GAMES TECHNOLOGY ==="
try {
    $egtUrl = "https://www.tmdn.org/tmview/services/trademarks/search?appName=EURO%20GAMES%20TECHNOLOGY&pageSize=50"
    $egtRes = Invoke-RestMethod -Uri $egtUrl -Headers $headers -TimeoutSec 10
    if ($egtRes.trademarks) {
        $egtRes.trademarks | Where-Object { $_.tmName -like "*ACTION*" -or $_.appNumber -like "*65418*" -or $_.appNumber -like "*1438596*" } | ForEach-Object {
            Write-Host "EGT TM: $($_.tmName) | Country: $($_.country) | AppDate: $($_.appDate) | RegDate: $($_.regDate) | Status: $($_.status) | AppNum: $($_.appNumber) | RegNum: $($_.regNumber)"
        }
    }
} catch {
    Write-Host "EGT Search error: $_"
}
