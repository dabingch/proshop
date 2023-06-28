import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin = false }) => {
	return (
		pages > 1 && (
			<Pagination>
				{[...Array(pages).keys()].map((i) => (
					<LinkContainer
						key={i + 1}
						to={
							!isAdmin
								? `/page/${i + 1}`
								: `/admin/productlist/${i + 1}`
						}
					>
						<Pagination.Item active={i + 1 === page}>
							{i + 1}
						</Pagination.Item>
					</LinkContainer>
				))}
			</Pagination>
		)
	)
}

export default Paginate
