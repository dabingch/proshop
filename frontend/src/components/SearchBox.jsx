import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
	const navigation = useNavigate()

	const [keyword, setKeyword] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (keyword.trim()) {
			setKeyword('')
			navigation(`/search/${keyword}`)
		} else {
			navigation('/')
		}
	}

	return (
		<Form onSubmit={handleSubmit} className='d-flex'>
			<Form.Control
				type='text'
				name='q'
				value={keyword}
				onChange={(e) => setKeyword(e.target.value)}
				placeholder='Search Products...'
				className='mr-sm-2 ml-sm-5'
			></Form.Control>
			<Button type='submit' variant='outline-light' className='p-2 mx-2'>
				Search
			</Button>
		</Form>
	)
}

export default SearchBox
