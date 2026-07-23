Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\veselin.aleksov\Desktop\egt project\Project 1.2\images\egt_logo.png"
$dstPath = "c:\Users\veselin.aleksov\Desktop\egt project\Project 1.2\images\egt_logo.png"

if (Test-Path $srcPath) {
    # Backup original first if not backed up
    $bakPath = "c:\Users\veselin.aleksov\Desktop\egt project\Project 1.2\images\egt_logo_orig_white_bg.png"
    if (-not (Test-Path $bakPath)) {
        Copy-Item $srcPath $bakPath
    }
    
    $bmp = [System.Drawing.Bitmap]::FromFile($bakPath)
    $w = $bmp.Width
    $h = $bmp.Height
    
    $newBmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    
    # Official EGT Brand Color RGB 228, 35, 20
    $targetR = 228
    $targetG = 35
    $targetB = 20

    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            $p = $bmp.GetPixel($x, $y)
            $r = $p.R
            $g = $p.G
            $b = $p.B
            $a = $p.A
            
            # Check if this pixel is part of white/light background outside or inside swoops
            # Pure white or off-white background
            if ($r -gt 240 -and $g -gt 240 -and $b -gt 240) {
                # Check if it's outer background vs EGT white text/letters
                # Notice in EGT logo: the red globe surrounds white letters EGT and white swoop.
                # Outer background is surrounding the circle.
                # To determine outer background: distance from center (cx, cy)
                $cx = $w / 2.0
                $cy = $h / 2.0
                $dx = ($x - $cx) / ($w / 2.0)
                $dy = ($y - $cy) / ($h / 2.0)
                $distSq = ($dx * $dx) + ($dy * $dy)
                
                # Outer background is outside the circle radius (~0.95)
                if ($distSq -gt 0.90) {
                    # Transparent outer background
                    $newBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                } else {
                    # Keep white inside the logo (for EGT letters and swoop)
                    $newBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 255, 255, 255))
                }
            }
            # Anti-aliasing fringe around outer edge (light pinkish/whitish pixels near outer edge)
            elseif ($distSq -gt 0.88 -and ($r -gt 200 -and $g -gt 180 -and $b -gt 180)) {
                # Smooth alpha falloff for anti-aliased edge
                $alpha = [int]([math]::Max(0, [math]::Min(255, (0.98 - $distSq) * 2550)))
                if ($alpha -le 10) {
                    $newBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                } else {
                    $newBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $targetR, $targetG, $targetB))
                }
            }
            # Red parts of the logo -> normalize to exact EGT Brand Red (228, 35, 20)
            elseif ($r -gt 150 -and $g -lt 100 -and $b -lt 100) {
                $newBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $targetR, $targetG, $targetB))
            }
            else {
                $newBmp.SetPixel($x, $y, $p)
            }
        }
    }
    
    $bmp.Dispose()
    # Remove old destination file if locked
    $newBmp.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $newBmp.Dispose()
    Write-Host "Updated transparent logo with EGT Brand Red (228, 35, 20) at $dstPath"
}
