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

// Connect DB
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.info("✅ DB connected"))
  .catch((err) => console.error("❌ DB connection error:", err))

app.use(express.json())

// CORS - permitir tu frontend de Vercel
const allowedOrigins = [
  "http://localhost:5173",                        // desarrollo local
  "http://localhost:3000",
  process.env.FRONTEND_URL,                       // variable que vas a poner en Render
]

app.use(cors({
  origin: function (origin, callback) {
    // permitir requests sin origin (Postman, mobile, etc)
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    return callback(new Error("Not allowed by CORS"))
  },
  credentials: true
}))

// ROUTES
app.use("/", authRoutes)
app.use("/", userRoutes)
app.use("/", shopRoutes)
app.use("/", productRoutes)
app.use("/", orderRoutes)
app.use("/", categoryRoutes)
app.use("/", newsCarouselRoutes)

app.listen(PORT, () => {
  console.info(`🚀 Server listening on port ${PORT}`)
})
