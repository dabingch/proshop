import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'

const ProductList = ({ products }) => {
	const handleDelete = async (id) => {
		console.log(id)
	}

	return (
		<>
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
									onClick={() => handleDelete(product._id)}
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
