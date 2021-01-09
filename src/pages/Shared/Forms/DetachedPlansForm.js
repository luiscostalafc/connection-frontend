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
import { get, getCompanyId, post, put } from 'services/api'
import { getCompanies } from 'services/getOptionsForInputs'
import * as Yup from 'yup'
import useForm from '../../../hooks/form'
import { ArrowBack } from '@material-ui/icons'

const moduleName = 'detached-plans'
export default function Form(props) {
	const { companyId } = props
	const history = useHistory();
	const state = {
		plan: '',
		vacancies_limit: '',
		price: '',
		status: '',
		start_date: '',
		end_date: '',
		company_id: companyId ?? 0
	}

	const [
		{values},
		setValues,
		handleChange,
		handleSubmit,
		validateForm
	] = useForm(state)

	const [formValidation, setFormValidation] = useState(state)
	const [company, setCompany ] = useState([])
	const { id } = useParams()

	useEffect(() => {
		async function fetchApi() {
			const response = await get(`${moduleName}/${id}`)
			setValues(response)
		}

		const responseCompanies = async () => {
			const response = await getCompanies()
			setCompany(response)
		}

		if (id) fetchApi()
		if (!companyId) responseCompanies()
	}, [id, companyId, setValues])

	const schema = Yup.object().shape({
		plan: Yup.string().required('plan é obrigatório'),
		vacancies_limit: Yup.string().required('vacancies_limit é obrigatório'),
		price: Yup.string().required('price é obrigatório'),
		status: Yup.string().required('status é obrigatório'),
	})

	const sendForm = useCallback(async () => {
		const validatiorErrors = await validateForm(schema, values)
		if (validatiorErrors) {
			setFormValidation(validatiorErrors)
			Object.entries(validatiorErrors)
				.map(error => toast.error(error[1]))

			return
		}

		values.price = Number(values.price)
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
							value={values.vacancies_limit}
							mask="9999"
						/>
					</GridItem>
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
						<MaskInput
							name="price"
							onChange={handleChange}
							value={values.price}
							placeholder='Preço'
							mask="999.999.999"
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
	companyId: getCompanyId()
}
Form.propTypes = {
	companyId: PropTypes.number,
	successRoute: PropTypes.string
}
