import React from 'react';
import QuotationDataType from '../../dataTypes/QuotationDataType';
import { FormProviderQuotation } from './components/QuotationForm';
import { Quotation } from './components/Quotation';

const QuotationData: QuotationDataType.QuotationData = {
	quotation_id: crypto.randomUUID(),
	quotation_rev_id: crypto.randomUUID(),
	quotation_no: '',
	quotation_date: '',
	rev: '0',
	client: '',
	end_user: '',
	site_location: '',
	building: '',
	pic: '',
	email: '',
	project_ref: '',
	items: [],
	state: '',

	//Summary fields
	reference_status: '',
	note: '',
	total: '',
	g_total: '',

};


const CreateQuotation = () => {
	return(
		<FormProviderQuotation data={QuotationData}>
			<Quotation mode={'create'} />
		</FormProviderQuotation>
	)
};

export default CreateQuotation;
