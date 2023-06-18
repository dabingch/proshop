import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import products from '../products'

const HomeScreen = () => {
	const renderedProducts = products.map((product) => {
		return (
			<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
				<Product product={product} />
			</Col>
		)
	})

	return (
		<>
			<h1>Latest Products</h1>
			<Row>{renderedProducts}</Row>
		</>
	)
}

export default HomeScreen
