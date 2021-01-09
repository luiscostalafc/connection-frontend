import CompanyLayout from 'layouts/CompanyLayout';
import React from 'react';
import SharedForm from '../../Shared/Forms/CompaniesForm';

const moduleName = 'companies'
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
