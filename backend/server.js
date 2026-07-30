import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'; 
import uploadRoutes from './routes/uploadRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

// Database connect karein
connectDB();

const app = express();

// CORS Configuration (Frontend 5173 ko allow karne ke liye)
const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true, 
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// JSON body parser (Login data padhne ke liye)
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); 
app.use('/api/upload', uploadRoutes);
app.use('/api/projects', projectRoutes);

// Root route check
app.get('/', (req, res) => {
  res.send('🚀 Foundation Backend is Running!');
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`✅ Server started on http://localhost:${PORT}`);
});