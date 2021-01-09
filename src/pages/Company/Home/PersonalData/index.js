import React, { useEffect, useState } from 'react';
import { Edit } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { getCompanyId, post } from 'services/api';
import Card from '../../../../components/Card';
import CardBody from '../../../../components/Card/CardBody';
import Button from '../../../../components/CustomButtons';
import { DataGrid } from '@material-ui/data-grid';

export default function CompanyData() {
	const [dataCompanies, setDataCompanies] = useState([])

	const companyId = getCompanyId()

	useEffect(() => {
		async function fetchApi() {
			const response = await post('companies/search', {
				company_id: companyId
			}, { debug: true })
			setDataCompanies(response)
		}

		fetchApi()
	}, [companyId]);

	return (
		<>
			<Card>
				<CardBody>
					<h4>Dados empresariais</h4>
					{
						!dataCompanies.length ? <h5>Não há registros</h5> :

						dataCompanies.map(({ id, company, cnpj, branch}) => (
						<div style={{ heigth: 300, width: '100%' }} key={id}>

						 <DataGrid
						 columns={[
							 { field: 'Empresa', type: 'string'},
							 { field: 'CNPJ', type: 'string' },
							 { field: 'Segmento', type: 'string' },
						 ]}

						 rows={[{ Empresa: company, CNPJ: cnpj, Segmento: branch}]}

						 />
						</div>
						))
					}
				</CardBody>
				<div style={{ alignSelf: 'flex-end', paddingRight: 5}}>
					<Link to="">
					<Button  size="sm" color="primary" round><Edit />Editar</Button>
					</Link>

				</div>
			</Card>
		</>
	)
}
