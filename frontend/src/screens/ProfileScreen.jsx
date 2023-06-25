import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { FaTimes } from 'react-icons/fa'
import {
	useProfileMutation,
	useGetMyOrdersQuery,
	setCredentials,
} from '../store'

const ProfileScreen = () => {
	const dispatch = useDispatch()

	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const { userInfo } = useSelector((state) => state.auth)

	const [updateProfile, { isLoading: loadingProfile }] = useProfileMutation()
	const {
		data: orders,
		isLoading: loadingOrders,
		error: ordersError,
	} = useGetMyOrdersQuery()

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

	const renderedOrders = orders?.map((order) => {
		return (
			<tr key={order._id}>
				<td>{order._id}</td>
				<td>{order.createdAt.substring(0, 10)}</td>
				<td>{order.totalPrice}</td>
				<td>
					{order.isPaid ? (
						order.paidAt.substring(0, 10)
					) : (
						<FaTimes style={{ color: 'red' }} />
					)}
				</td>
				<td>
					{order.isDelivered ? (
						order.deliveredAt.substring(0, 10)
					) : (
						<FaTimes style={{ color: 'red' }} />
					)}
				</td>
				<td>
					<LinkContainer to={`/order/${order._id}`}>
						<Button className='btn-sm'>Details</Button>
					</LinkContainer>
				</td>
			</tr>
		)
	})

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
						disabled={loadingProfile}
						type='submit'
						variant='primary'
					>
						Update
					</Button>
					{loadingProfile && <Loader />}
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
				{loadingOrders ? (
					<Loader />
				) : ordersError ? (
					<Message variant='danger'>
						{ordersError?.data?.message || ordersError.error}
					</Message>
				) : (
					<Table striped hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th></th>
							</tr>
						</thead>
						<tbody>{renderedOrders}</tbody>
					</Table>
				)}
			</Col>
		</Row>
	)
}

export default ProfileScreen
