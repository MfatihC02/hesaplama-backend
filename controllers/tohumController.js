import { Tohum } from '../models/tohumModel.js';

// Tüm ürünleri getir
const getTumUrunler = async (req, res) => {
  try {
    const urunler = await Tohum.find().sort({ urunAdi: 1 });
    res.status(200).json(urunler);
  } catch (error) {
    res.status(500).json({ 
      hata: 'Ürünler getirilirken bir hata oluştu',
      detay: error.message 
    });
  }
};

// Tek ürün getir
const getUrun = async (req, res) => {
  try {
    const { id } = req.params;
    const urun = await Tohum.findById(id);
    
    if (!urun) {
      return res.status(404).json({ hata: 'Ürün bulunamadı' });
    }

    res.status(200).json(urun);
  } catch (error) {
    res.status(400).json({ 
      hata: 'Ürün getirilirken bir hata oluştu',
      detay: error.message 
    });
  }
};

// Yeni ürün ekle
const urunEkle = async (req, res) => {
  try {
    const yeniUrun = await Tohum.create(req.body);
    res.status(201).json(yeniUrun);
  } catch (error) {
    res.status(400).json({ 
      hata: 'Ürün eklenirken bir hata oluştu',
      detay: error.message 
    });
  }
};

// Ürün güncelle
const urunGuncelle = async (req, res) => {
  try {
    const { id } = req.params;
    const urun = await Tohum.findByIdAndUpdate(
      id, 
      req.body,
      { new: true, runValidators: true }
    );

    if (!urun) {
      return res.status(404).json({ hata: 'Ürün bulunamadı' });
    }

    res.status(200).json(urun);
  } catch (error) {
    res.status(400).json({ 
      hata: 'Ürün güncellenirken bir hata oluştu',
      detay: error.message 
    });
  }
};

// Ürün sil
const urunSil = async (req, res) => {
  try {
    const { id } = req.params;
    const urun = await Tohum.findByIdAndDelete(id);

    if (!urun) {
      return res.status(404).json({ hata: 'Ürün bulunamadı' });
    }

    res.status(200).json({ mesaj: 'Ürün başarıyla silindi' });
  } catch (error) {
    res.status(400).json({ 
      hata: 'Ürün silinirken bir hata oluştu',
      detay: error.message 
    });
  }
};

// Alan bazlı hesaplama
const hesaplamaYap = async (req, res) => {
  try {
    const { urunId, alan, ekimTipi } = req.body;

    // Input validasyonu
    if (!urunId || !alan || !ekimTipi) {
      return res.status(400).json({ 
        hata: 'Eksik bilgi',
        detay: 'Ürün ID, alan ve ekim tipi zorunludur' 
      });
    }

    if (alan <= 0) {
      return res.status(400).json({ 
        hata: 'Geçersiz alan',
        detay: 'Alan 0\'dan büyük olmalıdır' 
      });
    }

    if (!['mibzerIle', 'elIle'].includes(ekimTipi)) {
      return res.status(400).json({ 
        hata: 'Geçersiz ekim tipi',
        detay: 'Ekim tipi mibzerIle veya elIle olmalıdır' 
      });
    }

    // Ürünü bul
    const urun = await Tohum.findById(urunId);
    if (!urun) {
      return res.status(404).json({ hata: 'Ürün bulunamadı' });
    }

    // Hesaplama yap
    const sonuc = urun.hesaplaIhtiyac(alan, ekimTipi);
    res.status(200).json(sonuc);

  } catch (error) {
    res.status(400).json({ 
      hata: 'Hesaplama yapılırken bir hata oluştu',
      detay: error.message 
    });
  }
};

export {
  getTumUrunler,
  getUrun,
  urunEkle,
  urunGuncelle,
  urunSil,
  hesaplamaYap
};
