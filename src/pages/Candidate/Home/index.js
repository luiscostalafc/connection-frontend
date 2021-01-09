/* eslint-disable react/display-name */
import CandidateLayout from 'layouts/CandidateLayout'
import React from 'react'
import GridContainer from '../../../components/Grid/GridContainer'
import GridItem from '../../../components/Grid/GridItem'
import Portfolios from '../Portfolios'
import Address from './Addresses'
import ComportamentalHabilities from './ComportamentalHabilities'
import Contacts from './Contacts'
import EducationAndCourses from './EducationAndCourses'
import Experience from './Experience'
import Objectives from './Objectives'
import PersonalData from './PersonalData'
import TecnicalHabilities from './TecnicalHabilities'
import VideoCurriculum from './VideoCurriculum'

export default function List() {
	return (
		<CandidateLayout
			container={
				<>
				<GridContainer
				 container
				 direction="row"
				 justify="center"
				 alginItems="flex-start"
				>
					<GridItem className="" xs={12} sm={4} md={4}>
					<div style={{marginBottom:-45, paddingTop:30, marginLeft:40}} >
					<VideoCurriculum />
						</div>
					</GridItem>
					 <GridItem xs={12} sm={8} md={8}>
						<div style={{marginBottom:-45, display:"flex", flex:1}} >
							<PersonalData />
						</div>
					</GridItem>
					<GridItem xs={12} sm={12} md={12}>
						<div style={{marginBottom:-45}} >
            <EducationAndCourses />
						</div>
					</GridItem>

					 <GridItem xs={12} sm={12} md={12}>
					 <div>
						<Experience />
						</div>
					 </GridItem>


					<GridItem xs={12} sm={6} md={6}>
					<div style={{marginBottom:-45}} >
						<TecnicalHabilities />
						</div>
					</GridItem>
					<GridItem xs={12} sm={6} md={6}>
					<div style={{marginBottom:-45}} >
						<ComportamentalHabilities />
						</div>
					</GridItem>
					<GridItem xs={12} sm={6} md={6}>
					<div style={{marginBottom:-45}} >
						<Objectives />
						</div>
					</GridItem>
					<GridItem xs={12} sm={6} md={6}>
					<div style={{marginBottom:-45}} >
						<Contacts />
						</div>
					</GridItem>
					<GridItem xs={12} sm={12} md={12}>
					<div style={{marginBottom:-45}} >
						<Address />
						</div>
					</GridItem>
					<GridItem xs={12} sm={12} md={12}>
						<Portfolios />
					</GridItem>
				</GridContainer>
				</>
			}
		/>
	)
}
