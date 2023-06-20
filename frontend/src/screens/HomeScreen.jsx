import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useFetchProductsQuery } from '../store'
// import { useGetProductsQuery } from '../store/slices/productsApiSlice'

const HomeScreen = () => {
	const { data: products, isLoading, error } = useFetchProductsQuery()

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
				<h1>Latest Products</h1>
				<Row>
					{products.map((product) => {
						return (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						)
					})}
				</Row>
			</>
		)
	}

	return <>{content}</>
}

export default HomeScreen
