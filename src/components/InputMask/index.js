import React, { useRef, useEffect, useState, useCallback } from 'react'
import ReactInputMask from 'react-input-mask'
import { FiAlertCircle } from 'react-icons/fi'
import { useField } from '@unform/core'



import { Container, Error } from './styles'

export default function InputMask (name,...rest) {
	const inputRef = useRef()

	const [ showChild, setShowChild ] = useState(false)
	const [ isFocused, setIsFocused ] = useState(false)
	const [ isFilled, setIsFilled ] = useState(false)

	const { fieldName, registerField, defaultValue, error } = useField(name);

	const handleInputBlur = useCallback(() => {
		setIsFocused(false)

		setIsFilled(!!inputRef.current?.value)
	}, [])

	const handleInputFocus = useCallback(() => {
		setIsFocused(true)

	}, [])

	useEffect(() => {
		setShowChild(true)

		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value',
			setValue(ref, value) {
				ref.setInputValue(value)
			},
			clearValue(ref) {
				ref.setInputValue('')
			}
		})
	}, [fieldName, registerField, showChild])

	return (
		<Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>

			{ showChild ? (
				<ReactInputMask
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				ref={inputRef}
				defaultValue={defaultValue}
				{...rest}
				/>
			): null

			}

			{error &&

			<Error title={error}>
				 <FiAlertCircle color="c53030" size={20} />
			</Error>

			}

		</Container>
	)

}

