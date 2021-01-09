import { Edit } from '@material-ui/icons';
import React from 'react';
import Card from '../../../../components/Card';
import CardBody from '../../../../components/Card/CardBody';
import Button from '../../../../components/CustomButtons';

export default function index() {
	return (
		<>
			<Card>
				<CardBody>Dados de endereço</CardBody>
				<div style={{ alignSelf: 'flex-end', paddingRight: 5}}>
					<Button  size="sm" color="primary" round><Edit />Editar</Button>
				</div>
			</Card>
		</>
	)
}