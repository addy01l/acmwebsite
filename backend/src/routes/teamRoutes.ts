import { Router } from 'express';
import {
  getAllTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from '../controllers/teamController';
import { authMiddleware, adminGuard } from '../middleware/auth';

const router = Router();

// Public route
router.get('/', getAllTeamMembers);

// Admin-only routes
router.post('/', authMiddleware, adminGuard, createTeamMember);
router.put('/:id', authMiddleware, adminGuard, updateTeamMember);
router.delete('/:id', authMiddleware, adminGuard, deleteTeamMember);

export default router;
