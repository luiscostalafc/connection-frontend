import Button from 'components/CustomButtons'
import CustomInput from 'components/CustomInput'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import SelectInput from 'components/SelectInput'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { get, getUserId, post, put } from 'services/api'
import { getPostCategories, getUsers } from 'services/getOptionsForInputs'
import * as Yup from 'yup'
import useForm from '../../../hooks/form'
import { ArrowBack } from '@material-ui/icons'

const moduleName = 'posts'
export default function Form(props) {
	const { userId } = props
	const history = useHistory();
	const state = {
		title: '',
		content: '',
		status: '',
		visits: '',
		user_id: userId ?? 0,
		post_category_id: 0
	}

	const [
		{values},
		setValues,
		handleChange,
		handleSubmit,
		validateForm
	] = useForm(state)

	const [formValidation, setFormValidation] = useState(state)
	const [user, setUser ] = useState([])
	const [postCategory, setPostCategory ] = useState([])

	const { id } = useParams()

	useEffect(() => {
		async function fetchApi() {
			const response = await get(`${moduleName}/${id}`)
			setValues(response)
		}

		const responseUsers = async () => {
			const response = await getUsers()
			setUser(response)
		}

		const responsePostCategory = async () => {
			const response = await getPostCategories()
			setPostCategory(response)
		}

		if (id) fetchApi()
		if (!userId) responseUsers()
		responsePostCategory()
	}, [id, userId, setValues])

	const schema = Yup.object().shape({
		title: Yup.string().required('title é obrigatório'),
		content: Yup.string().required('content é obrigatório'),
		status: Yup.string().required('status é obrigatório'),
		visits: Yup.string().required('visits é obrigatório'),
		user_id: Yup.string().required('user_id é obrigatório'),
		post_category_id: Yup.string().required(
			'post_category_id é obrigatório'
		)
	})

	const sendForm = useCallback(async () => {
		const validatiorErrors = await validateForm(schema, values)
		if (validatiorErrors) {
			setFormValidation(validatiorErrors)
			Object.entries(validatiorErrors)
				.map(error => toast.error(error[1]))

			return
		}

		if (id) {
			const response = await put(`${moduleName}/${id}`, values, {
				complete: true
			})
			if (response.returnType === 'success') {
				toast.success(response.message);
				history.push(props.successRoute)
				return
			}
			if (response.error) {
				response.error.split(',').map(e => toast.error(e))
				toast.error(response.message)
				return
			}
		}

		const response = await post(moduleName, values, { complete: true })
		if (response.returnType === 'success') {
			toast.success(response.message);
			history.push(props.successRoute)
			return
		}
		if (response.error) {
			response.error.split(',').map(e => toast.error(e))
			toast.error(response.message)
			return
		}
	}, [id, validateForm, schema, values, history,props ])

	return (
				<GridContainer>
					<GridItem xs={12} sm={12} md={4}>
						<CustomInput
							name="title"
							inputProps={{ placeholder: 'title', value: values.title }}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.title}
						/>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<CustomInput
							name="content"
							inputProps={{ placeholder: 'content', value: values.content }}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.content}
						/>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<CustomInput
							name="status"
							inputProps={{ placeholder: 'status', value: values.status }}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.status}
						/>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<CustomInput
							name="visits"
							inputProps={{ placeholder: 'visits', value: values.visits }}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.visits}
						/>
					</GridItem>
					{!userId && <GridItem xs={12} sm={12} md={4}>
						<SelectInput
							name="user_id"
							label="Usuário"
							value={values.user_id}
							options={user}
							onChange={handleChange}
						/>
					</GridItem>}
					<GridItem xs={12} sm={12} md={4}>
						<SelectInput
							name="post_category_id"
							label="Categoria"
							options={postCategory}
							onChange={handleChange}
						/>
					</GridItem>

					<GridItem xs={12} sm={12} md={4}>
						<Button
							type="button"
							color="success"
							fullWidth
							onClick={handleSubmit(sendForm)}
						>
							{id ? 'Editar' : 'Inserir'}
						</Button>
					</GridItem>

					<GridItem xs={12} sm={12} md={4}>
				<div style={{ marginTop: 50 }}>
					<Link to="/candidate/home">
						<Button size="sm" color="default" round><ArrowBack />Voltar</Button>
					</Link>
				</div>
			</GridItem>

				</GridContainer>
	)
}

Form.defaultProps = {
	userId: getUserId()
}
Form.propTypes = {
	userId: PropTypes.number,
	successRoute: PropTypes.string
}
