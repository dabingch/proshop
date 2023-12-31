import { Row, Col } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { useFetchProductsQuery } from '../store'

const HomeScreen = () => {
	const { pageNumber, keyword } = useParams()
	const { data, isLoading, error } = useFetchProductsQuery({
		keyword,
		pageNumber,
	})

	if (isLoading) {
		return <Loader />
	} else if (error) {
		return (
			<Message variant='danger'>
				{error?.data?.message || error.error}
			</Message>
		)
	} else {
		return (
			<>
				<Meta />
				{!keyword ? (
					<ProductCarousel />
				) : (
					<Link to='/' className='btn btn-light mb-4'>
						Go Back
					</Link>
				)}
				<h1>Latest Products</h1>
				<Row>
					{data.products.map((product) => {
						return (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						)
					})}
				</Row>
				<Paginate
					pages={data.pages}
					page={data.page}
					keyword={keyword ? keyword : ''}
				/>
			</>
		)
	}
}

export default HomeScreen
