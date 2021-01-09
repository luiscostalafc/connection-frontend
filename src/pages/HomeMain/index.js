/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
// core components
import Header from '../../components/Header'
import HeaderLinksMain from '../../components/Header/HeaderLinksMain'
import Parallax from 'components/Parallax'
// sections for this page
import SectionAbout from 'pages/HomeMain/Sections/About'
import SectionCarousel from 'pages/HomeMain/Sections/Carrousel'
import SectionPartners from 'pages/HomeMain/Sections/Partners'
import SectionContact from 'pages/HomeMain/Sections/Contact'
import SectionFooter from 'pages/HomeMain/Sections/Footer'


import style from './style'

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
				links={<HeaderLinksMain hoverColor="warning" dropdownHoverColor="info" />}
				fixed
				color="transparent"
				changeColorOnScroll={{
					height: 400,
					color: 'rose',

				}}
			/>
			<Parallax
				className={classes.parallax}
			>
				<div className={classes.container}>
					<SectionCarousel />
				</div>
			</Parallax>
			<div className={classNames(classes.main, classes.mainRaised)}>
				<SectionAbout />
				<SectionPartners />
			</div>
			<SectionContact />
			<SectionFooter />
		</div>
	)
}
