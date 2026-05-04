const mongoose = require('mongoose');

// ── Modelo inline ────────────────────────────────────────────────────────────
const newsCarouselSchema = new mongoose.Schema({
  image: { type: String, required: true, trim: true },
  url:   { type: String, trim: true }
}, { timestamps: true });

const NewsCarousel = mongoose.model('NewsCarousel', newsCarouselSchema);

// ── Conexión ─────────────────────────────────────────────────────────────────
const DB_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/feria-artesanal';

async function seed() {
  await mongoose.connect(DB_URL);
  console.log('✅ Conectado a MongoDB');

  await NewsCarousel.deleteMany({});
  console.log('🗑️  Colección news-carousel limpiada');

  await NewsCarousel.insertMany([
    {
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200',
      url: '/products'
    },
    {
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
      url: '/products'
    },
    {
      image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200',
      url: '/products'
    },
    {
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200',
      url: '/products'
    },
  ]);

  console.log('🖼️  4 slides del carrusel insertados');
  console.log('✅ Seed del carrusel completado exitosamente');
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Error en el seed:', err);
  process.exit(1);
});