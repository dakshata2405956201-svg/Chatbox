
import express from 'express';
import { signup, login, logout, getCurrentUser } from '../controllers/auth.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Private routes
router.post('/logout', protect, logout);
router.get('/me', protect, getCurrentUser);

export default router;
