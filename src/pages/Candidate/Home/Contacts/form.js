import CandidateLayout from 'layouts/CandidateLayout';
import React from 'react';
import SharedForm from '../../../Shared/Forms/UserContactsForm';

// const moduleName = 'user-contacts'
export default function Form() {

	return (
		<>
		<CandidateLayout
			container={
				<SharedForm successRoute={`/candidate/home`}/>
			}
		/>
		</>
	)
}