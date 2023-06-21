import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Form, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { addToCart, useFetchProductDetailsQuery } from '../store'

const ProductScreen = () => {
	const { id: productId } = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [qty, setQty] = useState(1)

	const {
		data: product,
		isLoading,
		error,
	} = useFetchProductDetailsQuery(productId)

	const handleAddToCart = () => {
		dispatch(addToCart({ ...product, qty }))
		navigate('/cart')
	}

	let content
	if (isLoading) {
		content = <Loader />
	} else if (error) {
		content = (
			<Message variant='danger'>
				{error?.data?.message || error.error}
			</Message>
		)
	} else {
		content = (
			<>
				<Link className='btn btn-light my-3' to='/'>
					Go Back
				</Link>
				<Row>
					<Col md={5}>
						<Image src={product.image} alt={product.name} fluid />
					</Col>
					<Col md={4}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h3>{product.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
								/>
							</ListGroup.Item>
							{/* <ListGroup.Item>Price: ${product.price}</ListGroup.Item> */}
							<ListGroup.Item>
								Description: {product.description}
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>${product.price}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											{product.countInStock > 0
												? 'In Stock'
												: 'Out Stock'}
										</Col>
									</Row>
								</ListGroup.Item>

								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Qty</Col>
											<Col>
												<Form.Control
													as='select'
													value={qty}
													onChange={(e) =>
														setQty(
															Number(
																e.target.value
															)
														)
													}
												>
													{[
														...Array(
															product.countInStock
														).keys(),
													].map((idx) => (
														<option
															key={idx + 1}
															value={idx + 1}
														>
															{idx + 1}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}

								<ListGroup.Item>
									<Button
										className='btn-block'
										type='button'
										disabled={product.countInStock === 0}
										onClick={handleAddToCart}
									>
										Add to Cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			</>
		)
	}

	return <>{content}</>
}

export default ProductScreen
