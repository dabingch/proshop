import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL, ORDERS_URL, PAYPAL_URL } from '../constants'

const ordersApi = createApi({
	reducerPath: 'orders',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints(builder) {
		return {
			createOrder: builder.mutation({
				query: (order) => {
					return {
						url: ORDERS_URL,
						method: 'POST',
						body: { ...order },
					}
				},
			}),
			getOrderDetails: builder.query({
				query: (orderId) => {
					return {
						url: `${ORDERS_URL}/${orderId}`,
						method: 'GET',
					}
				},
				keepUnusedDataFor: 5,
			}),
			payOrder: builder.mutation({
				query: ({ orderId, details }) => {
					return {
						url: `${ORDERS_URL}/${orderId}/pay`,
						method: 'PUT',
						body: { ...details },
					}
				},
			}),
		}
	},
})

export const {
	useCreateOrderMutation,
	useGetOrderDetailsQuery,
	usePayOrderMutation,
} = ordersApi
export { ordersApi }
