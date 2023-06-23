import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL, USERS_URL } from '../constants'

const usersApi = createApi({
	reducerPath: 'users',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints(builder) {
		return {
			login: builder.mutation({
				query: (data) => {
					return {
						url: `${USERS_URL}/auth`,
						method: 'POST',
						body: data,
					}
				},
			}),
		}
	},
})

export const { useLoginMutation } = usersApi
export { usersApi }
