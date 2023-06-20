import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'

const PORT = process.env.PORT || 5000
connectDB()
const app = express()

app.use(cors())
app.use('/api/products', productRoutes)
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
