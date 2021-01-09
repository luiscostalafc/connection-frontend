import Button from 'components/CustomButtons'
import CustomInput from 'components/CustomInput'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import SelectInput from 'components/SelectInput'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { get, getUserId, post, put } from 'services/api'
import { getAreas, getLevels } from 'services/getOptionsForInputs'
import * as Yup from 'yup'
import useForm from '../../../hooks/form'
import { ArrowBack } from '@material-ui/icons';

const moduleName = 'courses'
export default function Form(props) {
	const history = useHistory();
	const { userId } = props
	const state = {
		course: '',
		institution: '',
		situation: '',
		area_id: '',
		level_id: '',
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
	const [area, setArea] = useState([])
	const [level, setLevel] = useState([])

	const { id } = useParams()

	useEffect(() => {
		async function fetchApi() {
			const response = await get(`${moduleName}/${id}`)
			setValues(response)
		}

		const responseArea = async () => {
			const response = await getAreas()
			setArea(response)
		}

		const responseLevel = async () => {
			const response = await getLevels()
			setLevel(response)
		}

		if (id) fetchApi()
		responseArea()
		responseLevel()

	}, [id, setValues, setArea, setLevel])

	const schema = Yup.object().shape({
		course: Yup.string().required('course é obrigatório'),
		institution: Yup.string().required('institution é obrigatório'),
		situation: Yup.string().required('situation é obrigatório'),
		area_id: Yup.string().required('area_id é obrigatório'),
		level_id: Yup.string().required('level_id é obrigatório')
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
					name="course"
					inputProps={{ placeholder: 'Curso', value: values.course }}
					formControlProps={{ fullWidth: true }}
					onChange={handleChange}
					error={formValidation.course}
				/>
			</GridItem>
			<GridItem xs={12} sm={12} md={4}>
				<CustomInput
					name="institution"
					inputProps={{
						placeholder: 'Instituição',
						value: values.institution
					}}
					formControlProps={{ fullWidth: true }}
					onChange={handleChange}
					error={formValidation.institution}
				/>
			</GridItem>
			<GridItem xs={12} sm={12} md={4}>
				<CustomInput
					name="situation"
					inputProps={{ placeholder: 'Situação', value: values.situation }}
					formControlProps={{ fullWidth: true }}
					onChange={handleChange}
					error={formValidation.situation}
				/>
			</GridItem>
			<GridItem xs={12} sm={12} md={4}>
				<SelectInput
					name="area_id"
					label="Área"
					options={area}
					onChange={handleChange}
				/>
			</GridItem>
			<GridItem xs={12} sm={12} md={4}>
				<SelectInput
					name="level_id"
					label="Nível"
					options={level}
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
}
Form.propTypes = {
	userId: PropTypes.number,
	successRoute: PropTypes.string
}
