import { useState } from 'react'
import { ValidationError } from 'yup'

const useForm = (formState = {}) => {
	const [values, setValues] = useState(formState)
	const [loading, setLoading] = useState(false)

	const handleChange = event => {
		if (event?.target?.name) {
			const auxValues = { ...values }
			auxValues[event.target.name] = event.target.value
			// console.log(auxValues)
			setValues(auxValues)
		}
		return
	}

	const handleSubmit = callback => event => {
		event.preventDefault()
		setLoading(true)
		callback()
		setLoading(false)
	}

	const getValidationErrors = err => {
		const validationErrors = {}

		err.inner.forEach(error => {
			validationErrors[error.path] = error.message
		})

		return validationErrors
	}

	const validateForm = async (schema, data) => {
		try {
			await schema.validate(data, {
				abortEarly: false
			})
			return false
		} catch (error) {
			if (error instanceof ValidationError) {
				const errors = getValidationErrors(error)
				return errors
			}
		}
	}

	return [
		{ values, loading },
		setValues,
		handleChange,
		handleSubmit,
		validateForm
	]
}

export default useForm
