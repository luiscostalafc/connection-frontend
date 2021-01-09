import AdminLayout from 'layouts/AdminLayout';
import React from 'react';
import SharedForm from '../../Shared/Forms/UsersForm';

const moduleName = 'users'
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