import React from 'react'
import PropTypes from 'prop-types'
import { useTransition } from 'react-spring'

import Toast from './Toast'

// import { ToastMessage } from '../../hooks/toast'
//import { Container } from './style'

const ToastContainer = ({ messages }) => {
	const messagesWithTransition = useTransition(
		messages,
		message => message.id,
		{
			from: { right: '-120%', opacity: 0 },
			enter: { right: '0%', opacity: 1 },
			leave: { right: '-120%', opacity: 0 }
		}
	)

	return (
		<div>
			{messagesWithTransition.map(({ item, key, props }) => (
				<Toast key={key} style={props} message={item} />
			))}
		</div>
	)
}

ToastContainer.propTypes = {
	messages: PropTypes.object
}

export default ToastContainer
