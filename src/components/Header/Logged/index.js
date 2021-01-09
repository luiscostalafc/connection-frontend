import { makeStyles } from '@material-ui/core/styles'
import React, { useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getToken, loggout } from 'services/api'
import styles from '../HeaderLinksCompany/style'


const useStyles = makeStyles(styles)

export function Logged() {
  const history = useHistory();
  const classes = useStyles()
  const token = getToken()

  const handleLogout = useCallback(() => {
    loggout()
    history.push('/')
  },[history])

  return (
    !token ?
    <Link className={classes.dropdownLink} to="/login">
      Entrar
    </Link> :
    <Link className={classes.dropdownLink} to="#" onClick={handleLogout}>
      Sair
    </Link>
  )
}
