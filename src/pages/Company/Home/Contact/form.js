import CompanyLayout from 'layouts/CompanyLayout';
import React from 'react';
import SharedForm from '../../../Shared/Forms/UserContactsForm';

const moduleName = 'user-contacts'
export default function Form() {

	return (
		<>
		<CompanyLayout
			container={
				<SharedForm successRoute={`/company/${moduleName}`}/>
			}
		/>
		</>
	)
}