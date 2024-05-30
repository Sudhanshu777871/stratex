import express from 'express';
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/userRoutes';
import sellerRoutes from './routes/sellerRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sellers', sellerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
