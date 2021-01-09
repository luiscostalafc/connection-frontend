import CandidateLayout from 'layouts/CandidateLayout';
import React from 'react';
import SharedForm from '../../Shared/Forms/VacanciesForm';

const moduleName = 'vacancies'
export default function Form() {

	return (
		<>
		<CandidateLayout
			container={
				<SharedForm successRoute={`/candidate/${moduleName}`}/>
			}
		/>
		</>
	)
}