// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import image3 from 'assets/img/rhconnection/carrousel/agreement.jpeg'
import image1 from 'assets/img/rhconnection/carrousel/select-intell.jpeg'
import image2 from 'assets/img/rhconnection/carrousel/video-call.jpeg'
import Card from 'components/Card'
import Button from 'components/CustomButtons'

// core components
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import React from 'react'
import { Link } from 'react-router-dom'
// react component for creating beautiful carousel
import Carousel from 'react-slick'
import style from './style.js'


const useStyles = makeStyles(style)

export default function SectionCarousel() {
	const classes = useStyles()

	const settings = {
		dots: true,
		infinite: true,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true
	}

	const slides = [
		{ img: image1, message: 'Conectando você com seu futuro' },
		{ img: image2, message: 'Ganhe tempo nas suas entrevistas' },
		{ img: image3, message: 'Recrutamento inteligente' }
	]

	const logo2 = require('assets/img/rhconnection/logo2.png')

	return (
		<div className={classes.section} id="home">
			<div className={classes.container}>
				<GridContainer>
					<GridItem xs={12} sm={10} md={8} className={classes.marginAuto}>
						<Card>
							<Carousel {...settings}>
								{slides.map((slide, index) => (
									<div key={index}>
										<img
											src={slide.img}
											alt="First slide"
											className="slick-image"
										/>
										<div className="slick-caption">
											<img style={{marginLeft:100}}  width={300} height={100} src={logo2} alt="Connectionrh"/>
											<h6 style={{color:"darkslateblue"}}>{slide.message}</h6>
											<Link to="sign-up">
												<Button style={{ marginBottom: 25}} type="button" color="danger" round fullWidth>
													Cadastre-se grátis
												</Button>
											</Link>
										</div>
									</div>
								))}
							</Carousel>
						</Card>
					</GridItem>
				</GridContainer>
			</div>
		</div>
	)
}
