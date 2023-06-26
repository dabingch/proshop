import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import './assets/styles/bootstrap.custom.css'
import './assets/styles/index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ShippingScreen from './screens/ShippingScreen'
import PrivateRoute from './components/PrivateRoute'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import ProfileScreen from './screens/ProfileScreen'
import AdminRoute from './components/AdminRoute'
import OrderListScreen from './screens/Admin/OrderListScreen'
import ErrorScreen from './screens/ErrorScreen'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorScreen />,
		children: [
			{ index: true, element: <HomeScreen /> },
			{ path: '/product/:id', element: <ProductScreen /> },
			{
				path: '/cart',
				element: <CartScreen />,
			},
			{
				path: '/login',
				element: <LoginScreen />,
			},
			{
				path: '/register',
				element: <RegisterScreen />,
			},
			{
				path: '',
				element: <PrivateRoute />,
				children: [
					{
						path: '/shipping',
						element: <ShippingScreen />,
					},
					{
						path: '/payment',
						element: <PaymentScreen />,
					},
					{
						path: '/placeorder',
						element: <PlaceOrderScreen />,
					},
					{
						path: '/order/:id',
						element: <OrderScreen />,
					},
					{
						path: '/profile',
						element: <ProfileScreen />,
					},
				],
			},
			{
				path: '',
				element: <AdminRoute />,
				children: [
					{
						path: '/admin/orderlist',
						element: <OrderListScreen />,
					},
				],
			},
		],
	},
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
