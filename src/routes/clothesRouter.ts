import { Router } from 'express';
import {
  getAllClothes,
  getClothesById,
  searchClothes,
  getClothesByTag,
  createClothes,
  updateClothes,
  deleteClothes,
  getAllTags,
} from '../controllers/clothesController.js';
import {
  authenticateJWT,
  authorizeAdmin,
} from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getAllClothes);
router.get('/tags', getAllTags);
router.get('/tags/:tag', getClothesByTag);
router.get('/search/:term', searchClothes);
router.get('/:id', getClothesById);
router.post('/', authenticateJWT, authorizeAdmin, createClothes);
router.put('/:id', authenticateJWT, authorizeAdmin, updateClothes);
router.delete('/:id', authenticateJWT, authorizeAdmin, deleteClothes);

export default router;
