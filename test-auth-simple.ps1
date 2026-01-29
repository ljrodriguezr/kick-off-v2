Write-Host "`n=== PRUEBAS PRACTICAS: RUTAS PROTEGIDAS Y LOGOUT ===`n"

$API = "http://localhost:3000"
$Headers = @{ 'Content-Type' = 'application/json' }

# Test 1: Sin autenticacion
Write-Host "Test 1: Acceso sin autenticacion" -ForegroundColor Yellow
try {
    $r = Invoke-WebRequest -Uri "$API/api/user" -Method GET -Headers $Headers -ErrorAction Stop
    Write-Host "ERROR: Acceso permitido sin autenticacion" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode -eq "Forbidden") {
        Write-Host "OK: Acceso bloqueado (403)" -ForegroundColor Green
    }
}

# Test 2: Login
Write-Host "`nTest 2: Login" -ForegroundColor Yellow
$body = @{ username = "admin"; password = "admin123" } | ConvertTo-Json
try {
    $r = Invoke-WebRequest -Uri "$API/api/auth/signin" -Method POST -Headers $Headers -Body $body -SessionVariable "s" -ErrorAction Stop
    $u = $r.Content | ConvertFrom-Json
    Write-Host "OK: Login exitoso - $($u.username)" -ForegroundColor Green
    $session = $s
} catch {
    Write-Host "ERROR: Login fallo" -ForegroundColor Red
}

# Test 3: Con sesion
Write-Host "`nTest 3: Acceso con sesion" -ForegroundColor Yellow
try {
    $r = Invoke-WebRequest -Uri "$API/api/user" -Method GET -Headers $Headers -WebSession $session -ErrorAction Stop
    Write-Host "OK: Acceso permitido con sesion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Acceso denegado" -ForegroundColor Red
}

# Test 4: Logout
Write-Host "`nTest 4: Logout" -ForegroundColor Yellow
try {
    $r = Invoke-WebRequest -Uri "$API/api/auth/signout" -Method GET -Headers $Headers -WebSession $session -ErrorAction Stop
    Write-Host "OK: Sesion cerrada" -ForegroundColor Green
} catch {
    Write-Host "WARNING: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Test 5: Despues del logout
Write-Host "`nTest 5: Acceso despues del logout" -ForegroundColor Yellow
try {
    $r = Invoke-WebRequest -Uri "$API/api/user" -Method GET -Headers $Headers -WebSession $session -ErrorAction Stop
    Write-Host "ERROR: Acceso permitido despues del logout" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode -eq "Forbidden") {
        Write-Host "OK: Acceso bloqueado (403)" -ForegroundColor Green
    }
}

Write-Host "`n=== TODAS LAS PRUEBAS COMPLETADAS ===`n"
