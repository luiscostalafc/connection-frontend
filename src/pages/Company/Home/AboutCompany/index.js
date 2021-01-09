// import { Edit } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../../components/Card';
import CardBody from '../../../../components/Card/CardBody';
import Button from '../../../../components/CustomButtons';
import { Edit } from '@material-ui/icons'

export default function index() {
	return (
		<>
			<Card>
				<CardBody>Sobre a Empresa</CardBody>
				<div style={{ alignSelf: 'flex-end', paddingRight: 5 }}>
					<Link to="">
						<Button size="sm" color="primary" round><Edit />Editar</Button>

					</Link>

				</div>
			</Card>
		</>
	)
}
