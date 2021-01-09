import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import React from 'react';
import InputMask from 'react-input-mask';
 
export function MaskInput(props) {
  const { mask, value, placeholder, label, id, name } = props

  return (
    <InputMask mask={mask} value={value} onChange={e => props.onChange(e)} maskChar={null}  >
      {(inputProps) => <Input 
        formControlProps={{ fullWidth: true }}
        id={id}
				name={name}
        inputProps={{
          placeholder,
          label
        }} {...inputProps} type="tel"/>}
    </InputMask>
  );
} 

MaskInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  mask: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
}
