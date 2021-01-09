import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import CustomInput from 'components/CustomInput'
import React, { useCallback, useState } from 'react'
import { toast } from "react-toastify"
import { post } from 'services/api'
import * as Yup from 'yup'
import Button from '../../../../components/CustomButtons'
import GridContainer from '../../../../components/Grid/GridContainer'
import GridItem from '../../../../components/Grid/GridItem'
import style from './style.js'

const useStyles = makeStyles(style)

export default function SectionContact() {
	const classes = useStyles()
	const [state, setState] = useState({
		email: '',
		description: ''
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
		description: Yup.string().required('Descrição é obrigatória')
	})

	const handleSubmit = event => {
		event.preventDefault()
		sendForm()
	}

	const sendForm = useCallback(async () => {
		const sendRequest = async () => {
			const response = await post('contact-mail', state, {
				complete: true,
				debug: true
			})

			if (response.returnType === 'success') {
				toast.success('Email enviado')
				setState({
					email: '',
					description: ''
				})
				return
			}
			response.error.split(',').map(e => toast.error(e))
			toast.error(response.message)
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
		<div className={classes.section} id="contact">
			<div className={classes.container}>
				<GridContainer>
					<GridItem
						md={8}
						sm={10}
						className={classNames(classes.mlAuto, classes.mrAuto)}
					>
						<h2 className={classes.title}>Contato</h2>
					</GridItem>
					<div className={classes.socialLine}>
						<div className={classes.container}>
							<GridContainer>
								<GridItem md={12}>
									<CustomInput
										name="email"
										inputProps={{ placeholder: 'email' }}
										formControlProps={{ fullWidth: true }}
										onChange={handleChange}
										error={formValidation.email}
									/>
								</GridItem>
								<GridItem md={12}>
									<CustomInput
										name="description"
										inputProps={{ placeholder: 'descrição' }}
										formControlProps={{ fullWidth: true }}
										onChange={handleChange}
										error={formValidation.description}
									/>
								</GridItem>
								<GridItem md={12}>
									<Button
										type="button"
										color="danger"
										fullWidth
										onClick={handleSubmit}
									>
										{'Enviar'}
									</Button>
								</GridItem>
							</GridContainer>
						</div>
					</div>
				</GridContainer>
			</div>
		</div>
	)
}
