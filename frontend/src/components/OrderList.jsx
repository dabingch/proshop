import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'

const OrderList = ({ orders }) => {
	const renderedOrders = orders?.map((order) => {
		return (
			<tr key={order._id}>
				<td>{order._id}</td>
				<td>{order.createdAt.substring(0, 10)}</td>
				<td>{order.totalPrice}</td>
				<td>
					{order.isPaid ? (
						order.paidAt.substring(0, 10)
					) : (
						<FaTimes style={{ color: 'red' }} />
					)}
				</td>
				<td>
					{order.isDelivered ? (
						order.deliveredAt.substring(0, 10)
					) : (
						<FaTimes style={{ color: 'red' }} />
					)}
				</td>
				<td>
					<LinkContainer to={`/order/${order._id}`}>
						<Button className='btn-sm'>Details</Button>
					</LinkContainer>
				</td>
			</tr>
		)
	})

	return (
		<>
			<Table striped hover responsive className='table-sm'>
				<thead>
					<tr>
						<th>ID</th>
						<th>DATE</th>
						<th>TOTAL</th>
						<th>PAID</th>
						<th>DELIVERED</th>
						<th></th>
					</tr>
				</thead>
				<tbody>{renderedOrders}</tbody>
			</Table>
		</>
	)
}

export default OrderList
