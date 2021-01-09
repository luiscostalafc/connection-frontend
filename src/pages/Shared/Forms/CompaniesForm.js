import Button from 'components/CustomButtons'
import CustomInput from 'components/CustomInput'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import { MaskInput } from 'components/MaskInput'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { get, getUserId, post, put } from 'services/api'
import * as Yup from 'yup'
import useForm from '../../../hooks/form'
import { ArrowBack } from '@material-ui/icons'

const moduleName = 'companies'
export default function Form(props) {
	const { userId } = props
	const history = useHistory();
	const state = {
		company: '',
		cnpj: '',
		branch: '',
		avatar_id: null,
		user_id: userId ?? 0,
	}

	const [
		{values},
		setValues,
		handleChange,
		handleSubmit,
		validateForm
	] = useForm(state)

	const [formValidation, setFormValidation] = useState(state)

	const { id } = useParams()

	useEffect(() => {
		async function fetchApi() {
			const response = await get(`${moduleName}/${id}`)
			console.log(response)
			setValues(response)
		}

		if (id) fetchApi()
	}, [id, setValues])

	const schema = Yup.object().shape({
		company: Yup.string().required('company é obrigatório'),
		cnpj: Yup.string().required('cnpj é obrigatório'),
		branch: Yup.string().required('branch é obrigatório'),
		// avatar_id: Yup.string().required('avatar_id é obrigatório')
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
					<GridItem xs={12} sm={12} md={4}>
						<CustomInput
							name="company"
							inputProps={{ placeholder: 'company', value: values.company }}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.company}
						/>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<MaskInput
							name="cnpj"
							value={values.cnpj}
							onChange={handleChange}
							placeholder='CNPJ'
							mask="99.999.999/0001-99"
						/>
						{/* <CustomInput
							name="cnpj"
							inputProps={{ placeholder: 'cnpj', value: values.cnpj }}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.cnpj}
						/> */}
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<CustomInput
							name="branch"
							inputProps={{ placeholder: 'branch', value: values.branch }}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.branch}
						/>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<CustomInput
							name="avatar_id"
							inputProps={{ placeholder: 'avatar_id', value: values.avatar_id }}
							formControlProps={{ fullWidth: true }}
							onChange={handleChange}
							error={formValidation.avatar_id}
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
	userId: getUserId()
}
Form.propTypes = {
	userId: PropTypes.number,
	successRoute: PropTypes.string
}
