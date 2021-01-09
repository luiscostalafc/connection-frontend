import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Header from 'components/Header'
import Footer from 'components/Footer'

import EnterLayoutStyle from './MainLayout'

import image from 'assets/img/bg11.jpg'
import { APP_NAME } from '../../config/app'

const useStyles = makeStyles(EnterLayoutStyle)

function EnterLayout({ container }) {
  React.useEffect(() => {
    window.scrollTo(0, 0)
    document.body.scrollTop = 0
  })
	const classes = useStyles()


  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand={APP_NAME}
        // links={<HeaderLinks dropdownHoverColor="info" />}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: 'url(' + image + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'top center'
        }}
      >
        <div className={classes.container}>{container}</div>
        <Footer className={classes.footer} content={<div></div>} />
      </div>
    </div>
  )
}

EnterLayout.propTypes = {
  container: PropTypes.element
}

export default EnterLayout
