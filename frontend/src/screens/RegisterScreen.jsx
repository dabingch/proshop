import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation, setCredentials } from '../store'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'

const RegisterScreen = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [register, { isLoading }] = useRegisterMutation()

	const { userInfo } = useSelector((state) => state.auth)

	const { search } = useLocation()
	const sp = new URLSearchParams(search)
	const redirect = sp.get('redirect') || '/'

	useEffect(() => {
		if (userInfo) {
			navigate(redirect)
		}
	}, [userInfo, redirect, navigate])

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (password !== confirmPassword) {
			toast.error('Passwords do not match')
			return
		}

		try {
			const res = await register({ name, email, password }).unwrap() // unwrap the promise
			dispatch(setCredentials({ ...res }))
			navigate(redirect)
		} catch (err) {
			toast.error(err?.data?.message || err.error)
		}
	}

	return (
		<FormContainer>
			<h1>Sign Up</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId='name' className='my-3'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='text'
						required
						placeholder='Enter name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='email' className='my-3'>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type='email'
						required
						placeholder='Enter email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='password' className='my-3'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						required
						placeholder='Enter password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='confirmPassword' className='my-3'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						required
						placeholder='Confirm password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button
					disabled={isLoading}
					type='submit'
					variant='primary'
					className='mt-2'
				>
					Sign Up
				</Button>

				{isLoading && <Loader />}
			</Form>

			<Row className='py-3'>
				<Col>
					Already have an account?{' '}
					<Link
						to={redirect ? `/login?redirect=${redirect}` : '/login'}
					>
						Login
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default RegisterScreen
