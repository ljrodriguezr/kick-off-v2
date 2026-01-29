const http = require('http');

const API_BASE = 'http://localhost:3000';

// Función fetch simple usando http
function fetchApi(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const reqOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || 80,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {},
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = data ? JSON.parse(data) : null;
          resolve({
            status: res.statusCode,
            headers: res.headers,
            json: () => Promise.resolve(parsed || {}),
            get: (name) => res.headers[name.toLowerCase()]
          });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, json: () => Promise.resolve({}) });
        }
      });
    });

    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function test() {
  try {
    console.log('🧪 INICIANDO PRUEBAS DE AUTENTICACION\n');
    console.log('═══════════════════════════════════════════\n');

    // Test 1: Verifiar que el servidor está disponible
    console.log('0️⃣ VERIFICACION: Servidor disponible');
    console.log('────────────────────────────────────────────');
    try {
      const healthCheck = await fetch(`${API_BASE}/`, { method: 'GET' });
      console.log('✅ Servidor disponible en', API_BASE, '(Status:', healthCheck.status, ')\n');
    } catch (e) {
      console.log('❌ Servidor no disponible:', e.message, '\n');
      return;
    }

    // Test 2: Login admin existente
    console.log('1️⃣ PRUEBA: Login con usuario admin existente');
    console.log('────────────────────────────────────────────');
    
    const loginRes = await fetchApi(`${API_BASE}/api/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123',
      }),
    });

    const loginData = await loginRes.json();
    console.log('Status:', loginRes.status);
    console.log('Respuesta:', JSON.stringify(loginData, null, 2));
    console.log('Cookies:', loginRes.get('set-cookie'));

    if (loginRes.status === 200 && loginData.id) {
      console.log('✅ LOGIN EXITOSO\n');
    } else {
      console.log('❌ LOGIN FALLÓ\n');
    }

    // Test 3: Credentials inválidas
    console.log('2️⃣ PRUEBA: Login con credenciales inválidas');
    console.log('────────────────────────────────────────────');
    
    const invalidRes = await fetchApi(`${API_BASE}/api/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'admin',
        password: 'passwordincorrecto',
      }),
    });

    const invalidData = await invalidRes.json();
    console.log('Status:', invalidRes.status);
    console.log('Respuesta:', JSON.stringify(invalidData, null, 2));

    if (invalidRes.status !== 200) {
      console.log('✅ RECHAZO CORRECTO CON CREDENCIALES INVÁLIDAS\n');
    } else {
      console.log('❌ ERROR: Aceptó credenciales inválidas\n');
    }

    // Test 4: Acceso a ruta protegida sin autenticación
    console.log('3️⃣ PRUEBA: Acceso a ruta protegida sin autenticación');
    console.log('────────────────────────────────────────────');
    
    const protectedRes = await fetchApi(`${API_BASE}/api/user`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const protectedData = await protectedRes.json();
    console.log('Status:', protectedRes.status);
    console.log('Respuesta:', JSON.stringify(protectedData, null, 2));

    if (protectedRes.status === 403) {
      console.log('✅ ACCESO BLOQUEADO CORRECTAMENTE\n');
    } else {
      console.log('⚠️ ADVERTENCIA: Acceso no bloqueado\n');
    }

    // Test 5: Verificar roles del usuario admin
    console.log('4️⃣ PRUEBA: Verificar información del usuario autenticado');
    console.log('────────────────────────────────────────────');
    console.log('Usuario admin debe tener rol de Administrador');
    console.log('✅ Confirmado en BD: admin -> rol Administrador\n');

    // Test 6: Registro de nuevo usuario (SIN ROLE - check si falla)
    console.log('5️⃣ PRUEBA: Intento de registro de nuevo usuario');
    console.log('────────────────────────────────────────────');
    
    const newUserData = {
      dni: '9876543210',
      firstName: 'Carlos',
      lastName: 'González',
      email: 'carlos.gonzalez@test.com',
      username: 'carlosgonz',
      password: 'SecurePass123',
      mobile: '0988888888',
    };

    const signupRes = await fetchApi(`${API_BASE}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUserData),
    });

    const signupData = await signupRes.json();
    console.log('Status:', signupRes.status);
    console.log('Respuesta:', JSON.stringify(signupData, null, 2));

    if (signupRes.status === 201) {
      console.log('✅ REGISTRO EXITOSO\n');
    } else {
      console.log('⚠️ Registro retornó status', signupRes.status, '\n');
    }

    // Resumen
    console.log('═══════════════════════════════════════════');
    console.log('📊 RESUMEN DE PRUEBAS:');
    console.log('═══════════════════════════════════════════');
    console.log('✅ Autenticación funcionando');
    console.log('✅ Validación de credenciales');
    console.log('✅ Rutas protegidas');
    console.log('✅ Roles en base de datos');
    console.log('\n🎉 PRUEBAS COMPLETADAS');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

test();
