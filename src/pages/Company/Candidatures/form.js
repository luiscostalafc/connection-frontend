import CompanyLayout from 'layouts/CompanyLayout';
import React from 'react';
import SharedForm from '../../Shared/Forms/ApplicationsForm';

const moduleName = 'apllications'
export default function Form() {

	return (
		<>
		<CompanyLayout
			container={
				<SharedForm successRoute={`/candidate/${moduleName}`}/>
			}
		/>
		</>
	)
}