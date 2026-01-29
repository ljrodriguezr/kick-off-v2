const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function validateUserRolesPersistence() {
  try {
    console.log('=== VALIDACION DE PERSISTENCIA DE USUARIOS Y ROLES ===\n');

    // Obtener usuario admin con sus roles
    const adminUser = await prisma.base_user.findUnique({
      where: { username: 'admin' },
      include: {
        roles: {
          include: {
            Role: true
          }
        },
        Person: true
      }
    });

    console.log('✅ USUARIO ADMIN:');
    console.log(`   - ID: ${adminUser.id}`);
    console.log(`   - Username: ${adminUser.username}`);
    console.log(`   - Email: ${adminUser.email}`);
    console.log(`   - Activo: ${adminUser.active}`);
    console.log(`   - Fecha Creacion: ${adminUser.createdDate}`);
    console.log(`   - Roles asignados: ${adminUser.roles.length}`);
    adminUser.roles.forEach(r => {
      console.log(`     - ${r.Role.name} (${r.Role.code})`);
    });

    // Crear un nuevo usuario de prueba
    console.log('\n✅ CREANDO USUARIO DE PRUEBA...');
    
    // Primero verificar si existe
    let testUser = await prisma.base_user.findUnique({
      where: { username: 'testuser' }
    });

    if (!testUser) {
      testUser = await prisma.base_user.create({
        data: {
          username: 'testuser',
          email: 'testuser@sistema.com',
          password: 'hashedpassword123',
          active: true,
          roles: {
            create: [
              {
                roleId: 1 // rol: user
              }
            ]
          }
        },
        include: {
          roles: {
            include: {
              Role: true
            }
          }
        }
      });
      console.log('   Usuario creado exitosamente');
    } else {
      console.log('   Usuario ya existe');
    }

    console.log(`   - ID: ${testUser.id}`);
    console.log(`   - Username: ${testUser.username}`);
    console.log(`   - Email: ${testUser.email}`);
    console.log(`   - Roles: ${testUser.roles.map(r => r.Role.name).join(', ')}`);

    // Verificar que se pueden recuperar todos los usuarios con roles
    const allUsers = await prisma.base_user.findMany({
      include: {
        roles: {
          include: {
            Role: true
          }
        }
      }
    });

    console.log('\n✅ RESUMEN DE TODOS LOS USUARIOS:');
    allUsers.forEach(user => {
      console.log(`   - ${user.username}: ${user.roles.map(r => r.Role.name).join(', ')}`);
    });

    // Verificar permisos por rol
    console.log('\n✅ PERMISOS POR ROL:');
    const rolesWithMenus = await prisma.base_role.findMany({
      include: {
        menus: {
          include: {
            Menu: true
          }
        }
      }
    });

    rolesWithMenus.forEach(role => {
      console.log(`   - ${role.name}: ${role.menus.length} menus asignados`);
    });

    console.log('\n🎉 VALIDACION DE PERSISTENCIA COMPLETADA');

  } catch (error) {
    console.error('❌ Error en la validacion:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

validateUserRolesPersistence();
