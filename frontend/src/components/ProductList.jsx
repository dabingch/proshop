import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Loader from './Loader'
import { useDeleteProductMutation } from '../store'

const ProductList = ({ products, refetch }) => {
	const [deleteProduct, { isLoading: loadingDelete }] =
		useDeleteProductMutation()

	const handleDeleteProduct = async (productId) => {
		if (window.confirm('Are you sure you want to delete this product?')) {
			try {
				await deleteProduct(productId)
				refetch()
				toast.success('Product deleted successfully')
			} catch (err) {
				toast.error(err?.data?.message || err.error)
			}
		}
	}

	return (
		<>
			{loadingDelete && <Loader />}

			<Table striped hover responsive className='table-sm'>
				<thead>
					<tr>
						<th>ID</th>
						<th>NAME</th>
						<th>PRICE</th>
						<th>CATEGORY</th>
						<th>BRAND</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{products?.map((product) => (
						<tr key={product._id}>
							<td>{product._id}</td>
							<td>{product.name}</td>
							<td>$ {product.price}</td>
							<td>{product.category}</td>
							<td>{product.brand}</td>
							<td>
								<LinkContainer
									to={`/admin/product/${product._id}/edit`}
								>
									<Button
										variant='light'
										className='btn-sm mx-2'
									>
										<FaEdit />
									</Button>
								</LinkContainer>
								<Button
									className='btn-sm'
									variant='danger'
									disabled={loadingDelete}
									onClick={() =>
										handleDeleteProduct(product._id)
									}
								>
									<FaTrash style={{ color: '#fff' }} />
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	)
}

export default ProductList
