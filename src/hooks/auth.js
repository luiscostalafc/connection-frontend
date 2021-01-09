import React, { createContext, useCallback, useState, useContext } from 'react'
import api from '../libs/api'

const AuthContext = createContext

const AuthProvider = ({ children }) => {
	const [data, setData] = useState(() => {
		const token = localStorage.getItem('@RhConnection:token')
		const user = localStorage.getItem('@RhConnection:user')

		if (token && user) {
			return { token, user: JSON.parse(user) }
		}
	})

	const signIn = useCallback(async ({ email, password }) => {
		const response = await api.post('login', {
			email,
			password
		})

		const { token, user } = response.data

		localStorage.setItem('@RhConnection:token, token')
		localStorage.setItem('@RhConnection:user', JSON.stringify(user))

		setData({ token, user })
	}, [])

	return (
		<AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	)
}

function useAuth() {
	const context = useContext(AuthContext)

	if (!context) {
		throw new Error('userAuth must be used within an AuthProvider')
	}

	return context
}

export { AuthProvider, useAuth }
