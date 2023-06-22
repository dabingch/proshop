import asyncHandler from 'express-async-handler'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })

	if (!user) {
		res.status(401)
		throw new Error('User not found, please check your email')
	}

	if (!(await user.matchPassword(password))) {
		res.status(401)
		throw new Error('Invalid password')
	}

	const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	})

	// Set JWT as HTTP-only cookie
	res.cookie('jwt', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
	})

	res.json({
		_id: user._id,
		name: user.name,
		email: user.email,
		isAdmin: user.isAdmin,
	})
})

const registerUser = asyncHandler(async (req, res) => {
	res.send('register user')
})

const logoutUser = asyncHandler(async (req, res) => {
	res.send('logout user')
})

const getUserProfile = asyncHandler(async (req, res) => {
	res.send('get user profile')
})

const updateUserProfile = asyncHandler(async (req, res) => {
	res.send('update user profile')
})

const getUsers = asyncHandler(async (req, res) => {
	res.send('get users')
})

const getUserById = asyncHandler(async (req, res) => {
	res.send('get user by id')
})

const deleteUser = asyncHandler(async (req, res) => {
	res.send('delete user')
})

const updateUser = asyncHandler(async (req, res) => {
	res.send('update user')
})

export {
	authUser,
	registerUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	getUserById,
	deleteUser,
	updateUser,
}