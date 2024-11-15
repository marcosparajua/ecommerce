import { Router } from 'express';
import { getProfile } from '../controllers/userController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/profile', authenticateJWT, getProfile);

export default router;
