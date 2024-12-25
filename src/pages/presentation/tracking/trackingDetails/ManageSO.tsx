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

const ManageSO = () => {
	const {
		register,
		control,
		formState: { errors },
		watch,
		setValue,
	} = useFormContextTrackingDetails();
	const formData = watch();

	const { append, remove, fields } = useFieldArray({
		name: `sale_order`,
		control,
	});

	const addSO = () => {
		append({
			so_no: '',
			so_date: '',
			so_attachments: [],
			temp_attachment_ids: [],
			order: 0,
		});
	};

	const update_attachment_ids = (index: number, ids: string[]) => {
		setValue(`sale_order.${index}.temp_attachment_ids`, ids);
	};

	fields.sort((a,b) => a.order < b.order ? -1 : a.order > b.order ? 1 : 0);

	return (
		<div className='pb-0'>
			<div className='row g-4'>
				<div className='col-md-12'>
					<div className='row g-4'>
						{fields.map((so, soIndex) => {
							return (
								<div className='col-xl-12'  key={soIndex}>
									<Accordion
										id='soAccordion'
										color='dark'
										activeItemId={'soAccordionItem_' + soIndex}>
										<AccordionItem
											id={'soAccordionItem_' + soIndex}
											title={'Sale Order ' + (+soIndex + +1)}>
											<Card
												id={'#so_card_id#' + soIndex}
												key={soIndex}
												shadow='none'
												borderSize={1}
												borderColor='light'>
												<CardHeader>
													<CardLabel>
														<CardTitle tag='div' className='h3'>
															Sale Order {soIndex + 1}
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
																remove(soIndex);
															}}>
															Delete Sale Order
														</Button>
													</CardActions>
												</CardHeader>
												<CardBody className='pb-0'>
													<div className='row g-4'>
														<div className='col-md-3'>
															<FormGroup id='so_no' label='SO No.'>
																<input
																	id='so_no'
																	className={
																		'form-control ' +
																		(errors.sale_order?.[
																			soIndex
																		]?.so_no
																			? 'is-invalid'
																			: '')
																	}
																	{...register(
																		`sale_order.${soIndex}.so_no`,
																	)}
																	type='text'
																	placeholder='so_no'
																	//disabled={isViewMode}
																/>
																<>
																	{errors.sale_order?.[
																		soIndex
																	]?.so_no ? (
																		<div className='invalid-feedback'>
																			{
																				errors
																					.sale_order?.[
																					soIndex
																				]?.so_no.message
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
																id='so_date'
																label='SO Date.'>
																<input
																	id='so_date'
																	type='date'
																	className={
																		'form-control ' +
																		(errors.sale_order?.[
																			soIndex
																		]?.so_date
																			? 'is-invalid'
																			: '')
																	}
																	{...register(
																		`sale_order.${soIndex}.so_date`,
																	)}
																	placeholder='so_date'
																	//disabled={isViewMode}
																/>
																<>
																	{errors.sale_order?.[
																		soIndex
																	]?.so_date ? (
																		<div className='invalid-feedback'>
																			{
																				errors
																					.sale_order?.[
																					soIndex
																				]?.so_date.message
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
																attachment_type='sale_order'
																attachment_list={
																	formData.sale_order[soIndex]
																		.so_attachments
																		? formData.sale_order[
																				soIndex
																			].so_attachments
																		: []
																}
																index={soIndex}
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
									addSO();
								}}
								//hidden={props.isViewMode}
								className='float-end'>
								Add Sale Order
							</Button>
						</div>
					</div>
				</div>
			</div>{' '}
		</div>
	);
};

export default ManageSO;
