// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import ViewCarousel from '@material-ui/icons/ViewCarousel';
import descriptionStyle from 'assets/jss/material-kit-pro-react/pages/presentationSections/descriptionStyle.js';
import InfoArea from 'components/InfoArea';
import React from 'react';
// core components
import GridContainer from '../../../../components/Grid/GridContainer';
import GridItem from '../../../../components/Grid/GridItem';

const useStyles = makeStyles(descriptionStyle);

export default function SectionServices() {
	const classes = useStyles();
	const services = [
		{
			title: 'Diagnostico de clima organizacional',
			icon: ViewCarousel,
			iconColor: 'success',
		},
		{
			title: 'Treinamento e Desenvolvimento pessoal',
			icon: ViewCarousel,
			iconColor: 'success',
		},
		{
			title: 'Gestão estratégica de pessoas',
			icon: ViewCarousel,
			iconColor: 'success',
		},
	];
	return (
		<div className={classes.section} id="services">
			<div className={classes.container}>
				<GridContainer justify="center">
					<GridItem md={8} sm={8}>
						<h4 className={classes.description}>
							<b>Nossos Serviços</b>
						</h4>
					</GridItem>
				</GridContainer>
				<div className={classes.features}>
					<GridContainer>
						{services.map((service) => (
							<GridItem md={4} sm={4} key={service.title}>
								<InfoArea
									title={service.title}
									icon={service.icon}
									description=""
									iconColor={service.iconColor}
									vertical
								/>
							</GridItem>
						))}
					</GridContainer>
				</div>
			</div>
		</div>
	);
}
