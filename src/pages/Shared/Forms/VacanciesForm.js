import Button from 'components/CustomButtons'
import CustomInput from 'components/CustomInput'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import SelectInput from 'components/SelectInput'
import { ToogleInput } from 'components/ToogleInput'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { get, getCompanyId, post, put } from 'services/api'
import { getCompanies, getContractTypes } from 'services/getOptionsForInputs'
import * as Yup from 'yup'
import useForm from '../../../hooks/form'
import { ArrowBack } from '@material-ui/icons'

const moduleName = 'vacancies'
export default function Form(props) {
	const { companyId } = props
	const history = useHistory();
	const state = {
		title: '',
		description: '',
		salary: '',
		experience: '',
		course: '',
		area: '',
		role: '',
		pcd: false,
		contract_type_id: 0,
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
	const [contract, setContract] = useState([])
	const [company, setCompany] = useState([])

	const { id } = useParams()

	useEffect(() => {
		async function fetchApi() {
			const response = await get(`${moduleName}/${id}`)
			setValues(response)
		}

		const responseContract = async () => {
			const response = await getContractTypes()
			setContract(response)
		}

		const responseCompany = async () => {
			const response = await getCompanies()
			setCompany(response)
		}

		if (id) fetchApi()
		responseContract()
		if (!companyId) responseCompany()
	}, [id, companyId, setValues, setContract, setCompany])

	const schema = Yup.object().shape({
		title: Yup.string().required('title é obrigatório'),
		description: Yup.string().required('description é obrigatório'),
		salary: Yup.string().required('salary é obrigatório'),
		experience: Yup.string().required('experience é obrigatório'),
		course: Yup.string().required('course é obrigatório'),
		area: Yup.string().required('area é obrigatório'),
		role: Yup.string().required('role é obrigatório'),
		contract_type_id: Yup.string().required('contract_type_id é obrigatório'),
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

		values.salary = String(values.salary)
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
							name="description"
							value={values.description}
							inputProps={{
								placeholder: 'description',
								value: values.description
							}}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.description}
						/>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<CustomInput
							name="salary"
							label="Salário"
							inputProps={{ placeholder: 'salary', value: values.salary }}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.title}
						/>
						{/* <MaskInput
							name="salary"
							onChange={handleChange}
							value={values.salary}
							placeholder='Salário'
							mask="999.999.999"
						/> */}
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<CustomInput
							name="experience"
							inputProps={{
								placeholder: 'experience',
								value: values.experience
							}}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.experience}
						/>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<CustomInput
							name="course"
							inputProps={{ placeholder: 'course', value: values.course }}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.course}
						/>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<CustomInput
							name="area"
							inputProps={{ placeholder: 'area', value: values.area }}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.area}
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
						<ToogleInput
							name="pcd"
							label="PCD"
							onChange={handleChange}
							checked={values.pcd}
							/>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<SelectInput
							name="contract_type_id"
							label="Tipo de contrato"
							options={contract}
							onChange={handleChange}
						/>
					</GridItem>
					{!companyId && <GridItem xs={12} sm={12} md={4}>
						<SelectInput
							name="company_id"
							label="Companhia"
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
	companyId: getCompanyId()
}
Form.propTypes = {
	companyId: PropTypes.number,
	successRoute: PropTypes.string
}
