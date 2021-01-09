import CandidateLayout from 'layouts/CandidateLayout';
import React from 'react';
import SharedForm from '../../../Shared/Forms/SkillsForm';

// const moduleName = 'skills'
export default function Form() {

	return (
		<>
		<CandidateLayout
			container={
				<SharedForm successRoute={`/candidate/home`} typeSkill="soft"/>
			}
		/>
		</>
	)
}