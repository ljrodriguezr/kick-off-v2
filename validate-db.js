const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function validateDatabase() {
  try {
    console.log('=== VALIDACION DE BASE DE DATOS ===\n');

    // Contar usuarios
    const users = await prisma.base_user.findMany();
    console.log('✅ USUARIOS: ' + users.length);
    users.forEach(u => {
      console.log(`   - ID: ${u.id}, Username: ${u.username}, Email: ${u.email}, Activo: ${u.active}`);
    });

    // Contar roles
    const roles = await prisma.base_role.findMany();
    console.log('\n✅ ROLES: ' + roles.length);
    roles.forEach(r => {
      console.log(`   - ID: ${r.id}, Code: ${r.code}, Nombre: ${r.name}`);
    });

    // Contar módulos
    const modules = await prisma.base_module.findMany();
    console.log('\n✅ MODULOS: ' + modules.length);
    modules.forEach(m => {
      console.log(`   - ID: ${m.id}, Code: ${m.code}, Nombre: ${m.name}, Instalado: ${m.installed}`);
    });

    // Contar páginas
    const pages = await prisma.base_page.findMany();
    console.log('\n✅ PAGINAS: ' + pages.length);

    // Contar menús
    const menus = await prisma.base_menu.findMany();
    console.log('✅ MENUS: ' + menus.length);

    // Contar personas
    const persons = await prisma.base_person.findMany();
    console.log('✅ PERSONAS: ' + persons.length);

    // Verificar relaciones rol-usuario
    const rolesOnUsers = await prisma.base_rolesOnUsers.findMany();
    console.log('\n✅ RELACIONES ROL-USUARIO: ' + rolesOnUsers.length);

    console.log('\n🎉 VALIDACION COMPLETADA EXITOSAMENTE');

  } catch (error) {
    console.error('❌ Error en la validacion:', error);
  } finally {
    await prisma.$disconnect();
  }
}

validateDatabase();
