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
	end_user: '',
	site_location: '',
	building: '',
	pic: '',
	email: '',
	project_reference: '',
	items: [],
	status: '',

	//Summary fields
	reference_status: '',
	note: '',
	total: 0,
	g_total: 0,

};


const CreateQuotation = () => {
	//const [quotationRevData, setQuotationRevData] = useState<QuotationDataType.QuotationData>();


	return(
		<FormProviderQuotation data={QuotationData}>
			<Quotation mode={'create'}/>
		</FormProviderQuotation>
	)
};

export default CreateQuotation;
