import AdminLayout from 'layouts/AdminLayout';
import React from 'react';
import SharedForm from '../../Shared/Forms/InstitutionsForm';

const moduleName = 'institutions'
export default function Form() {

	return (
		<>
		<AdminLayout
			container={
				<SharedForm successRoute={`/admin/${moduleName}`}/>
			}
		/>
		</>
	)
}