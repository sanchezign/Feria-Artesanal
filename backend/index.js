require('dotenv').config();
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require('./routes/user.routes')
const authRoutes = require('./routes/auth.routes')
const shopRoutes = require('./routes/shop.routes')
const productRoutes = require('./routes/product.routes')
const orderRoutes = require('./routes/order.routes')
const categoryRoutes = require('./routes/category.routes')
const newsCarouselRoutes = require('./routes/news-carousel.routes')

const PORT = process.env.PORT || 3000
const app = express()

// En serverless una instancia puede quedar viva tras un fallo de conexión,
// así que se reintenta en el siguiente request en vez de conectar una sola vez
let dbConnection = null
const connectDB = () => {
  if (mongoose.connection.readyState === 1) return Promise.resolve()
  if (!dbConnection) {
    dbConnection = mongoose
      .connect(process.env.DATABASE_URL, { serverSelectionTimeoutMS: 10000 })
      .then(() => console.info("✅ DB connected"))
      .catch((err) => {
        dbConnection = null
        console.error("❌ DB connection error:", err)
        throw err
      })
  }
  return dbConnection
}

connectDB().catch(() => {})

app.use(express.json())
app.use(cors())

app.use('/api', (req, res, next) => {
  connectDB()
    .then(() => next())
    .catch(() => res.status(503).json({ error: 'Base de datos no disponible' }))
})

app.get('/', (req, res) => res.send('OK'))

app.use("/", authRoutes)
app.use("/", userRoutes)
app.use("/", shopRoutes)
app.use("/", productRoutes)
app.use("/", orderRoutes)
app.use("/", categoryRoutes)
app.use("/", newsCarouselRoutes)

// En Vercel la app se exporta como función; en local se levanta el servidor
if (!process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.info(`🚀 Server listening on port ${PORT}`)
  })
}

module.exports = app
