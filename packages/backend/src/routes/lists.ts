import { Router } from 'express';
import prisma from '../prismaClient';

const router = Router();

// Get all lists
router.get('/getLists', async (req, res) => {
  const lists = await prisma.list.findMany({
    include: { items: true },
  });
  res.json(lists);
});

// Create a new list
router.post('/createList', async (req, res) => {
  const { name } = req.body;
  const newList = await prisma.list.create({
    data: { name },
  });
  res.json(newList);
});

// Delete a list
router.delete('/deleteList/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.list.delete({
    where: { id: Number(id) },
  });
  res.status(204).send();
});

export default router;
