import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import {
	useGetOrderDetailsQuery,
	usePayOrderMutation,
	useDeliverOrderMutation,
} from '../store'

const OrderScreen = () => {
	const { id: orderId } = useParams()

	const {
		data: order,
		refetch,
		isLoading,
		error,
	} = useGetOrderDetailsQuery(orderId)

	const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation()

	const [deliverOrder, { isLoading: loadingDeliver }] =
		useDeliverOrderMutation()

	const { userInfo } = useSelector((state) => state.auth)

	// * Just a mock payment handler
	const handlePayOrder = async () => {
		const details = {
			id: Math.floor(Math.random() * 1000000000),
			status: 'COMPLETED',
			update_time: Date.now(),
			payer: {
				email_address: userInfo.email,
			},
		}
		try {
			await payOrder({ orderId, details })
			refetch()
			toast.success('Payment successful')
		} catch (err) {
			toast.error(err?.data?.message || err.error)
		}
	}

	const handleDeliver = async () => {
		try {
			await deliverOrder(orderId)
			refetch()
			toast.success('Order delivered')
		} catch (err) {
			toast.error(err?.data?.message || err.error)
		}
	}

	if (isLoading) {
		return <Loader />
	} else if (error) {
		return <Message variant='danger'>{error.message}</Message>
	} else {
		return (
			<>
				<h1>Order {order._id}</h1>
				<Row>
					<Col md={8}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Shipping</h2>
								<p>
									<strong>Name: </strong>
									{order.user.name}
								</p>
								<p>
									<strong>Email: </strong>
									{order.user.email}
								</p>
								<p>
									<strong>Address:</strong>
									{order.shippingAddress.address},{' '}
									{order.shippingAddress.city}{' '}
									{order.shippingAddress.postalCode},{' '}
									{order.shippingAddress.country}
								</p>
								{order.isDelivered ? (
									<Message variant='success'>
										Delivered on {order.deliveredAt}
									</Message>
								) : (
									<Message variant='danger'>
										Not Delivered
									</Message>
								)}
							</ListGroup.Item>

							<ListGroup.Item>
								<h2>Payment Method</h2>
								<p>
									<strong>Method: </strong>
									{order.paymentMethod}
								</p>
								{order.isPaid ? (
									<Message variant='success'>
										Paid on {order.paidAt}
									</Message>
								) : (
									<Message variant='danger'>Not Paid</Message>
								)}
							</ListGroup.Item>

							<ListGroup.Item>
								<h2>Order Items</h2>
								{order.orderItems.length === 0 ? (
									<Message variant='danger'>
										Order is empty
									</Message>
								) : (
									<ListGroup variant='flush'>
										{order.orderItems.map((item, index) => (
											<ListGroup.Item key={index}>
												<Row>
													<Col md={1}>
														<Image
															src={item.image}
															alt={item.name}
															fluid
															rounded
														/>
													</Col>
													<Col>
														<Link
															to={`/product/${item.product}`}
														>
															{item.name}
														</Link>
													</Col>
													<Col md={4}>
														{item.qty} x $
														{item.price} = $
														{item.qty * item.price}
													</Col>
												</Row>
											</ListGroup.Item>
										))}
									</ListGroup>
								)}
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={4}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h2>Order Summary</h2>
								</ListGroup.Item>

								<ListGroup.Item>
									<Row>
										<Col>Items:</Col>
										<Col>${order.itemsPrice}</Col>
									</Row>

									<Row>
										<Col>Shipping:</Col>
										<Col>${order.shippingPrice}</Col>
									</Row>

									<Row>
										<Col>Tax:</Col>
										<Col>${order.taxPrice}</Col>
									</Row>

									<Row>
										<Col>Total:</Col>
										<Col>${order.totalPrice}</Col>
									</Row>
								</ListGroup.Item>

								{!order.isPaid && (
									<ListGroup.Item>
										{loadingPay ? (
											<Loader />
										) : (
											<div>
												<Button
													onClick={handlePayOrder}
													style={{
														marginBottom: '10px',
													}}
												>
													Pay Order
												</Button>
											</div>
										)}
									</ListGroup.Item>
								)}

								{loadingDeliver && <Loader />}
								{userInfo.isAdmin &&
									order.isPaid &&
									!order.isDelivered && (
										<ListGroup.Item>
											<Button
												onClick={handleDeliver}
												className='btn btn-block'
											>
												Mark As Delivered
											</Button>
										</ListGroup.Item>
									)}
							</ListGroup>
						</Card>
					</Col>
				</Row>
			</>
		)
	}
}

export default OrderScreen
