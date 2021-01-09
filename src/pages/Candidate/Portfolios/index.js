import { Edit, Add } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { post, getUserId } from 'services/api';
import CardBody from '../../../components/Card/CardBody';
import { Link } from 'react-router-dom';
import Card from '../../../components/Card/index';
import Button from '../../../components/CustomButtons';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

export default function Portfolios() {
 const [dataPortfolios, setDataPortfolios] = useState([])

 const userId = getUserId()

 const classes = useStyles();

 useEffect(() => {
	async function fetchApi() {
		const response = await post('portfolios/search', {
			user_id: userId
		}, { debug: true })
		setDataPortfolios(response)
	}

	fetchApi()
}, [userId]);


const fillButtons = [
	{ color: "primary", icon: Edit },
].map((prop, key) => {
	return (
		<Link to={`/candidate/portfolios/${userId}`}>
		<Button justIcon size="sm" color={prop.color} key={key}>
			<prop.icon />
		</Button>
		</Link>
	);
});

	return (
		<>
			<Card>
				<CardBody>
					<h4>Portfólio</h4>
					{
						!dataPortfolios.length ? <h5>Não há registros</h5> :

						<TableContainer component={Paper}>
								<Table  className={classes.table} size="small" aria-label="a dense table">
									<TableHead>
										<TableRow>
											<TableCell align="right">Portfólio</TableCell>
											<TableCell align="right">URL</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{dataPortfolios.map((row) => (
											<TableRow key={row.id}>
												<TableCell component="th" scope="row">
													{row.portfolio?? 'Não há'}
												</TableCell>
												<TableCell align="right"><Link to="">{row.url?? 'Não há'}</Link></TableCell>
												<TableCell align="right">{fillButtons}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
					}
				</CardBody>
				<div style={{ alignSelf: 'flex-end', paddingRight: 5}}>

					<Link to="/candidate/portfolios/create">
					<Button  size="sm" color="success" round><Add />Adicionar</Button>
					</Link>

				</div>
			</Card>

		</>
	)
}
