import CandidateLayout from 'layouts/CandidateLayout';
import React from 'react';
import SharedForm from '../../../Shared/Forms/Experience';

// const moduleName = 'experiences'
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