import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import prisma from './prismaClient';

const t = initTRPC.create();

export const appRouter = t.router({
  getLists: t.procedure.query(async () => {
    return prisma.list.findMany({
      include: { items: true },
    });
  }),
  createList: t.procedure.input(z.object({ name: z.string() })).mutation(async ({ input }) => {
    return prisma.list.create({
      data: { name: input.name },
    });
  }),
  deleteList: t.procedure.input(z.number()).mutation(async ({ input }) => {
    return prisma.list.delete({
      where: { id: input },
    });
  }),
  addItem: t.procedure.input(z.object({ listId: z.number(), title: z.string() })).mutation(async ({ input }) => {
    return prisma.item.create({
      data: {
        title: input.title,
        listId: input.listId,
      },
    });
  }),
  moveItem: t.procedure.input(z.object({ itemId: z.number(), newListId: z.number() })).mutation(async ({ input }) => {
    return prisma.item.update({
      where: { id: input.itemId },
      data: { listId: input.newListId },
    });
  }),
});

export type AppRouter = typeof appRouter;
