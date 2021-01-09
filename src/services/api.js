import PrettyLog from '@emersonbraun/pretty-log'
import axios from 'axios'
import { transations } from '../config/transations'


const completeURL = URL => {
	const cleanURL = URL.charAt(0) === '/' ? URL.slice(1, URL.length) : URL
	return `${process.env.REACT_APP_API_URL}/${cleanURL}`
}

const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
	Authorization: null
}

export const getToken = () => {
	const token = window.sessionStorage.getItem('token')
	return token && token !== 'null'  ? `Bearer ${String(token)}` : false
}

export const getUser = () => {
	let user = window.sessionStorage.getItem('user')
	user = JSON.parse(user)
	return user && user !== 'null'  ? user : false
}

export const getUserId = () => {
	const user = getUser()
	return user && user !== 'null'  ? user.id : false
}

export const getCompanyId = () => {
	const user = getUser()
	return user && user !== 'null'  ? user.company_id : false
}

export const getUserRole = () => {
	const role = window.sessionStorage.getItem('role')
	return role && role !== 'null'  ? role : false
}

export const setSession = ({token, user}) => {
	if (token && token !== 'null') window.sessionStorage.setItem('token', token)
	if (user && user !== 'null') window.sessionStorage.setItem('user', JSON.stringify(user))
	if (user && user !== 'null' && user.roles && user.roles.role) {
		const { role } = user.roles
		window.sessionStorage.setItem('role', role)
	}
	return false
}

export const loggout = () => {
	window.sessionStorage.setItem('token', null)
	window.sessionStorage.setItem('user', null)
	window.sessionStorage.setItem('role', null)
	return false

}

function setHeaders(file = false) {
	headers['Content-Type'] = file ? 'multipart/form-data' : 'application/json'
	headers.Authorization = getToken()
	return headers
}

function redirectIfNotLogged(response) {
	if (!response || response.status === 403) window.location.replace('/login')
	return true
}

const getReturnType = status =>
	status >= 200 && status < 300 ? 'success' : 'error'

const getMessage = (method, type) => transations[method][type]

function logResponse(response) {
	const mainData = getMainDataOfResponse(response)
	PrettyLog.success(`Response ${mainData.path}:`)
	console.table(mainData)
}

function getMainDataOfResponse(response, complete = false) {
	const returnType = getReturnType(response.status)
	const method = response.config.method
	const mainData = {
		method,
		path: response.config.url,
		status: response.status,
		returnType,
		error: response.headers.contenterror,
		message: getMessage(method, returnType),
		'data (count)': response.data.length || 0,
	}
	if (complete) mainData.data = response.data
	return mainData
}

function setResponse(response, { complete = false, debug = false }) {
	redirectIfNotLogged(response)
	if (debug) logResponse(response)
	delete response.headers.Authorization // remove token of response

	if (complete) return getMainDataOfResponse(response, complete)
	return response.data
}

export async function get(URL, { complete = false, debug = false } = {}) {
	const headers = setHeaders()
	if (debug) console.time('⌚️ time to get request')
	try {
		const response = await axios.get(completeURL(URL), { headers })
		if (debug) console.timeEnd('⌚️ time to get request')
		return setResponse(response, { complete, debug })
	} catch (e) {
		if (debug) console.timeEnd('⌚️ time to get request')
		PrettyLog.error(`Error to get ${URL}`, e)
		return setResponse(e.response, { complete, debug })
	}
}

export async function post(
	URL,
	data,
	{ file = false, complete = false, debug = false } = {}
) {
	const headers = setHeaders(file ?? false)
	if (debug) console.time('⌚️ time to post request')
	try {
		const response = await axios.post(completeURL(URL), data, { headers })
		if (debug) console.timeEnd('⌚️ time to post request')
		return setResponse(response, { complete, debug })
	} catch (e) {
		if (debug) console.timeEnd('⌚️ time to post request')
		PrettyLog.error(`Error to post ${URL}`, e)
		return setResponse(e.response, { complete, debug })
	}
}

export async function put(URL, data, { complete = false, debug = false } = {}) {
	const headers = setHeaders()
	if (debug) console.time('⌚️ time to put request')
	try {
		const response = await axios.put(completeURL(URL), data, { headers })
		if (debug) console.timeEnd('⌚️ time to put request')
		return setResponse(response, { complete, debug })
	} catch (e) {
		if (debug) console.timeEnd('⌚️ time to put request')
		PrettyLog.error(`Error to put ${URL}`, e)
		return setResponse(e.response, { complete, debug })
	}
}

export async function deleteData(
	URL,
	{ complete = false, debug = false } = {}
) {
	const headers = setHeaders()
	if (debug) console.time('⌚️ time to delete request')
	try {
		const response = await axios.delete(completeURL(URL), { headers })
		if (debug) console.timeEnd('⌚️ time to delete request')
		return setResponse(response, { complete, debug })
	} catch (e) {
		if (debug) console.timeEnd('⌚️ time to delete request')
		PrettyLog.error(`Error to delete ${URL}`, e)
		return setResponse(e.response, { complete, debug })
	}
}

/* ------ original ------*/
const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
})

export default api
