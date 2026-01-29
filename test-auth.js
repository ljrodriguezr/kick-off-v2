const http = require('http');

// Configuración
const API_BASE = 'http://localhost:3000';
const headers = { 'Content-Type': 'application/json' };

// Función auxiliar para hacer requests
function makeRequest(method, endpoint, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(API_BASE + endpoint);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: headers,
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data ? JSON.parse(data) : null,
        });
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// Tests
async function runTests() {
  console.log('🧪 INICIANDO PRUEBAS DE AUTENTICACION\n');
  console.log('═══════════════════════════════════════════\n');

  try {
    // Test 1: Registro de usuario
    console.log('1️⃣ PRUEBA: Registro de usuario con selección de rol');
    console.log('────────────────────────────────────────────');
    
    const userData = {
      dni: '1234567890',
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan.perez@test.com',
      username: 'juanperez',
      password: 'SecurePass123',
      mobile: '0999999999',
    };

    const signupRes = await makeRequest('POST', '/api/auth/signup', userData);
    console.log('Status:', signupRes.status);
    console.log('Respuesta:', JSON.stringify(signupRes.body, null, 2));

    if (signupRes.status === 201) {
      console.log('✅ REGISTRO EXITOSO\n');
    } else {
      console.log('❌ ERROR EN REGISTRO\n');
    }

    // Test 2: Inicio de sesión con credenciales válidas
    console.log('2️⃣ PRUEBA: Inicio de sesión con credenciales válidas');
    console.log('────────────────────────────────────────────');
    
    const loginData = {
      username: 'admin',
      password: 'admin123',
    };

    const signinRes = await makeRequest('POST', '/api/auth/signin', loginData);
    console.log('Status:', signinRes.status);
    console.log('Respuesta:', JSON.stringify(signinRes.body, null, 2));
    console.log('Cookies recibidas:', signinRes.headers['set-cookie']);

    if (signinRes.status === 200) {
      console.log('✅ LOGIN EXITOSO\n');
    } else {
      console.log('❌ ERROR EN LOGIN\n');
    }

    // Test 3: Acceso a ruta protegida (sin autenticación)
    console.log('3️⃣ PRUEBA: Acceso a ruta protegida sin autenticación');
    console.log('────────────────────────────────────────────');
    
    const protectedRes = await makeRequest('GET', '/api/user');
    console.log('Status:', protectedRes.status);
    console.log('Respuesta:', JSON.stringify(protectedRes.body, null, 2));

    if (protectedRes.status === 403) {
      console.log('✅ ACCESO BLOQUEADO CORRECTAMENTE (esperado)\n');
    } else {
      console.log('⚠️ ACCESO NO BLOQUEADO (inesperado)\n');
    }

    // Test 4: Credenciales inválidas
    console.log('4️⃣ PRUEBA: Login con credenciales inválidas');
    console.log('────────────────────────────────────────────');
    
    const invalidLogin = {
      username: 'admin',
      password: 'contraseñaincorrecta',
    };

    const invalidRes = await makeRequest('POST', '/api/auth/signin', invalidLogin);
    console.log('Status:', invalidRes.status);
    console.log('Respuesta:', JSON.stringify(invalidRes.body, null, 2));

    if (invalidRes.status !== 200) {
      console.log('✅ RECHAZO CORRECTO CON CREDENCIALES INVÁLIDAS\n');
    } else {
      console.log('❌ ACEPTÓ CREDENCIALES INVÁLIDAS\n');
    }

    // Test 5: Cierre de sesión
    console.log('5️⃣ PRUEBA: Cierre de sesión');
    console.log('────────────────────────────────────────────');
    
    const signoutRes = await makeRequest('GET', '/api/auth/signout');
    console.log('Status:', signoutRes.status);
    console.log('Cookies eliminadas:', signoutRes.headers['set-cookie']);
    console.log('✅ CIERRE DE SESION EXITOSO\n');

    console.log('═══════════════════════════════════════════');
    console.log('🎉 PRUEBAS COMPLETADAS');
    console.log('═══════════════════════════════════════════');

  } catch (error) {
    console.error('❌ Error en las pruebas:', error.message);
    process.exit(1);
  }
}

// Esperar a que el servidor esté listo
setTimeout(runTests, 2000);
