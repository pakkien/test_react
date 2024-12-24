import React from 'react';
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

const ManagePO = () => {
	const {
		register,
		control,
		formState: { errors },
		watch,
		setValue,
	} = useFormContextTrackingDetails();
	const formData = watch();

	const { append, remove, fields } = useFieldArray({
		name: `purchase_order`,
		control,
	});

	const addPO = () => {
		append({
			po_no: '',
			po_date: '',
			po_amount: 0,
			po_attachments: [],
			temp_attachment_ids: [],
			order: 0,
		});
	};

	const update_attachment_ids = (index: number, ids: string[]) => {
		setValue(`purchase_order.${index}.temp_attachment_ids`, ids);
	};

	return (
		<div className='pb-0'>
			<div className='row g-4'>
				<div className='col-md-12'>
					<div className='row g-4'>
						{fields.map((po, poIndex) => {
							return (
								<div className='col-xl-12'>
									<Accordion
										id='poAccordion'
										color='dark'
										activeItemId={'poAccordionItem_' + poIndex}>
										<AccordionItem
											id={'poAccordionItem_' + poIndex}
											title={'Purchase Order ' + (+poIndex + +1)}>
											<Card
												id={'#po_card_id#' + poIndex}
												key={poIndex}
												shadow='none'
												borderSize={1}
												borderColor='light'>
												<CardHeader>
													<CardLabel>
														<CardTitle tag='div' className='h3'>
															Purchase Order {poIndex + 1}
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
																remove(poIndex);
															}}>
															Delete Purchase Order
														</Button>
													</CardActions>
												</CardHeader>
												<CardBody className='pb-0'>
													<div className='row g-4'>
														<div className='col-md-3'>
															<FormGroup id='po_no' label='PO No.'>
																<input
																	id='po_no'
																	className={
																		'form-control ' +
																		(errors.purchase_order?.[
																			poIndex
																		]?.po_no
																			? 'is-invalid'
																			: '')
																	}
																	{...register(
																		`purchase_order.${poIndex}.po_no`,
																	)}
																	type='text'
																	placeholder='po_no'
																	//disabled={isViewMode}
																/>
																<>
																	{errors.purchase_order?.[
																		poIndex
																	]?.po_no ? (
																		<div className='invalid-feedback'>
																			{
																				errors
																					.purchase_order?.[
																					poIndex
																				]?.po_no.message
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
																id='po_date'
																label='PO Date.'>
																<input
																	id='po_date'
																	type='date'
																	className={
																		'form-control ' +
																		(errors.purchase_order?.[
																			poIndex
																		]?.po_date
																			? 'is-invalid'
																			: '')
																	}
																	{...register(
																		`purchase_order.${poIndex}.po_date`,
																	)}
																	placeholder='po_date'
																	//disabled={isViewMode}
																/>
																<>
																	{errors.purchase_order?.[
																		poIndex
																	]?.po_date ? (
																		<div className='invalid-feedback'>
																			{
																				errors
																					.purchase_order?.[
																					poIndex
																				]?.po_date.message
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
																id='po_amount'
																label='PO Amount.'>
																<input
																	id='po_amount'
																	className={
																		'form-control ' +
																		(errors.purchase_order?.[
																			poIndex
																		]?.po_amount
																			? 'is-invalid'
																			: '')
																	}
																	{...register(
																		`purchase_order.${poIndex}.po_amount`,
																	)}
																	type='number'
																	placeholder='po_amount'
																	//disabled={isViewMode}
																/>
																<>
																	{errors.purchase_order?.[
																		poIndex
																	]?.po_amount ? (
																		<div className='invalid-feedback'>
																			{
																				errors
																					.purchase_order?.[
																					poIndex
																				]?.po_amount.message
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
																	formData.purchase_order[poIndex]
																		.po_attachments
																		? formData.purchase_order[
																				poIndex
																			].po_attachments
																		: []
																}
																index={poIndex}
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
									addPO();
								}}
								//hidden={props.isViewMode}
								className='float-end'>
								Add Purchase Order
							</Button>
						</div>
					</div>
				</div>
			</div>{' '}
		</div>
	);
};

export default ManagePO;
