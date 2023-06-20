import { configureStore } from '@reduxjs/toolkit'
// import { apiSlice } from './slices/apiSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { productsApi } from './apis/productsApi'

export const store = configureStore({
	reducer: {
		[productsApi.reducerPath]: productsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(productsApi.middleware),
})

setupListeners(store.dispatch)

// export { useGetProductsQuery } from './slices/productsApiSlice'
export {
	useFetchProductsQuery,
	useFetchProductDetailsQuery,
} from './apis/productsApi'
