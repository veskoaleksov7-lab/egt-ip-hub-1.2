$jsContent = (Invoke-WebRequest -Uri "https://portal.bpo.bg/bpo-registers/static/js/main.bf4634e1.js").Content

# Find all string occurrences containing http or /api/ or backend path
$matches = [regex]::Matches($jsContent, '["''](https?://[^"'']+|/[^"'']+)["'']')

$results = foreach ($m in $matches) {
    $val = $m.Groups[1].Value
    if ($val -like "*mark*" -or $val -like "*register*" -or $val -like "*bpo*" -or $val -like "*api*" -or $val -like "*service*") {
        $val
    }
}

$results | Select-Object -Unique | Select-Object -First 40
