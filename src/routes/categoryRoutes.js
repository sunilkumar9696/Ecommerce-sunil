import express from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from '../controllers/categoryControllers.js';
import uploadCategoryImage from '../middlewares/uploadCategory.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, uploadCategoryImage.single('thumbnail'), createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.put('/:id', verifyToken, uploadCategoryImage.single('thumbnail'), updateCategory);
router.delete('/:id', verifyToken, deleteCategory);

export default router;