import { Button, Row, Col } from 'react-bootstrap'
import { FaEdit } from 'react-icons/fa'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import ProductList from '../../components/ProductList'
import { toast } from 'react-toastify'
import { useFetchProductsQuery, useCreateProductMutation } from '../../store'

const ProductListScreen = () => {
	const { data: products, isLoading, error } = useFetchProductsQuery()

	const [createProduct, { isLoading: loadingCreate }] =
		useCreateProductMutation()

	const handleCreateProduct = async () => {
		if (window.confirm('Are you sure you want to create a new product?')) {
			try {
				await createProduct()
				toast.success('Product created successfully')
			} catch (err) {
				toast.error(err?.data?.message || err.error)
			}
		}
	}

	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className='text-end'>
					<Button
						className='btn-sm m-3'
						onClick={handleCreateProduct}
						disabled={loadingCreate}
					>
						<FaEdit /> Create Product
					</Button>
				</Col>
			</Row>

			{loadingCreate && <Loader />}

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
