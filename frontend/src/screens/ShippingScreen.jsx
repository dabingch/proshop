import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../store'

const ShippingScreen = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { shippingAddress } = useSelector((state) => state.cart)

	const [address, setAddress] = useState(shippingAddress?.address || '')
	const [city, setCity] = useState(shippingAddress?.city || '')
	const [postalCode, setPostalCode] = useState(
		shippingAddress?.postalCode || ''
	)
	const [country, setCountry] = useState(shippingAddress?.country || '')

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(saveShippingAddress({ address, city, postalCode, country }))
		navigate('/payment')
	}

	return (
		<FormContainer>
			<h1>Shipping</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId='address' className='my-3'>
					<Form.Label>Address</Form.Label>
					<Form.Control
						type='text'
						required
						placeholder='Enter address'
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='city' className='my-3'>
					<Form.Label>City</Form.Label>
					<Form.Control
						type='text'
						required
						placeholder='Enter city'
						value={city}
						onChange={(e) => setCity(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='postalCode' className='my-3'>
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type='text'
						required
						placeholder='Enter postal code'
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='country' className='my-3'>
					<Form.Label>Country</Form.Label>
					<Form.Control
						type='text'
						required
						placeholder='Enter country'
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button type='submit' variant='primary' className='mt-2'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	)
}

export default ShippingScreen
