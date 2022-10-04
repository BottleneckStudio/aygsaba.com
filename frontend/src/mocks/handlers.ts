/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { factory, primaryKey } from '@mswjs/data'
import { faker } from '@faker-js/faker';

import endpoints from '../services/api.endpoints';

const db = factory({
  message: {
    id: primaryKey(faker.datatype.uuid),
    title: faker.random.words,
    content: faker.random.words,
    hideByView: faker.datatype.boolean,
    limit: faker.datatype.number,
    status: () => faker.helpers.arrayElement(['ready', 'ongoing', 'done'])
  }
});

const createArrayOfObjects = (limit: number, create: any) => {
  for (let i = 1; i <= limit; i += 1) {
    create();
  }
};

createArrayOfObjects(5, db.message.create);

const handlers = [
  // signin handler
  rest.post(
    `/api${endpoints.signin}`,
    (_, res, ctx) => res(
      ctx.status(200),
      ctx.json({
        token: faker.datatype.uuid(),
        username: faker.name.firstName(),
        image: faker.image.avatar()
      })
    )
  ),
  // get messages
  rest.get(
    `/api${endpoints.messages}`,
    (req, res, ctx) => {
      const token = req.headers.get('token');

      if (token === null || token === '') {
        return res(ctx.status(401));
      }

      const messageList = db.message.getAll();

      return res(
        ctx.status(200),
        ctx.json(messageList)
      );
    }
  )
];

export default handlers;
