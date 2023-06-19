import express from 'express'
const router = express.Router()
import asyncHandler from 'express-async-handler'
import Product from '../models/Product.js'

router.get(
	'/',
	asyncHandler(async (req, res) => {
		const products = await Product.find({})

		if (!products) {
			res.status(404)
			throw new Error('No products found')
		}
		res.json(products)
	})
)

router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const product = await Product.findById(req.params.id)

		if (!product) {
			return res.status(404)
		}

		res.json(product)
	})
)

export default router
