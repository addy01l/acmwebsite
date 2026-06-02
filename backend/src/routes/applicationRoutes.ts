import { Router } from 'express';
import {
  submitApplication,
  getApplications,
  updateApplicationStatus,
  getMembers,
  deleteMember,
  exportApplicationsToExcel,
} from '../controllers/applicationController';
import { authMiddleware, adminGuard } from '../middleware/auth';
import { uploadResume } from '../middleware/upload';

const router = Router();

// Public route to apply
router.post('/submit', uploadResume.single('resume'), submitApplication);

// Admin-only routes
router.get('/', authMiddleware, adminGuard, getApplications);
router.put('/:id/status', authMiddleware, adminGuard, updateApplicationStatus);
router.get('/export', authMiddleware, adminGuard, exportApplicationsToExcel);
router.get('/members', authMiddleware, adminGuard, getMembers);
router.delete('/members/:id', authMiddleware, adminGuard, deleteMember);

export default router;
