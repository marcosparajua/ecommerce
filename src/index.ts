import express from 'express';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import authRouter from './routes/authRouter.js';
import cartRouter from './routes/cartRouter.js';
import clothesRouter from './routes/clothesRouter.js';
import orderRouter from './routes/orderRouter.js';
import userRouter from './routes/userRouter.js';
import supabase from './utils/supaBaseClient.js';
import { getAllTags } from './controllers/clothesController.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(compression());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use('/api/auth', authRouter);
app.use('/api/cart', cartRouter);
app.use('/api/clothes', clothesRouter);
app.use('/api/order', orderRouter);
app.use('/api/user', userRouter);

// Handle tags directly
app.get('/api/clothes/tags', getAllTags);

// Base API route
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
