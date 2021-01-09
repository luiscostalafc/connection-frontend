import { Add, Edit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react';
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

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

export default function Addresses() {
	const [userAddresses, setUserAddresses] = useState([])

	const classes = useStyles();

	const userId = getUserId()

	useEffect(() => {
		async function fetchApi() {
			const response = await post('addresses/search', {
				user_id: userId
			}, { debug: true })
			setUserAddresses(response)
		}

		fetchApi()
	}, [userId]);

	const fillButtons = [
    { color: "primary", icon: Edit },
  ].map((prop, key) => {
    return (
			<Link to={`/candidate/address/${userId}`}>
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
					<h4>Endereço</h4>
					{
						!userAddresses.length ? <h5>Não há registros</h5> :
							<TableContainer component={Paper}>
								<Table  className={classes.table} size="small" aria-label="a dense table">
									<TableHead>
										<TableRow>
											<TableCell align="right">CEP</TableCell>
											<TableCell align="right">País</TableCell>
											<TableCell align="right">Estado</TableCell>
											<TableCell align="right">Cidade</TableCell>
											<TableCell align="right">Bairro</TableCell>
											<TableCell align="right">Rua</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{userAddresses.map((row) => (
											<TableRow key={row.id}>
												<TableCell component="th" scope="row">
													{row.cep?? 'Não há'}
												</TableCell>
												<TableCell align="right">{row.country?? 'Não há'}</TableCell>
												<TableCell align="right">{row.state?? 'Não há'}</TableCell>
												<TableCell align="right">{row.city?? 'Não há'}</TableCell>
												<TableCell align="right">{row.district?? 'Não há'}</TableCell>
												<TableCell align="right">{row.street?? 'Não há'}</TableCell>
												<TableCell align="right">{fillButtons}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
					}
				</CardBody>
				<div style={{ alignSelf: 'flex-end', paddingRight: 5}}>
					<Link to="/candidate/address/create">
						<Button  size="sm" color="success" round><Add />Adicionar</Button>
					</Link>
				</div>
			</Card>

		</>
	)
}
