import nextConnect from 'next-connect';
import auth from '@middleware/auth';
import api from '@middleware/api';
import access from '@middleware/access';

const handler = nextConnect();

handler
  .use(auth)
  .use(api)
  .use(access('user'))
  .get((request) => {
    request.do(
      'read',
      async (api) => {
        return api.failure('LDAP deshabilitado');
      },
      { transaction: true },
    );
  });

export default handler;
