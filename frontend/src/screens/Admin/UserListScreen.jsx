import Message from '../../components/Message'
import Loader from '../../components/Loader'
import UserList from '../../components/UserList'
import { useGetUsersQuery } from '../../store'

const OrderListScreen = () => {
	const { data: users, refetch, isLoading, error } = useGetUsersQuery()

	return (
		<>
			<h1>Orders</h1>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error.message}</Message>
			) : (
				<UserList users={users} refetch={refetch} />
			)}
		</>
	)
}

export default OrderListScreen
