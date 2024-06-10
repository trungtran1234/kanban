import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './trpcRouter';

const app = express();

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  }),
);

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port 5000`);
});
