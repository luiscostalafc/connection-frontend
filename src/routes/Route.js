import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getToken, getUserRole } from 'services/api'

export default function RouteWrapper({
	component: Component,
	isPrivate = false,
	...rest
}) {
	const signed = getToken()
	const role = getUserRole()
	const home = useMemo(() => {
		// console.log(user.role_id)
		if(!role) return '/'
		if(role === 'Admin') return '/admin/users'
		if(role === 'Candidato') return '/candidate/home'
		if(role === 'Empresa') return '/company/home'
	},[role])

	const userDomain = useMemo(() => {
		// console.log(user.role_id)
		if(!role) return '/'
		if(role === 'Admin') return 'admin'
		if(role === 'Candidato') return 'candidate'
		if(role === 'Empresa') return 'company'
	},[role])


	return (
		<Route
			{...rest}
			render={({ location, match}) => {
				if (isPrivate) {
					const domain = match.path.split('/')[1]
					if (domain !== userDomain) {
						return <Redirect
							to={{
								pathname: isPrivate ? '/' : home,
								state: { from: location }
							}}
						/>
					}
				}

				if (isPrivate !== !!signed) {
					return <Redirect
						to={{
							pathname: isPrivate ? '/' : home,
							state: { from: location }
						}}
					/>
				}
				return <Component />
			}}
		/>
	)
}

RouteWrapper.propTypes = {
	isPrivate: PropTypes.bool,
	typeUser: PropTypes.string,
	component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
}

RouteWrapper.defaultProps = {
	isPrivate: false,
}
