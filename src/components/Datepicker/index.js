import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const style = {
  label: {
    color: "rgba(0, 0, 0, 0.26)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "14px",
    transition: "0.3s ease all",
    lineHeight: "1.428571429",
    fontWeight: "400",
    paddingLeft: "0"
  }
};

const useStyles = makeStyles(style);

export default function DatePicker(props) {
  const classes = useStyles();
  const { id, label, placeholder, name, value, error, success} = props
  const [date, setDate] = useState(value)

  const handleSimple = event => {
    setDate(event.target.value)
  }
  
  return (
    <TextField
    placeholder={placeholder}
    value={date}
    id={id}
    name={name}
    label={label}
    type="date"
    defaultValue="2017-05-24"
    className={classes.textField}
    error={error}
    success={success}
    InputLabelProps={{
      shrink: true,
    }}
    onChange={event => {
      handleSimple(event)
      props.onChange(event)
    }}
  />
    // <div>
    //   <InputLabel className={classes.label}>
    //     {label}
    //   </InputLabel>
    //   <br />
    //   <FormControl fullWidth>
    //     <Datetime
    //       // timeFormat={timeFormat ?? false}
    //       // dateFormat={dateFormat ?? false}
    //       inputProps={{ placeholder, id, name, value }}
    //       error={error}
    //       success={success}
    //       onChange={props.onChange}
    //     />
    //   </FormControl>
    // </div>
  );
}

DatePicker.propTypes = {
	label: PropTypes.node,
	id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  timeFormat: PropTypes.string,
  dateFormat: PropTypes.string,
	error: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.string,
		PropTypes.number
	]),
	success: PropTypes.bool,
	onChange: PropTypes.func
}

