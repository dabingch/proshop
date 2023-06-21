import { configureStore } from '@reduxjs/toolkit'
// import { apiSlice } from './slices/apiSlice'
import { cartReducer, addToCart } from './slices/cartSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { productsApi } from './apis/productsApi'

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		[productsApi.reducerPath]: productsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(productsApi.middleware),
})

setupListeners(store.dispatch)

export { addToCart }
// export { useGetProductsQuery } from './slices/productsApiSlice'
export {
	useFetchProductsQuery,
	useFetchProductDetailsQuery,
} from './apis/productsApi'
