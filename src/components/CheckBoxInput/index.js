import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core'

import { Label } from './styles'

export default function CheckBoxInput ({ name, options, ...rest }) {
	const inputRefs = useRef()
	const { filedName, registerField, defaultValue = [] } = useField(name)

	useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs) => {
        return refs.filter(ref => ref.checked).map(ref => ref.value);
      },
      clearValue: (refs) => {
        refs.forEach(ref => {
          ref.checked = false;
        });
      },
      setValue: (refs, values) => {
        refs.forEach(ref => {
          if (values.includes(ref.id)) {
            ref.checked = true;
          }
        });
      },
    });
  }, [defaultValue, fieldName, registerField]);

	return (
		<>
    {options.map(option => (
			<Label htmlFor={option.id} key={option.id}>
				<input
				defaultChecked={defaultValue.includes(optio.id)}
				ref={ref => inputRefs.current.push(ref)}
				value={option.value}
				type="checkbox"
				id={option.id}
				{...rest}
       />
			 {option.label}
			</Label>
		))}

		</>
	)
}
