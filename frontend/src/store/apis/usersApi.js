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
						url: `${USERS_URL}`,
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
		}
	},
})

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
	usersApi
export { usersApi }
