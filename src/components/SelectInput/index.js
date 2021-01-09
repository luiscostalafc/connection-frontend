import { FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from "./style";

export default function SelectInput(props) {
  const { label, name, options, error, success, value} = props
  const useStyles = makeStyles(styles)
  const classes = useStyles()
  const optionsSelect = options || []
  const [simpleSelect, setSimpleSelect] = useState(value)
  const handleSimple = event => {
    setSimpleSelect(event.target.value)
	}

  return (
    <FormControl
      fullWidth className={classes.selectFormControl}>
      <InputLabel
        htmlFor="simple-select"
        className={classes.selectLabel}
      >
        { label ?? 'LABEL UNDEFINED'}
      </InputLabel>
      <Select
        MenuProps={{
          className: classes.selectMenu
        }}
        classes={{
          select: classes.select
        }}
        value={simpleSelect}
        onChange={event => {
          handleSimple(event)
          props.onChange(event)
        }}
        inputProps={{ name, error, success }}
      >
        <MenuItem
          disabled
          classes={{
            root: classes.selectMenuItem
          }}
        >
          {label} selecione:
        </MenuItem>
        {optionsSelect.length ? optionsSelect.map((option, index) => (
          <MenuItem
            classes={{
              root: classes.selectMenuItem,
              selected: classes.selectMenuItemSelected
            }}
            value={option.value ?? index}
            key={index}
          >
            {option.label}
          </MenuItem>
        ))
        :
          <MenuItem
            classes={{
              root: classes.selectMenuItem,
              selected: classes.selectMenuItemSelected
            }}
            disabled
          >
            OPTIONS UNDEFINED
          </MenuItem>
        }
      </Select>
    </FormControl>
  )
}

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.array,
  error: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.string,
		PropTypes.number
	]),
	success: PropTypes.bool,
  onChange: PropTypes.func
}