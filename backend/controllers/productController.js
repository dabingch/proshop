import asyncHandler from 'express-async-handler'
import Product from '../models/Product.js'

const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({})

	if (!products) {
		res.status(404)
		throw new Error('No products found')
	}

	res.status(200).json(products)
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

	try {
		const createdProduct = await product.save()

		res.status(201).json(createdProduct)
	} catch (error) {
		res.status(400)
		throw new Error('Invalid product data')
	}
})

export { getProducts, getProductById, createProduct }
