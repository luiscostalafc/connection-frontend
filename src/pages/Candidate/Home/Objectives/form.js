import CandidateLayout from 'layouts/CandidateLayout';
import React from 'react';
import SharedForm from '../../../Shared/Forms/ObjectiveForm';

// const moduleName = 'objectives'
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