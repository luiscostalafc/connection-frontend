import AdminLayout from 'layouts/AdminLayout';
import React from 'react';
import SharedForm from '../../Shared/Forms/AreasForm';

const moduleName = 'areas'
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
