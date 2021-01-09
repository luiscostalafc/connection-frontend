import Icon from '@material-ui/core/Icon'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Delete from '@material-ui/icons/Delete'
// @material-ui icons
import Subject from '@material-ui/icons/Subject'
import cardBlog5 from 'assets/img/rhconnection/carrousel/agreement.jpeg'
import Card from 'components/Card'
import CardBody from 'components/Card/CardBody'
import Button from '../../CustomButtons'
import PropTypes from 'prop-types'
import React from 'react'
import styleCard from './style'

const style = {
	...styleCard
}

const useStyles = makeStyles(style)

export default function CardRotate({
	cardStyle,
	preTitle,
	title,
	descriptionFront,
	descriptionBack
}) {
	React.useEffect(() => {
		addStylesForRotatingCards()
		return function cleanup() {}
	})
	const addStylesForRotatingCards = () => {
		var rotatingCards = document.getElementsByClassName(classes.cardRotate)
		for (let i = 0; i < rotatingCards.length; i++) {
			var rotatingCard = rotatingCards[i]
			var cardFront = rotatingCard.getElementsByClassName(classes.front)[0]
			var cardBack = rotatingCard.getElementsByClassName(classes.back)[0]
			cardFront.style.height = 'unset'
			cardFront.style.width = 'unset'
			cardBack.style.height = 'unset'
			cardBack.style.width = 'unset'
			var rotatingWrapper = rotatingCard.parentElement
			var cardWidth = rotatingCard.parentElement.offsetWidth
			var cardHeight = rotatingCard.children[0].children[0].offsetHeight
			rotatingWrapper.style.height = cardHeight + 'px'
			rotatingWrapper.style['margin-bottom'] = 30 + 'px'
			cardFront.style.height = 'unset'
			cardFront.style.width = 'unset'
			cardBack.style.height = 'unset'
			cardBack.style.width = 'unset'
			cardFront.style.height = cardHeight + 35 + 'px'
			cardFront.style.width = cardWidth + 'px'
			cardBack.style.height = cardHeight + 35 + 'px'
			cardBack.style.width = cardWidth + 'px'
		}
	}
	const classes = useStyles()
	return (
		<div className={classes.rotatingCardContainer}>
			<Card background className={classes.cardRotate}>
				<div
					className={`${classes.front} ${classes.wrapperBackground}`}
					style={
						cardStyle || {
							backgroundImage: `url(${cardBlog5})`
						}
					}
				>
					<CardBody background className={classes.cardBodyRotate}>
						<h6 className={classes.cardCategoryWhite}>{preTitle}</h6>
						<a href="#pablo" onClick={e => e.preventDefault()}>
							<h3 className={classes.cardTitleWhite}>{title}</h3>
						</a>
						{descriptionFront ? (
							descriptionFront.map((front, key) => (
								<p className={classes.cardDescriptionWhite} key={key}>
									{front}
								</p>
							))
						) : (
							<p className={classes.cardDescriptionWhite}>NONE</p>
						)}
					</CardBody>
				</div>
				<div
					className={`${classes.back} ${classes.wrapperBackground}`}
					style={
						cardStyle || {
							backgroundImage: `url(${cardBlog5})`
						}
					}
				>
					<CardBody background className={classes.cardBodyRotate}>
						<h5 className={classes.cardTitleWhite}>{title}</h5>
						{descriptionBack ? (
							descriptionBack.map((back, key) => (
								<p className={classes.cardDescriptionWhite} key={key}>
									{back}
								</p>
							))
						) : (
							<p className={classes.cardDescriptionWhite}>NONE</p>
						)}
						<div className={classes.textCenter}>
							<Button round justIcon color="info">
								<Subject />
							</Button>
							<Button round justIcon color="success">
								<Icon>mode_edit</Icon>
							</Button>
							<Button round justIcon color="danger">
								<Delete />
							</Button>
						</div>
					</CardBody>
				</div>
			</Card>
		</div>
	)
}

CardRotate.propTypes = {
	cardStyle: PropTypes.object,
	preTitle: PropTypes.string,
	title: PropTypes.string,
	descriptionFront: PropTypes.array,
	descriptionBack: PropTypes.array
}
