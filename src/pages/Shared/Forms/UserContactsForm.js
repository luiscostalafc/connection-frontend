import Button from 'components/CustomButtons'
import CustomInput from 'components/CustomInput'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import SelectInput from 'components/SelectInput'
import useForm from 'hooks/form'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { get, getUserId, post, put } from 'services/api'
import { getUsers } from 'services/getOptionsForInputs'
import * as Yup from 'yup'
import { ArrowBack } from '@material-ui/icons'


const moduleName = 'user-contacts'
export default function Form(props) {
	const { userId } = props
	const history = useHistory();
	const state = {
		user_id: userId ?? 0,
		contact: ''
	}

	const [
		{ values },
		setValues,
		handleChange,
		handleSubmit,
		validateForm
	] = useForm(state)

	const formValidation = useState(state)
	const [user, setUser ] = useState([])

	const { id } = useParams()

	useEffect(() => {
		async function fetchApi() {
			const response = await get(`${moduleName}/${id}`)
			setValues(response)
		}

		const responseUsers = async () => {
			const response = await getUsers()
			setUser(response)
		}


		if (id) fetchApi()
		if (!userId) responseUsers()

	}, [id, userId, setValues, setUser])

	const schema = Yup.object().shape({
		user_id: Yup.string().required(),
		contact: Yup.string().required(),
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
					{!userId && <GridItem xs={12} sm={12} md={4}>
						<SelectInput
							name="user_id"
							label="Usuário"
							value={values.user_id}
							options={user}
							onChange={handleChange}
						/>
					</GridItem>}
					<GridItem xs={12} sm={12} md={4}>
						<CustomInput
							name="contact"
							inputProps={{ placeholder: 'contact', value: values.contact }}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.contact}
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
	userId: getUserId(),
}
Form.propTypes = {
	userId: PropTypes.number,
	successRoute: PropTypes.string
}
