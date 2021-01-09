import Button from 'components/CustomButtons'
import CustomInput from 'components/CustomInput'
import DatePicker from 'components/Datepicker'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import { MaskInput } from 'components/MaskInput'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { get, post, put } from 'services/api'
import * as Yup from 'yup'
import useForm from '../../../hooks/form'
import { ArrowBack } from '@material-ui/icons'

const moduleName = 'plans'
export default function Form(props) {
	const history = useHistory();
	const state = {
		plan: '',
		vacancies_limit: 0,
		price: 0.0,
		status: '',
		start_date: new Date(),
		end_date: new Date()
	}

	const [
		{values},
		setValues,
		handleChange,
		handleSubmit,
		validateForm
	] = useForm(state)

	const [formValidation, setFormValidation] = useState(state)

	const { id } = useParams()

	useEffect(() => {
		async function fetchApi() {
			const response = await get(`${moduleName}/${id}`)
			setValues(response)
		}

		if (id) fetchApi()
	}, [id, setValues])

	const schema = Yup.object().shape({
		plan: Yup.string().required('plan é obrigatório'),
		vacancies_limit: Yup.string().required('vacancies_limit é obrigatório'),
		price: Yup.string().required('price é obrigatório'),
		status: Yup.string().required('status é obrigatório'),
		start_date: Yup.string().required('start_date é obrigatório'),
		end_date: Yup.string().required('end_date é obrigatório')
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
							name="plan"
							inputProps={{ placeholder: 'plan', value: values.plan }}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.plan}
						/>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<MaskInput
							name="vacancies_limit"
							onChange={handleChange}
							placeholder='Limite de vagas'
							mask="999999999"
						/>
						{/* <CustomInput
							name="vacancies_limit"
							inputProps={{
								placeholder: 'vacancies_limit',
								value: values.vacancies_limit
							}}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.vacancies_limit}
						/> */}
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
						<CustomInput
							name="status"
							inputProps={{ placeholder: 'status', value: values.status }}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.status}
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
						{/* <CustomInput
							name="start_date"
							inputProps={{
								placeholder: 'start_date',
								value: values.start_date
							}}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.start_date}
						/> */}
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<DatePicker
							name="end_date"
							placeholder={'end_date'}
							value={values.end_date}
							onChange={handleChange}
							error={formValidation.end_date}
						/>
						{/* <CustomInput
							name="end_date"
							inputProps={{ placeholder: 'end_date', value: values.end_date }}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.end_date}
						/> */}
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

// Form.defaultProps = {}
Form.propTypes = {
	successRoute: PropTypes.string
}
