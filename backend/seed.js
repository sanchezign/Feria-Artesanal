const mongoose = require('mongoose');

// ── Modelos inline para no depender de rutas relativas ──────────────────────
const CategorySchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  image:       { type: String, trim: true }
}, { timestamps: true });

const ProductSchema = new mongoose.Schema({
  name:        { type: String, trim: true, required: 'Name is required' },
  description: { type: String, trim: true },
  price:       { type: Number, required: 'Price is required' },
  stock:       { type: Number, required: 'Stock is required' },
  color:       { type: String, trim: true },
  material:    { type: String, trim: true },
  size:        { type: String, trim: true },
  shop_id:     { type: mongoose.Schema.ObjectId, ref: 'Shop' },
  category_id: { type: mongoose.Schema.ObjectId, ref: 'Category' },
  image:       { type: String, trim: true },
  created:     { type: Date, default: Date.now },
  updated:     Date,
});

const Category = mongoose.model('Category', CategorySchema);
const Product   = mongoose.model('Product',  ProductSchema);

// ── Conexión ────────────────────────────────────────────────────────────────
// Podés poner la URL directo acá o leerla del .env
const DB_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/feria-artesanal';

async function seed() {
  await mongoose.connect(DB_URL);
  console.log('✅ Conectado a MongoDB');

  // Limpiar colecciones anteriores
  await Category.deleteMany({});
  await Product.deleteMany({});
  console.log('🗑️  Colecciones limpiadas');

  // ── Categorías ─────────────────────────────────────────────────────────────
  const categories = await Category.insertMany([
    {
      name: 'Joyería',
      description: 'Collares, pulseras y aretes hechos a mano',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400'
    },
    {
      name: 'Cerámica',
      description: 'Piezas únicas de barro y porcelana artesanal',
      image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400'
    },
    {
      name: 'Textiles',
      description: 'Tejidos, bordados y prendas artesanales',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
    },
    {
      name: 'Madera',
      description: 'Tallas, muebles y objetos decorativos en madera',
      image: 'https://images.unsplash.com/photo-1611486212355-d276af4581c0?w=400'
    },
    {
      name: 'Cuero',
      description: 'Bolsos, cinturones y accesorios de cuero trabajado a mano',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400'
    },
    {
      name: 'Pintura',
      description: 'Cuadros y obras de arte originales',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400'
    },
  ]);
  console.log(`📦 ${categories.length} categorías insertadas`);

  // ── Productos ──────────────────────────────────────────────────────────────
  const [joyeria, ceramica, textiles, madera, cuero, pintura] = categories;

  await Product.insertMany([
    // Joyería
    {
      name: 'Collar de plata con piedra luna',
      description: 'Collar artesanal de plata 925 con piedra luna natural engarzada a mano.',
      price: 850,
      stock: 10,
      color: 'Plata',
      material: 'Plata 925 y piedra luna',
      size: 'Única',
      category_id: joyeria._id,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400'
    },
    {
      name: 'Pulsera de macramé con turquesa',
      description: 'Pulsera tejida en hilo de algodón con piedra turquesa natural.',
      price: 320,
      stock: 25,
      color: 'Azul y beige',
      material: 'Algodón y turquesa',
      size: 'Ajustable',
      category_id: joyeria._id,
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400'
    },
    // Cerámica
    {
      name: 'Tazón de cerámica pintado a mano',
      description: 'Tazón de cerámica con diseños florales pintados a mano, apto para microondas.',
      price: 490,
      stock: 15,
      color: 'Blanco y azul',
      material: 'Cerámica',
      size: '12cm diámetro',
      category_id: ceramica._id,
      image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400'
    },
    {
      name: 'Jarrón de barro negro',
      description: 'Jarrón decorativo de barro negro con acabado rústico.',
      price: 750,
      stock: 8,
      color: 'Negro',
      material: 'Barro',
      size: '25cm alto',
      category_id: ceramica._id,
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400'
    },
    // Textiles
    {
      name: 'Manta tejida en telar',
      description: 'Manta de lana pura tejida en telar tradicional con motivos geométricos.',
      price: 1200,
      stock: 6,
      color: 'Multicolor',
      material: 'Lana',
      size: '150x200cm',
      category_id: textiles._id,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
    },
    {
      name: 'Bolso bordado a mano',
      description: 'Bolso de tela con bordado floral hecho a mano, con cierre y asa larga.',
      price: 680,
      stock: 12,
      color: 'Rojo y rosa',
      material: 'Tela de algodón e hilo de bordar',
      size: '30x25cm',
      category_id: textiles._id,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400'
    },
    // Madera
    {
      name: 'Tabla de cortar con grabado',
      description: 'Tabla de cortar de madera de quebracho con grabado personalizable.',
      price: 550,
      stock: 20,
      color: 'Natural',
      material: 'Quebracho',
      size: '35x25cm',
      category_id: madera._id,
      image: 'https://images.unsplash.com/photo-1611486212355-d276af4581c0?w=400'
    },
    {
      name: 'Escultura de madera tallada',
      description: 'Figura decorativa tallada a mano en madera de cedro.',
      price: 980,
      stock: 4,
      color: 'Natural',
      material: 'Cedro',
      size: '20cm alto',
      category_id: madera._id,
      image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=400'
    },
    // Cuero
    {
      name: 'Billetera de cuero repujado',
      description: 'Billetera de cuero vacuno con diseño repujado a mano, interior con varios compartimentos.',
      price: 720,
      stock: 18,
      color: 'Marrón',
      material: 'Cuero vacuno',
      size: '10x8cm',
      category_id: cuero._id,
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400'
    },
    {
      name: 'Cinturón artesanal trenzado',
      description: 'Cinturón trenzado a mano en cuero genuino con hebilla de acero inoxidable.',
      price: 890,
      stock: 10,
      color: 'Negro',
      material: 'Cuero genuino',
      size: 'Talle M (90cm)',
      category_id: cuero._id,
      image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400'
    },
    // Pintura
    {
      name: 'Acuarela abstracta "Horizonte"',
      description: 'Pintura en acuarela sobre papel de algodón, enmarcada. Pieza única.',
      price: 1500,
      stock: 1,
      color: 'Azul y naranja',
      material: 'Acuarela sobre papel de algodón',
      size: '40x30cm',
      category_id: pintura._id,
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400'
    },
    {
      name: 'Óleo sobre tela "Naturaleza viva"',
      description: 'Pintura al óleo de naturaleza muerta con frutas y flores, estilo clásico.',
      price: 2200,
      stock: 1,
      color: 'Multicolor',
      material: 'Óleo sobre tela',
      size: '50x40cm',
      category_id: pintura._id,
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400'
    },
  ]);
  console.log('🛍️  12 productos insertados');
  console.log('✅ Seed completado exitosamente');
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Error en el seed:', err);
  process.exit(1);
});