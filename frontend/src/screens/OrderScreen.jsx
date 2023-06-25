import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useGetOrderDetailsQuery } from '../store'

const OrderScreen = () => {
	const { id: orderId } = useParams()

	const {
		data: order,
		refetch,
		isLoading,
		error,
	} = useGetOrderDetailsQuery(orderId)

	console.log(order)

	return <div>OrderScreen</div>
}

export default OrderScreen
