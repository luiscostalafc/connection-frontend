/* eslint-disable react/jsx-no-target-blank */
// @material-ui/core components
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CustomButtons from 'components/CustomButtons'
import Footer from 'components/Footer'
import style from './style'
import AnchorLink from 'react-anchor-link-smooth-scroll'
//import Button from 'components/CustomButtons'

const logo2 = require('assets/img/rhconnection/logo2.png')

const useStyles = makeStyles(style)

export default function SectionContact() {
	const classes = useStyles()
	const socials = [
		{
			link: 'https://www.facebook.com/connection.startup/',
			color: 'facebook',
			icon: 'fab fa-facebook'
		},
		{
			link: 'https://www.instagram.com/connectionrh/',
			color: 'linkedin',
			icon: 'fab fa-instagram'
		},
		{ link: 'https://twitter.com/ConnectionRH1', color: 'twitter', icon: 'fab fa-twitter' },
		{ link: 'https://www.linkedin.com/in/connection-rh-b7b7b918a/', color: 'linkedin', icon: 'fab fa-linkedin' }
	]
	return (
		<Footer
			theme="white"
			content={
				<div>
					<div className={classes.left}>
					<AnchorLink href="#home" className={classes.dropdownLink}>
					<img width={130} height={50} src={logo2} alt="Connectionrh"/>
				</AnchorLink>

					</div>
					<div className={classes.rightLinks}>
						<ul>
							{socials.map((social, index) => (
								<li key={index}>
									<CustomButtons
										href={social.link}
										target="_blank"
										color={social.color}
										justIcon
										simple
									>
										<i className={social.icon} />
									</CustomButtons>
								</li>
							))}
						</ul>
					</div>
				</div>
			}
		/>
	)
}
