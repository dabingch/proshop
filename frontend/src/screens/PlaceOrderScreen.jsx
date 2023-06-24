import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'

const PlaceOrderScreen = () => {
	const navigate = useNavigate()
	const { shippingAddress, paymentMethod } = useSelector(
		(state) => state.cart
	)

	useEffect(() => {
		if (!shippingAddress) {
			navigate('/shipping')
		} else if (!paymentMethod) {
			navigate('/payment')
		}
	}, [shippingAddress, paymentMethod, navigate])

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}></Col>
				<Col md={4}></Col>
			</Row>
		</>
	)
}

export default PlaceOrderScreen
