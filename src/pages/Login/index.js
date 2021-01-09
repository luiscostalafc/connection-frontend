import Icon from '@material-ui/core/Icon'
import InputAdornment from '@material-ui/core/InputAdornment'
import { makeStyles } from '@material-ui/core/styles'
import Email from '@material-ui/icons/Email'
import React, { useCallback, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { toast } from "react-toastify"
import { post, setSession } from 'services/api'
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

const useStyles = makeStyles(loginPageStyle)

export default function LoginPage() {
	const history = useHistory();
	React.useEffect(() => {
		window.scrollTo(0, 0)
		document.body.scrollTop = 0
	})

	const [state, setState] = useState({
		email: '',
		password: '',
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

	const schema = Yup.object().shape({
	 email: Yup.string().email('Insira um e-mail válido').required('O e-mail é obrigatório'),
	 password: Yup.string().required('A senha é obrigatória'),
	})

	const handleSubmit = event => {
		event.preventDefault()
		sendForm()
	}

	const sendForm = useCallback(async () => {
		const sendRequest = async () => {
			const response = await post('login', state, {
				complete: true,
				debug: true
			})

			if (response.returnType === 'success') {
				toast.success('Seja bem vindo')
				if (response?.data) {
					setSession(response.data)
				}

				if (response?.data?.user) {
					const { role_id } = response.data.user
					if(role_id === 1) history.push('/admin/users')
					if(role_id === 2) history.push('/candidate/home')
					if(role_id === 3) history.push('/company/home')
				}
				// history.push('/')
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

	}, [schema, state, history])

	const classes = useStyles()
	return (
		<EnterLayout
			container={
				<GridContainer justify="center">
					<GridItem xs={12} sm={12} md={4}>
						<Card>
							<CardHeader
								color="primary"
								signup
								className={classes.cardHeader}
							>
								<h4 className={classes.cardTitle}>Login</h4>
							</CardHeader>
							<CardBody signup>
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
											<Email className={classes.inputIconsColor} />
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
												<Icon className={classes.inputIconsColor}>
													lock_utline
												</Icon>
											</InputAdornment>
										),
										autoComplete: 'off'
									}}
								/>
							</CardBody>
							<div className={classes.textCenter}>
								<Button
									simple
									color="google"
									size="lg"
									onClick={handleSubmit}
								>
									Entrar
								</Button>
							</div>
						</Card>
						<div className={classes.textCenter}>Não tem cadastro?</div>
						<div className={classes.textCenter}>
							<Link to="/sign-up">
								<Button simple color="success" size="lg">
									Cadastre-se grátis
								</Button>
							</Link>
						</div>
					</GridItem>
				</GridContainer>
			}
		/>
	)
}
