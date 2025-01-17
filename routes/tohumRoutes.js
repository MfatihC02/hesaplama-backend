import express from 'express';
import {
  getTumUrunler,
  getUrun,
  urunEkle,
  urunGuncelle,
  urunSil,
  hesaplamaYap
} from '../controllers/tohumController.js';

const router = express.Router();

// Ürün yönetimi
router.get('/urunler', getTumUrunler);
router.get('/urunler/:id', getUrun);
router.post('/urunler', urunEkle);
router.put('/urunler/:id', urunGuncelle);
router.delete('/urunler/:id', urunSil);

// Hesaplama
router.post('/hesapla', hesaplamaYap);

export default router;
