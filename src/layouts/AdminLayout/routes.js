import AddIcon from '@material-ui/icons/Add'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ListIcon from '@material-ui/icons/List'

var dashRoutes = [
	{
		collapse: true,
		name: 'Endereços',
		icon: DashboardIcon,
		state: 'Address',
		views: [
			{
				path: '/addresses',
				name: 'Endereços',
				mini: 'lista',
				icon: ListIcon,
				layout: '/admin'
			},
			{
				path: '/addresses/create',
				name: 'Endereços criar',
				mini: 'criar',
				icon: AddIcon,
				layout: '/admin'
			}
		]
	},
	{
		collapse: true,
		name: 'Aplicações',
		icon: DashboardIcon,
		state: 'Applications',
		views: [
			{
				path: '/applications',
				name: 'Aplicações lista',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Admin/Applications'),
				layout: '/admin'
			},
			{
				path: '/applications/create',
				name: 'Aplicações criar',
				mini: 'criar',
				icon: AddIcon,
				component: require('pages/Admin/Applications'),
				layout: '/admin'
			}
		]
	},
	{
		collapse: true,
		name: 'Status Aplicações',
		icon: DashboardIcon,
		state: 'ApplicationStatuses',
		views: [
			{
				path: '/application-status',
				name: 'Status Aplicações lista',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Admin/ApplicationStatuses'),
				layout: '/admin'
			},
			{
				path: '/application-status/create',
				name: 'Status Aplicações criar',
				mini: 'criar',
				icon: AddIcon,
				component: require('pages/Admin/ApplicationStatuses'),
				layout: '/admin'
			}
		]
	},
	{
		collapse: true,
		name: 'Áreas',
		icon: DashboardIcon,
		state: 'Areas',
		views: [
			{
				path: '/areas',
				name: 'Áreas lista',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Admin/Areas'),
				layout: '/admin'
			},
			{
				path: '/areas/create',
				name: 'Áreas criar',
				mini: 'criar',
				icon: AddIcon,
				component: require('pages/Admin/Areas'),
				layout: '/admin'
			}
		]
	},
	{
		collapse: true,
		name: 'Companhias',
		icon: DashboardIcon,
		state: 'Companies',
		views: [
			{
				path: '/companies',
				name: 'Companhias lista',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Admin/Companies'),
				layout: '/admin'
			},
			{
				path: '/companies/create',
				name: 'Companhias criar',
				mini: 'criar',
				icon: AddIcon,
				component: require('pages/Admin/Companies'),
				layout: '/admin'
			}
		]
	},
	{
		collapse: true,
		name: 'Tipos de contato',
		icon: DashboardIcon,
		state: 'ContractTypes',
		views: [
			{
				path: '/contract-types',
				name: 'Tipos de contato lista',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Admin/ContractTypes'),
				layout: '/admin'
			},
			{
				path: '/contract-types/create',
				name: 'Tipos de contato criar',
				mini: 'criar',
				icon: AddIcon,
				component: require('pages/Admin/ContractTypes'),
				layout: '/admin'
			}
		]
	},
	{
		collapse: true,
		name: 'Cursos',
		icon: DashboardIcon,
		state: 'Courses',
		views: [
			{
				path: '/courses',
				name: 'Cursos lista',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Admin/Courses'),
				layout: '/admin'
			},
			{
				path: '/courses/create',
				name: 'Cursos criar',
				mini: 'criar',
				icon: AddIcon,
				component: require('pages/Admin/Courses'),
				layout: '/admin'
			}
		]
	},
	{
		collapse: true,
		name: 'Faculdades',
		icon: DashboardIcon,
		state: 'Institutions',
		views: [
			{
				path: '/institutions',
				name: 'Cursos lista',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Admin/Institutions'),
				layout: '/admin'
			},
			{
				path: '/institutions/create',
				name: 'Cursos criar',
				mini: 'criar',
				icon: AddIcon,
				component: require('pages/Admin/Institutions'),
				layout: '/admin'
			}
		]
	},
	{
		collapse: true,
		name: 'Cursos (lista)',
		icon: DashboardIcon,
		state: 'courses_db',
		views: [
			{
				path: '/courses_db',
				name: 'Cursos lista',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Admin/CoursesDB'),
				layout: '/admin'
			},
			{
				path: '/courses_db/create',
				name: 'Cursos criar',
				mini: 'criar',
				icon: AddIcon,
				component: require('pages/Admin/CoursesDB'),
				layout: '/admin'
			}
		]
	},
	{
		collapse: true,
		name: 'Planos avulsos',
		icon: DashboardIcon,
		state: 'DetachedPlans',
		views: [
			{
				path: '/detached-plans',
				name: 'Planos avulsos lista',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Admin/DetachedPlans'),
				layout: '/admin'
			},
			{
				path: '/detached-plans/create',
				name: 'Planos avulsos criar',
				mini: 'criar',
				icon: AddIcon,
				component: require('pages/Admin/DetachedPlans'),
				layout: '/admin'
			}
		]
	},
	{
		collapse: true,
		name: 'Interesses',
		icon: DashboardIcon,
		state: 'Interests',
		views: [
			{
				path: '/interests',
				name: 'Interesses lista',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Admin/Interests'),
				layout: '/admin'
			},
			{
				path: '/interests/create',
				name: 'Interesses criar',
				mini: 'criar',
				icon: AddIcon,
				component: require('pages/Admin/Interests'),
				layout: '/admin'
			}
		]
	},
	{
		collapse: true,
		name: 'Níveis',
		icon: DashboardIcon,
		state: 'Levels',
		views: [
			{
				path: '/levels',
				name: 'Níveis lista',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Admin/Levels'),
				layout: '/admin'
			},
			{
				path: '/levels/create',
				name: 'Níveis criar',
				mini: 'criar',
				icon: AddIcon,
				component: require('pages/Admin/Levels'),
				layout: '/admin'
			}
		]
	},
	{
		collapse: true,
		name: 'Meetings',
		icon: DashboardIcon,
		state: 'Meetings',
		views: [
			{
				path: '/meetings',
				name: 'Meetings lista',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Admin/Meetings'),
				layout: '/admin'
			},
			{
				path: '/meetings/create',
				name: 'Meetings criar',
				mini: 'criar',
				icon: AddIcon,
				component: require('pages/Admin/Meetings'),
				layout: '/admin'
			}
		]
	},
	{
		collapse: true,
		name: 'Pagamentos',
		icon: DashboardIcon,
		state: 'Payments',
		views: [
			{
				path: '/payments',
				name: 'Pagamentos lista',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Admin/Payments'),
				layout: '/admin'
			},
			{
				path: '/payments/create',
				name: 'Pagamentos criar',
				mini: 'criar',
				icon: AddIcon,
				component: require('pages/Admin/Payments'),
				layout: '/admin'
			}
		]
	},
	// {
	// 	collapse: true,
	// 	name: 'Permissions',
	// 	icon: DashboardIcon,
	// 	state: 'Permissions',
	// 	views: [
	// 		{
	// 			path: '/permissions',
	// 			name: 'Permissions lista',
	// 			mini: 'lista',
	// 			icon: ListIcon,
	// 			component: require('pages/Admin/Permissions'),
	// 			layout: '/admin'
	// 		},
	// 		{
	// 			path: '/permissions/create',
	// 			name: 'Permissions criar',
	// 			mini: 'criar',
	// 			icon: AddIcon,
	// 			component: require('pages/Admin/Permissions'),
	// 			layout: '/admin'
	// 		}
	// 	]
	// },
	{
		collapse: true,
		name: 'Plans',
		icon: DashboardIcon,
		state: 'Planos',
		views: [
			{
				path: '/plans',
				name: 'Planos lista',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Admin/Plans'),
				layout: '/admin'
			},
			{
				path: '/plans/create',
				name: 'Planos criar',
				mini: 'criar',
				icon: AddIcon,
				component: require('pages/Admin/Plans'),
				layout: '/admin'
			}
		]
	},
	{
		collapse: true,
		name: 'Portfolios',
		icon: DashboardIcon,
		state: 'Portfólios',
		views: [
			{
				path: '/portfolio',
				name: 'Portfólios lista',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Admin/Portfolios'),
				layout: '/admin'
			},
			{
				path: '/portfolio/create',
				name: 'Portfólios criar',
				mini: 'criar',
				icon: AddIcon,
				component: require('pages/Admin/Portfolios'),
				layout: '/admin'
			}
		]
	},
	{
		collapse: true,
		name: 'Posts',
		icon: DashboardIcon,
		state: 'Posts',
		views: [
			{
				path: '/posts',
				name: 'Posts lista',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Admin/Posts'),
				layout: '/admin'
			},
			{
				path: '/posts/create',
				name: 'Posts criar',
				mini: 'criar',
				icon: AddIcon,
				component: require('pages/Admin/Posts'),
				layout: '/admin'
			}
		]
	},
	{
		collapse: true,
		name: 'Post categorias',
		icon: DashboardIcon,
		state: 'PostCategories',
		views: [
			{
				path: '/post-categories',
				name: 'Post categorias lista',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Admin/PostCategories'),
				layout: '/admin'
			},
			{
				path: '/post-categories/create',
				name: 'Post categorias criar',
				mini: 'criar',
				icon: AddIcon,
				component: require('pages/Admin/PostCategories'),
				layout: '/admin'
			}
		]
	},
	{
		collapse: true,
		name: 'Candidatos solicitados',
		icon: DashboardIcon,
		state: 'PurchasedCandidates',
		views: [
			{
				path: '/purchased-candidates',
				name: 'Candidatos solicitados lista',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Admin/PurchasedCandidates'),
				layout: '/admin'
			},
			{
				path: '/purchased-candidates/create',
				name: 'Candidatos solicitados criar',
				mini: 'criar',
				icon: AddIcon,
				component: require('pages/Admin/PurchasedCandidates'),
				layout: '/admin'
			}
		]
	},
	{
		collapse: true,
		name: 'Requisições solicitadas',
		icon: DashboardIcon,
		state: 'PurchasedRequests',
		views: [
			{
				path: '/purchased-requests',
				name: 'Requisições solicitadas lista',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Admin/PurchasedRequests'),
				layout: '/admin'
			},
			{
				path: '/purchased-requests/create',
				name: 'Requisições solicitadas criar',
				mini: 'criar',
				icon: AddIcon,
				component: require('pages/Admin/PurchasedRequests'),
				layout: '/admin'
			}
		]
	},
	{
		collapse: true,
		name: 'Recomendações',
		icon: DashboardIcon,
		state: 'Recomends',
		views: [
			{
				path: '/recomends',
				name: 'Recomendações lista',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Admin/Recomends'),
				layout: '/admin'
			},
			{
				path: '/recomends/create',
				name: 'Recomendações criar',
				mini: 'criar',
				icon: AddIcon,
				component: require('pages/Admin/Recomends'),
				layout: '/admin'
			}
		]
	},
	{
		collapse: true,
		name: 'Status requisições',
		icon: DashboardIcon,
		state: 'RequestStatuses',
		views: [
			{
				path: '/request-statuses',
				name: 'Status requisições lista',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Admin/RequestStatuses'),
				layout: '/admin'
			},
			{
				path: '/request-statuses/create',
				name: 'Status requisições criar',
				mini: 'criar',
				icon: AddIcon,
				component: require('pages/Admin/RequestStatuses'),
				layout: '/admin'
			}
		]
	},
	{
		collapse: true,
		name: 'Papéis',
		icon: DashboardIcon,
		state: 'Roles',
		views: [
			{
				path: '/roles',
				name: 'Papéis lista',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Admin/Roles'),
				layout: '/admin'
			},
			{
				path: '/roles/create',
				name: 'Papéis criar',
				mini: 'criar',
				icon: AddIcon,
				component: require('pages/Admin/Roles'),
				layout: '/admin'
			}
		]
	},
	{
		collapse: true,
		name: 'Habilidades',
		icon: DashboardIcon,
		state: 'Skills',
		views: [
			{
				path: '/skills',
				name: 'Habilidades lista',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Admin/Skills'),
				layout: '/admin'
			},
			{
				path: '/skills/create',
				name: 'Habilidades criar',
				mini: 'criar',
				icon: AddIcon,
				component: require('pages/Admin/Skills'),
				layout: '/admin'
			}
		]
	},
	{
		collapse: true,
		name: 'Pontos fortes',
		icon: DashboardIcon,
		state: 'StrongPoints',
		views: [
			{
				path: '/strong-points',
				name: 'Pontos fortes lista',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Admin/StrongPoints'),
				layout: '/admin'
			},
			{
				path: '/strong-points/create',
				name: 'Pontos fortes criar',
				mini: 'criar',
				icon: AddIcon,
				component: require('pages/Admin/StrongPoints'),
				layout: '/admin'
			}
		]
	},
	{
		collapse: true,
		name: 'Usuários',
		icon: DashboardIcon,
		state: 'Users',
		views: [
			{
				path: '/users',
				name: 'Usuários lista',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Admin/Users'),
				layout: '/admin'
			},
			{
				path: '/users/create',
				name: 'Usuários criar',
				mini: 'criar',
				icon: AddIcon,
				component: require('pages/Admin/Users'),
				layout: '/admin'
			}
		]
	},
	{
		collapse: true,
		name: 'Vagas',
		icon: DashboardIcon,
		state: 'Vacancies',
		views: [
			{
				path: '/vacancies',
				name: 'Vagas lista',
				mini: 'lista',
				icon: ListIcon,
				component: require('pages/Admin/Vacancies'),
				layout: '/admin'
			},
			{
				path: '/vacancies/create',
				name: 'Vagas criar',
				mini: 'criar',
				icon: AddIcon,
				component: require('pages/Admin/Vacancies'),
				layout: '/admin'
			}
		]
	}
]
export default dashRoutes
