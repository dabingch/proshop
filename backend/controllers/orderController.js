import asyncHandler from 'express-async-handler'
import Order from '../models/Order.js'

const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body

	if (!orderItems || orderItems.length === 0) {
		res.status(400)
		throw new Error('No order items')
	}

	const order = new Order({
		orderItems: orderItems.map((item) => {
			return {
				...item,
				product: item._id,
				_id: undefined,
			}
		}),
		user: req.user._id,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	})

	const createdOrder = await order.save()

	res.status(201).json(createdOrder)
})

const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id })

	res.status(200).json(orders)
})

const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	)

	if (!order) {
		res.status(404)
		throw new Error('Order not found')
	}

	res.status(200).json(order)
})

// Admin
const updateOrderToPaid = asyncHandler(async (req, res) => {
	res.send('update order to paid')
})

// Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
	res.send('update order to delivered')
})

// Admin
const getOrders = asyncHandler(async (req, res) => {
	res.send('get orders')
})

export {
	addOrderItems,
	getMyOrders,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	getOrders,
}