/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/jsx-key */
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { makeStyles } from '@material-ui/core/styles'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
import React from 'react'
// react components for routing our app without refresh
//import { Link } from 'react-router-dom'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Logged } from '../Logged'
import styles from './style'



const useStyles = makeStyles(styles)

export default function HeaderLinks() {
	const classes = useStyles()
	return (
		<List className={classes.list + ' ' + classes.mlAuto}>
			<ListItem className={classes.listItem}>
				<AnchorLink href="#home" className={classes.dropdownLink}>
					Home
				</AnchorLink>
			</ListItem>

			<ListItem className={classes.listItem}>
				<AnchorLink href="#about" className={classes.dropdownLink}>
					Sobre
				</AnchorLink>
			</ListItem>

			<ListItem className={classes.listItem}>
				<AnchorLink href="#services" className={classes.dropdownLink}>
					Serviços
				</AnchorLink>
			</ListItem>

			<ListItem className={classes.listItem}>
				<AnchorLink href="#plans" className={classes.dropdownLink}>
					Planos
				</AnchorLink>
			</ListItem>

			<ListItem className={classes.listItem}>
				<AnchorLink href="#partners" className={classes.dropdownLink}>
					Parceiros
				</AnchorLink>
			</ListItem>

			<ListItem className={classes.listItem}>
				<AnchorLink href="#blog" className={classes.dropdownLink}>
					Blog
				</AnchorLink>
			</ListItem>

			<ListItem className={classes.listItem}>
				<AnchorLink href="#contact" className={classes.dropdownLink}>
					Contato
				</AnchorLink>
			</ListItem>

			<ListItem className={classes.listItem}>
				<Logged />
			</ListItem>
		</List>
	)
}

HeaderLinks.defaultProps = {
	hoverColor: 'primary'
}

HeaderLinks.propTypes = {
	dropdownHoverColor: PropTypes.oneOf([
		'dark',
		'primary',
		'info',
		'success',
		'warning',
		'danger',
		'rose'
	])
}
