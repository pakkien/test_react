import React from 'react';
import SingleQuotation from './components/SingleQuotation';

const QuotationData = {
	quotation_id: '1',
	client: '',
	end_user: '',
	site_location: '',
	building: '',
	pic: '',
	email: '',
	project_ref: '',
	item: [],
	summary: {
		reference_status: '',
		note: '',
		total: '',
		g_total: '',
	},
};

const CreateQuotation = () => {
	return <SingleQuotation mode='Create' data={QuotationData} />;
};

export default CreateQuotation;
