import { Router } from 'express';
import prisma from '../prismaClient';

const router = Router();

// Add an item to a list
router.post('/add', async (req, res) => {
  const { title, listId } = req.body;
  const newItem = await prisma.item.create({
    data: {
      title,
      listId: Number(listId),
    },
  });
  res.json(newItem);
});

// Move an item to a different list
router.patch('/move/:id', async (req, res) => {
  const { id } = req.params;
  const { newListId } = req.body;
  const updatedItem = await prisma.item.update({
    where: { id: Number(id) },
    data: { listId: Number(newListId) },
  });
  res.json(updatedItem);
});

export default router;
