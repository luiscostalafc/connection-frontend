/* eslint-disable react/display-name */
import Close from '@material-ui/icons/Close'
import Edit from '@material-ui/icons/Edit'
import Button from 'components/CustomButtons'
import AdminLayout from 'layouts/AdminLayout'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteData, get } from 'services/api'



const moduleName = 'purchased-candidates'

export default function List() {
	const [dataVal, setData] = useState([])

	useEffect(() => {
		async function fetchApi() {
			const response = await get(moduleName)
			setData(response)
		}

		fetchApi()
	}, [])

	const columns = [
		{ name: 'company_id', selector: 'company_id', sortable: true },
		{ name: 'purchased_date', selector: 'purchased_date', sortable: true },
		{ name: 'price', selector: 'price', sortable: true },
		{ name: 'qtd', selector: 'qtd', sortable: true },
		{ name: 'created_at', selector: 'created_at', sortable: true },
		{
			name: 'Actions',
			cell: row => (
				<>
					<Link to={`/admin/${moduleName}/${row.id}`}>
						<Button simple justIcon size="sm" color="success">
							<Edit />
						</Button>
					</Link>
					<Button
						simple
						justIcon
						size="sm"
						color="danger"
						onClick={() => remove(row.id)}
					>
						<Close />
					</Button>
				</>
			)
		}
	]

	async function remove(id) {
		if (window.confirm('Você tem certeza?')) {
			const response = await deleteData(`${moduleName}/${id}`, {
				complete: true
			})
			toast.success(response.message);
			const data = await get(moduleName)
			setData(data)
		}
	}

	return (
		<AdminLayout
			container={
				<>
					<Link to={`/admin/${moduleName}/create`}>
						<Button color="success" fullWidth>
							Adicionar
						</Button>
					</Link>
					<DataTable
						title="Deliveries"
						columns={columns}
						data={dataVal}
						pagination={true}
						highlightOnHover={true}
						striped={true}
						fixedHeader={true}
					/>
				</>
			}
		/>
	)
}
