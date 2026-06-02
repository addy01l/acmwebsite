import { Router } from 'express';
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  addGalleryImage,
  deleteGalleryImage,
  getDomains,
} from '../controllers/eventController';
import { authMiddleware, adminGuard } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getAllEvents);
router.get('/domains', getDomains);
router.get('/:id', getEventById);

// Admin-only routes
router.post('/', authMiddleware, adminGuard, createEvent);
router.put('/:id', authMiddleware, adminGuard, updateEvent);
router.delete('/:id', authMiddleware, adminGuard, deleteEvent);
router.post('/:id/gallery', authMiddleware, adminGuard, addGalleryImage);
router.delete('/gallery/:galleryId', authMiddleware, adminGuard, deleteGalleryImage);

export default router;
