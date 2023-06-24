import { configureStore } from '@reduxjs/toolkit'
// import { apiSlice } from './slices/apiSlice'
import {
	cartReducer,
	addToCart,
	removeFromCart,
	saveShippingAddress,
	savePaymentMethod,
} from './slices/cartSlice'
import { authReducer, setCredentials, logout } from './slices/authSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { productsApi } from './apis/productsApi'
import { usersApi } from './apis/usersApi'

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		auth: authReducer,
		[productsApi.reducerPath]: productsApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(productsApi.middleware)
			.concat(usersApi.middleware),
})

setupListeners(store.dispatch)

export {
	addToCart,
	removeFromCart,
	saveShippingAddress,
	savePaymentMethod,
	setCredentials,
	logout,
}
// export { useGetProductsQuery } from './slices/productsApiSlice'
export {
	useFetchProductsQuery,
	useFetchProductDetailsQuery,
} from './apis/productsApi'
export {
	useRegisterMutation,
	useLoginMutation,
	useLogoutMutation,
} from './apis/usersApi'
