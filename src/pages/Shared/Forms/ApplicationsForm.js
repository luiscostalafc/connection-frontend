import Button from 'components/CustomButtons'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import SelectInput from 'components/SelectInput'
import useForm from 'hooks/form'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { get, getCompanyId, getUserId, post, put } from 'services/api'
import { getApplicationStatuses, getCompanies, getUsers } from 'services/getOptionsForInputs'
import * as Yup from 'yup'
import { ArrowBack } from '@material-ui/icons'


const moduleName = 'applications'
export default function Form(props) {
	const { userId, companyId } = props
	const history = useHistory();
	const state = {
		// vacancy_id: '',
		user_id: userId ?? 0,
		company_id: companyId ?? 0,
		status_id: ''
	}

	const [
		{ values },
		setValues,
		handleChange,
		handleSubmit,
		validateForm
	] = useForm(state)

	// const [formValidation, setFormValidation] = useState(state)
	// const [vacancy, setVacancy ] = useState([])
	const [user, setUser ] = useState([])
	const [company, setCompany ] = useState([])
	const [status, setStatus ] = useState([])

	const { id } = useParams()

	useEffect(() => {
		async function fetchApi() {
			const response = await get(`${moduleName}/${id}`)
			setValues(response)
		}

		// const responseVacancies = async () => {
		// 	const response = await getVacancies()
		// 	setVacancy(response)
		// }

		const responseUsers = async () => {
			const response = await getUsers()
			setUser(response)
		}

		const responseCompanies = async () => {
			const response = await getCompanies()
			setCompany(response)
		}

		const responseApplicationStatuses = async () => {
			const response = await getApplicationStatuses()
			setStatus(response)
		}

		if (id) fetchApi()
		// responseVacancies()
		if (!userId) responseUsers()
		if (!companyId) responseCompanies()
		responseApplicationStatuses()

	}, [id, userId, companyId, setValues, setUser, setCompany, setStatus])

	const schema = Yup.object().shape({
		// vacancy_id: Yup.string().required(),
		user_id: Yup.string().required(),
		company_id: Yup.string().required(),
		status_id: Yup.string().required()
	})

	const sendForm = useCallback(async () => {
		const validatiorErrors = await validateForm(schema, values)
		if (validatiorErrors) {
			// setFormValidation(validatiorErrors)
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
					{/* <GridItem xs={12} sm={12} md={4}>
						<SelectInput
							name="vacancy_id"
							label="Vagas"
							value={values.vacancy_id}
							options={vacancy}
							onChange={handleChange}
						/>
					</GridItem> */}
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
						<SelectInput
							name="status_id"
							label="Status"
							value={values.status_id}
							options={status}
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
				<div style={{ marginTop: 50}}>
					<Link to="/candidate/home">
						<Button size="sm" color="default" round><ArrowBack /> Voltar</Button>
					</Link>
				</div>

			</GridItem>

				</GridContainer>
	)
}

Form.defaultProps = {
	userId: getUserId(),
	companyId: getCompanyId()
}
Form.propTypes = {
	userId: PropTypes.number,
	companyId: PropTypes.number,
	successRoute: PropTypes.string
}
