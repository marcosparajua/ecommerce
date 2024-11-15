import express from 'express';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import authRouter from './routes/authRouter.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(compression());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use('/api/auth', authRouter);

app.get('/test', (req, res) => {
  res.json({ message: 'API is working' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
