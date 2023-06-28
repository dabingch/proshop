import asyncHandler from 'express-async-handler'
import Product from '../models/Product.js'

const getProducts = asyncHandler(async (req, res) => {
	const pageSize = process.env.PAGINATION_LIMIT || 8
	const page = Number(req.query.pageNumber) || 1

	const keyword = req.query.keyword
		? { name: { $regex: req.query.keyword, $options: 'i' } }
		: {}

	const count = await Product.countDocuments({ ...keyword })

	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1))

	if (!products) {
		res.status(404)
		throw new Error('No products found')
	}

	res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) })
})

const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (!product) {
		res.status(404)
		throw new Error('Product not found')
	}

	res.status(200).json(product)
})

const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample name',
		price: 0,
		user: req.user._id,
		image: '/images/sample.jpg',
		brand: 'Sample brand',
		category: 'Sample category',
		countInStock: 0,
		numReviews: 0,
		description: 'Sample description',
	})

	const createdProduct = await product.save()

	res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, description, image, brand, category, countInStock } =
		req.body

	const product = await Product.findById(req.params.id)

	if (!product) {
		res.status(404)
		throw new Error('Product not found')
	}

	product.name = name
	product.price = price
	product.description = description
	product.image = image
	product.brand = brand
	product.category = category
	product.countInStock = countInStock

	const updatedProduct = await product.save()

	res.status(200).json(updatedProduct)
})

const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (!product) {
		res.status(404)
		throw new Error('Product not found')
	}

	await Product.deleteOne({ _id: product._id })

	res.status(200).json({ message: 'Product deleted successfully' })
})

const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body

	const product = await Product.findById(req.params.id)

	if (!product) {
		res.status(404)
		throw new Error('Product not found')
	}

	const alreadyReviewed = product.reviews.find(
		(review) => review.user.toString() === req.user._id.toString()
	)

	if (alreadyReviewed) {
		res.status(400)
		throw new Error('Product already reviewed')
	}

	const review = {
		name: req.user.name,
		rating: Number(rating),
		comment,
		user: req.user._id,
	}

	product.reviews.push(review)

	product.numReviews = product.reviews.length

	product.rating =
		product.reviews.reduce((acc, item) => item.rating + acc, 0) /
		product.reviews.length

	await product.save()

	res.status(201).json({ message: 'Review added' })
})

const getTopProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({}).sort({ rating: -1 }).limit(3)

	if (!products.length) {
		res.status(404)
		throw new Error('No products found')
	}

	res.status(200).json(products)
})

export {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
	createProductReview,
	getTopProducts,
}
