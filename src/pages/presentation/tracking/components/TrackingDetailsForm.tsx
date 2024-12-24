import React, { useEffect, useState } from 'react';
import Card, {
	CardBody,
	CardFooter,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import showNotification from '../../../../components/extras/showNotification';
import Button from '../../../../components/bootstrap/Button';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Dropzone from './Dropzone';
import axios from 'axios';
import { JSX } from 'react/jsx-runtime';
import Icon from '../../../../components/icon/Icon';
import { useFormik } from 'formik';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone'
import { dayjsLocalizer } from 'react-big-calendar';

dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(timezone);

type TrackingDetailsProps = {
	quotation_id?: string;
};

type TrackingDataType = {
	tracking_list_id: string;
	purchase_order: PurchaseOrderType;
	sale_order: SaleOrderType;
	invoice: InvoiceType;
	remarks: string;
	status_overwrite: string;
	revision: number;
	created_by: string;
	created_at: string;
};

type PurchaseOrderType = {
	po_no: string;
	po_date: string;
	po_amount: number;
	po_attachments: AttachmentFileType[];
}

type InvoiceType = {
	invoice_no: string;
	invoice_date: string;
	payment_terms: string;
	invoice_amount: number;
	invoice_attachments: AttachmentFileType[];
}

type SaleOrderType = {
	so_no: string;
	so_date: string;
	so_attachments: AttachmentFileType[];
}


type AttachmentFileType = {
	created_at: string;
	created_by: string;
	filename: string;
	id: string;
	size: number;
}
const TrackingDetailsForm = (props: TrackingDetailsProps) => {
	const [trackingData, setTrackingData] = useState<TrackingDataType>();
	const [po_attachment_ids, set_po_attachment_ids] = useState<string[]>([]);
	const [so_attachment_ids, set_so_attachment_ids] = useState<string[]>([]);
	const [invoice_attachment_ids, set_invoice_attachment_ids] = useState<string[]>([]);

	const UpdateAttachmentIdsByType = (ids: string[], type: string) => {
		switch (type) {
			case 'purchase_order': {
				set_po_attachment_ids(ids);
				break;
			}
			case 'sale_order': {
				set_so_attachment_ids(ids);
				break;
			}
			case 'invoice': {
				set_invoice_attachment_ids(ids);
				break;
			}
			default: {
				break;
			}
		}
	};

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
		if (props.quotation_id) {
			fetchTrackingData(props.quotation_id);
		}
	}, []);

	const formik = useFormik({
		initialValues: {
			po_no: trackingData? trackingData.purchase_order.po_no: '',
			po_date: trackingData? (dayjs.utc(`${trackingData.purchase_order.po_date}`).local().format('YYYY-MM-DD')): '',
			po_amount: trackingData? trackingData.purchase_order.po_amount: '',
			so_no: trackingData? trackingData.sale_order.so_no: '',
			so_date: trackingData? (dayjs.utc(`${trackingData.sale_order.so_date}`).local().format('YYYY-MM-DD')): '',
			invoice_no: trackingData? trackingData.invoice.invoice_no: '',
			invoice_date: trackingData? (dayjs.utc(`${trackingData.invoice.invoice_date}`).local().format('YYYY-MM-DD')): '',
			payment_terms: trackingData? trackingData.invoice.payment_terms: '',
			invoice_amount: trackingData? trackingData.invoice.invoice_amount: '',
			remarks: trackingData? trackingData.remarks: '',
			status_overwrite: trackingData? trackingData.status_overwrite: '',
		},
		enableReinitialize: true,
		validate: (values) => {
			const errors: {
				po_no?: string;
				po_date?: string;
				po_amount?: string;
				so_no?: string;
				so_date?: string;
				invoice_no?: string;
				invoice_date?: string;
				payment_terms?: string;
				invoice_amount?: string;
				remarks?: string;
				status_overwrite?: string;
			} = {};

			// if (!values.po_no) {
			// 	errors.po_no = 'Required';
			// }
			// if (!values.po_date) {
			// 	errors.po_date = 'Required';
			// }
			// if (Number(values.po_amount) < 0) {
			// 	errors.po_amount = 'po_amount must be more than 0';
			// }
			// if (Number(values.po_amount) < 0) {
			// 	errors.po_amount = 'po_amount must be more than 0';
			// }

			return errors;
		},
		onSubmit: async (values) => {
			//await handleSubmit(values);
			const payload = Object.assign(
				{
					quotation_id: props.quotation_id,
					remarks: values.remarks,
					status_overwrite: values.status_overwrite,
					purchase_order: {
						po_no: values.po_no,
						po_date: convertToUTC(values.po_date),
						po_amount: values.po_amount,
						attachments: po_attachment_ids,
					},
					sale_order:{
						so_no: values.so_no,
						so_date: convertToUTC(values.so_date),
						attachments: so_attachment_ids,
					},
					invoice: {
						invoice_no: values.invoice_no,
						invoice_date: convertToUTC(values.invoice_date),
						invoice_amount: values.invoice_amount,
						payment_terms: values.payment_terms,
						attachments: invoice_attachment_ids,
					}
				},
			);

			//console.log(JSON.stringify(payload));
			handleSubmit(payload);
		},
	});

	const convertToUTC = (date:string, dateFormat='YYYY-MM-DD', tz=dayjs.tz.guess())  => {
		return dayjs.tz(date, dateFormat, tz).utc().format("YYYY-MM-DDTHH:mm:ss");
		//return "2023-10-03";
	}

	const handleSubmit = async(payload: any) => {
		const config = {
			headers: { Authorization: `${localStorage.getItem('bts_token')}` },
		};

		if(trackingData){
			//put
			axios
			.put(import.meta.env.VITE_BASE_URL + `/tracking_list/${trackingData.tracking_list_id}`, payload, config)
			.then((response) => {
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Info' size='lg' className='me-1' />
						<span>Updated Successfully</span>
					</span>,
					'Tracking Details Updated.',
				);

			})
			.catch((errors) =>
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Info' size='lg' className='me-1' />
						<span>Error!</span>
					</span>,
					errors,
				)
			);

		}else{
			//create
			axios
			.post(import.meta.env.VITE_BASE_URL + `/tracking_list/`, payload, config)
			.then((response) => {
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Info' size='lg' className='me-1' />
						<span>Updated Successfully</span>
					</span>,
					'Tracking Details Updated.',
				);

			})
			.catch((errors) =>
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Info' size='lg' className='me-1' />
						<span>Error!</span>
					</span>,
					errors,
				)
			);
			

		}
	};

	return (
		<>
			<div className='col-md-12'>
				<div className='row g-4' hidden={!trackingData}>
					<div className='col-md-4'>
						<span className='text-muted'>Tracking Revision: {trackingData?.revision}</span>
					</div>
					<div className='col-md-4'>
						<span className='text-muted'>Last Updated By: {trackingData?.created_by}</span>
					</div>
					<div className='col-md-4'>
						<span className='text-muted'>
							Last Updated: {dayjs.utc(`${trackingData?.created_at}`).local().format('DD-MM-YYYY HH:mm:ss',)}
						</span>
					</div>
				</div>
			</div>
			<br />
			<form>
				<Card shadow='none' borderSize={2} borderColor={'light'}>
					<CardHeader>
						<CardLabel>
							<CardTitle tag='div' className='h4'>
								Purchase Order
							</CardTitle>
						</CardLabel>
					</CardHeader>
					<CardBody className='pb-0'>
						<div className='row g-4'>
							<div className='col-md-3'>
								<FormGroup id='po_no' label='PO No.'>
									<Input
										placeholder='Enter PO No.'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.po_no}
										isValid={formik.isValid}
										isTouched={formik.touched.po_no}
										invalidFeedback={formik.errors.po_no}
										validFeedback='Valid PO No.'
									/>
								</FormGroup>
							</div>
							<div className='col-md-3'>
								<FormGroup id='po_date' label='PO Date.'>
									<Input
										placeholder='Enter PO Date'
										type='date'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.po_date}
										isValid={formik.isValid}
										isTouched={formik.touched.po_date}
										invalidFeedback={formik.errors.po_date}
										validFeedback='Valid PO Date.'
									/>
								</FormGroup>
							</div>
							<div className='col-md-3'>
								<FormGroup id='po_amount' label='PO Amount.'>
									<Input
										type='number'
										placeholder='Enter PO Amount'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.po_amount}
										isValid={formik.isValid}
										isTouched={formik.touched.po_amount}
										invalidFeedback={formik.errors.po_amount}
										validFeedback='Valid PO Amount'
									/>
								</FormGroup>
							</div>
							<div className='col-md-12'>
								<Dropzone
									attachment_type='purchase_order'
									attachment_list={(trackingData?.purchase_order.po_attachments)? trackingData?.purchase_order.po_attachments: []}
									setAttachmentIds={UpdateAttachmentIdsByType}
								/>
							</div>
						</div>
					</CardBody>
					<CardFooter>
						<></>
					</CardFooter>
				</Card>

				<Card shadow='none' borderSize={2} borderColor={'light'}>
					<CardHeader>
						<CardLabel>
							<CardTitle tag='div' className='h4'>
								Sales Order
							</CardTitle>
						</CardLabel>
					</CardHeader>
					<CardBody className='pb-0'>
						<div className='row g-4'>
							<div className='col-md-3'>
								<FormGroup id='so_no' label='SO No.'>
									<Input
										placeholder='Enter SO No.'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.so_no}
										isValid={formik.isValid}
										isTouched={formik.touched.so_no}
										invalidFeedback={formik.errors.so_no}
										validFeedback='Valid SO No.'
									/>
								</FormGroup>
							</div>
							<div className='col-md-3'>
								<FormGroup id='so_date' label='SO Date.'>
									<Input
										placeholder='Enter SO Date'
										type='date'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.so_date}
										isValid={formik.isValid}
										isTouched={formik.touched.so_date}
										invalidFeedback={formik.errors.so_date}
										validFeedback='Valid SO Date.'
									/>
								</FormGroup>
							</div>
							<div className='col-md-12'>
								<Dropzone
									attachment_type='sale_order'
									attachment_list={(trackingData?.sale_order.so_attachments)? trackingData?.sale_order.so_attachments: []}
									setAttachmentIds={UpdateAttachmentIdsByType}
								/>
							</div>
						</div>
					</CardBody>
					<CardFooter>
						<></>
					</CardFooter>
				</Card>

				<Card shadow='none' borderSize={2} borderColor={'light'}>
					<CardHeader>
						<CardLabel>
							<CardTitle tag='div' className='h4'>
								Invoice
							</CardTitle>
						</CardLabel>
					</CardHeader>
					<CardBody className='pb-0'>
						<div className='row g-4'>
							<div className='col-md-3'>
								<FormGroup id='invoice_no' label='Invoice No.'>
									<Input
										placeholder='Enter Invoice No.'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.invoice_no}
										isValid={formik.isValid}
										isTouched={formik.touched.invoice_no}
										invalidFeedback={formik.errors.invoice_no}
										validFeedback='Valid Invoice No.'
									/>
								</FormGroup>
							</div>
							<div className='col-md-3'>
								<FormGroup id='invoice_date' label='Invoice Date.'>
									<Input
										placeholder='Enter Invoice Date'
										type='date'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.invoice_date}
										isValid={formik.isValid}
										isTouched={formik.touched.invoice_date}
										invalidFeedback={formik.errors.invoice_date}
										validFeedback='Valid Invoice Date.'
									/>
								</FormGroup>
							</div>
							<div className='col-md-3'>
								<FormGroup id='payment_terms' label='Payment Terms'>
									<Input
										placeholder='Enter Payment Terms'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.payment_terms}
										isValid={formik.isValid}
										isTouched={formik.touched.payment_terms}
										invalidFeedback={formik.errors.payment_terms}
										validFeedback='Valid Payment Terms'
									/>
								</FormGroup>
							</div>
							<div className='col-md-3'>
								<FormGroup id='invoice_amount' label='Invoice Amount'>
									<Input
										type='number'
										placeholder='Enter Invoice Amount'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.invoice_amount}
										isValid={formik.isValid}
										isTouched={formik.touched.invoice_amount}
										invalidFeedback={formik.errors.invoice_amount}
										validFeedback='Valid Invoice Amount'
									/>
								</FormGroup>
							</div>
							<div className='col-md-12'>
								<Dropzone
									attachment_type='invoice'
									attachment_list={(trackingData?.invoice.invoice_attachments)? trackingData?.invoice.invoice_attachments: []}
									setAttachmentIds={UpdateAttachmentIdsByType}
								/>
							</div>
						</div>
					</CardBody>
					<CardFooter>
						<></>
					</CardFooter>
				</Card>

				<Card shadow='none' borderSize={2} borderColor={'light'}>
					<CardBody className='pb-0'>
						<div className='row g-4'>
							<div className='col-md-3'>
								<FormGroup id='remarks' label='Remarks'>
									<Input
										placeholder='Enter Remarks'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.remarks}
										isValid={formik.isValid}
										isTouched={formik.touched.remarks}
										invalidFeedback={formik.errors.remarks}
										validFeedback='Valid Remarks'
									/>
								</FormGroup>
							</div>
							<div className='col-md-3'>
								<FormGroup id='status_overwrite' label='Status Overwrite'>
									<Input
										placeholder='Enter Status Overwrite'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.status_overwrite}
										isValid={formik.isValid}
										isTouched={formik.touched.status_overwrite}
										invalidFeedback={formik.errors.status_overwrite}
										validFeedback='Valid Status Overwrite'
									/>
								</FormGroup>
							</div>
							<div className='col-md-12'></div>
						</div>
					</CardBody>
					<CardFooter>
						<CardFooterRight>
							<Button color='success' isLight onClick={formik.submitForm}>
								Save
							</Button>
						</CardFooterRight>
					</CardFooter>
				</Card>
			</form>
		</>
	);
};

export default TrackingDetailsForm;
