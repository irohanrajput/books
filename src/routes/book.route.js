import express from 'express';
import multer from 'multer';
import { getBooks, getBookDetails, createBook, deleteBook, updateBook, uploadBooks } from "../controllers/book.controller.js";
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getBooks);

router.get('/:id', getBookDetails);

router.post('/', authenticate, createBook);

router.put('/:id', authenticate, updateBook);

router.delete('/:id', authenticate, deleteBook);

router.post('/upload', authenticate, upload.single('file'), uploadBooks);

export default router;
