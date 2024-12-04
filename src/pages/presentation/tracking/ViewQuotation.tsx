import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/bootstrap/Button';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import QUOTATION_STATUS from '../../../common/data/enumQuotationStatus';
import Badge from '../../../components/bootstrap/Badge';
import Page from '../../../layout/Page/Page';
import Card, {
	CardBody,
	CardFooter,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Nav, { NavItem, NavLinkDropdown } from '../../../components/bootstrap/Nav';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import ManageItem from './components/ManageItem';
import AttachmentsView from './components/AttachmentsView';
import RevisionsView from './components/RevisionsView';
import Dropdown, {
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from '../../../components/bootstrap/Dropdown';
import QuotationDataType from '../../dataTypes/QuotationDataType';
import QuotationView from './components/QuotationView';

// const Quotation = {
// 	quotation_id: 'ad399d47-a038-4fb4-9f31-2f142c143611',
// 	quotation_data: [
// 		{
// 			quotation_no: '24001S1-TGH',
// 			quotation_id: 'ad399d47-a038-4fb4-9f31-2f142c143611',
// 			quotation_rev_id: 'c33d08b9-8ec3-41a1-8b0a-66033a3c7214',
// 			revision: 1,
// 			variance: 1,
// 			quotation_date: '31/01/2024',
// 			client: 'client_name',
// 			end_user: 'someEndUserName',
// 			site_location: 'Penang',
// 			building: 'PG1',
// 			pic: '123',
// 			//email: 'sometester@gmail.com',
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
//                     estimated_cost: 300,
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
// 			],
// 			reference_status: '-',
// 			note: '-',
// 			total: '12400.0',
// 			g_total: '12400.0',
// 			status: 'completed',
// 			client_code: 'cliencode',
// 			pic_contact_number: '123',
// 			pic_email: 'email',
// 		},
// 	],
// };

const Quotation = {
	building: 'password1212',
	client: 'password112',
	client_code: 'test_client_code',
	created_at: 'Wed, 04 Dec 2024 02:40:11 GMT',
	created_by: 'tester1',
	end_user: 'Ade1234412',
	grand_total: 1000,
	items: [
		{
			brand: 'Emeka123412',
			estimated_cost: false,
			margin: 0.8,
			margin_percentage: 20.0,
			model: 'Ade1234412',
			product_description: '12345',
			quantity: 1,
			remarks: 'Quotation retrieved.',
			item_id: '09ee02e9-8115-42ad-8648-74c901b96940',
			quotation_revision_id: 'ebeec1eb-008e-4586-bfa8-db39213e2691',
			sub_items: [
				{
					sub_item_id: '60c07ea8-f677-4e0c-b232-8756842ee174',
					item_id: '09ee02e9-8115-42ad-8648-74c901b96940',
					brand: 'Emeka123412',
					estimated_cost: false,
					margin: 0.8,
					margin_percentage: 20.0,
					model: 'Ade1234412',
					product_description: '12345',
					quantity: 1,
					remarks: 'Quotation retrieved.',
					total_cost: 1.2,
					total_price: 1.2,
					unit: '1',
					unit_cost: 1.2,
					unit_price: 1.2,
				},
			],
			total_cost: 1.2,
			total_price: 1.2,
			unit: '1',
			unit_cost: 1.2,
			unit_price: 1.2,
		},
	],
	lead_time: 'dummy_lead_time',
	message: 'Quotation ebeec1eb-008e-4586-bfa8-db39213e2691 created.',
	note: '12312',
	payment_terms: 'dummypayment',
	pic: 'Ade1234212',
	pic_contact_number: '1234567',
	pic_email: 'picEmail@email.com',
	project_reference: 'Emeka123412',
	quotation_id: '9e999f60-27fd-436d-925d-2c0e83f8b3b2',
	quotation_no: 'Quotation-20240001-password112-R0',
	quotation_revision_id: 'ebeec1eb-008e-4586-bfa8-db39213e2691',
	reference_status: '34234',
	revision: 0,
	site_location: 'Emeka1234512',
	status: 'submitted',
	total_cost: 1000,
	validity: 'dummyvalidity',
	variance: 1,
};

const ViewQuotation = () => {
	const { quotation_id, variance } = useParams();

	const [trackingData, setTrackingData] = useState<any>();

	const fetchTrackingData = async (quotation_id: string) => {
		const config = {
			headers: { Authorization: `${localStorage.getItem('bts_token')}` },
		};
		axios
			.get(
				import.meta.env.VITE_BASE_URL + `/quotation/latest_revisions/${quotation_id}`,
				config,
			)
			.then((response) => {
				//console.log(response.data.data);
				setTrackingData(response.data.data);
			});
	};

	useEffect(() => {
		setTrackingData(null);
		if (quotation_id) {
			fetchTrackingData(quotation_id);	
		}
		//console.log(trackingData);
	}, [quotation_id]);


	return (
		<>
			{trackingData? (
				<QuotationView data={trackingData} variance={variance} quotation_id={quotation_id}/>
			):(<></>)}
		</>
	);
};

export default ViewQuotation;
