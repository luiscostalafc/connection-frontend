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
import Add from "@material-ui/icons/Add";


const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});


export default function EducationAndCourses() {
	const [userCourses, setUserCourses] = useState([])

	const classes = useStyles();

	const userId = getUserId()

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
			const response = await post('courses/search', {
				user_id: userId
			}, { debug: true })
			setUserCourses(response)
		}

		fetchApi()
	}, [userId]);

	return (
		<>
			<Card>

				<CardBody>
					<h4>Formação Acadêmica</h4>
					{
						!userCourses.length ? <h5>Não há registros</h5> :


							<TableContainer component={Paper}>
								<Table className={classes.table} size="small" aria-label="a dense table">
									<TableHead>
										<TableRow>
											<TableCell align="right">Curso</TableCell>
											<TableCell align="right">Instituição</TableCell>
											<TableCell align="right">Situação</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{userCourses.map((row) => (
											<TableRow key={row.id}>
												<TableCell component="th" scope="row">
													{row.course ?? 'Não há'}
												</TableCell>
												<TableCell align="right">{row.institution ?? 'Não há'}</TableCell>
												<TableCell align="right">{row.situation ?? 'Não há'}</TableCell>
												<TableCell align="right">{fillButtons}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
					}
				</CardBody>

				<div style={{ alignSelf: 'flex-end', paddingRight: 5 }}>
					<Link to="/candidate/education-and-courses/create">
						<Button size="sm" color="success" round><Add />Adicionar</Button>
					</Link>
				</div>
			</Card>
		</>
	)
}
