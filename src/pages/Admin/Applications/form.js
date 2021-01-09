import AdminLayout from 'layouts/AdminLayout';
import React from 'react';
import ApplicationsForm from '../../Shared/Forms/ApplicationsForm';

const moduleName = 'applications'
export default function Form() {

	return (
		<>
		<AdminLayout
			container={
				<ApplicationsForm successRoute={`/admin/${moduleName}`}/>
			}
		/>
		</>
	)
}