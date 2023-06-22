import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/User.js'

const protect = asyncHandler(async (req, res, next) => {
	let token

	token = req.cookies.jwt

	if (!token) {
		res.status(401)
		throw new Error('Not authorized, no token')
	}

	try {
		const { userId } = jwt.verify(token, process.env.JWT_SECRET)
		req.user = await User.findById(userId).select('-password')
		next()
	} catch (error) {
		console.log(error)
		res.status(401)
		throw new Error('Not authorized, token failed')
	}
})

// Admin middleware
const admin = (req, res, next) => {
	if (!req.user || !req.user.isAdmin) {
		res.status(401)
		throw new Error('Not authorized as an admin')
	}

	next()
}

export { protect, admin }
