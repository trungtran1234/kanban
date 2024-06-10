const express = require('express');
import listsRouter from './routes/lists';
import itemsRouter from './routes/items';
const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/lists', listsRouter);
app.use('/items', itemsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
