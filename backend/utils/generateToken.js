import jwt from 'jsonwebtoken'

const generateToken = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	})

	// Set JWT as HTTP-only cookie
	res.cookie('jwt', token, {
		// * A cookie with the HttpOnly attribute is inaccessible to the JavaScript Document.cookie API; it's only sent to the serve
		// * Prevents cross-site scripting (XSS) attacks
		httpOnly: true,
		// * A cookie with the Secure attribute is only sent to the server with an encrypted request over the HTTPS protocol
		// * Prevents MitM attacks
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict', // * Prevents CSRF attacks
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
	})
}

export default generateToken
