import React, { useEffect, useState } from 'react';
import { FormProviderQuotation } from './components/QuotationForm';
import { Quotation } from './components/Quotation';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import QuotationDataType from '../../dataTypes/QuotationDataType';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';

// const QuotationData = {
// 	quotation_id: 'ad399d47-a038-4fb4-9f31-2f142c143611',
// 	quotation_data: [
// 		{
// 			quotation_no: '24001S1-TGH',
// 			quotation_id: 'ad399d47-a038-4fb4-9f31-2f142c143611',
// 			quotation_rev_id: 'c33d08b9-8ec3-41a1-8b0a-66033a3c7214',
// 			rev: '0',
// 			quotation_date: '31/01/2024',
// 			client: 'client_name',
// 			end_user: 'someEndUserName',
// 			site_location: 'Penang',
// 			building: 'PG1',
// 			pic: '123',
// 			email: 'sometester@gmail.com',
// 			project_ref: 'abcProject',
// 			state: 'awarded',
// 			items: [
// 				{
// 					item_id: '09ee02e9-8115-42ad-8648-74c901b96940',
// 					quotation_rev_id: 'c33d08b9-8ec3-41a1-8b0a-66033a3c7214',
// 					product_desc: 'item1',
// 					brand: 'prodtBrand',
// 					model: 'ModelX',
// 					remarks: 'dummyRemarks',
// 					quantity: '300',
// 					unit: 'Unit',
// 					unit_cost: '300.0',
// 					total_cost: '3000.0',
// 					margin: '0.8',
// 					unit_price: '375',
// 					total_price: '3750',
// 					sub_items: [
// 						{
// 							sub_item_id: '60c07ea8-f677-4e0c-b232-8756842ee174',
// 							item_id: '09ee02e9-8115-42ad-8648-74c901b96940',
// 							product_desc: 'item1_subItem1',
// 							brand: 'prodtBrand',
// 							model: 'ModelX44',
// 							remarks: 'dummyRemarks',
// 							quantity: '222',
// 							unit: 'Unit',
// 							unit_cost: '300.0',
// 							total_cost: '3000.0',
// 							margin: '0.8',
// 							unit_price: '375',
// 							total_price: '3750',
// 						},
// 						{
// 							sub_item_id: 'd23c57b7-38c1-45c4-a253-f8f7affe0447',
// 							item_id: '09ee02e9-8115-42ad-8648-74c901b96940',
// 							product_desc: 'item1_subItem2',
// 							brand: 'prodtBrand',
// 							model: 'ModelX55',
// 							remarks: 'dummyRemarks',
// 							quantity: '444',
// 							unit: 'Unit',
// 							unit_cost: '300.0',
// 							total_cost: '3000.0',
// 							margin: '0.8',
// 							unit_price: '375',
// 							total_price: '3750',
// 						},
// 					],
// 				},
// 				{
// 					item_id: '7043ac52-22c1-474c-898c-ae4a3d8d44aa',
// 					quotation_rev_id: 'c33d08b9-8ec3-41a1-8b0a-66033a3c7214',
// 					product_desc: 'item2',
// 					brand: 'prodtBrand2',
// 					model: 'ModelX2',
// 					remarks: 'dummyRemarks2',
// 					quantity: '3',
// 					unit: 'Unit2',
// 					unit_cost: '300.0',
// 					total_cost: '3000.0',
// 					margin: '0.8',
// 					unit_price: '375',
// 					total_price: '3750',
// 					sub_items: [
// 						{
// 							sub_item_id: '24e651fe-720e-4aa3-bd25-95398b39e440',
// 							item_id: '7043ac52-22c1-474c-898c-ae4a3d8d44aa',
// 							product_desc: 'item2_subItem1',
// 							brand: 'prodtBrand',
// 							model: 'ModelX444',
// 							remarks: 'dummyRemarks',
// 							quantity: '3',
// 							unit: 'Unit',
// 							unit_cost: '300.0',
// 							total_cost: '3000.0',
// 							margin: '0.8',
// 							unit_price: '375',
// 							total_price: '3750',
// 						},
// 					],
// 				},
// 				{
// 					item_id: 'fca38a36-659a-4e68-84f5-3c95eea6e9cb',
// 					quotation_rev_id: 'c33d08b9-8ec3-41a1-8b0a-66033a3c7214',
// 					product_desc: 'item3',
// 					brand: 'prodtBrand2',
// 					model: 'ModelX2',
// 					remarks: 'dummyRemarks2',
// 					quantity: '3',
// 					unit: 'Unit2',
// 					unit_cost: '300.0',
// 					total_cost: '3000.0',
// 					margin: '0.8',
// 					unit_price: '375',
// 					total_price: '3750',
// 					sub_items: [],
// 				},
// 			],
// 			reference_status: '-',
// 			note: '-',
// 			total: '12400.0',
// 			g_total: '12400.0',
// 		},
// 		{
// 			quotation_no: '24001S1-TGH-Variation-01',
// 			quotation_id: 'ad399d47-a038-4fb4-9f31-2f142c143611',
// 			quotation_rev_id: '998bf269-5741-4445-83ca-f251cb608c5e',
// 			quotation_date: '31/01/2024',
// 			rev: '1',
// 			client: 'client_name1',
// 			end_user: 'someEndUserName1',
// 			site_location: 'Penang1',
// 			building: 'PG11',
// 			pic: '1231',
// 			email: 'sometester@gmail.com1',
// 			project_ref: 'abcProject1',
// 			state: 'closed',
// 			items: [
// 				{
// 					item_id: '09ee02e9-8115-42ad-8648-74c901b96940',
// 					quotation_rev_id: '998bf269-5741-4445-83ca-f251cb608c5e',
// 					product_desc: 'item1',
// 					brand: 'prodtBrand',
// 					model: 'ModelX',
// 					remarks: 'dummyRemarks',
// 					quantity: '300',
// 					unit: 'Unit',
// 					unit_cost: '300.0',
// 					total_cost: '3000.0',
// 					margin: '0.8',
// 					unit_price: '375',
// 					total_price: '3750',
// 					sub_items: [
// 						{
// 							sub_item_id: '60c07ea8-f677-4e0c-b232-8756842ee174',
// 							item_id: '09ee02e9-8115-42ad-8648-74c901b96940',
// 							product_desc: 'item1_subItem1',
// 							brand: 'prodtBrand',
// 							model: 'ModelX44',
// 							remarks: 'dummyRemarks',
// 							quantity: '222',
// 							unit: 'Unit',
// 							unit_cost: '300.0',
// 							total_cost: '3000.0',
// 							margin: '0.8',
// 							unit_price: '375',
// 							total_price: '3750',
// 						},
// 						{
// 							sub_item_id: 'd23c57b7-38c1-45c4-a253-f8f7affe0447',
// 							item_id: '09ee02e9-8115-42ad-8648-74c901b96940',
// 							product_desc: 'item1_subItem2',
// 							brand: 'prodtBrand',
// 							model: 'ModelX55',
// 							remarks: 'dummyRemarks',
// 							quantity: '444',
// 							unit: 'Unit',
// 							unit_cost: '300.0',
// 							total_cost: '3000.0',
// 							margin: '0.8',
// 							unit_price: '375',
// 							total_price: '3750',
// 						},
// 					],
// 				},
// 				{
// 					item_id: '7043ac52-22c1-474c-898c-ae4a3d8d44aa',
// 					quotation_rev_id: '998bf269-5741-4445-83ca-f251cb608c5e',
// 					product_desc: 'item2',
// 					brand: 'prodtBrand2',
// 					model: 'ModelX2',
// 					remarks: 'dummyRemarks2',
// 					quantity: '3',
// 					unit: 'Unit2',
// 					unit_cost: '300.0',
// 					total_cost: '3000.0',
// 					margin: '0.8',
// 					unit_price: '375',
// 					total_price: '3750',
// 					sub_items: [
// 						{
// 							sub_item_id: '24e651fe-720e-4aa3-bd25-95398b39e440',
// 							item_id: '7043ac52-22c1-474c-898c-ae4a3d8d44aa',
// 							product_desc: 'item2_subItem1',
// 							brand: 'prodtBrand',
// 							model: 'ModelX444',
// 							remarks: 'dummyRemarks',
// 							quantity: '3',
// 							unit: 'Unit',
// 							unit_cost: '300.0',
// 							total_cost: '3000.0',
// 							margin: '0.8',
// 							unit_price: '375',
// 							total_price: '3750',
// 						},
// 					],
// 				},
// 				{
// 					item_id: 'fca38a36-659a-4e68-84f5-3c95eea6e9cb',
// 					quotation_rev_id: '998bf269-5741-4445-83ca-f251cb608c5e',
// 					product_desc: 'item3',
// 					brand: 'prodtBrand2',
// 					model: 'ModelX2',
// 					remarks: 'dummyRemarks2',
// 					quantity: '3',
// 					unit: 'Unit2',
// 					unit_cost: '300.0',
// 					total_cost: '3000.0',
// 					margin: '0.8',
// 					unit_price: '375',
// 					total_price: '3750',
// 					sub_items: [],
// 				},
// 			],
// 			reference_status: '-',
// 			note: '-',
// 			total: '12400.0',
// 			g_total: '12400.0',
// 		},
// 	],
// };

const ViewQuotation = () => {
	//const location = useLocation();
	const { quotation_rev_id } = useParams();

	// const [quotationRevData, setQuotationRevData] = useState<QuotationDataType.QuotationData>();
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
			}).catch((err) => {
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Info' size='lg' className='me-1' />
						<span>Error</span>
					</span>,
					'Error: ' + err,
				);
			});
	};

	//const quotation_rev_id = location.state.quotation_rev_id;
	useEffect(() => {
		setQuotationRevData(null);
		if (quotation_rev_id) {
			fetchQuotationRevData(quotation_rev_id);
		}
	}, [quotation_rev_id]);

	return (
		<>
			{quotationRevData? (
				<FormProviderQuotation data={quotationRevData}>
					<Quotation mode={'view'} quotation_id={quotationRevData.quotation_id}
					quotation_rev_id={quotation_rev_id} 
					quotation_no={quotationRevData.quotation_no}
					status={quotationRevData.status}
					revision={quotationRevData.revision}
					variance={quotationRevData.variance}
					//section_mode={quotationRevData.is_section_valid} //TODO:
					/>
				</FormProviderQuotation>
			) : (
				<></>
			)}
		</>
	);
};

export default ViewQuotation;
