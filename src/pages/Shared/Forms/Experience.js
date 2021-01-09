import Button from 'components/CustomButtons'
import CustomInput from 'components/CustomInput'
import DatePicker from 'components/Datepicker'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import SelectInput from 'components/SelectInput'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { get, getUserId, post, put } from 'services/api'
import { getUsers } from 'services/getOptionsForInputs'
import * as Yup from 'yup'
import useForm from '../../../hooks/form'
import { ArrowBack } from '@material-ui/icons'

const moduleName = 'experiences'
export default function Form(props) {
	const { userId } = props
	const history = useHistory();
	const state = {
		company: '',
		start_date: '',
		end_date: '',
		role: '',
		description: '',
		user_id: userId ?? 0,
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

		if (id) fetchApi()
		if (!userId) responseUsers()
	}, [id, userId, setValues])

	const schema = Yup.object().shape({
		company: Yup.string().required('company é obrigatório'),
		start_date: Yup.string().required('start_date é obrigatório'),
		end_date: Yup.string().required('end_date é obrigatório'),
		role: Yup.string().required('role é obrigatório'),
		description: Yup.string().required('description é obrigatório'),
		user_id: Yup.string().required('user_id é obrigatório'),
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
							name="company"
							inputProps={{ placeholder: 'company', value: values.company }}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.company}
						/>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
					<DatePicker
							name="start_date"
							placeholder={'start_date'}
							value={values.start_date}
							onChange={handleChange}
							error={formValidation.start_date}
						/>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
					<DatePicker
							name="end_date"
							placeholder={'end_date'}
							value={values.end_date}
							onChange={handleChange}
							error={formValidation.end_date}
						/>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<CustomInput
							name="role"
							inputProps={{ placeholder: 'role', value: values.role }}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.role}
						/>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<CustomInput
							name="description"
							inputProps={{ placeholder: 'description', value: values.description }}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.description}
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
