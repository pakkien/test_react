import React from 'react';
import SingleQuotation from './components/SingleQuotation';
import QuotationDataType from '../../dataTypes/QuotationDataType';

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
	item: [],
	state: '',

	//Summary fields
	reference_status: '',
	note: '',
	total: '',
	g_total: '',

};




const CreateQuotation = () => {
	return <SingleQuotation mode='Create' data={QuotationData} />;
};

export default CreateQuotation;
