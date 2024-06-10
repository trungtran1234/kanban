import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from '../../../../backend/src/trpcRouter';

export default createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
