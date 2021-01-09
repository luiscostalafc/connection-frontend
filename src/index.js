import React from 'react'
import ReactDOM from 'react-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { store, persistor } from './store'

//import 'assets/scss/material-kit-pro-react.scss?v=1.9.0'
ReactDOM.render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<BrowserRouter>
				<App />
				<ToastContainer autoClose={3000} />
			</BrowserRouter>
		</PersistGate>
	</Provider>
	, document.getElementById('root')
)
