import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'
import { PRODUCTS_URL } from '../constants'

const productsApi = createApi({
	reducerPath: 'products',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints(builder) {
		return {
			fetchProducts: builder.query({
				query: () => {
					return {
						url: PRODUCTS_URL,
						method: 'GET',
					}
				},
				keepUnusedDataFor: 5,
			}),
		}
	},
})

export const { useFetchProductsQuery } = productsApi
export { productsApi }
