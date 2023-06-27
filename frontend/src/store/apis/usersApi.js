import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL, USERS_URL } from '../constants'

const usersApi = createApi({
	reducerPath: 'users',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints(builder) {
		return {
			register: builder.mutation({
				query: (data) => {
					return {
						url: USERS_URL,
						method: 'POST',
						body: data,
					}
				},
			}),
			login: builder.mutation({
				query: (data) => {
					return {
						url: `${USERS_URL}/auth`,
						method: 'POST',
						body: data,
					}
				},
			}),
			logout: builder.mutation({
				query: () => {
					return {
						url: `${USERS_URL}/logout`,
						method: 'POST',
					}
				},
			}),
			profile: builder.mutation({
				query: (data) => {
					return {
						url: `${USERS_URL}/profile`,
						method: 'PUT',
						body: data,
					}
				},
			}),
			getUsers: builder.query({
				providesTags: ['User'],
				query: () => {
					return {
						url: USERS_URL,
						method: 'GET',
					}
				},
				keepUnusedDataFor: 5,
			}),
			deleteUser: builder.mutation({
				invalidatesTags: ['User'],
				query: (userId) => {
					return {
						url: `${USERS_URL}/${userId}`,
						method: 'DELETE',
					}
				},
			}),
			getUserDetails: builder.query({
				query: (userId) => {
					return {
						url: `${USERS_URL}/${userId}`,
						method: 'GET',
					}
				},
				keepUnusedDataFor: 5,
			}),
			updateUser: builder.mutation({
				invalidatesTags: ['User'],
				query: (data) => {
					return {
						url: `${USERS_URL}/${data.userId}`,
						method: 'PUT',
						body: data,
					}
				},
			}),
		}
	},
})

export const {
	useRegisterMutation,
	useLoginMutation,
	useLogoutMutation,
	useProfileMutation,
	useGetUsersQuery,
	useDeleteUserMutation,
	useGetUserDetailsQuery,
	useUpdateUserMutation,
} = usersApi
export { usersApi }
