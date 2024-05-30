import { Router } from 'express';
import { addBooks, getSellerBooks, updateBook, deleteBook } from '../controllers/sellerController';
import authMiddleware from '../middlewares/authMiddleware';
import { sellerOnly } from '../middlewares/roleMiddleware';

const router = Router();

router.use(authMiddleware);
router.use(sellerOnly);

router.post('/books', addBooks);
router.get('/books', getSellerBooks);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

export default router;
