import React, { useState } from 'react';
import Card, {
	CardBody,
	CardFooter,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Button from '../../../../components/bootstrap/Button';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Dropzone from './Dropzone';
import axios from 'axios';
import { JSX } from 'react/jsx-runtime';
import Icon from '../../../../components/icon/Icon';
import { useFormik } from 'formik';

type TrackingDetailsProps = {
	quotation_id?: string;
};

// type TrackingDetailsData = {
// 	po_no: string;
// 	po_date: string;
// 	po_amount: number;
// 	so_no: string;
// 	invoice_no: string;
// 	invoice_date: string;
// 	payment_terms: string;
// 	invoice_amount: 0;
// 	remarks: string;
// 	status_overwrite: string;
// };

const TrackingDetailsForm = (props: TrackingDetailsProps) => {
	const [po_attachment_ids, set_po_attachment_ids] = useState<string[]>([]);
	const [so_attachment_ids, set_so_attachment_ids] = useState<string[]>([]);
	const [invoice_attachment_ids, set_invoice_attachment_ids] = useState<string[]>([]);

	const UpdateAttachmentIdsByType = (ids: string[], type: string) => {
		switch (type) {
			case 'po': {
				set_po_attachment_ids(ids);
				break;
			}
			case 'so': {
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

	const formik = useFormik({
		initialValues: {
			po_no: '',
			po_date: '',
			po_amount: 0,
			so_no: '',
			invoice_no: '',
			invoice_date: '',
			payment_terms: '',
			invoice_amount: 0,
			remarks: '',
			status_overwrite: '',
		},
		enableReinitialize: true,
		validate: (values) => {
			const errors: {
				po_no?: string;
				po_date?: string;
				po_amount?: number;
				so_no?: string;
				invoice_no?: string;
				invoice_date?: string;
				payment_terms?: string;
				invoice_amount?: 0;
				remarks?: string;
				status_overwrite?: string;
			} = {};

			// if (!values.name) {
			// 	errors.name = 'Required';
			// }
			// if (!values.role) {
			// 	errors.role = 'Required';
			// }
			// if (!values.email) {
			// 	errors.email = 'Required';
			// }

			return errors;
		},
		onSubmit: async (values) => {
			//await handleSubmit(values);
			const payload = Object.assign(
				{
					po_attachment_list: po_attachment_ids,
					so_attachment_list: so_attachment_ids,
					invoice_attachment_list: invoice_attachment_ids,
				},
				values,
			);

			console.log(JSON.stringify(payload));
		},
	});

	// const handleSubmit = async(values: any) => {
	// 	const config = {
	// 		headers: { Authorization: `${localStorage.getItem('bts_token')}` },
	// 	};

	// 	const payload = {
	// 		name: values.name,
	// 		role: values.role,
	// 		email: values.email,
	// 		view_quotation: values.view_quotation,
	// 		write_quotation: values.write_quotation,
	// 		view_mccr: values.view_mccr,
	// 		write_mccr: values.write_mccr,
	// 	};

	// 	axios
	// 		.put(import.meta.env.VITE_BASE_URL + `/users/${user_id}`, payload, config)
	// 		.then((response) => {
	// 			showNotification(
	// 				<span className='d-flex align-items-center'>
	// 					<Icon icon='Info' size='lg' className='me-1' />
	// 					<span>Updated Successfully</span>
	// 				</span>,
	// 				'User Updated.',
	// 			);

	// 		})
	// 		.catch((errors) =>
	// 			showNotification(
	// 				<span className='d-flex align-items-center'>
	// 					<Icon icon='Info' size='lg' className='me-1' />
	// 					<span>Error!</span>
	// 				</span>,
	// 				errors,
	// 			)
	// 		);
	// };

	return (
		<>
			<div className='col-md-12'>
				<div className='row g-4'>
					<div className='col-md-4'>
						<span className='text-muted'>Tracking Revision: 12</span>
					</div>
					<div className='col-md-4'>
						<span className='text-muted'>Last Updated By: {'tester@email.com'}</span>
					</div>
					<div className='col-md-4'>
						<span className='text-muted'>
							Last Updated: {'Sun, 08 Dec 2024 04:39:12 GMT'}
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
									attachment_type='po'
									attachment_list={[]}
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
							<div className='col-md-4'>
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
							<div className='col-md-12'>
								<Dropzone
									attachment_type='so'
									attachment_list={[]}
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
									attachment_list={[]}
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
function showNotification(arg0: JSX.Element, arg1: string) {
	throw new Error('Function not implemented.');
}
