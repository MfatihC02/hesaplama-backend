import mongoose from 'mongoose';
const { Schema } = mongoose;

const tohumSchema = new Schema({
  urunAdi: {
    type: String,
    required: [true, 'Ürün adı zorunludur'],
    trim: true
  },
  birimFiyat: {
    type: Number,
    required: [true, 'Birim fiyat zorunludur'],
    min: [0, 'Birim fiyat 0\'dan küçük olamaz']
  },
  ekimBilgileri: {
    mibzerIle: {
      miktar: {
        type: Number,
        required: [true, 'Mibzer ile ekim miktarı zorunludur'],
        min: [0, 'Miktar 0\'dan küçük olamaz']
      },
      aciklama: {
        type: String,
        default: ''
      }
    },
    elIle: {
      miktar: {
        type: Number,
        required: [true, 'El ile ekim miktarı zorunludur'],
        min: [0, 'Miktar 0\'dan küçük olamaz']
      },
      aciklama: {
        type: String,
        default: ''
      }
    }
  },
  aciklama: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Virtuals
tohumSchema.virtual('birimMiktarText').get(function() {
  return `Mibzer ile: ${this.ekimBilgileri.mibzerIle.miktar} kg/1000m², El ile: ${this.ekimBilgileri.elIle.miktar} kg/1000m²`;
});

// Model metodları
tohumSchema.methods.hesaplaIhtiyac = function(alan, ekimTipi) {
  const birimMiktar = this.ekimBilgileri[ekimTipi].miktar;
  const toplamMiktar = (alan * birimMiktar) / 1000;
  const toplamMaliyet = toplamMiktar * this.birimFiyat;

  return {
    toplamMiktar,
    toplamMaliyet,
    birimMiktar,
    urunBilgisi: {
      ad: this.urunAdi,
      birimFiyat: this.birimFiyat,
      ekimDetay: this.ekimBilgileri[ekimTipi].aciklama
    }
  };
};

const Tohum = mongoose.model('Tohum', tohumSchema);
export { Tohum };
