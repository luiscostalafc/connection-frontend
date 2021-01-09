import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Check from '@material-ui/icons/Check'
// @material-ui/icons
import Clear from '@material-ui/icons/Clear'
// nodejs library that concatenates classes
import classNames from 'classnames'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
import React from 'react'
// core components
import styles from './style'

const useStyles = makeStyles(styles)

export default function CustomInput(props) {
	const {
		formControlProps,
		labelText,
		id,
		name,
		labelProps,
		inputProps,
		error,
		white,
		inputRootCustomClasses,
		success
	} = props
	const classes = useStyles()
	const labelClasses = classNames({
		[' ' + classes.labelRootError]: error,
		[' ' + classes.labelRootSuccess]: success && !error
	})
	const underlineClasses = classNames({
		[classes.underlineError]: error,
		[classes.underlineSuccess]: success && !error,
		[classes.underline]: true,
		[classes.whiteUnderline]: white
	})
	const marginTop = classNames({
		[inputRootCustomClasses]: inputRootCustomClasses !== undefined
	})
	const inputClasses = classNames({
		[classes.input]: true,
		[classes.whiteInput]: white
	})
	var formControlClasses
	if (formControlProps !== undefined) {
		formControlClasses = classNames(
			formControlProps.className,
			classes.formControl
		)
	} else {
		formControlClasses = classes.formControl
	}
	let newInputProps = {
		maxLength: inputProps ? inputProps.maxLength : undefined,
		minLength: inputProps ? inputProps.minLength : undefined
	}
	return (
		<FormControl {...formControlProps} className={formControlClasses}>
			{labelText !== undefined ? (
				<InputLabel
					className={classes.labelRoot + ' ' + labelClasses}
					htmlFor={id}
					{...labelProps}
				>
					{labelText}
				</InputLabel>
			) : null}
			<Input
				classes={{
					input: inputClasses,
					root: marginTop,
					disabled: classes.disabled,
					underline: underlineClasses
				}}
				id={id}
				name={name}
				onChange={props.onChange}
				{...inputProps}
				inputProps={newInputProps}
			/>
			{error ? (
				<Clear className={classes.feedback + ' ' + classes.labelRootError} />
			) : success ? (
				<Check className={classes.feedback + ' ' + classes.labelRootSuccess} />
			) : null}
		</FormControl>
	)
}

CustomInput.propTypes = {
	labelText: PropTypes.node,
	labelProps: PropTypes.object,
	id: PropTypes.string,
	name: PropTypes.string,
	inputProps: PropTypes.object,
	formControlProps: PropTypes.object,
	inputRootCustomClasses: PropTypes.string,
	error: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.string,
		PropTypes.number
	]),
	success: PropTypes.bool,
	white: PropTypes.bool,
	onChange: PropTypes.func
}
