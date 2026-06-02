import { Router } from 'express';
import {
  sendMessage,
  getMessages,
  markMessageRead,
  subscribeNewsletter,
  getNewsletterSubscribers,
} from '../controllers/contactController';
import { authMiddleware, adminGuard } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/message', sendMessage);
router.post('/newsletter/subscribe', subscribeNewsletter);

// Admin-only routes
router.get('/messages', authMiddleware, adminGuard, getMessages);
router.put('/messages/:id/read', authMiddleware, adminGuard, markMessageRead);
router.get('/newsletter/subscribers', authMiddleware, adminGuard, getNewsletterSubscribers);

export default router;
