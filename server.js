import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import tohumRoutes from './routes/tohumRoutes.js';

dotenv.config();

const app = express();

// CORS ayarları - tüm originlere izin ver
app.use(cors({
  origin: '*',  // Tüm domainlere izin ver
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],  // Tüm HTTP metodlarına izin ver
  allowedHeaders: '*',  // Tüm headerlara izin ver
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api', tohumRoutes);

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB bağlantısı başarılı');
  })
  .catch((error) => {
    console.log('MongoDB bağlantı hatası:', error);
  });

// Sağlık kontrolü için root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Vercel için export
export default app;
