import asyncHandler from 'express-async-handler'
import Product from '../models/Product.js'

const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({})

	if (!products) {
		res.status(404)
		throw new Error('No products found')
	}

	res.json(products)
})

const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (!product) {
		return res.status(404)
	}

	res.json(product)
})

export { getProducts, getProductById }
