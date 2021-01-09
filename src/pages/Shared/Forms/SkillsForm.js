import Button from 'components/CustomButtons'
import CustomInput from 'components/CustomInput'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import SelectInput from 'components/SelectInput'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { get, getUserId, post, put } from 'services/api'
import * as Yup from 'yup'
import useForm from '../../../hooks/form'
import { ArrowBack } from '@material-ui/icons'

const moduleName = 'skills'
export default function Form(props) {
	const { userId, typeSkill } = props

	const history = useHistory();
	const state = {
		percentage: '',
		title: '',
		type: typeSkill ?? '',
		description: '',
		institution: '',
		user_id: userId ?? 0,
	}

	const [
		{ values },
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
			setValues(response)
		}

		if (id) fetchApi()
	}, [id, setValues])

	const schema = Yup.object().shape({
		percentage: Yup.string().required('percentage é obrigatório'),
		title: Yup.string().required('title é obrigatório'),
		type: Yup.string().required('type é obrigatório'),
		description: Yup.string().required('description é obrigatório'),
		institution: Yup.string().required('institution é obrigatório')
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
	}, [id, validateForm, schema, values, history, props])

	return (
		<GridContainer>
			<GridItem xs={12} sm={12} md={4}>
				<CustomInput
					name="percentage"
					inputProps={{
						placeholder: 'percentage',
						value: values.percentage
					}}
					formControlProps={{ fullWidth: true }}
					onChange={handleChange}
					error={formValidation.percentage}
				/>
			</GridItem>
			{!typeSkill && <GridItem xs={12} sm={12} md={4}>
				<SelectInput
					name="type"
					label="Tipo"
					value={state.type}
					options={[
						{ label: 'Técnicas', value: 'hard' },
						{ label: 'Comportamentais', value: 'soft' },
					]}
					onChange={handleChange}
				/>
			</GridItem>}
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
					name="institution"
					inputProps={{
						placeholder: 'institution',
						value: values.institution
					}}
					formControlProps={{ fullWidth: true }}
					onChange={handleChange}
					error={formValidation.institution}
				/>
			</GridItem>

			<GridItem xs={12} sm={12} md={4}>
				<div style={{ marginTop: 50, marginLeft: 50 }}>
					<Button
						type="button"
						color="success"
						fullWidth
						onClick={handleSubmit(sendForm)}
					>
						{id ? 'Editar' : 'Inserir'}
					</Button>
				</div>
			</GridItem>

			<GridItem xs={12} sm={12} md={4}>
				<div style={{ display: "flex", flex: 1, marginTop: 150 }}>
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
	successRoute: PropTypes.string,
	typeSkill: PropTypes.string
}
