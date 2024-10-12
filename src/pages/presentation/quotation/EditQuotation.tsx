import React from 'react';
import SingleQuotation from './components/SingleQuotation';

const EditQuotation = () => {
	const QuotationData = {
		quotation_id: '1',
		client: 'client_name',
		end_user: 'someEndUserName',
		site_location: 'Penang',
		building: 'PG1',
		pic: '123',
		email: 'sometester@gmail.com',
		project_ref: 'abcProject',
		item: [
			{
				item_id: '33',
				product_desc: 'productDesc',
				brand: 'prodtBrand',
				model: 'ModelX',
				remarks: 'dummyRemarks',
				quantity: 3,
				unit: 'Unit',
				unit_cost: 300.0,
				total_cost: 3000.0,
				margin: 0.8,
				unit_price: 375,
				total_price: 3750,
				sub_item: [
					{
						sub_item_id: '44',
						product_desc: 'productDesc',
						brand: 'prodtBrand',
						model: 'ModelX44',
						remarks: 'dummyRemarks',
						quantity: 3,
						unit: 'Unit',
						unit_cost: 300.0,
						total_cost: 3000.0,
						margin: 0.8,
						unit_price: 375,
						total_price: 3750,
					},
					{
						sub_item_id: '55',
						product_desc: 'productDesc',
						brand: 'prodtBrand',
						model: 'ModelX55',
						remarks: 'dummyRemarks',
						quantity: 3,
						unit: 'Unit',
						unit_cost: 300.0,
						total_cost: 3000.0,
						margin: 0.8,
						unit_price: 375,
						total_price: 3750,
					},
				],
			},
			{
				item_id: '66',
				product_desc: 'productDesc2',
				brand: 'prodtBrand2',
				model: 'ModelX2',
				remarks: 'dummyRemarks2',
				quantity: 3,
				unit: 'Unit2',
				unit_cost: 300.0,
				total_cost: 3000.0,
				margin: 0.8,
				unit_price: 375,
				total_price: 3750,
				sub_item: [],
			},
		],
		summary: {
			reference_status: '-',
			note: '-',
			total: 12400.0,
			g_total: 12400.0,
		},
	};

	return <SingleQuotation mode='Edit' data={QuotationData} />;
};

export default EditQuotation;
