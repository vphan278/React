import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import authRoutes from './routes/auth/auth-routes.js';
import productsRoutes from './routes/shop/products-routes.js';
import cartRoutes from './routes/shop/cart-routes.js';
import reviewRoutes from './routes/shop/review-routes.js';
import orderRoutes from './routes/shop/order-routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/shop/products', productsRoutes);
app.use('/api/shop/cart', cartRoutes);
app.use('/api/shop/review', reviewRoutes);
app.use('/api/shop/order', orderRoutes);

app.listen(PORT, () => console.log('Server listening on', PORT));
