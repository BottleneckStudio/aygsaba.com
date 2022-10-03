/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';

import endpoints from '../services/api.endpoints';

const handlers = [
  // signin handler
  rest.post(
    `/api${endpoints.signin}`,
    (_, res, ctx) => res(
      ctx.status(200),
      ctx.json({
        token: 'as;dlfkjja1231',
        username: 'johnmek',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80'
      })
    )
  )
];

export default handlers;
