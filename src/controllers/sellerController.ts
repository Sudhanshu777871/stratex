import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import csv from 'csv-parse';

const prisma = new PrismaClient();

const upload = multer({ dest: 'uploads/' });

export const addBooks = upload.single('file'), async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'Please upload a CSV file' });
  }

  const records: any[] = [];
  fs.createReadStream(file.path)
    .pipe(csv.parse({ headers: true }))
    .on('data', (row) => records.push(row))
    .on('end', async () => {
      try {
        await prisma.book.createMany({
          data: records.map(record => ({
            title: record.title,
            author: record.author,
            description: record.description,
            price: parseFloat(record.price),
            sellerId: req.user.userId
          }))
        });
        res.status(201).json({ message: 'Books added successfully' });
      } catch (error) {
        res.status(400).json({ error: 'Error adding books' });
      }
    });
};

export const getSellerBooks = async (req: Request, res: Response) => {
  const books = await prisma.book.findMany({
    where: { sellerId: req.user.userId }
  });
  res.json(books);
};

export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, description, price } = req.body;

  const book = await prisma.book.findUnique({ where: { id: Number(id), sellerId: req.user.userId } });
  if (!book) {
    return res.status(404).json({ error: 'Book not found or not authorized' });
  }

  const updatedBook = await prisma.book.update({
    where: { id: Number(id) },
    data: { title, author, description, price }
  });

  res.json(updatedBook);
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  const book = await prisma.book.findUnique({ where: { id: Number(id), sellerId: req.user.userId } });
  if (!book) {
    return res.status(404).json({ error: 'Book not found or not authorized' });
  }

  await prisma.book.delete({ where: { id: Number(id) } });
  res.status(204).send();
};
