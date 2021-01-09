import Button from 'components/CustomButtons'
import CustomInput from 'components/CustomInput'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import { MaskInput } from 'components/MaskInput'
import SelectInput from 'components/SelectInput'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { get, getUserId, post, put } from 'services/api'
import { getCompanies, getRequestStatuses, getUsers } from 'services/getOptionsForInputs'
import * as Yup from 'yup'
import useForm from '../../../hooks/form'
import { ArrowBack } from '@material-ui/icons'

const moduleName = 'purchased-requests'
export default function Form(props) {
	const { userId, companyId } = props
	const history = useHistory();
	const state = {
		title: '',
		content: '',
		payment_mode: '',
		code: '',
		price: 0.0,
		request_status_id: 0,
		company_id: companyId ?? 0,
		user_id: userId ?? 0
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
	const [company, setCompany ] = useState([])
	const [status, setStatus ] = useState([])

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

		const responseCompanies = async () => {
			const response = await getCompanies()
			setCompany(response)
		}

		const responseRequestStatuses = async () => {
			const response = await getRequestStatuses()
			setStatus(response)
		}

		if (id) fetchApi()
		if (!userId) responseUsers()
		if (!companyId) responseCompanies()
		responseRequestStatuses()
	}, [id, userId, companyId, setValues, setUser, setCompany, setStatus])

	const schema = Yup.object().shape({
		title: Yup.string().required('title é obrigatório'),
		content: Yup.string().required('content é obrigatório'),
		payment_mode: Yup.string().required('payment_mode é obrigatório'),
		code: Yup.string().required('code é obrigatório'),
		price: Yup.string().required('price é obrigatório'),
		request_status_id: Yup.string().required('request_status_id é obrigatório'),
		company_id: Yup.number().required('company_id é obrigatório'),
		user_id: Yup.number().required('user_id é obrigatório')
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
							name="payment_mode"
							inputProps={{
								placeholder: 'payment_mode',
								value: values.payment_mode
							}}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.payment_mode}
						/>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<CustomInput
							name="code"
							inputProps={{ placeholder: 'code', value: values.code }}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.code}
						/>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<MaskInput
							name="price"
							onChange={handleChange}
							placeholder='Preço'
							mask="999.999.999"
						/>
						{/* <CustomInput
							name="price"
							inputProps={{ placeholder: 'price', value: values.price }}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.price}
						/> */}
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<SelectInput
							name="request_status_id"
							label="Status"
							options={status}
							onChange={handleChange}
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
					{!companyId && <GridItem xs={12} sm={12} md={4}>
						<SelectInput
							name="company_id"
							label="Companhia"
							value={values.company_id}
							options={company}
							onChange={handleChange}
						/>
					</GridItem>}

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
	companyId: PropTypes.number,
	successRoute: PropTypes.string
}
