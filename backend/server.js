import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

connectDB();

const app = express();

// Allow all origins (fixes mobile network error)
app.use(cors({
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/projects', projectRoutes);

app.get('/', (req, res) => {
  res.send('🚀 Ettihad Foundation Backend is Running!');
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`✅ Server started on http://localhost:${PORT}`);
});