import { Icon, InputAdornment } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Email } from "@material-ui/icons"
import { MaskInput } from "components/MaskInput"
import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify"
import { post } from "services/api"
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

export default function SignUp() {
	React.useEffect(() => {
		window.scrollTo(0, 0)
		document.body.scrollTop = 0

		// const responseRoles = async () => {
		// 	const response = await getRoles()
		// 	setRoles(response)
		// }

		// responseRoles()
	},[])

	const [company, setCompany] = useState({
		company: '',
		cnpj: '',
		branch: '',
	})

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		gender: 'Masculino',
		pcd: false,
		phone: '',
		role_id: 3
	})


	const handleChangeCompany = event => {
		if (event?.target?.name) {
			const auxstate = { ...company }
			auxstate[event.target.name] = event.target.value
			setCompany(auxstate)
		}
		return
	}

	const handleChange = event => {
		if (event?.target?.name) {
			const auxstate = { ...user }
			auxstate[event.target.name] = event.target.value
			setUser(auxstate)
		}
		return
	}
	
	const [formValidationCompany, setFormValidationCompany] = useState(company)
	const [formValidation, setFormValidation] = useState(user)

	const useStylesLogin = makeStyles(loginPageStyle)

	const classesLogin = useStylesLogin()


	const schemaCompany = Yup.object().shape({
		company: Yup.string().required('Razão Social é obrigatório'),
		cnpj: Yup.string().required('CNPJ é obrigatório'),
		branch: Yup.string().required('Área de atuação é obrigatório'),
	})

	const schema = Yup.object().shape({
		name: Yup.string().required('Nome é obrigatório'),
		email: Yup.string()
			.email('Deve ser um e-mail válido.')
			.required('Email é obrigatório.'),
		password: Yup.string().required('Senha é obrigatória.'),
		phone: Yup.string().required('O número de telefone é obrigatório.'),
	})


	const handleSubmit = event => {
		event.preventDefault()
		sendForm()
	}
	const sendForm = useCallback(async () => {
		const sendRequest = async () => {
			const response = await post('sign-up-company', {user, company}, {
				complete: true,
				debug: true
			})
	
			if (response.returnType === 'success') {
				toast.success('Foi enviado um e-mail de confirmação, por favor acesse para continuar')
				// if (response?.data) { // com isso já loga
				// 	setSession(response.data)
				// }
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

		const errors = await validateForm(schema, user)
		if (errors && errors.length) setFormValidation(errors)
		const companyErrors = await validateForm(schemaCompany, company)
		if (companyErrors && companyErrors.length) setFormValidationCompany(companyErrors)

	}, [schemaCompany, schema, company, user])

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
									<CustomInput
										name="company"
										inputProps={{
											placeholder: 'Razão Social',
										}}
										formControlProps={{ fullWidth: true }}
										onChange={handleChangeCompany}
										error={formValidationCompany.company}
									/>
									<div style={{ marginTop: 20, marginBottom: 20 }}>
										<MaskInput 
											name="cnpj"
											onChange={handleChangeCompany}
											placeholder='CNPJ'
											mask="99.999.999/0001-99"
										/>
									</div>
									<CustomInput
										name="name"
										inputProps={{
											placeholder: 'Nome Contato',
										}}
										formControlProps={{ fullWidth: true }}
										onChange={handleChange}
										error={formValidation.name}
									/>
									<CustomInput
										name="email"
										formControlProps={{ fullWidth: true }}
										onChange={handleChange}
										error={formValidation.email}
										inputProps={{
											placeholder: 'E-mail/Usuário',
											type: 'email',
											startAdornment: (
												<InputAdornment position="start">
													<Email className={classesLogin.inputIconsColor} />
												</InputAdornment>
											)
										}}
									/>
									<CustomInput
										name="password"
										formControlProps={{ fullWidth: true }}
										onChange={handleChange}
										error={formValidation.password}
										inputProps={{
											placeholder: 'Senha',
											type: 'password',
											startAdornment: (
												<InputAdornment position="start">
													<Icon className={classesLogin.inputIconsColor}>
														lock_utline
													</Icon>
												</InputAdornment>
											),
											autoComplete: 'off'
										}}
									/>
								<CustomInput
									name="branch"
									inputProps={{
										placeholder: 'Área de atuação',
									}}
									formControlProps={{ fullWidth: true }}
									onChange={handleChangeCompany}
									error={formValidationCompany.branch}
								/>
								<div>
									<MaskInput 
										name="phone"
										onChange={handleChange}
										placeholder='Telefone'
										mask="(99) 99999-9999"
									/>
								</div>


								</CardBody>

								<div className={classesLogin.textCenter}>
									<Button
										simple
										color="google"
										size="lg"
										onClick={handleSubmit}
									>
										Cadastrar
									</Button>
								</div>
						</Card>

						<div className={classesLogin.textCenter}>Tem cadastro?</div>
						<div className={classesLogin.textCenter}>
							<Link to="/login">
								<Button simple color="success" size="lg">
									Acesse sua conta
								</Button>
							</Link>
						</div>
						<div className={classesLogin.textCenter}>
							<Link to="/sign-up">
								<Button simple color="success" size="lg">
									{"<- voltar"}
								</Button>
							</Link>
						</div>
					</GridItem>
				</ GridContainer>
			}
		/>
	)
}
