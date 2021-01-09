import AdminLayout from 'layouts/AdminLayout';
import React from 'react';
import SharedForm from '../../Shared/Forms/MeetingsForm';

const moduleName = 'meetings'
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