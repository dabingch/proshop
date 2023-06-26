import { Button, Row, Col } from 'react-bootstrap'
import { FaEdit } from 'react-icons/fa'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import ProductList from '../../components/ProductList'
import { useFetchProductsQuery } from '../../store'

const ProductListScreen = () => {
	const { data: products, isLoading, error } = useFetchProductsQuery()

	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className='text-end'>
					<Button className='btn-sm m-3'>
						<FaEdit /> Create Product
					</Button>
				</Col>
			</Row>

			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error.message}</Message>
			) : (
				<ProductList products={products} />
			)}
		</>
	)
}

export default ProductListScreen
