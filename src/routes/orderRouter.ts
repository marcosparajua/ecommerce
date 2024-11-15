import { Router } from 'express';
import {
  createOrder,
  getUserOrders,
  getOrderById,
} from '../controllers/orderController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', authenticateJWT, createOrder);
router.get('/', authenticateJWT, getUserOrders);
router.get('/:id', authenticateJWT, getOrderById);

export default router;
