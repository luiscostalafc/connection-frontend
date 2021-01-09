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



const moduleName = 'vacancies'

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
		{ name: 'title', selector: 'title', sortable: true },
		{ name: 'description', selector: 'description', sortable: true },
		{ name: 'salary', selector: 'salary', sortable: true },
		{ name: 'experience', selector: 'experience', sortable: true },
		{ name: 'course', selector: 'course', sortable: true },
		{ name: 'area', selector: 'area', sortable: true },
		{ name: 'role', selector: 'role', sortable: true },
		{
			name: 'pcd',
			selector: 'pcd',
			cell: row => (row.pcd ? 'Yes' : 'No'),
			sortable: true
		},
		{ name: 'contract_type', selector: 'contract_type', sortable: true },
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
