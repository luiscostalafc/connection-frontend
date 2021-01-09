import DashboardIcon from '@material-ui/icons/Dashboard'
import ListIcon from '@material-ui/icons/List'

var dashRoutes = [
	{
		collapse: false,
		name: 'Home',
		icon: DashboardIcon,
		path: '/home',
		state: 'Home',
		layout: '/candidate'
	},
	{
		collapse: false,
		name: 'Meu Currículo',
		icon: DashboardIcon,
		path: '/my-cv',
		state: 'myCV',
		layout: '/candidate'
	},
	{
		collapse: false,
		name: 'Vagas',
		icon: DashboardIcon,
		path: '/vacancies',
		state: 'vacancies',
		layout: '/candidate'
	},
	{
		collapse: false,
		name: 'Portfólio',
		icon: DashboardIcon,
		path: '/portfolios',
		state: 'portfolios',
		layout: '/candidate'
	},
	{
		collapse: true,
		name: 'Triagem',
		icon: DashboardIcon,
		state: 'applications',
		views: [
			{
				path: '/triagem/aplications',
				name: 'Minhas Candidaturas',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Candidate/Triagem/Applications'),
				layout: '/candidate'
			},
			{
				path: '/triagem/selected',
				name: 'Selecionado',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Candidate/Triagem/Applications'),
				layout: '/candidate'
			},
			{
				path: '/triagem/meetings',
				name: 'Minhas entrevistas',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Candidate/Triagem/Meetings'),
				layout: '/candidate'
			},
		]
	},
]
export default dashRoutes
