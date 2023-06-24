import asyncHandler from 'express-async-handler'
import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'

const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		res.status(400)
		throw new Error('Please fill in all fields')
	}

	const user = await User.findOne({ email })

	if (!user) {
		res.status(401)
		throw new Error('User not found, please check your email')
	}

	if (!(await user.matchPassword(password))) {
		res.status(401)
		throw new Error('Invalid password')
	}

	generateToken(res, user._id)

	res.status(200).json({
		_id: user._id,
		name: user.name,
		email: user.email,
		isAdmin: user.isAdmin,
	})
})

const registerUser = asyncHandler(async (req, res) => {
	const { email, password, name } = req.body

	if (!email || !password || !name) {
		res.status(400)
		throw new Error('Please fill in all fields')
	}

	const existedUser = await User.findOne({ email })

	if (existedUser) {
		res.status(400)
		throw new Error('User already exists')
	}

	const user = await User.create({
		name,
		email,
		password,
	})

	if (!user) {
		res.status(400)
		throw new Error('Invalid user data')
	}

	generateToken(res, user._id)

	res.status(201).json({
		_id: user._id,
		name: user.name,
		email: user.email,
		isAdmin: user.isAdmin,
	})
})

const logoutUser = (req, res) => {
	res.cookie('jwt', '', {
		httpOnly: true,
		expires: new Date(0),
	})

	res.status(200).json({ message: 'Logged out successfully' })
}

const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	if (!user) {
		res.status(404)
		throw new Error('User does not exist')
	}

	res.status(200).json({
		_id: user._id,
		name: user.name,
		email: user.email,
		isAdmin: user.isAdmin,
	})
})

const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	if (!user) {
		res.status(404)
		throw new Error('User does not exist')
	}

	user.name = req.body.name || user.name
	user.email = req.body.email || user.email
	if (req.body.password) {
		user.password = req.body.password
	}

	const updatedUser = await user.save()

	res.status(200).json({
		_id: updatedUser._id,
		name: updatedUser.name,
		email: updatedUser.email,
		isAdmin: updatedUser.isAdmin,
	})
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
