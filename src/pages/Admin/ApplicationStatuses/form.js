import AdminLayout from 'layouts/AdminLayout';
import React from 'react';
import ApplicationStatusesForm from '../../Shared/Forms/ApplicationStatusesForm';

const moduleName = 'application-status'
export default function Form() {

	return (
		<>
		<AdminLayout
			container={
				<ApplicationStatusesForm successRoute={`/admin/${moduleName}`}/>
			}
		/>
		</>
	)
}