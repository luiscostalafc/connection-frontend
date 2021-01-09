import FormControlLabel from "@material-ui/core/FormControlLabel"
import { makeStyles } from "@material-ui/core/styles"
import Switch from "@material-ui/core/Switch"
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import stylesSwitchBoxRadio from "./style"

export function ToogleInput (props) {
  const { label, name, checked, error, success} = props
  const [checkedInput, setChecked] = useState(checked ?? false)
  const useStylesSwitchBoxRadio = makeStyles(stylesSwitchBoxRadio)
  const classesSwitchBoxRadio = useStylesSwitchBoxRadio()

  return (
    <FormControlLabel
      control={
        <Switch
          name={name}
          checked={checkedInput}
          onChange={
            event => {
              setChecked(event.target.checked)
              props.onChange(event)
            }
          }
          value={checkedInput}
          classes={{
            switchBase: classesSwitchBoxRadio.switchBase,
            checked: classesSwitchBoxRadio.switchChecked,
            thumb: classesSwitchBoxRadio.switchIcon,
            track: classesSwitchBoxRadio.switchBar
          }}
          inputProps={{ error, success }}
        />
      }
      classes={{
        label: classesSwitchBoxRadio.label
      }}
      label={ label ?? 'LABEL UNDEFINED'}
    />
  )
}

ToogleInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  error: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.string,
		PropTypes.number
	]),
	success: PropTypes.bool,
  onChange: PropTypes.func
}