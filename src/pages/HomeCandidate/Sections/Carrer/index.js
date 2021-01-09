// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Card from 'components/Card'
import CardBody from 'components/Card/CardBody'
import React from 'react'
// core components
import GridContainer from '../../../../components/Grid/GridContainer'
import GridItem from '../../../../components/Grid/GridItem'
import style from './style'

const useStyles = makeStyles(style)

export default function SectionCarrer() {
	const classes = useStyles()
	return (
		<div className={classes.section} id="career">
			<div className={classes.container}>
				<GridContainer justify="center">
					<GridItem md={8} sm={8}>
						<h4 className={classes.description}>
							<b>Carreira</b>
						</h4>
					</GridItem>
				</GridContainer>
				<div className={classes.features}>
					<GridContainer>
						<GridItem md={3} sm={3}>
							<Card>
								<CardBody>Orientação de carreira</CardBody>
							</Card>
						</GridItem>
						<GridItem md={3} sm={3}>
							<Card>
								<CardBody>Teste Vocacional</CardBody>
							</Card>
						</GridItem>
						<GridItem md={3} sm={3}>
							<Card>
								<CardBody>ELABORAÇÃO DE CURRÍCULO</CardBody>
							</Card>
						</GridItem>
						<GridItem md={3} sm={3}>
							<Card>
								<CardBody>Treinamento e Desenvolvimento pessoal</CardBody>
							</Card>
						</GridItem>
						<GridItem md={3} sm={3}>
							<Card>
								<CardBody>
									PREPARAÇÃO PARA ENTREVISTA DE PROCESSO SELETIVO
								</CardBody>
							</Card>
						</GridItem>
						<GridItem md={3} sm={3}>
							<Card>
								<CardBody>Trilhas de carreira</CardBody>
							</Card>
						</GridItem>
					</GridContainer>
				</div>
			</div>
		</div>
	)
}
