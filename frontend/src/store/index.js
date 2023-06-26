import { configureStore } from '@reduxjs/toolkit'
import {
	cartReducer,
	addToCart,
	removeFromCart,
	saveShippingAddress,
	savePaymentMethod,
	clearCartItems,
} from './slices/cartSlice'
import { authReducer, setCredentials, logout } from './slices/authSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { productsApi } from './apis/productsApi'
import { usersApi } from './apis/usersApi'
import { ordersApi } from './apis/ordersApi'

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		auth: authReducer,
		[productsApi.reducerPath]: productsApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
		[ordersApi.reducerPath]: ordersApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(productsApi.middleware)
			.concat(usersApi.middleware)
			.concat(ordersApi.middleware),
})

setupListeners(store.dispatch)

export {
	addToCart,
	removeFromCart,
	saveShippingAddress,
	savePaymentMethod,
	clearCartItems,
	setCredentials,
	logout,
}
export {
	useFetchProductsQuery,
	useFetchProductDetailsQuery,
} from './apis/productsApi'
export {
	useRegisterMutation,
	useLoginMutation,
	useLogoutMutation,
	useProfileMutation,
} from './apis/usersApi'
export {
	useCreateOrderMutation,
	useGetOrderDetailsQuery,
	usePayOrderMutation,
	useGetMyOrdersQuery,
	useGetOrdersQuery,
	useDeliverOrderMutation,
} from './apis/ordersApi'
