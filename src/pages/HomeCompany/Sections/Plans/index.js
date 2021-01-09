// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
// import Card from "../../../components/Card/Card";
import Card from '../../../../components/Card'
import CardBody from '../../../../components/Card/CardBody'
// core components
import GridContainer from '../../../../components/Grid/GridContainer'
import GridItem from '../../../../components/Grid/GridItem'
import style from './style'

const useStyles = makeStyles(style)

export default function SectionPlans() {
	const classes = useStyles()
	const plans = [
		{
			name: 'Mensal',
			value: '0,00',
			description: 'Sem desconto',
			color: 'info'
		},
		{
			name: 'Trimestral',
			value: '0,00',
			description: '25% de desconto',
			color: 'warning'
		},
		{
			name: 'Anual',
			value: '0,00',
			description: '35% de desconto',
			color: 'success'
		}
	]
	return (
		<div className={classes.section} id="plans">
			<div className={classes.container}>
				<GridContainer justify="center">
					<GridItem
						md={12}
						sm={12}
						className={classes.mlAuto + ' ' + classes.mrAuto}
					>
						<div>
							<h2 className={classes.title}>Planos</h2>
							<h5 className={classes.description}>alguma descrição??</h5>
						</div>
					</GridItem>
					<GridItem md={12} sm={12} className={classes.mlAuto}>
						<GridContainer>
							{plans.map((plan, index) => (
								<GridItem md={4} sm={4} key={index}>
									<Card pricing color={plan.color}>
										<CardBody pricing>
											<div
												className={`${classes.iconWrapper} ${classes.iconWrapperColor}`}
											>
												{plan.name}
											</div>
											<h3
												className={`${classes.cardTitleWhite} ${classes.marginTop30}`}
											>
												R${plan.value}
											</h3>
											<p className={classes.cardDescriptionWhite}>
												{plan.description}
											</p>
											{/* <Button round color="white">
												Choose plan
											</Button> */}
										</CardBody>
									</Card>
								</GridItem>
							))}
						</GridContainer>
					</GridItem>
				</GridContainer>
			</div>
		</div>
	)
}
