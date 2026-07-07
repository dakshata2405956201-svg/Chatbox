
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.middleware.js';
import handleSocketConnection from './sockets/socketHandler.js';
import authRoutes from './routes/auth.routes.js';
import conversationRoutes from './routes/conversation.routes.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  },
});

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Test route
app.get('/', (req, res) => {
  res.json({
    message: 'StyleMate AI Chat App Backend is running! 🎉',
    status: 'success',
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/conversations', conversationRoutes);

// Socket.io setup
handleSocketConnection(io);

// Error handling middleware (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
