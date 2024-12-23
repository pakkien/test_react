import React, { useState } from 'react';
import QuotationDataType from '../../dataTypes/QuotationDataType';
import { FormProviderQuotation } from './components/QuotationForm';
import { Quotation } from './components/Quotation';

const QuotationData: QuotationDataType.QuotationData = {
	quotation_id: '',
	quotation_revision_id: '',
	quotation_no: '',
	quotation_date: '',
	revision: 0,
	client: '',
	client_code: '',
	end_user: '',
	site_location: '',
	building: '',
	pic: '',
	pic_email: '',
	pic_contact_number: '',
	project_reference: '',
	sections: [],
	status: '',
	variance: 0,

	//Summary fields
	reference_status: '',
	note: '',
	total_cost: 0,
	grand_total: 0,
	discount: 0,
	sst: 0,

	//options
	lead_time: '',
	payment_terms: '',
	validity: ''

};


const CreateQuotation = () => {
	
	return(
		<FormProviderQuotation data={QuotationData}>
			<Quotation mode={'create'} status={'None'}/>
		</FormProviderQuotation>
	)
};

export default CreateQuotation;
