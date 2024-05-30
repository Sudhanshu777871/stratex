import { Router } from 'express';
import { getAllBooks, getBookById } from '../controllers/userController';

const router = Router();

router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);

export default router;
