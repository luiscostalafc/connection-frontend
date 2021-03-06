import React from 'react'
import { Router } from 'react-router-dom'

import 'config/ReactotronConfig'

import Routes from './routes'
import { history } from './services/history'


import 'assets/scss/material-kit-pro-react.scss?v=1.9.0'

function App() {
	return (
		<Router history={history}>
			<Routes />
		</Router>
	)
}

export default App
