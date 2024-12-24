import React, { useEffect } from 'react';
import { useFormContextTrackingDetails } from './TrackingDetailsForm';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import Card, { CardBody, CardFooter, CardFooterRight } from '../../../../components/bootstrap/Card';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Button from '../../../../components/bootstrap/Button';
import ManagePO from './ManagePO';
import ManageSO from './ManageSO';
import ManageInvoice from './ManageInvoice';

dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(timezone);

type TrackingDetailsProps = {
	//mode: 'create' | 'view' | 'edit';
	quotation_id?: string;
	revision?: number;
	created_by?: string;
	created_at?: string;
};

const TrackingDetails = (props: TrackingDetailsProps) => {
	const {
		register,
		formState: { errors, isSubmitting },
		watch,
		handleSubmit,
		setValue,
		control,
	} = useFormContextTrackingDetails();
	const formData = watch();

	// useEffect(() => {
	// 		// if (props.quotation_id) {
	// 		// 	fetchTrackingData(props.quotation_id);
	// 		// }
	
	// 		//debug
	// 		console.log(JSON.stringify(formData));
	// 	}, [formData]);

	return (
		<>
			<div className='col-md-12'>
				<div className='row g-4' hidden={!props.revision}>
					<div className='col-md-4'>
						<span className='text-muted'>Tracking Revision: {props.revision}</span>
					</div>
					<div className='col-md-4'>
						<span className='text-muted'>Last Updated By: {props.created_by}</span>
					</div>
					<div className='col-md-4'>
						<span className='text-muted'>
							Last Updated:{' '}
							{dayjs
								.utc(`${props.created_at}`)
								.local()
								.format('DD-MM-YYYY HH:mm:ss')}
						</span>
					</div>
				</div>
			</div>
			<br />
			<form
			onSubmit={handleSubmit(async (data) => {
				console.log("hihi");
				//API call

				//post process attachment ids


				//post process order
			
				let po_list = [];
				let so_list = [];
				let invoice_list = [];
				for (var i = 0; i < data.purchase_order.length; i++) {
					let po = Object.assign({
						po_no: data.purchase_order[i].po_no,
						po_date: data.purchase_order[i].po_no,
						po_amount: data.purchase_order[i].po_no,
						po_attachments: data.purchase_order[i].temp_attachment_ids,
						order: i + 1
					});
					po_list.push(po);
				}
				for (var i = 0; i < data.sale_order.length; i++) {
					let so = Object.assign({
						so_no: data.sale_order[i].so_no,
						so_date: data.sale_order[i].so_date,
						so_attachments: data.sale_order[i].temp_attachment_ids,
						order: i + 1
					});
					so_list.push(so);
				}
				for (var i = 0; i < data.invoice.length; i++) {
					let invoice = Object.assign({
						invoice_no: data.invoice[i].invoice_no,
						invoice_date: data.invoice[i].invoice_no,
						invoice_amount: data.invoice[i].invoice_amount,
						payment_terms: data.invoice[i].payment_terms,
						po_attachments: data.invoice[i].temp_attachment_ids,
						order: i + 1
					});
					invoice_list.push(invoice);
				}


				let payload = {
					quotation_id: props.quotation_id,
					remarks: data.remarks,
					purchase_order: po_list,
					sale_order: so_list,
					invoice: invoice_list
				};

				console.log('Form submitted (attachment): ', JSON.stringify(payload));

			})}
			>
				<Card shadow='none' borderSize={2} borderColor={'light'}>
					<CardBody className='pb-0'>
						<div className='row g-4'>
							<div className='col-md-12'>
								<ManagePO />
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
							<div className='col-md-12'>
								<ManageSO />
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
							<div className='col-md-12'>
								<ManageInvoice />
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
									<input
										id='remarks'
										className={
											'form-control ' + (errors.remarks ? 'is-invalid' : '')
										}
										{...register('remarks')}
										type='text'
										placeholder='remarks'
										//disabled={isViewMode}
									/>
									<>
										{errors.remarks ? (
											<div className='invalid-feedback'>
												{errors.remarks.message}
											</div>
										) : (
											''
										)}
									</>
								</FormGroup>
							</div>
							<div className='col-md-12'></div>
						</div>
					</CardBody>
					<CardFooter>
						<CardFooterRight>
							<Button color='success' type='submit'>
								Save
							</Button>
						</CardFooterRight>
					</CardFooter>
				</Card>
			</form>
		</>
	);
};

export default TrackingDetails;
