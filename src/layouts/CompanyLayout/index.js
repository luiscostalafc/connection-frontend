import { makeStyles } from '@material-ui/core/styles'
import { ExitToApp } from '@material-ui/icons'
import cx from 'classnames'
import AdminSidebar from 'components/AdminSidebar'
import Footer from 'components/Footer'
import AdminNavbar from 'components/Navbars/AdminNavbar'
import ImageUpload from 'components/CustomUpload/ImageUpload'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import PropTypes from 'prop-types'
import React from 'react'
import { Link, Switch } from 'react-router-dom'
import CustomButtons from '../../components/CustomButtons'
//import { APP_NAME } from '../../config/app'
import { loggout } from '../../services/api'
import routes from './routes'
import styles from './style'

var ps



const useStyles = makeStyles(styles)

function CompanyLayout({ container }, props) {


	const { ...rest } = props
	// states and functions
	const [mobileOpen, setMobileOpen] = React.useState(false)
	const [miniActive, setMiniActive] = React.useState(false)
	//const image = require('assets/img/sidebar-2.jpg')
	const color = 'black'
	const bgColor = 'black'
	// const [hasImage, setHasImage] = React.useState(true);
	// const logo = require('assets/img/logo-white.svg')
	//const logo = require('assets/img/rhconnection/logo.png')
	// styles
	const classes = useStyles()
	const mainPanelClasses =
		classes.mainPanel +
		' ' +
		cx({
			[classes.mainPanelSidebarMini]: miniActive,
			[classes.mainPanelWithPerfectScrollbar]:
				navigator.platform.indexOf('Win') > -1
		})
	// ref for main panel div
	const mainPanel = React.createRef()
	// effect instead of componentDidMount, componentDidUpdate and componentWillUnmount
	React.useEffect(() => {
		if (navigator.platform.indexOf('Win') > -1) {
			ps = new PerfectScrollbar(mainPanel.current, {
				suppressScrollX: true,
				suppressScrollY: false
			})
			document.body.style.overflow = 'hidden'
		}
		window.addEventListener('resize', resizeFunction)

		// Specify how to clean up after this effect:
		return function cleanup() {
			if (navigator.platform.indexOf('Win') > -1) {
				ps.destroy()
			}
			window.removeEventListener('resize', resizeFunction)
		}
	})
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen)
	}
	// const getRoute = () => {
	// 	return window.location.pathname !== '/Company/full-screen-maps'
	// }
	const getActiveRoute = routes => {
		let activeRoute = 'Perfil da Empresa '
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse) {
				let collapseActiveRoute = getActiveRoute(routes[i].views)
				if (collapseActiveRoute !== activeRoute) {
					return collapseActiveRoute
				}
			} else {
				if (
					window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
				) {
					return routes[i].name
				}
			}
		}
		return activeRoute
	}
	const getRoutes = routes => {
		return routes.map(prop => {
			if (prop.collapse) {
				return getRoutes(prop.views)
			}
			return null
		})
	}
	const sidebarMinimize = () => {
		setMiniActive(!miniActive)
	}
	const resizeFunction = () => {
		if (window.innerWidth >= 960) {
			setMobileOpen(false)
		}
	}

	return (
		<div className={classes.wrapper}>
			<AdminSidebar
				routes={routes}
				logoText={<ImageUpload/>}
				handleDrawerToggle={handleDrawerToggle}
				open={mobileOpen}
				color={color}
				bgColor={bgColor}
				miniActive={miniActive}
				{...rest}
			/>

			<div className={mainPanelClasses} ref={mainPanel}>

				<AdminNavbar
					sidebarMinimize={sidebarMinimize.bind(this)}
					miniActive={miniActive}
					brandText={getActiveRoute(routes)}
					handleDrawerToggle={handleDrawerToggle}
					{...rest}
				/>

				<div className={classes.map}>

					<Switch>{getRoutes(routes)}</Switch>

				</div>
				<Footer content={<>
				<Link to="/">
				<CustomButtons onClick={(()=>{loggout()})} color="rose" round>
					<ExitToApp />
					 Sair
					 </CustomButtons>
					 </Link>
					 </>} fluid />
				<div className={classes.container}>{container}</div>
			</div>
		</div>
	)
}

CompanyLayout.propTypes = {
	container: PropTypes.element
}

export default CompanyLayout
