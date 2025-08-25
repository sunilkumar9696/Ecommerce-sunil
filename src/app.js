// src/app.js
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middlewares/errorHandler.js';
import productRoutes from '../src/routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import authRoutes from './routes/authRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js'

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/address', addressRoutes);

// Security middlewares
app.use(helmet());

// Log requests (only in development)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Enable CORS
// app.use(cors({
//   origin:'http://localhost:5173',
//   credentials: true,
// }));

// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true // if using cookies or auth headers
// }));


// API Routes
// app.use('/api', router);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

// 404 Middleware
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;
