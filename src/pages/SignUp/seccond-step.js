import { makeStyles } from "@material-ui/core/styles"
import SelectInput from "components/SelectInput"
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from "react-toastify"
import { post, setSession } from "services/api"
import * as Yup from 'yup'
import loginPageStyle from '../../assets/jss/material-kit-pro-react/pages/loginPageStyle'
import Card from '../../components/Card'
import CardBody from '../../components/Card/CardBody'
import CardHeader from '../../components/Card/CardHeader'
import Button from '../../components/CustomButtons'
import CustomInput from '../../components/CustomInput'
import GridContainer from '../../components/Grid/GridContainer'
import GridItem from '../../components/Grid/GridItem'
import EnterLayout from '../../layouts/EnterLayout'
import { getCoursesDB, getInstitutions } from '../../services/getOptionsForInputs'

export default function SignUpSecoondStep() {
	const [institutions, setInstitution ] = useState([])
	const [courses, setCourses ] = useState([])

	React.useEffect(() => {
		window.scrollTo(0, 0)
		document.body.scrollTop = 0

		const responseInstitution = async () => {
			const response = await getInstitutions()
			setInstitution(response)
		}

		const responseCourse = async () => {
			const response = await getCoursesDB()
			setCourses(response)
		}

		responseInstitution()
		responseCourse()
	},[setInstitution, setCourses])

	const [course, setCourse] = useState({
		institution: '',
		course: '',
		situation: '',
	})
	const [address, setAddress] = useState({
		street: '',
		city: '',
		district: '',
		country: 'Brasil',
		state: '',
	})

	const handleChangeCourse = event => {
		if (event?.target?.name) {
			const auxstate = { ...course }
			auxstate[event.target.name] = event.target.value
			setCourse(auxstate)
		}
		return
	}
	const handleChangeAddress = event => {
		if (event?.target?.name) {
			const auxstate = { ...address }
			auxstate[event.target.name] = event.target.value
			setAddress(auxstate)
		}
		return
	}
	
	const history = useHistory();

	const [formValidationCourse, setFormValidationCourse] = useState(course)
	const [formValidationAddress, setFormValidationAddress] = useState(address)

	const useStylesLogin = makeStyles(loginPageStyle)

	const classesLogin = useStylesLogin()

	const schemaCourse = Yup.object().shape({
		institution: Yup.string().required('Faculdade é obrigatória'),
		course: Yup.string().required('Curso é obrigatório'),
		situation: Yup.string().required('Situação é obrigatória'),
	})
	const schemaAddress = Yup.object().shape({
		street: Yup.string().required('Rua é obrigatório'),
		city: Yup.string().required('Cidade é obrigatório'),
		district: Yup.string().required('Bairro é obrigatório'),
		country: Yup.string().required('País é obrigatório'),
		state: Yup.string().required('Estado é obrigatório'),
	})

	const handleSubmit = event => {
		event.preventDefault()
		sendForm()
	}
	const sendForm = useCallback(async () => {
		const sendRequest = async () => {
			const response = await post('sign-up-seccond-step', {course, address}, {
				complete: true,
				debug: true
			})
	
			if (response.returnType === 'success') {
				toast.success('Seja bem vindo')
				if (response?.data) {
					setSession(response.data)
				}
				history.push('/')
			}
			response.error.split(',').map(e => toast.error(e))
			toast.error(response.message)
			console.log(response)
		}

		const getValidationErrors = err => {
			const validationErrors = {}
			
			if (err && err.inner) {
				err.inner.forEach(error => {
					validationErrors[error.path] = error.message
				})
			}
	
			return validationErrors
		}
	
		const validateForm = async (schema, state) => {
			try {
				await schema.validate(state, {
					abortEarly: false
				})
				await sendRequest()
			} catch (error) {
				const errors = getValidationErrors(error)
				Object.entries(errors)
				.map(error => toast.error(error[1]))
				return errors
			}
		}

		const courseErrors = await validateForm(schemaCourse, course)
		if (courseErrors && courseErrors.length) setFormValidationCourse(courseErrors)
		const addressErrors = await validateForm(schemaAddress, address)
		if (addressErrors && addressErrors.length) setFormValidationAddress(addressErrors)

	}, [schemaAddress, schemaCourse, course, address, history])

	return (
		<EnterLayout
			container={
				<GridContainer justify="center">
					<GridItem xs={12} sm={12} md={4}>
						<Card>
								<CardHeader
									color="primary"
									signup
									className={classesLogin.cardHeader}
								>
									<h4 className={classesLogin.cardTitle}>Cadastro</h4>
								</CardHeader>
								<CardBody signup>
									<SelectInput 
										name="institution"
										label="Faculdade"
										value={course.institution}
										options={institutions}
										onChange={handleChangeCourse}
										error={formValidationCourse.institution}
									/>
									<SelectInput 
										name="course"
										label="Curso"
										value={course.course}
										options={courses}
										onChange={handleChangeCourse}
										error={formValidationCourse.course}
									/>
									<SelectInput 
										name="situation"
										label="Situação"
										value={course.situation}
										options={[
											{label: 'Concluído', value: 'Concluído'},
											{label: 'Cursando', value: 'Cursando'},
											{label: 'Trancado', value: 'Trancado'},
										]}
										onChange={handleChangeCourse}
										error={formValidationCourse.situation}
									/>
									<CustomInput
										name="street"
										inputProps={{
											placeholder: 'Rua',
										}}
										formControlProps={{ fullWidth: true }}
										onChange={handleChangeAddress}
										error={formValidationAddress.street}
									/>
									<CustomInput
										name="city"
										inputProps={{
											placeholder: 'Cidade',
										}}
										formControlProps={{ fullWidth: true }}
										onChange={handleChangeAddress}
										error={formValidationAddress.city}
									/>
									<CustomInput
										name="district"
										inputProps={{
											placeholder: 'Bairro',
										}}
										formControlProps={{ fullWidth: true }}
										onChange={handleChangeAddress}
										error={formValidationAddress.district}
									/>
									<CustomInput
										name="country"
										inputProps={{
											placeholder: 'País',
										}}
										formControlProps={{ fullWidth: true }}
										onChange={handleChangeAddress}
										error={formValidationAddress.country}
									/>
									<CustomInput
										name="state"
										inputProps={{
											placeholder: 'Estado',
										}}
										formControlProps={{ fullWidth: true }}
										onChange={handleChangeAddress}
										error={formValidationAddress.state}
									/>	
									<CustomInput
										name="cep"
										inputProps={{
											placeholder: 'CEP',
										}}
										formControlProps={{ fullWidth: true }}
										onChange={handleChangeAddress}
										error={formValidationAddress.cep}
									/>	
								</CardBody>

								<div className={classesLogin.textCenter}>
									<Button
										simple
										color="google"
										size="lg"
										onClick={handleSubmit}
									>
										Finalizar
									</Button>
								</div>
						</Card>
					</GridItem>
				</ GridContainer>
			}
		/>
	)
}
