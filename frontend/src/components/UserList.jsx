import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Loader from './Loader'
import { useDeleteUserMutation } from '../store'

const OrderList = ({ users, refetch }) => {
	const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation()

	const handleDeleteUser = async (id) => {
		if (window.confirm('Are you sure you want to delete this user?')) {
			try {
				await deleteUser(id)
				refetch()
				toast.success('User deleted successfully')
			} catch (err) {
				toast.error(err?.data?.message || err.error)
			}
		}
	}

	const renderedUsers = users?.map((user) => {
		return (
			<tr key={user._id}>
				<td>{user._id}</td>
				<td>{user.name}</td>
				<td>
					<a href={`mailto:${user.email}`}>{user.email}</a>
				</td>
				<td>
					{user.isAdmin ? (
						<FaCheck style={{ color: 'green' }} />
					) : (
						<FaTimes style={{ color: 'red' }} />
					)}
				</td>
				<td>
					<LinkContainer to={`admin/user/${user._id}/edit`}>
						<Button variant='light' className='btn-sm'>
							<FaEdit />
						</Button>
					</LinkContainer>
					<Button
						disabled={loadingDelete}
						variant='danger'
						className='btn-sm'
						onClick={() => handleDeleteUser(user._id)}
					>
						<FaTrash style={{ color: '#fff' }} />
					</Button>
				</td>
			</tr>
		)
	})

	return (
		<>
			{loadingDelete && <Loader />}
			<Table striped hover responsive className='table-sm'>
				<thead>
					<tr>
						<th>ID</th>
						<th>NAME</th>
						<th>EMAIL</th>
						<th>ADMIN</th>
						<th></th>
					</tr>
				</thead>
				<tbody>{renderedUsers}</tbody>
			</Table>
		</>
	)
}

export default OrderList
