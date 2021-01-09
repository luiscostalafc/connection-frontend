/* eslint-disable react/jsx-no-target-blank */
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
// nodejs library that concatenates classes
import classNames from 'classnames'
import Parallax from 'components/Parallax'
import SectionCarrer from 'pages/HomeCandidate/Sections/Carrer'
import SectionAbout from 'pages/HomeMain/Sections/About'
// sections for this page
import SectionCarousel from 'pages/HomeMain/Sections/Carrousel'
import SectionContact from 'pages/HomeMain/Sections/Contact'
import SectionFooter from 'pages/HomeMain/Sections/Footer'
import SectionPartners from 'pages/HomeMain/Sections/Partners'
import style from 'pages/HomeMain/style'
import React from 'react'
// core components
import Header from '../../components/Header'
import HeaderLinksCandidate from '../../components/Header/HeaderLinksCandidate'
import SectionVacancy from './Sections/Vacancy'

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
				links={<HeaderLinksCandidate dropdownHoverColor="info" />}
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
				<SectionVacancy />
				<SectionCarrer />
				<SectionPartners />
			</div>
			<SectionContact />
			<SectionFooter />
		</div>
	)
}
