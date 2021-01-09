// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
// images
import Brado from 'assets/img/rhconnection/partners/brado_logistica.jpg'
import Copacol from 'assets/img/rhconnection/partners/copacol.jpeg'
import FazRH from 'assets/img/rhconnection/partners/faz-rh.jpeg'
import OnTheRoad from 'assets/img/rhconnection/partners/ontheroad.jpeg'
// nodejs library that concatenates classes
import classNames from 'classnames'
import React from 'react'
// core components
import GridContainer from '../../../../components/Grid/GridContainer'
import GridItem from '../../../../components/Grid/GridItem'
import style from './style'

const useStyles = makeStyles(style)

export default function SectionPartners() {
	const classes = useStyles()
	const clients = [
		{ img: Brado, alt: 'brado' },
		{ img: OnTheRoad, alt: 'on-the-road' },
		{ img: FazRH, alt: 'faz-rh' },
		{ img: Copacol, alt: 'copacol' }
	]
	return (
		<div className={classes.section} id="partners">
			<div className={classes.sectionTestimonials}>
				<div className={classes.container}>
					<GridContainer>
						<GridItem
							md={8}
							className={classNames(classes.mlAuto, classes.mrAuto)}
						>
							<h2 className={classes.title}>Parceiros</h2>
							<h5 className={classes.description}>Alguma descrição???</h5>
						</GridItem>
					</GridContainer>
					<div className={classes.ourClients}>
						<GridContainer justify="center">
							{clients.map((client, index) => (
								<GridItem md={3} sm={3} key={index}>
									<img src={client.img} alt={client.alt} />
								</GridItem>
							))}
						</GridContainer>
					</div>
				</div>
			</div>
		</div>
	)
}
