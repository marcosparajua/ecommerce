import { Router } from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from '../controllers/cartController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authenticateJWT, getCart);
router.post('/', authenticateJWT, addToCart);
router.put('/', authenticateJWT, updateCartItem);
router.delete('/:clothesId', authenticateJWT, removeCartItem);
router.delete('/', authenticateJWT, clearCart);

export default router;
