// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import sectionsStyle from 'assets/jss/material-kit-pro-react/pages/presentationSections/sectionsStyle.js'
// nodejs library that concatenates classes
import classNames from 'classnames'
import CardRotate from 'components/Card/CardRotate'
// core components
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import React, { useEffect, useState } from 'react'
import { get } from 'services/api'

const useStyles = makeStyles(sectionsStyle)

export default function SectionVacancy() {
	const [vacancies, setVacancies] = useState([])
	useEffect(() => {
		async function fetchApi() {
			const response = await get('vacancies', { complete: true })
			if (!response.message) {
				setVacancies(response)
			}
		}

		fetchApi()
	}, [setVacancies])

	const renderContainerFluid = cssClass => {
		return (
			<GridContainer>
				{vacancies.map((vacancy, index) => {
					const {
						title,
						description,
						salary,
						experience,
						course,
						area,
						role,
						pcd,
						contract_type
					} = vacancy
					return (
						<GridItem
							xs={12}
							sm={6}
							md={6}
							lg={6}
							key={index}
							className={cssClass}
						>
							<CardRotate
								preTitle={'VAGAS!'}
								title={title}
								descriptionFront={[description, salary]}
								descriptionBack={[
									salary,
									experience,
									course,
									area,
									role,
									pcd,
									contract_type
								]}
							/>
						</GridItem>
					)
				})}
			</GridContainer>
		)
	}
	const classes = useStyles()
	return (
		<div className={classes.sectionSections} id="vacancies">
			<div className={classes.container}>
				<GridContainer justify="center">
					<GridItem
						md={8}
						className={classNames(classes.mrAuto, classes.mlAuto)}
					>
						<div className={classes.sectionDescription}>
							<h2 className={classes.title}>Vagas</h2>
						</div>
					</GridItem>
				</GridContainer>
			</div>
			<div className={classes.containerFluid}>
				{renderContainerFluid(classes.photoGallery)}
			</div>
		</div>
	)
}
