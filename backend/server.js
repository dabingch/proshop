import path from 'path'
import express from 'express'
// import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'

const PORT = process.env.PORT || 5000
connectDB()
const app = express()

// app.use(cors({ credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/uploads', uploadRoutes)

const __dirname = path.resolve() // Set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))) // Set /uploads to be a static folder

if (process.env.NODE_ENV === 'production') {
	// set static folder for uploading files in production
	// app.use(
	// 	'/uploads',
	// 	express.static(path.resolve(__dirname, '../var', 'data', 'uploads'))
	// )
	// set static folder for other static files
	app.use(express.static(path.resolve(__dirname, '../frontend', 'build')))

	// any route that is not api will be redirected to index.html
	app.get('*', (req, res) => {
		res.sendFile(
			path.resolve(__dirname, '../frontend', 'build', 'index.html')
		)
	})
} else {
	app.get('/', (req, res) => {
		res.send('API is running...')
	})
}

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
