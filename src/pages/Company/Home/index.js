/* eslint-disable react/display-name */
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import CompanyLayout from 'layouts/CompanyLayout'
import React from 'react'
import Address from './Address'
import Contact from './Contact'
import PersonalData from './PersonalData'
import AboutCompany from './AboutCompany'


export default function List() {
	return (
		<CompanyLayout
			container={
				<>
					<GridContainer>
						<GridItem xs={12} sm={12} md={12}>
							<div style={{marginBottom:-45}} >
								<PersonalData/>
							</div>
						</GridItem>
						<GridItem xs={12} sm={6} md={6}>
							<div style={{marginBottom:-45}} >
								<Address />
							</div>
						</GridItem>
						<GridItem xs={12} sm={6} md={6}>
							<div style={{marginBottom:-45}} >
								<Contact />
							</div>
						</GridItem>
						<GridItem xs={12} sm={12} md={12}>
							<div >
								<AboutCompany />
							</div>
						</GridItem>
						{/* <GridItem xs={12} sm={12} md={12}>
							<SectionBlanck />
						</GridItem>					 */}
					</GridContainer>
				</>
			}
		/>
	)
}
