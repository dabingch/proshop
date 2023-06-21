import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import Message from '../components/Message'
import { addToCart } from '../store'

const CartScreen = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { cartItems } = useSelector((state) => state.cart)

	const handleAddToCart = (product, qty) => {
		dispatch(addToCart({ ...product, qty }))
	}

	const renderedCartItems = cartItems.map((item) => {
		return (
			<ListGroup.Item key={item._id}>
				<Row>
					<Col md={2}>
						<Image src={item.image} alt={item.name} fluid rounded />
					</Col>
					<Col md={3}>
						<Link to={`/product/${item._id}`}>{item.name}</Link>
					</Col>
					<Col md={2}>${item.price}</Col>
					<Col md={2}>
						<Form.Control
							as='select'
							value={item.qty}
							onChange={(e) =>
								handleAddToCart(item, Number(e.target.value))
							}
						>
							{[...Array(item.countInStock).keys()].map((idx) => (
								<option key={idx + 1} value={idx + 1}>
									{idx + 1}
								</option>
							))}
						</Form.Control>
					</Col>
					<Col md={2}>
						<Button type='button' variant='light'>
							<FaTrash />
						</Button>
					</Col>
				</Row>
			</ListGroup.Item>
		)
	})

	return (
		<Row>
			<Col md={8}>
				<h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<Message>
						Your cart is empty <Link to='/'>Go Back</Link>
					</Message>
				) : (
					<ListGroup variant='flush'>{renderedCartItems}</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>
								Subtotal (
								{cartItems.reduce(
									(acc, item) => acc + item.qty,
									0
								)}
								) items
							</h2>
							$
							{cartItems
								.reduce(
									(acc, item) => acc + item.qty * item.price,
									0
								)
								.toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type='button'
								className='btn-block'
								disabled={cartItems.length === 0}
							>
								Proceed To Checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	)
}

export default CartScreen
