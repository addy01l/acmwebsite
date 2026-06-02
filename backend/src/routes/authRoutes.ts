import { Router } from 'express';
import { login, register, getProfile } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/login', login);
router.post('/register', register); // Seed runs unauthenticated if 0 users; otherwise admin token needed
router.get('/profile', authMiddleware, getProfile);

export default router;
