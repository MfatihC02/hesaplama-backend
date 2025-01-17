import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import tohumRoutes from './routes/tohumRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', tohumRoutes);

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB bağlantısı başarılı');
    // Server'ı başlat
    app.listen(process.env.PORT, () => {
      console.log(`Server ${process.env.PORT} portunda çalışıyor`);
    });
  })
  .catch((error) => {
    console.log('MongoDB bağlantı hatası:', error);
  });
