import AdminLayout from 'layouts/AdminLayout';
import React from 'react';
import AddressForm from '../../Shared/Forms/AddressesForm';

const moduleName = 'addresses'
export default function Form() {

	return (
		<>
		<AdminLayout
			container={
				<AddressForm successRoute={`/admin/${moduleName}`}/>
			}
		/>
		</>
	)
}
