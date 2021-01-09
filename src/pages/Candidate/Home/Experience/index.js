import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom';
import { getUserId, post } from 'services/api';
import Card from '../../../../components/Card';
import CardBody from '../../../../components/Card/CardBody';
import Button from '../../../../components/CustomButtons';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Edit from "@material-ui/icons/Edit";
import { Add } from '@material-ui/icons';


const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});


export default function Experience() {
	const [userExperiences, setUserExperiences] = useState([])

	const classes = useStyles();

	const userId = getUserId();

	const fillButtons = [
    { color: "primary", icon: Edit },
  ].map((prop, key) => {
    return (
			<Link to="/candidate/experience/create">
      <Button justIcon size="sm" color={prop.color} key={key}>
        <prop.icon />
      </Button>
			</Link>
    );
  });

	useEffect(() => {
		async function fetchApi() {
			const response = await post('experiences/search', {
				user_id: userId
			}, { debug: true })
			setUserExperiences(response)
		}

		fetchApi()
	}, [userId]);


	return (
		<>
			<Card>
				<CardBody>
					<h4>Experiências</h4>
					{
						!userExperiences.length ? <h5>Não há registros</h5> :

							<TableContainer component={Paper}>
								<Table  className={classes.table} size="small" aria-label="a dense table">
									<TableHead>
										<TableRow>
										<TableCell align="right">Empresa</TableCell>
											<TableCell align="right">Início</TableCell>
											<TableCell align="right">Final</TableCell>
											<TableCell align="right">Cargo</TableCell>
											<TableCell align="right">Descrição</TableCell>
											<TableCell align="right">Ação</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{userExperiences.map((row) => (
											<TableRow key={row.id}>
												<TableCell component="th" scope="row">
													{row.company?? 'Não há'}
												</TableCell>
												<TableCell align="right">{row.startDate?? 'Não há'}</TableCell>
												<TableCell align="right">{row.endDate?? 'Não há'}</TableCell>
												<TableCell align="right">{row.role?? 'Não há'}</TableCell>
												<TableCell align="right">{row.description?? 'Não há'}</TableCell>
												<TableCell align="right">{fillButtons}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
					}

				</CardBody>
				<div style={{ alignSelf: 'flex-end', paddingRight: 5 }}>
					<Link to="/candidate/experience/create">
						<Button size="sm" color="success" round><Add />Adicionar</Button>
					</Link>
				</div>
			</Card>

		</>
	)
}
