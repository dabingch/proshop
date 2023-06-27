import Message from '../../components/Message'
import Loader from '../../components/Loader'
import OrderList from '../../components/OrderList'
import { useGetOrdersQuery } from '../../store'

const OrderListScreen = () => {
	const { data: orders, isLoading, error } = useGetOrdersQuery()

	return (
		<>
			<h1>Orders</h1>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error.message}</Message>
			) : (
				<OrderList orders={orders} />
			)}
		</>
	)
}

export default OrderListScreen
