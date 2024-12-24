import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FormProviderTrackingDetails } from '../trackingDetails/TrackingDetailsForm';
import TrackingDetails from '../trackingDetails/TrackingDetails';

type TrackingDetailsProps = {
	quotation_id?: string;
};

const dummyData = {
	quotation_id: 'ec3f4de1-4807-4927-9bef-b087a65c7d37',
	remarks: 'This is a remark for the tracking list.',
	status_overwrite: 'Pending',
	purchase_order: [
		{
			po_no: 'PO12345',
			po_date: '2023-10-01',
			po_amount: 1000.0,
			po_attachments: [{
				created_at: "Tue, 24 Dec 2024 02:35:45 GMT",
        		created_by: "<User 'tester1@email.com'>",
				filename: "2024_hatyai_aia.pdf",
				id: "7a13e2c4-10ad-4893-8472-66556834c967",
				size: 1092876
			}],
			order: 1,
		},
		{
			po_no: 'PO12345_2',
			po_date: '2023-10-01',
			po_amount: 1000.0,
			po_attachments: [],
			order: 2,
		},
	],
	sale_order: [
		{
			so_no: 'SO12345',
			so_date: '2023-10-02',
			so_attachments: [],
			order: 1,
		},
		{
			so_no: 'SO12345',
			so_date: '2023-10-02',
			so_attachments: [],
			order: 2,
		},
	],
	invoice: [
		{
			invoice_no: 'INV12345',
			invoice_date: '2023-10-03',
			invoice_amount: 1500.0,
			payment_terms: 'Net 30',
			invoice_attachments: [],
			order: 1,
		},
		{
			invoice_no: 'INV12345',
			invoice_date: '2023-10-03',
			invoice_amount: 1500.0,
			payment_terms: 'Net 30',
			invoice_attachments: [],
			order: 2,
		},
	],
};

const TrackingDetailsView = (props: TrackingDetailsProps) => {
	const [trackingData, setTrackingData] = useState<any>();

	const fetchTrackingData = async (quotation_id?: string) => {
		const config = {
			headers: { Authorization: `${localStorage.getItem('bts_token')}` },
		};
		axios
			.get(import.meta.env.VITE_BASE_URL + `/tracking_list/quotation/${quotation_id}`, config)
			.then((response) => {
				//console.log(response.data);
				setTrackingData(response.data);
			});
	};

	useEffect(() => {
		// if (props.quotation_id) {
		// 	fetchTrackingData(props.quotation_id);
		// }

		//debug
		setTrackingData(dummyData);
	}, []);

	return (
		<>
			{trackingData ? (
				<FormProviderTrackingDetails data={trackingData}>
					<TrackingDetails
					//mode={'view'}
					//quotation_id={quotationRevData.quotation_id}
					/>
				</FormProviderTrackingDetails>
			) : (
				<></>
			)}
		</>
	);
};

export default TrackingDetailsView;
