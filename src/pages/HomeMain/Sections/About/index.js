// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import descriptionStyle from 'assets/jss/material-kit-pro-react/pages/presentationSections/descriptionStyle.js'
import Card from 'components/Card'
import CardBody from 'components/Card/CardBody'
import React from 'react'
// core components
import GridContainer from '../../../../components/Grid/GridContainer'
import GridItem from '../../../../components/Grid/GridItem'

const useStyles = makeStyles(descriptionStyle)

export default function SectionAbout() {
	const classes = useStyles()
	const features = [
		'Entrevistas por videoconferência',
		'Entrevistas gravadas',
		'Entrevistas Compartilhadas',
		'Video Curriculum',
		'Marketing Pessoal',
		'Busca Avançada',
		'Triagem Inteligente',
		'Feedback',
		'Portfólio pessoal'
	]
	return (
		<div className={classes.section} id="about">
			<div className={classes.container}>
				<GridContainer justify="center">
					<GridItem md={8} sm={8}>
						<h4 className={classes.description}>
							<b>Missão e propósito</b>
							<br />A nossa MISSÃO é tornar a prática de recrutamento e seleção
							um processo dinâmico, econômico e interativo para as empresas e
							candidatos.
							<br />O nosso PROPÓSITO é tornar o processo de recrutamento e
							seleção mais humanizado, inclusivo e interativo.
							<br />
							Experimente um novo jeito de realizar processos seletivos.
						</h4>
					</GridItem>
				</GridContainer>
				<div className={classes.features}>
					<GridContainer>
						{features.map((feature, index) => (
							<GridItem md={3} sm={3} key={index}>
								<Card>
									<CardBody>{feature}</CardBody>
								</Card>
							</GridItem>
						))}
					</GridContainer>
				</div>
			</div>
		</div>
	)
}
