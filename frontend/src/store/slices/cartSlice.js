import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('cart')
	? JSON.parse(localStorage.getItem('cart'))
	: { cartItems: [] }

// Helper function
const addDecimals = (num) => {
	return (Math.round(num * 100) / 100).toFixed(2)
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const item = action.payload
			const existItem = state.cartItems.find((i) => i._id === item._id)

			if (existItem) {
				state.cartItems = state.cartItems.map((i) =>
					i._id === existItem._id ? item : i
				)
			} else {
				// state.cartItems = [...state.cartItems, item]
				state.cartItems.push(item)
			}

			// Item price
			state.itemPrice = addDecimals(
				state.cartItems.reduce(
					(acc, item) => acc + item.price * item.qty,
					0
				)
			)

			// Shipping price
			state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 100)

			// Tax price
			state.taxPrice = addDecimals(
				Number((0.15 * state.itemPrice).toFixed(2))
			)

			// Total price
			state.totalPrice = (
				Number(state.itemPrice) +
				Number(state.shippingPrice) +
				Number(state.taxPrice)
			).toFixed(2)

			localStorage.setItem('cart', JSON.stringify(state))
		},
	},
})

export const { addToCart } = cartSlice.actions

export const cartReducer = cartSlice.reducer
