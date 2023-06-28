import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL, PRODUCTS_URL, UPLOAD_URL } from '../constants'

const productsApi = createApi({
	reducerPath: 'products',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints(builder) {
		return {
			fetchProducts: builder.query({
				providesTags: ['Product'],
				query: ({ keyword, pageNumber }) => {
					return {
						url: PRODUCTS_URL,
						params: { keyword, pageNumber },
						method: 'GET',
					}
				},
				keepUnusedDataFor: 5,
			}),
			fetchProductDetails: builder.query({
				query: (productId) => {
					return {
						url: `${PRODUCTS_URL}/${productId}`,
					}
				},
				keepUnusedDataFor: 5,
			}),
			createProduct: builder.mutation({
				invalidatesTags: ['Product'],
				query: () => {
					return {
						url: PRODUCTS_URL,
						method: 'POST',
					}
				},
			}),
			updateProduct: builder.mutation({
				invalidatesTags: ['Product'],
				query: (data) => {
					return {
						url: `${PRODUCTS_URL}/${data.productId}`,
						method: 'PUT',
						body: data,
					}
				},
			}),
			uploadProductImage: builder.mutation({
				query: (data) => {
					return {
						url: `${UPLOAD_URL}`,
						method: 'POST',
						body: data,
					}
				},
			}),
			deleteProduct: builder.mutation({
				invalidatesTags: ['Product'],
				query: (productId) => {
					return {
						url: `${PRODUCTS_URL}/${productId}`,
						method: 'DELETE',
					}
				},
			}),
			createProductReview: builder.mutation({
				invalidatesTags: ['Product'],
				query: (data) => {
					return {
						url: `${PRODUCTS_URL}/${data.productId}/reviews`,
						method: 'POST',
						body: data,
					}
				},
			}),
			getTopProducts: builder.query({
				query: () => {
					return {
						url: `${PRODUCTS_URL}/top`,
						method: 'GET',
					}
				},
				keepUnusedDataFor: 5,
			}),
		}
	},
})

export const {
	useFetchProductsQuery,
	useFetchProductDetailsQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useUploadProductImageMutation,
	useDeleteProductMutation,
	useCreateProductReviewMutation,
	useGetTopProductsQuery,
} = productsApi
export { productsApi }
