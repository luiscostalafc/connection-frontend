import DashboardIcon from '@material-ui/icons/Dashboard'
import ListIcon from '@material-ui/icons/List'

var dashRoutes = [
	{
		collapse: false,
		name: 'Home',
		icon: DashboardIcon,
		path: '/home',
		state: 'Home',
		layout: '/company'
	},
	{
		collapse: false,
		name: 'Minha Empresa',
		icon: DashboardIcon,
		path: '/my-company',
		state: 'my-company',
		layout: '/company'
	},
	{
		collapse: true,
		name: 'Vagas',
		icon: DashboardIcon,
		state: 'vacancies',
		views: [
			{
				path: '/vacancies/opened',
				name: 'abertas',
				mini: 'home',
				icon: ListIcon,
				layout: '/company'
			},
			{
				path: '/vacancies/closed',
				name: 'fechadas',
				mini: 'home',
				icon: ListIcon,
				layout: '/company'
			},
		]
	},
	{
		collapse: true,
		name: 'Triagem',
		icon: DashboardIcon,
		state: 'triagem',
		views: [
			{
				path: '/triagem/selected-cv',
				name: 'CV Selecionados',
				mini: 'home',
				icon: ListIcon,
				layout: '/company'
			},
			{
				path: '/triagem/in-contact',
				name: 'Em contato',
				mini: 'home',
				icon: ListIcon,
				layout: '/company'
			},
			{
				path: '/triagem/interview-rh',
				name: 'Entrevistas RH',
				mini: 'home',
				icon: ListIcon,
				layout: '/company'
			},
			{
				path: '/triagem/interview-ga',
				name: 'Entrevistas G.A',
				mini: 'home',
				icon: ListIcon,
				layout: '/company'
			},
			{
				path: '/triagem/tests',
				name: 'Testes',
				mini: 'home',
				icon: ListIcon,
				layout: '/company'
			},
		]
	},
	
]
export default dashRoutes
