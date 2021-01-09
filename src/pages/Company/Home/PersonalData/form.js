import CompanyLayout from 'layouts/CompanyLayout';
import React from 'react';
import SharedForm from '../../../Shared/Forms/UsersForm';

const moduleName = 'users'
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