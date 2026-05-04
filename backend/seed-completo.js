const mongoose = require('mongoose');

// ── Modelos inline ────────────────────────────────────────────────────────────
const CategorySchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  image:       { type: String, trim: true }
}, { timestamps: true });

const ShopSchema = new mongoose.Schema({
  name:        { type: String, trim: true, required: true },
  description: { type: String, trim: true },
  phone:       { type: String, trim: true },
  address:     { type: String, trim: true },
  seller_id:   { type: mongoose.Schema.ObjectId, ref: 'User' },
  created:     { type: Date, default: Date.now },
  updated:     Date,
  logo_url:    { type: String, trim: true },
  cover_url:   { type: String, trim: true },
});

const ProductSchema = new mongoose.Schema({
  name:        { type: String, trim: true, required: true },
  description: { type: String, trim: true },
  price:       { type: Number, required: true },
  stock:       { type: Number, required: true },
  color:       { type: String, trim: true },
  material:    { type: String, trim: true },
  size:        { type: String, trim: true },
  shop_id:     { type: mongoose.Schema.ObjectId, ref: 'Shop' },
  category_id: { type: mongoose.Schema.ObjectId, ref: 'Category' },
  image:       { type: String, trim: true },
  created:     { type: Date, default: Date.now },
  updated:     Date,
});

const NewsCarouselSchema = new mongoose.Schema({
  image: { type: String, required: true, trim: true },
  url:   { type: String, trim: true }
}, { timestamps: true });

const Category    = mongoose.model('Category',    CategorySchema);
const Shop        = mongoose.model('Shop',        ShopSchema);
const Product     = mongoose.model('Product',     ProductSchema);
const NewsCarousel = mongoose.model('NewsCarousel', NewsCarouselSchema);

// ── Conexión ──────────────────────────────────────────────────────────────────
const DB_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/feria-artesanal';

async function seed() {
  await mongoose.connect(DB_URL);
  console.log('✅ Conectado a MongoDB');

  // Limpiar todo
  await Promise.all([
    Category.deleteMany({}),
    Shop.deleteMany({}),
    Product.deleteMany({}),
    NewsCarousel.deleteMany({}),
  ]);
  console.log('🗑️  Colecciones limpiadas');

  // ── Categorías ────────────────────────────────────────────────────────────
  const [joyeria, ceramica, textiles, madera, cuero, pintura] = await Category.insertMany([
    {
      name: 'Joyería',
      description: 'Collares, pulseras y aretes hechos a mano',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400'
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
  console.log('📦 6 categorías insertadas');

  // ── Tiendas ───────────────────────────────────────────────────────────────
  const [tallerPlata, ceramicaSur, telares, maderasVivas, cuerosRio, arteColor] = await Shop.insertMany([
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

  // ── Productos vinculados a tiendas ────────────────────────────────────────
  await Product.insertMany([
    // Taller de Plata (joyeria)
    {
      name: 'Collar de plata con piedra luna',
      description: 'Collar artesanal de plata 925 con piedra luna natural engarzada a mano.',
      price: 850, stock: 10, color: 'Plata', material: 'Plata 925 y piedra luna', size: 'Única',
      shop_id: tallerPlata._id, category_id: joyeria._id,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400'
    },
    {
      name: 'Pulsera de macramé con turquesa',
      description: 'Pulsera tejida en hilo de algodón con piedra turquesa natural.',
      price: 320, stock: 25, color: 'Azul y beige', material: 'Algodón y turquesa', size: 'Ajustable',
      shop_id: tallerPlata._id, category_id: joyeria._id,
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400'
    },
    {
      name: 'Aretes de plata con ágata',
      description: 'Aretes colgantes de plata 925 con piedra ágata natural.',
      price: 490, stock: 15, color: 'Plata y rosa', material: 'Plata 925 y ágata', size: 'Única',
      shop_id: tallerPlata._id, category_id: joyeria._id,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400'
    },
    // Cerámica del Sur (ceramica)
    {
      name: 'Tazón de cerámica pintado a mano',
      description: 'Tazón de cerámica con diseños florales pintados a mano, apto para microondas.',
      price: 490, stock: 15, color: 'Blanco y azul', material: 'Cerámica', size: '12cm diámetro',
      shop_id: ceramicaSur._id, category_id: ceramica._id,
      image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400'
    },
    {
      name: 'Jarrón de barro negro',
      description: 'Jarrón decorativo de barro negro con acabado rústico.',
      price: 750, stock: 8, color: 'Negro', material: 'Barro', size: '25cm alto',
      shop_id: ceramicaSur._id, category_id: ceramica._id,
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400'
    },
    {
      name: 'Set de tazas artesanales',
      description: 'Set de 4 tazas de cerámica con diferentes diseños pintados a mano.',
      price: 1200, stock: 5, color: 'Multicolor', material: 'Cerámica', size: '8cm alto',
      shop_id: ceramicaSur._id, category_id: ceramica._id,
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400'
    },
    // Telares del Norte (textiles)
    {
      name: 'Manta tejida en telar',
      description: 'Manta de lana pura tejida en telar tradicional con motivos geométricos.',
      price: 1200, stock: 6, color: 'Multicolor', material: 'Lana', size: '150x200cm',
      shop_id: telares._id, category_id: textiles._id,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
    },
    {
      name: 'Bolso bordado a mano',
      description: 'Bolso de tela con bordado floral hecho a mano, con cierre y asa larga.',
      price: 680, stock: 12, color: 'Rojo y rosa', material: 'Tela de algodón e hilo de bordar', size: '30x25cm',
      shop_id: telares._id, category_id: textiles._id,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400'
    },
    {
      name: 'Tapiz de pared geométrico',
      description: 'Tapiz decorativo tejido a mano con patrones geométricos en colores naturales.',
      price: 950, stock: 8, color: 'Beige y marrón', material: 'Lana y algodón', size: '60x90cm',
      shop_id: telares._id, category_id: textiles._id,
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=400'
    },
    // Maderas Vivas (madera)
    {
      name: 'Tabla de cortar con grabado',
      description: 'Tabla de cortar de madera de quebracho con grabado personalizable.',
      price: 550, stock: 20, color: 'Natural', material: 'Quebracho', size: '35x25cm',
      shop_id: maderasVivas._id, category_id: madera._id,
      image: 'https://images.unsplash.com/photo-1611486212355-d276af4581c0?w=400'
    },
    {
      name: 'Escultura de madera tallada',
      description: 'Figura decorativa tallada a mano en madera de cedro.',
      price: 980, stock: 4, color: 'Natural', material: 'Cedro', size: '20cm alto',
      shop_id: maderasVivas._id, category_id: madera._id,
      image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=400'
    },
    {
      name: 'Portavelas de madera rústica',
      description: 'Set de 3 portavelas torneados a mano en madera de pino.',
      price: 420, stock: 15, color: 'Natural', material: 'Pino', size: 'Varios tamaños',
      shop_id: maderasVivas._id, category_id: madera._id,
      image: 'https://images.unsplash.com/photo-1603905756450-43b91e7e7d3e?w=400'
    },
    // Cueros del Río (cuero)
    {
      name: 'Billetera de cuero repujado',
      description: 'Billetera de cuero vacuno con diseño repujado a mano.',
      price: 720, stock: 18, color: 'Marrón', material: 'Cuero vacuno', size: '10x8cm',
      shop_id: cuerosRio._id, category_id: cuero._id,
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400'
    },
    {
      name: 'Cinturón artesanal trenzado',
      description: 'Cinturón trenzado a mano en cuero genuino con hebilla de acero inoxidable.',
      price: 890, stock: 10, color: 'Negro', material: 'Cuero genuino', size: 'Talle M (90cm)',
      shop_id: cuerosRio._id, category_id: cuero._id,
      image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400'
    },
    {
      name: 'Bolso de cuero artesanal',
      description: 'Bolso tote de cuero genuino cosido a mano con asas reforzadas.',
      price: 1800, stock: 6, color: 'Camel', material: 'Cuero genuino', size: '35x30cm',
      shop_id: cuerosRio._id, category_id: cuero._id,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400'
    },
    // Arte y Color (pintura)
    {
      name: 'Acuarela abstracta "Horizonte"',
      description: 'Pintura en acuarela sobre papel de algodón, enmarcada. Pieza única.',
      price: 1500, stock: 1, color: 'Azul y naranja', material: 'Acuarela sobre papel de algodón', size: '40x30cm',
      shop_id: arteColor._id, category_id: pintura._id,
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400'
    },
    {
      name: 'Óleo sobre tela "Naturaleza viva"',
      description: 'Pintura al óleo de naturaleza muerta con frutas y flores, estilo clásico.',
      price: 2200, stock: 1, color: 'Multicolor', material: 'Óleo sobre tela', size: '50x40cm',
      shop_id: arteColor._id, category_id: pintura._id,
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400'
    },
    {
      name: 'Acuarela botánica "Flora del Sur"',
      description: 'Ilustración botánica en acuarela de flores nativas uruguayas.',
      price: 980, stock: 2, color: 'Verde y rosa', material: 'Acuarela sobre papel', size: '30x20cm',
      shop_id: arteColor._id, category_id: pintura._id,
      image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400'
    },
  ]);
  console.log('🛍️  18 productos insertados y vinculados a tiendas');

  // ── Carrusel ──────────────────────────────────────────────────────────────
  await NewsCarousel.insertMany([
    { image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200', url: '/products' },
    { image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200', url: '/products' },
    { image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200', url: '/products' },
    { image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200', url: '/products' },
  ]);
  console.log('🖼️  4 slides del carrusel insertados');

  // ── Mostrar ID de la primera tienda para el home.jsx ─────────────────────
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📌 Copiá este ID para el FeaturedShop en home.jsx:');
  console.log(`   shopId: '${tallerPlata._id}'`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('✅ Seed completo exitosamente');
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Error en el seed:', err);
  process.exit(1);
});