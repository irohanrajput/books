import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import parseCSV from '../utils/csvParser.js';

const prisma = new PrismaClient();

export const getBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching books' });
  }
};

export const getBookDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.findUnique({ where: { id: parseInt(id) } });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res
      .status(400)
      .json({ error: "failed to retrive single particular book's data" });
  }
};

export const createBook = async (req, res) => {
  const { title, author, publishedAt, price, sellerId } = req.body;
  try {
    const book = await prisma.book.create({
      data: {
        title,
        author,
        publishedAt,
        price,
        sellerId: req.user.id,
      },
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: 'failed to create book' });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, price } = req.body;
  try {
    const book = await prisma.book.updateMany({
      where: { id: parseInt(id), sellerId: req.user.id },
      data: {
        title,
        author,
        price,
      },
    });
    if (book.count === 0)
      return res.status(403).json({ error: 'Unauthorized' });
    res.json({ message: 'Book updated' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update book' });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.deleteMany({
      where: { id: parseInt(id), sellerId: req.user.id },
    });
    if (book.count === 0)
      return res.status(403).json({ error: 'Unauthorized' });
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete book' });
  }
};

export const uploadBooks = async (req, res) => {
  try {
    const filePath = req.file.path; 
    const records = await parseCSV(filePath);

    await prisma.book.createMany({
      data: records.map((record) => ({
        title: record.title,
        author: record.author,
        publishedAt: record.publishedAt,
        price: record.price,
        sellerId: req.user.id,
      })),
    });

    res.status(201).json({ message: 'Books uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to upload books' });
  }
};
