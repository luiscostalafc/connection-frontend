import { makeStyles } from "@material-ui/core/styles"
import React from 'react'
import { Link } from 'react-router-dom'
import loginPageStyle from '../../assets/jss/material-kit-pro-react/pages/loginPageStyle'
import Card from '../../components/Card'
import CardHeader from '../../components/Card/CardHeader'
import Button from '../../components/CustomButtons'
import GridContainer from '../../components/Grid/GridContainer'
import GridItem from '../../components/Grid/GridItem'
import EnterLayout from '../../layouts/EnterLayout'

export default function SignUp() {
	React.useEffect(() => {
		window.scrollTo(0, 0)
		document.body.scrollTop = 0
	},[])

	const useStylesLogin = makeStyles(loginPageStyle)

	const classesLogin = useStylesLogin()

	return (
		<EnterLayout
			container={
				<GridContainer justify="center">
					<GridItem xs={12} sm={12} md={4}>
						<Card>
								<CardHeader
									color="primary"
									signup
									className={classesLogin.cardHeader}
								>
									<h4 className={classesLogin.cardTitle}>Cadastre-se</h4>
								</CardHeader>

								<div className={classesLogin.textCenter}>
									<Link to="sign-up-company">
										<Button
											simple
											color="google"
											size="lg"
										>
											Sou Empresa
										</Button>
									</Link>
									<Link to="sign-up-candidate">
										<Button
											simple
											color="google"
											size="lg"
										>
											Sou Candidato
										</Button>
									</Link>
								</div>
						</Card>

						<div className={classesLogin.textCenter}>Tem cadastro?</div>
						<div className={classesLogin.textCenter}>
							<Link to="/login">
								<Button simple color="success" size="lg">
									Acesse sua conta
								</Button>
							</Link>
						</div>
					</GridItem>
				</ GridContainer>
			}
		/>
	)
}
