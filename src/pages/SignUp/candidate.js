import { Icon, InputAdornment } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Email, Face } from "@material-ui/icons"
import { MaskInput } from "components/MaskInput"
import SelectInput from "components/SelectInput"
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

	const [state, setState] = useState({
		name: '',
		email: '',
		password: '',
		gender: 'Masculino',
		pcd: false,
		cpf: '',
		phone: '',
		role_id: 2
	})

	const handleChange = event => {
		if (event?.target?.name) {
			const auxstate = { ...state }
			auxstate[event.target.name] = event.target.value
			setState(auxstate)
		}
		return
	}
	
	const [formValidation, setFormValidation] = useState(state)

	const useStylesLogin = makeStyles(loginPageStyle)

	const classesLogin = useStylesLogin()

	const schema = Yup.object().shape({
		name: Yup.string().required('Nome é obrigatório'),
		email: Yup.string()
			.email('Deve ser um e-mail válido.')
			.required('Email é obrigatório.'),
		password: Yup.string().required('Senha é obrigatória.'),
		gender: Yup.string().required('O gênero é obrigatório.'),
		cpf: Yup.string().required('O CPF ou CNPJ são obrigatórios.'),
		pcd: Yup.boolean(),
		phone: Yup.string().required('O número de telefone é obrigatório.'),
	})

	const handleSubmit = event => {
		event.preventDefault()
		sendForm()
	}
	const sendForm = useCallback(async () => {
		const sendRequest = async () => {
			const response = await post('sign-up-candidate', state, {
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
				setFormValidation(errors)
				Object.entries(errors)
				.map(error => toast.error(error[1]))
				return
			}
		}

		await validateForm(schema, state)

	}, [schema, state])

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
										name="name"
										inputProps={{
											placeholder: 'Nome Completo...',
											startAdornment: (
												<InputAdornment position="start">
													<Face className={classesLogin.inputIconsColor} />
												</InputAdornment>
											)
										}}
										formControlProps={{ fullWidth: true }}
										onChange={handleChange}
										error={formValidation.name}
									/>
										<div style={{ marginTop: 20, marginBottom: 20 }}>
										<MaskInput 
											name="cpf"
											onChange={handleChange}
											placeholder='CPF'
											mask="999.999.999-99"
										/>
									</div>
									<CustomInput
										name="email"
										formControlProps={{ fullWidth: true }}
										onChange={handleChange}
										error={formValidation.email}
										inputProps={{
											placeholder: 'E-mail...',
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
									<div>
										<MaskInput 
											name="phone"
											onChange={handleChange}
											placeholder='Telefone'
											mask="(99) 99999-9999"
										/>
									</div>
									<SelectInput 
										name="gender"
										label="Gênero"
										value={state.gender}
										options={[
											{label: 'Feminino', value: 'Feminino'},
											{label: 'Masculino', value: 'Masculino'},
											{label: 'Outro', value: 'Outro'},
										]}
										onChange={handleChange}
									/>

									{/* <SelectInput 
										name="role_id"
										label="Papel"
										value={state.role_id}
										options={roles}
										onChange={handleChange}
									/>
									<ToogleInput 
										name="pcd"
										label="PCD"
										onChange={handleChange}
										checked={state.pcd || false}
										/> */}

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
