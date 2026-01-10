import nextConnect from 'next-connect';
import auth from '@middleware/auth';
import api from '@middleware/api';
import database from '@middleware/database';
import access from '@middleware/access';
import parser from '@middleware/parser';
import UserData, { ESCAPE } from '@database/base/user';
import PersonData from '@database/base/person';
import { pick, pickBy, isEmpty } from 'lodash';

const parseName = (firstName, lastName) => {
  return [firstName, lastName].filter(Boolean).join(' ').trim();
};

const resolveEmail = (data) => {
  if (data.email) return data.email.toLowerCase();
  if (data.personalEmail) return data.personalEmail.toLowerCase();
  if (data.username?.includes('@')) return data.username.toLowerCase();
  return `${data.username?.toLowerCase() || 'user'}@local`;
};

const normalizeRoleIds = (roles) => {
  if (!Array.isArray(roles)) return null;
  return roles
    .map((role) => {
      if (typeof role === 'number') return role;
      return role?.roleId || role?.id;
    })
    .filter(Boolean);
};

const parseRoles = (roles, options = {}) => {
  if (!Array.isArray(roles)) return undefined;
  const roleIds = normalizeRoleIds(roles);
  const payload = {
    create: roleIds.map((roleId) => ({ roleId, active: true })),
  };
  if (options.update) payload.deleteMany = {};
  return payload;
};

/** Retorna un objeto con los datos transformados a los formatos requeridos por
 * la base de datos */
const parseData = (data, _user) => {
  data = pickBy({
    ...data,
    username: data.username?.toLowerCase(),
    firstName: data.firstName?.toUpperCase(),
    lastName: data.lastName?.toUpperCase(),
    personalEmail: data.personalEmail?.toLowerCase(),
    password: undefined,
  });
  if (data.username) data.email = resolveEmail(data);
  if (data.firstName || data.lastName) {
    data.name = parseName(
      data.firstName || _user.Person.firstName,
      data.lastName || _user.Person.lastName,
    );
  }
  return data;
};

/** Retorna un objeto con datos válidos para la tabla `person` */
const parsePerson = (data) => {
  return pickBy({
    ...pick(data, ['dni', 'mobile', 'name', 'firstName', 'lastName']),
    email: data.personalEmail,
  });
};

/** Retorna un objeto con datos válidos para la tabla `user` */
const parseUser = (data) => {
  return pickBy({
    ...pick(data, ['modifiedDate', 'email', 'accountTypeId']),
    username: data.email,
    roles: parseRoles(data.roles, { update: true }),
    modifiedDate: new Date(),
  });
};

/** Comprueba si los objetos `user` o `person` se cuentran vacíos */
const checkEmpty = (user, person) => {
  if (isEmpty(person) && isEmpty(user))
    throw new Error('No existen datos para modificar');
};

const handler = nextConnect();

handler
  .use(auth)
  .use(api)
  .use(access('user'))
  .use(database(UserData))
  .use((request, response, next) => {
    if (request.query.id == 1 && request.user.id != 1)
      response
        .status(405)
        .json({ message: 'No tiene permisos para realizar esta operación' });
    next();
  })
  .get((request) => {
    request.do('read', async (api, prisma) => {
      const db = prisma.user;
      const where = { id: request.query.id };
      const user = await db.where(where).getFirst();
      return api.successOne(user);
    });
  })
  .use(database(PersonData))
  .use(parser.escape(ESCAPE))
  .put((request) => {
    request.do(
      'write',
      async (api, prisma) => {
        let data = request.body;
        const userId = request.query.id;
        const _user = await prisma.user.record(userId).getUnique();
        data = parseData(data, _user);
        const person = parsePerson(data);
        const user = parseUser(data);
        checkEmpty(user, person);
        const modifiedUser = await prisma.user.record(userId).update(user);
        const modifiedPerson = await prisma.person
          .record(modifiedUser.personId)
          .update(person);
        return api.success({ ...modifiedUser, Person: { ...modifiedPerson } });
      },
      { transaction: true },
    );
  })
  .delete((request) => {
    request.do('remove', async (api, prisma) => {
      return api.success(
        await prisma.user.record(request.query.id).update({ active: false }),
      );
    });
  });

export default handler;
