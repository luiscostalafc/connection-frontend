import AdminLayout from 'layouts/AdminLayout';
import React from 'react';
import SharedForm from '../../Shared/Forms/PurchasedCandidatesForm';

const moduleName = 'purchased-candidates'
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