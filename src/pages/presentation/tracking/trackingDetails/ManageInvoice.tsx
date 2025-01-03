import React, { useEffect, useState } from 'react';
import { useFormContextTrackingDetails } from './TrackingDetailsForm';
import { useFieldArray } from 'react-hook-form';
import Accordion, { AccordionItem } from '../../../../components/bootstrap/Accordion';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Button from '../../../../components/bootstrap/Button';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Dropzone from './Dropzone';
import { default_leadTimeOptions, default_paymentTermsOptions, default_validityOptions } from '../../../../common/getDefaultOptions';
import axios from 'axios';

const ManageInvoice = () => {
	const {
		register,
		control,
		formState: { errors },
		watch,
		setValue,
	} = useFormContextTrackingDetails();
	const formData = watch();

	const { append, remove, fields } = useFieldArray({
		name: `invoice`,
		control,
	});

	const addInvoice = () => {
		append({
			invoice_no: '',
			invoice_date: '',
			invoice_amount: 0,
			payment_terms: '',
			invoice_attachments: [],
			temp_attachment_ids: [],
			order: 0,
		});
	};

	const update_attachment_ids = (index: number, ids: string[]) => {
		setValue(`invoice.${index}.temp_attachment_ids`, ids);
	};

	const [leadTimeOptions, setLeadTimeOptions] = useState<string[]>();
	const [paymentTermsOptions, setPaymentTermsOptions] = useState<string[]>();
	const [validityOptions, setValidityOptions] = useState<string[]>();

	useEffect(() => {
		getOptionsByName("payment_terms");
		getOptionsByName("validity");
		setLeadTimeOptions(default_leadTimeOptions); //TBD
	}, []);
	
	const getOptionsByName = async (option_name: string) => {
		let res = [];
	
		const config = {
			headers: { Authorization: `${localStorage.getItem('bts_token')}` },
		};
	
		axios
			.get(import.meta.env.VITE_BASE_URL + `/option/values/${option_name}`, config)
			.then((response) => {
				if (response.data.option_values) {
					for (var i = 0; i < response.data.option_values.length; i++) {
						res.push(response.data.option_values[i].option_value.toString());
					}
				}	
				//return res;
				switch (option_name) {
					case 'payment_terms': {
						return setPaymentTermsOptions([''].concat(res));
					}
					
					case 'lead_time': {
						return setLeadTimeOptions([''].concat(res));
					}
					case 'validity': {
						return setValidityOptions([''].concat(res));
					}
					default: {
						break;
					}
				}
			})
			.catch((errors) => {
				switch (option_name) {
					case 'payment_terms': {
						return default_paymentTermsOptions;
					}
					case 'lead_time': {
						return default_leadTimeOptions;
					}
					case 'validity': {
						return default_validityOptions;
					}
					default: {
						break;
					}
				}
			});
	};

	fields.sort((a,b) => a.order < b.order ? -1 : a.order > b.order ? 1 : 0);

	return (
		<div className='pb-0'>
			<div className='row g-4'>
				<div className='col-md-12'>
					<div className='row g-4'>
						{fields.map((invoice, invoiceIndex) => { 
							return (
								<div className='col-xl-12'  key={invoiceIndex}>
									<Accordion
										id='invoiceAccordion'
										color='dark'
										activeItemId={'invoiceAccordionItem_' + invoiceIndex}>
										<AccordionItem
											id={'invoiceAccordionItem_' + invoiceIndex}
											title={'Invoice ' + (+invoiceIndex + +1)}>
											<Card
												id={'#invoice_card_id#' + invoiceIndex}
												key={invoiceIndex}
												shadow='none'
												borderSize={1}
												borderColor='light'>
												<CardHeader>
													<CardLabel>
														<CardTitle tag='div' className='h3'>
															Invoice {invoiceIndex + 1}
															&nbsp;&nbsp;
														</CardTitle>
													</CardLabel>
													<CardActions>
														<Button
															color='danger'
															icon='Delete'
															tag='a'
															//hidden={props.isViewMode}
															onClick={() => {
																remove(invoiceIndex);
															}}>
															Delete Invoice
														</Button>
													</CardActions>
												</CardHeader>
												<CardBody className='pb-0'>
													<div className='row g-4'>
														<div className='col-md-3'>
															<FormGroup
																id='invoice_no'
																label='Invoice No.'>
																<input
																	id='invoice_no'
																	className={
																		'form-control ' +
																		(errors.invoice?.[
																			invoiceIndex
																		]?.invoice_no
																			? 'is-invalid'
																			: '')
																	}
																	{...register(
																		`invoice.${invoiceIndex}.invoice_no`,
																	)}
																	type='text'
																	placeholder='invoice_no'
																	//disabled={isViewMode}
																/>
																<>
																	{errors.invoice?.[invoiceIndex]
																		?.invoice_no ? (
																		<div className='invalid-feedback'>
																			{
																				errors.invoice?.[
																					invoiceIndex
																				]?.invoice_no
																					.message
																			}
																		</div>
																	) : (
																		''
																	)}
																</>
															</FormGroup>
														</div>
														<div className='col-md-3'>
															<FormGroup
																id='invoice_date'
																label='Invoice Date.'>
																<input
																	id='invoice_date'
																	type='date'
																	className={
																		'form-control ' +
																		(errors.invoice?.[
																			invoiceIndex
																		]?.invoice_date
																			? 'is-invalid'
																			: '')
																	}
																	{...register(
																		`invoice.${invoiceIndex}.invoice_date`,
																	)}
																	placeholder='invoice_date'
																	//disabled={isViewMode}
																/>
																<>
																	{errors.invoice?.[invoiceIndex]
																		?.invoice_date ? (
																		<div className='invalid-feedback'>
																			{
																				errors.invoice?.[
																					invoiceIndex
																				]?.invoice_date
																					.message
																			}
																		</div>
																	) : (
																		''
																	)}
																</>
															</FormGroup>
														</div>
														<div className='col-md-3'>
															<FormGroup
																id='invoice_amount'
																label='Invoice Amount.'>
																<input
																	id='invoice_amount'
																	className={
																		'form-control ' +
																		(errors.invoice?.[
																			invoiceIndex
																		]?.invoice_amount
																			? 'is-invalid'
																			: '')
																	}
																	{...register(
																		`invoice.${invoiceIndex}.invoice_amount`,
																	)}
																	type='number'
																	placeholder='invoice_amount'
																	//disabled={isViewMode}
																/>
																<>
																	{errors.invoice?.[invoiceIndex]
																		?.invoice_amount ? (
																		<div className='invalid-feedback'>
																			{
																				errors.invoice?.[
																					invoiceIndex
																				]?.invoice_amount
																					.message
																			}
																		</div>
																	) : (
																		''
																	)}
																</>
															</FormGroup>
														</div>
														<div className='col-md-3'>
															<FormGroup
																id='payment_terms'
																label='Payment Terms.'>
																<select
																	id='payment_terms'
																	className={
																		'form-control ' +
																		(errors.invoice?.[
																			invoiceIndex
																		]?.payment_terms
																			? 'is-invalid'
																			: '')
																	}
																	{...register(
																		`invoice.${invoiceIndex}.payment_terms`,
																	)}>
																	{paymentTermsOptions?.map((op) => (
																		<option value={op}>{op}</option>
																	))}
										
																</select>
																<>
																	{errors.invoice?.[invoiceIndex]
																		?.payment_terms ? (
																		<div className='invalid-feedback'>
																			{
																				errors.invoice?.[
																					invoiceIndex
																				]?.payment_terms
																					.message
																			}
																		</div>
																	) : (
																		''
																	)}
																</>
															</FormGroup>
														</div>
														<div className='col-md-12'>
															<Dropzone
																attachment_type='purchase_order'
																attachment_list={
																	formData.invoice[invoiceIndex]
																		.invoice_attachments
																		? formData.invoice[
                                                                            invoiceIndex
																			].invoice_attachments
																		: []
																}
																index={invoiceIndex}
																updateIdsFunc={
																	update_attachment_ids
																}
															/>
														</div>
													</div>
												</CardBody>
											</Card>
											<div className='col-md-12'></div>
										</AccordionItem>
									</Accordion>
								</div>
							);
						})}
						<div>
							<Button
								color='info'
								icon='Add'
								tag='a'
								onClick={() => {
									addInvoice();
								}}
								//hidden={props.isViewMode}
								className='float-end'>
								Add Invoice
							</Button>
						</div>
					</div>
				</div>
			</div>{' '}
		</div>
	);
};

export default ManageInvoice;
