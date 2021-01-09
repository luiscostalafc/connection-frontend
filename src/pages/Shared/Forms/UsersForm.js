import Button from 'components/CustomButtons'
import CustomInput from 'components/CustomInput'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import { MaskInput } from 'components/MaskInput'
import SelectInput from 'components/SelectInput'
import { ToogleInput } from 'components/ToogleInput'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { get, getCompanyId, post, put } from 'services/api'
import { getAddresses, getCompanies, getPhones, getRoles } from 'services/getOptionsForInputs'
import * as Yup from 'yup'
import useForm from '../../../hooks/form'
import { ArrowBack } from '@material-ui/icons'

const moduleName = 'users'
export default function Form(props) {
	const { companyId } = props
	const history = useHistory();
	const state = {
		name: '',
		email: '',
		password: '',
		gender: '',
		cpf: '',
		accept_terms: false,
		pcd: false,
		email_confirmed: false,
		phone_id: 0,
		address_id: 0,
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
	const [phone, setPhone] = useState([])
	const [address, setAddress] = useState([])
	const [company, setCompany] = useState([])
	const [role, setRole] = useState([])

	const { id } = useParams()

	useEffect(() => {
		async function fetchApi() {
			const response = await get(`${moduleName}/${id}`)
			setValues(response)
		}

		const responsePhone = async () => {
			const response = await getPhones()
			setPhone(response)
		}

		const responseAddress = async () => {
			const response = await getAddresses()
			setAddress(response)
		}

		const responseCompanies = async () => {
			const response = await getCompanies()
			setCompany(response)
		}

		const responseRole = async () => {
			const response = await getRoles()
			setRole(response)
		}

		if (id) fetchApi()
		responsePhone()
		responseAddress()
		if (!companyId) responseCompanies()
		responseRole()
	}, [id, companyId, setValues, setPhone, setAddress, setCompany])

	const schema = Yup.object().shape({
		name: Yup.string().required('name é obrigatório'),
		email: Yup.string().required('email é obrigatório'),
		password: Yup.string().required('password é obrigatório'),
		gender: Yup.string().required('gender é obrigatório'),
		cpf: Yup.string().required('cpf é obrigatório'),
		phone_id: Yup.string().required('phone_id é obrigatório'),
		address_id: Yup.string().required('address_id é obrigatório'),
		company_id: Yup.string().required('company_id é obrigatório')
	})

	const sendForm = useCallback(async () => {
		const validatiorErrors = await validateForm(schema, values)
		if (validatiorErrors) {
			setFormValidation(validatiorErrors)
			Object.entries(validatiorErrors)
				.map(error => toast.error(error[1]))
			return
		}

		if (values.message) delete values.message
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
							name="name"
							inputProps={{ placeholder: 'name', value: values.name }}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.name}
						/>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<CustomInput
							name="email"
							inputProps={{ placeholder: 'email', value: values.email }}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.email}
						/>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<CustomInput
							name="password"
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.password}
							inputProps={{
								placeholder: 'Senha',
								type: 'password',
								autoComplete: 'off',
								value: values.password
							}}
						/>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<CustomInput
							name="gender"
							inputProps={{ placeholder: 'gender', value: values.gender }}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.gender}
						/>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<MaskInput
							name="cpf"
							onChange={handleChange}
							placeholder='CPF'
							mask="999.999.999-99"
						/>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<ToogleInput
							name="accept_terms"
							label="Aceitou os termos"
							onChange={handleChange}
							checked={values.accept_terms}
							/>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<ToogleInput
							name="pcd"
							label="PCD"
							onChange={handleChange}
							checked={values.pcd}
							/>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<ToogleInput
							name="email_confirmed"
							label="Email confirmado"
							onChange={handleChange}
							checked={values.email_confirmed}
							/>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<SelectInput
							name="phone_id"
							label="Telefone"
							options={phone}
							onChange={handleChange}
						/>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<SelectInput
							name="address_id"
							label="Endereço"
							options={address}
							onChange={handleChange}
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
						<SelectInput
							name="role_id"
							label="Papel"
							options={role}
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
	companyId: getCompanyId()
}
Form.propTypes = {
	companyId: PropTypes.number,
	successRoute: PropTypes.string
}
