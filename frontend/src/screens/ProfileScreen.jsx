import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useProfileMutation, setCredentials } from '../store'

const ProfileScreen = () => {
	const dispatch = useDispatch()

	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const { userInfo } = useSelector((state) => state.auth)

	const [updateProfile, { isLoading }] = useProfileMutation()

	useEffect(() => {
		if (userInfo) {
			setName(userInfo.name)
			setEmail(userInfo.email)
		}
	}, [userInfo, userInfo.name, userInfo.email])

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (password !== confirmPassword) {
			toast.error('Passwords do not match')
			return
		}

		try {
			const res = await updateProfile({
				_id: userInfo._id,
				name,
				email,
				password,
			}).unwrap()

			dispatch(setCredentials(res))
			toast.success('Profile updated successfully')
		} catch (err) {
			toast.error(err?.data?.message || err.error)
		}
	}

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>

				<Form onSubmit={handleSubmit}>
					<Form.Group controlId='name' className='my-2'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='email' className='my-2'>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='password' className='my-2'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Enter password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='confirmPassword' className='my-2'>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Confirm password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Button
						disabled={isLoading}
						type='submit'
						variant='primary'
					>
						Update
					</Button>
					{isLoading && <Loader />}
				</Form>
			</Col>
			<Col md={9}>Column</Col>
		</Row>
	)
}

export default ProfileScreen
