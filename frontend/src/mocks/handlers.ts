/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/return-await */
import { rest } from 'msw';
import { faker } from '@faker-js/faker';

import endpoints from '../services/api.endpoints';

import db from './db';

const handlers = [
  // signin handler
  rest.post(
    `/api${endpoints.signin}`,
    (_, res, ctx) => {
      const user = db.user.findFirst({
        where: {
          username: {
            equals: 'johnmek'
          }
        }
      });

      return res(
        ctx.status(200),
        ctx.json({
          token: faker.datatype.uuid(),
          ...user
        })
      )
    }
  ),
  // get messages
  rest.get(
    `/api${endpoints.messages}`,
    (req, res, ctx) => {
      const token = req.headers.get('token');
      const id = req.url.searchParams.get('id');

      if (token === null || token === '') {
        return res(ctx.status(401));
      }

      const messageList = db.message.findMany({
        where: {
          user: {
            id: {
              equals: id as string
            }
          }
        }
      });

      return res(
        ctx.status(200),
        ctx.json(messageList)
      );
    }
  ),
  rest.get(
    `/api${endpoints.messages}/:id`,
    (req, res, ctx) => {
      const { id } = req.params;
      const token = req.headers.get('token');

      if (token === null || token === '') {
        return res(ctx.status(401));
      }

      const message = db.message.findFirst({
        where: {
          id: {
            equals: id as string
          }
        }
      });

      return res(
        ctx.status(200),
        ctx.json(message)
      );
    }
  ),
  // create message
  rest.post(
    `/api${endpoints.messages}`,
    async (req, res, ctx) => {
      const token = req.headers.get('token');
      const messageBody = await req.json();

      if (token === null || token === '') {
        return res(ctx.status(401));
      }

      db.message.create({
        title: messageBody.title,
        content: messageBody.content,
        hideByView: messageBody.hideByView,
        limit: messageBody.limit,
        status: messageBody.status,
        user: messageBody.user
      });

      return res(ctx.status(200));
    }
  )
];

export default handlers;
