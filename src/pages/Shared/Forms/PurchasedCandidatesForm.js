import Button from 'components/CustomButtons'
import DatePicker from 'components/Datepicker'
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

const moduleName = 'purchased-candidates'
export default function Form(props) {
	const { companyId } = props
	const history = useHistory();
	const state = {
		company_id: companyId ?? 0,
		purchased_date: '',
		price: 0.0,
		qtd: 0,
		created_at: ''
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
	}, [id, companyId, setValues, setCompany])

	const schema = Yup.object().shape({
		company_id: Yup.string().required('company_id é obrigatório'),
		purchased_date: Yup.string().required('purchased_date é obrigatório'),
		price: Yup.string().required('price é obrigatório'),
		qtd: Yup.string().required('qtd é obrigatório'),
		created_at: Yup.string().required('created_at é obrigatório')
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
						<DatePicker
							name="purchased_date"
							placeholder={'purchased_date'}
							value={values.purchased_date}
							onChange={handleChange}
							error={formValidation.purchased_date}
						/>
						{/* <CustomInput
							name="purchased_date"
							inputProps={{
								placeholder: 'purchased_date',
								value: values.purchased_date
							}}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.purchased_date}
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
						<MaskInput
							name="qtd"
							onChange={handleChange}
							placeholder='Quantidade'
							mask="999999999999"
						/>
						{/* <CustomInput
							name="qtd"
							inputProps={{ placeholder: 'qtd', value: values.qtd }}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.qtd}
						/> */}
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<DatePicker
							name="created_at"
							placeholder={'created_at'}
							value={values.created_at}
							onChange={handleChange}
							error={formValidation.created_at}
						/>
						{/* <CustomInput
							name="created_at"
							inputProps={{
								placeholder: 'created_at',
								value: values.created_at
							}}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.created_at}
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

Form.defaultProps = {
	companyId: getCompanyId()
}
Form.propTypes = {
	companyId: PropTypes.number,
	successRoute: PropTypes.string
}
