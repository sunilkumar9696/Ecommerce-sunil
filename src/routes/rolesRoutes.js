import express from 'express';
import { createRole, getRoles, getRoleById, updateRole, deleteRole }
    from '../controllers/roleController.js';

const router = express.Router();

// ✅ Protect all routes with Super Admin verification
router.post('/', createRole);
router.get('/',  getRoles);
router.get('/:id',  getRoleById);
router.put('/:id',  updateRole);
router.delete('/:id',  deleteRole);

export default router;