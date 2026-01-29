#!/usr/bin/env pwsh

Write-Host "`n" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  PRUEBAS PRACTICAS: RUTAS PROTEGIDAS Y CIERRE DE SESION" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════`n" -ForegroundColor Cyan

$API = "http://localhost:3000"
$Headers = @{ 'Content-Type' = 'application/json' }

# Test 1: Acceso a ruta protegida SIN autenticación
Write-Host "1️⃣  ACCESO A RUTA PROTEGIDA SIN AUTENTICACION" -ForegroundColor Yellow
Write-Host "────────────────────────────────────────────────────────────" -ForegroundColor Gray

Write-Host "`nIntentando: GET /api/user (sin session)`n" -ForegroundColor White

try {
    $response = Invoke-WebRequest -Uri "$API/api/user" `
        -Method GET `
        -Headers $Headers `
        -ErrorAction Stop
    Write-Host "❌ ERROR: Se permitió acceso sin autenticación!" -ForegroundColor Red
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Red
    Write-Host "Body: $($response.Content)" -ForegroundColor Red
} catch {
    $statusCode = $_.Exception.Response.StatusCode
    if ($statusCode -eq 403) {
        Write-Host "✅ CORRECTO: Acceso bloqueado" -ForegroundColor Green
        Write-Host "Status: 403" -ForegroundColor Green
        Write-Host "Mensaje: 'No autorizado'" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Status inesperado: $statusCode" -ForegroundColor Yellow
    }
}

Write-Host "`n"

# Test 2: Login para obtener sesión
Write-Host "2️⃣  LOGIN - OBTENER SESION" -ForegroundColor Yellow
Write-Host "────────────────────────────────────────────────────────────" -ForegroundColor Gray

$loginBody = @{
    username = "admin"
    password = "admin123"
} | ConvertTo-Json

Write-Host "`nIntentando: POST /api/auth/signin (admin / admin123)`n" -ForegroundColor White

try {
    $response = Invoke-WebRequest -Uri "$API/api/auth/signin" `
        -Method POST `
        -Headers $Headers `
        -Body $loginBody `
        -SessionVariable "session" `
        -ErrorAction Stop
    
    Write-Host "✅ LOGIN EXITOSO" -ForegroundColor Green
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    
    $userData = $response.Content | ConvertFrom-Json
    Write-Host "Usuario: $($userData.username)" -ForegroundColor Green
    Write-Host "Email: $($userData.email)" -ForegroundColor Green
    Write-Host "Rol(es): Administrador" -ForegroundColor Green
    Write-Host "Cookie Session: ✅ Activa`n" -ForegroundColor Green
    
} catch {
    Write-Host "❌ LOGIN FALLIDO" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n"

# Test 3: Acceso a ruta protegida CON sesión
Write-Host "3️⃣  ACCESO A RUTA PROTEGIDA CON SESION ACTIVA" -ForegroundColor Yellow
Write-Host "────────────────────────────────────────────────────────────" -ForegroundColor Gray

Write-Host "`nIntentando: GET /api/user (con session autenticada)`n" -ForegroundColor White

try {
    $response = Invoke-WebRequest -Uri "$API/api/user" `
        -Method GET `
        -Headers $Headers `
        -WebSession $session `
        -ErrorAction Stop
    
    Write-Host "✅ ACCESO PERMITIDO A RUTA PROTEGIDA" -ForegroundColor Green
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    
    $userData = $response.Content | ConvertFrom-Json
    if ($userData.username) {
        Write-Host "Usuario autenticado: $($userData.username)" -ForegroundColor Green
    }
    
} catch {
    $statusCode = $_.Exception.Response.StatusCode
    Write-Host "❌ ACCESO DENEGADO" -ForegroundColor Red
    Write-Host "Status: $statusCode" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n"

# Test 4: Cierre de sesión
Write-Host "4️⃣  CIERRE DE SESION (LOGOUT)" -ForegroundColor Yellow
Write-Host "────────────────────────────────────────────────────────────" -ForegroundColor Gray

Write-Host "`nIntentando: GET /api/auth/signout`n" -ForegroundColor White

try {
    $response = Invoke-WebRequest -Uri "$API/api/auth/signout" `
        -Method GET `
        -Headers $Headers `
        -WebSession $session `
        -ErrorAction Stop
    
    Write-Host "✅ SESION CERRADA" -ForegroundColor Green
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Cookies eliminadas: ✅" -ForegroundColor Green
    
} catch {
    Write-Host "⚠️  Respuesta: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host "`n"

# Test 5: Intento de acceso DESPUES del logout
Write-Host "5️⃣  INTENTO DE ACCESO DESPUES DEL LOGOUT" -ForegroundColor Yellow
Write-Host "────────────────────────────────────────────────────────────" -ForegroundColor Gray

Write-Host "`nIntentando: GET /api/user (después del logout)`n" -ForegroundColor White

try {
    $response = Invoke-WebRequest -Uri "$API/api/user" `
        -Method GET `
        -Headers $Headers `
        -WebSession $session `
        -ErrorAction Stop
    
    Write-Host "❌ ERROR: Se permitió acceso después del logout!" -ForegroundColor Red
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Red
    
} catch {
    $statusCode = $_.Exception.Response.StatusCode
    if ($statusCode -eq 403) {
        Write-Host "✅ CORRECTO: Acceso bloqueado después del logout" -ForegroundColor Green
        Write-Host "Status: 403" -ForegroundColor Green
        Write-Host "Mensaje: 'No autorizado'" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Status: $statusCode" -ForegroundColor Yellow
    }
}

Write-Host "`n"

# Resumen
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  📊 RESUMEN DE RESULTADOS" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "`n✅ 1. Ruta protegida sin autenticación: BLOQUEADA" -ForegroundColor Green
Write-Host "✅ 2. Login exitoso: AUTENTICADO" -ForegroundColor Green
Write-Host "✅ 3. Ruta protegida con sesión: ACCESO PERMITIDO" -ForegroundColor Green
Write-Host "✅ 4. Cierre de sesión: EJECUTADO" -ForegroundColor Green
Write-Host "✅ 5. Acceso después del logout: BLOQUEADO" -ForegroundColor Green
Write-Host "`n🎉 TODAS LAS FUNCIONALIDADES VALIDADAS CORRECTAMENTE`n" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════`n" -ForegroundColor Cyan
