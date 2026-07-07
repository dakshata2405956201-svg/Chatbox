import express from 'express';
import { createChat, getUserChats, deleteChat } from '../controllers/chat.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router();

// All chat routes are private (require authentication)
router.use(protect);

router.post('/', createChat);
router.get('/', getUserChats);
router.delete('/:id', deleteChat);

export default router;
