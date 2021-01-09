/* eslint-disable react/jsx-no-target-blank */
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import Parallax from 'components/Parallax'
import SectionPlans from 'pages/HomeCompany/Sections/Plans'
import SectionServices from 'pages/HomeCompany/Sections/Services'
import SectionAbout from 'pages/HomeMain/Sections/About'
import SectionCarousel from 'pages/HomeMain/Sections/Carrousel'
import SectionContact from 'pages/HomeMain/Sections/Contact'
import SectionFooter from 'pages/HomeMain/Sections/Footer'
import SectionPartners from 'pages/HomeMain/Sections/Partners'
import style from 'pages/HomeMain/style'
import React from 'react'
import Header from '../../components/Header'
import HeaderLinksCompany from '../../components/Header/HeaderLinksCompany'

const useStyles = makeStyles(style)

export default function Home() {
	React.useEffect(() => {
		window.scrollTo(0, 0)
		document.body.scrollTop = 0
	})
	const classes = useStyles()
	return (
		<div>
			<Header
				brand="← voltar"
				links={<HeaderLinksCompany dropdownHoverColor="info" />}
				fixed
				color="transparent"
				changeColorOnScroll={{
					height: 400,
					color: 'info'
				}}
			/>
			<Parallax
				// image={require('assets/img/bg4.jpg')}
				className={classes.parallax}
			>
				<div className={classes.container}>
					<SectionCarousel />
				</div>
			</Parallax>
			<div className={classNames(classes.main, classes.mainRaised)}>
				<SectionAbout />
				<SectionServices />
				<SectionPlans />
				<SectionPartners />
			</div>
			<SectionContact />
			<SectionFooter />
		</div>
	)
}
