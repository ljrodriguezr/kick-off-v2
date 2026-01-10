import nextConnect from 'next-connect';
import auth from '@middleware/auth';
import api from '@middleware/api';
import database from '@middleware/database';
import access from '@middleware/access';
import UserData from '@database/base/user';
import { hash } from '@lib/hash';

const handler = nextConnect();

const BIND_ERROR = 'Su contraseña actual no es correcta';

handler
  .use(auth)
  .use(api)
  .use(access('user'))
  .use(database(UserData))
  .put((request) => {
    request.do(
      null,
      async (api, prisma) => {
        const data = request.body;
        const user = await prisma.user.record(request.query.id).getUnique();
        if (hash.create(data.current) !== user.password) {
          throw new Error(BIND_ERROR);
        }
        // Update local user password
        await prisma.user
          .clean()
          .record(request.query.id)
          .update({ password: hash.create(data.password) });
        return api.success();
      },
      { transaction: true },
    );
  });

export default handler;
