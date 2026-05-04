const mongoose = require('mongoose');

// ── Modelo inline ────────────────────────────────────────────────────────────
const ShopSchema = new mongoose.Schema({
  name:        { type: String, trim: true, required: 'Name is required' },
  description: { type: String, trim: true },
  phone:       { type: String, trim: true },
  address:     { type: String, trim: true },
  seller_id:   { type: mongoose.Schema.ObjectId, ref: 'User' },
  created:     { type: Date, default: Date.now },
  updated:     Date,
  logo_url:    { type: String, trim: true },
  cover_url:   { type: String, trim: true },
});

const Shop = mongoose.model('Shop', ShopSchema);

// ── Conexión ─────────────────────────────────────────────────────────────────
const DB_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/feria-artesanal';

async function seed() {
  await mongoose.connect(DB_URL);
  console.log('✅ Conectado a MongoDB');

  await Shop.deleteMany({});
  console.log('🗑️  Colección shops limpiada');

  await Shop.insertMany([
    {
      name: 'Taller de Plata',
      description: 'Joyería artesanal en plata 925, diseños únicos inspirados en la naturaleza.',
      phone: '+598 91 234 567',
      address: 'Mercado de los Artesanos, Local 12, Montevideo',
      logo_url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200',
      cover_url: 'https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=800',
    },
    {
      name: 'Cerámica del Sur',
      description: 'Piezas de cerámica y barro cocido, funcionales y decorativas hechas a mano.',
      phone: '+598 92 345 678',
      address: 'Feria de Tristán Narvaja, Stand 45, Montevideo',
      logo_url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=200',
      cover_url: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800',
    },
    {
      name: 'Telares del Norte',
      description: 'Textiles artesanales tejidos en telar, mantas, tapices y prendas de lana.',
      phone: '+598 93 456 789',
      address: 'Plaza Independencia, Puesto 7, Montevideo',
      logo_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200',
      cover_url: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=800',
    },
    {
      name: 'Maderas Vivas',
      description: 'Tallas y objetos decorativos en madera nativa, cada pieza es única.',
      phone: '+598 94 567 890',
      address: 'Ciudad Vieja, Calle Sarandí 320, Montevideo',
      logo_url: 'https://images.unsplash.com/photo-1611486212355-d276af4581c0?w=200',
      cover_url: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=800',
    },
    {
      name: 'Cueros del Río',
      description: 'Marroquinería artesanal: billeteras, cinturones y bolsos de cuero genuino.',
      phone: '+598 95 678 901',
      address: 'Mercado del Puerto, Local 8, Montevideo',
      logo_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200',
      cover_url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800',
    },
    {
      name: 'Arte y Color',
      description: 'Pinturas originales al óleo y acuarela, arte para decorar tu hogar.',
      phone: '+598 96 789 012',
      address: 'Barrio Sur, Calle Maldonado 123, Montevideo',
      logo_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200',
      cover_url: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800',
    },
  ]);

  console.log('🏪 6 tiendas insertadas');
  console.log('✅ Seed de tiendas completado exitosamente');
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Error en el seed:', err);
  process.exit(1);
});