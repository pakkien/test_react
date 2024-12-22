import React, { useEffect, useState } from 'react';

import { useLocation, useParams } from 'react-router-dom';
import { FormProviderQuotation } from './components/QuotationForm';
import { Quotation } from './components/Quotation';
import axios from 'axios';
import QuotationDataType from '../../dataTypes/QuotationDataType';

const QuotationData = {
	"attachment_list": [
	  "5802e900-b09a-488e-94fe-f04c991527b2"
	],
	"building": "password1212",
	"client": "password112",
	"client_code": "test_client_code",
	"created_at": "Sun, 22 Dec 2024 04:03:11 GMT",
	"created_by": "tester1",
	"end_user": "Ade1234412",
	"grand_total": null,
  
	"lead_time": null,
	"message": "Quotation 71d73a1c-16dc-45a7-8b04-4dbb06065f65 created.",
	"note": "12312",
	"payment_terms": null,
	"pic": "Ade1234212",
	"pic_contact_number": "1234567",
	"pic_email": "picEmail@email.com",
	"project_reference": "Emeka123412",
	"quotation_id": "a121d2fd-9e22-4f44-b91a-2bc73f08538f",
	"quotation_no": "Quotation-20240001-password112_V0_R1",
	"quotation_revision_id": "71d73a1c-16dc-45a7-8b04-4dbb06065f65",
	"reference_status": "34234",
	"revision": 1,
	"sections": [
	  {
		"items": [
		  {
			"brand": "Emeka123412",
			"estimated_cost": false,
			"margin": 0.8,
			"margin_percentage": 20.0,
			"model": "Ade1234412",
			"order": 0,
			"product_description": "12345",
			"quantity": 1,
			"remarks": "Quotation retrieved.",
			"sub_items": [
			  {
				"brand": "Emeka123412",
				"estimated_cost": false,
				"margin": 0.8,
				"margin_percentage": 20.0,
				"model": "Ade1234412",
				"order": 0,
				"product_description": "12345",
				"quantity": 1,
				"remarks": "Quotation retrieved.",
				"total_cost": 1.2,
				"total_price": 1.2,
				"unit": "1",
				"unit_cost": 1.2,
				"unit_price": 1.2
			  }
			],
			"total_cost": 1.2,
			"total_price": 1.2,
			"unit": "1",
			"unit_cost": 1.2,
			"unit_price": 1.2
		  }
		],
		"name": "new section name",
		"order": 0,
		"is_section_valid": true
	  }
	],
	"site_location": "Emeka1234512",
	"status": "submitted",
	"total_cost": null,
	"validity": null,
	"variance": 0
  };

const EditQuotation = () => {
	const {state} = useLocation();
	const create_new_variance = state?.create_new_variance;
	//console.log("location.create_new_variance:" + create_new_variance);


	const { quotation_rev_id } = useParams();
	const [quotationRevData, setQuotationRevData] = useState<any>();

	const fetchQuotationRevData = async (quotation_rev_id: string) => {
		const config = {
			headers: { Authorization: `${localStorage.getItem('bts_token')}` },
		};
		axios
			.get(import.meta.env.VITE_BASE_URL + `/quotation/revision/${quotation_rev_id}`, config)
			.then((response) => {
				//console.log(response.data);
				setQuotationRevData(response.data);
			});
	};

	useEffect(() => {
		// setQuotationRevData(null);
		// if (quotation_rev_id) {
		// 	fetchQuotationRevData(quotation_rev_id);
		// }

		//Debug:
		setQuotationRevData(QuotationData);


	}, [quotation_rev_id]);


	

	return (
		<>
			{quotationRevData ? (
				<FormProviderQuotation data={quotationRevData}>
					<Quotation mode={'edit'} quotation_id={quotationRevData.quotation_id} 
					quotation_rev_id={quotationRevData.quotation_revision_id} 
					quotation_no={quotationRevData.quotation_no}
					status={quotationRevData.status}
					revision={quotationRevData.revision}
					create_new_variance={create_new_variance}
					variance={quotationRevData.variance}
					/>
				</FormProviderQuotation>
			) : (
				<></>
			)}
		</>
	);
};

export default EditQuotation;
