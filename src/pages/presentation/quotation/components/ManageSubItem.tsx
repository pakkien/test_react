import React from 'react';
import { useFormContextQuotation } from '../components/QuotationForm'
import { useFieldArray } from 'react-hook-form';
import Accordion, { AccordionItem } from '../../../../components/bootstrap/Accordion';
import Card, { CardActions, CardBody, CardFooter, CardFooterRight, CardHeader, CardLabel, CardTitle } from '../../../../components/bootstrap/Card';
import Button from '../../../../components/bootstrap/Button';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';

type SubItemProps = {
	itemIndex: number,
	isViewMode: boolean
}

const ManageSubItem = (props: SubItemProps) => {

	const itemIndex = props.itemIndex;
	const {
		register,
		control,
		formState: { errors },
	} = useFormContextQuotation();

	const { append, remove, fields } = useFieldArray({
		name: `items.${itemIndex}.sub_items`,
		control,
	});

	const addSubItem = () => {
		append({
			product_desc: '',
			brand: '',
			model: '',
			remarks: '',
			quantity: '',
			unit: '',
			unit_cost: '',
			total_cost: '',
			margin: '',
			unit_price: '',
			total_price: ''
		});
	};

	return (
		<>
			<div className='col-md-12' hidden={props.isViewMode || fields.length > 0 ? true : false}>
					<Button color='info' icon='Add' tag='a' onClick={addSubItem} className='float-end'>
						Add Sub Item
					</Button>
				</div>
			
			
			{fields.length > 0 && (
				<Accordion id='SubItemAccordion' color='dark' activeItemId={'SubItemAccordionItem_'+ itemIndex}>
					<AccordionItem id={'SubItemAccordionItem_'+ itemIndex} title='Sub Items'>
						{fields.map((sub_item, subItemIndex) => (
							<Card>
								<CardHeader>
									<CardLabel>
										<CardTitle tag='div' className='h3'>
											Sub Item - {subItemIndex + 1}/{fields.length}{' '}
											&nbsp;&nbsp;
										</CardTitle>
									</CardLabel>
									<CardActions>
										<Button
											color='danger'
											icon='Delete'
											tag='a'
											hidden={props.isViewMode}
											onClick={() => {
												remove(subItemIndex);
											}}>
											Delete Sub Item
										</Button>
									</CardActions>
									
								</CardHeader>
								<CardBody className='pb-0'>
									<div className='row g-4'>
										<div className='col-md-12'>
											<FormGroup
												id='product_desc'
												label='Product Description | Job Scope'
												isFloating>
												<input
													id='product_desc'
													className={
														'form-control ' +
														(errors.items?.[itemIndex]?.sub_items?.[subItemIndex]?.product_desc
															? 'is-invalid'
															: '')
													}
													{...register(`items.${itemIndex}.sub_items.${subItemIndex}.product_desc`)}
													type='text'
													placeholder='product_desc'
													disabled={props.isViewMode}
												/>
												<div className='invalid-feedback'>
													{
														errors.items?.[itemIndex]?.sub_items?.[subItemIndex]?.product_desc
															?.message
													}
												</div>
											</FormGroup>
										</div>
										<div className='col-md-4'>
											<FormGroup id='brand' label='Brand' isFloating>
												<input
													id='brand'
													className={
														'form-control ' +
														(errors.items?.[itemIndex]?.sub_items?.[subItemIndex]?.brand
															? 'is-invalid'
															: '')
													}
													{...register(`items.${itemIndex}.sub_items.${subItemIndex}.brand`)}
													type='text'
													placeholder='brand'
													disabled={props.isViewMode}
												/>
												<div className='invalid-feedback'>
													{errors.items?.[itemIndex]?.sub_items?.[subItemIndex]?.brand?.message}
												</div>
											</FormGroup>
										</div>
										<div className='col-md-4'>
											<FormGroup id='model' label='Model' isFloating>
												<input
													id='model'
													className={
														'form-control ' +
														(errors.items?.[itemIndex]?.sub_items?.[subItemIndex]?.model
															? 'is-invalid'
															: '')
													}
													{...register(`items.${itemIndex}.sub_items.${subItemIndex}.model`)}
													type='text'
													placeholder='model'
													disabled={props.isViewMode}
												/>
												<div className='invalid-feedback'>
													{errors.items?.[itemIndex]?.sub_items?.[subItemIndex]?.model?.message}
												</div>
											</FormGroup>
										</div>
										<div className='col-md-4'>
											<FormGroup id='remarks' label='Remarks' isFloating>
												<input
													id='remarks'
													className={
														'form-control ' +
														(errors.items?.[itemIndex]?.sub_items?.[subItemIndex]?.remarks
															? 'is-invalid'
															: '')
													}
													{...register(`items.${itemIndex}.sub_items.${subItemIndex}.remarks`)}
													type='text'
													placeholder='remarks'
													disabled={props.isViewMode}
												/>
												<div className='invalid-feedback'>
													{errors.items?.[itemIndex]?.sub_items?.[subItemIndex]?.remarks?.message}
												</div>
											</FormGroup>
										</div>
										<div className='col-md-8'>
											<div className='row'>
												<div className='col-4'>
													<FormGroup
														id='quantity'
														label='Quantity'
														isFloating>
														<input
															id='quantity'
															className={
																'form-control ' +
																(errors.items?.[itemIndex]?.sub_items?.[subItemIndex]?.quantity
																	? 'is-invalid'
																	: '')
															}
															{...register(
																`items.${itemIndex}.sub_items.${subItemIndex}.quantity`,
															)}
															type='text'
															placeholder='quantity'
															disabled={props.isViewMode}
														/>
														<div className='invalid-feedback'>
															{
																errors.items?.[itemIndex]?.sub_items?.[subItemIndex]?.quantity
																	?.message
															}
														</div>
													</FormGroup>
												</div>
												<div className='col-4'>
													<FormGroup id='unit' label='Unit' isFloating>
														<input
															id='unit'
															className={
																'form-control ' +
																(errors.items?.[itemIndex]?.sub_items?.[subItemIndex]?.unit
																	? 'is-invalid'
																	: '')
															}
															{...register(`items.${itemIndex}.sub_items.${subItemIndex}.unit`)}
															type='text'
															placeholder='unit'
															disabled={props.isViewMode}
														/>
														<div className='invalid-feedback'>
															{
																errors.items?.[itemIndex]?.sub_items?.[subItemIndex]?.unit
																	?.message
															}
														</div>
													</FormGroup>
												</div>
												<div className='col-4'>
													<FormGroup
														id='unit_cost'
														label='Unit Cost'
														isFloating>
														<input
															id='unit_cost'
															className={
																'form-control ' +
																(errors.items?.[itemIndex]
																	?.sub_items?.[subItemIndex]?.unit_cost
																	? 'is-invalid'
																	: '')
															}
															{...register(
																`items.${itemIndex}.sub_items.${subItemIndex}.unit_cost`,
															)}
															type='text'
															placeholder='unit_cost'
															disabled={props.isViewMode}
														/>
														<div className='invalid-feedback'>
															{
																errors.items?.[itemIndex]?.sub_items?.[subItemIndex]?.unit_cost
																	?.message
															}
														</div>
													</FormGroup>
												</div>
											</div>
										</div>
										<div className='col-md-4'>
											<FormGroup
												id='total_cost'
												label='Total Cost'
												isFloating>
												<input
													id='total_cost'
													className={
														'form-control ' +
														(errors.items?.[itemIndex]?.sub_items?.[subItemIndex]?.total_cost
															? 'is-invalid'
															: '')
													}
													{...register(`items.${itemIndex}.sub_items.${subItemIndex}.total_cost`)}
													type='text'
													placeholder='total_cost'
													disabled={props.isViewMode}
												/>
												<div className='invalid-feedback'>
													{errors.items?.[itemIndex]?.sub_items?.[subItemIndex]?.total_cost?.message}
												</div>
											</FormGroup>
										</div>
										<div className='col-md-4'>
											<FormGroup id='margin' label='Margin' isFloating>
												<input
													id='margin'
													className={
														'form-control ' +
														(errors.items?.[itemIndex]?.sub_items?.[subItemIndex]?.margin
															? 'is-invalid'
															: '')
													}
													{...register(`items.${itemIndex}.sub_items.${subItemIndex}.margin`)}
													type='text'
													placeholder='margin'
													disabled={props.isViewMode}
												/>
												<div className='invalid-feedback'>
													{errors.items?.[itemIndex]?.sub_items?.[subItemIndex]?.margin?.message}
												</div>
											</FormGroup>
										</div>
										<div className='col-md-4'>
											<FormGroup
												id='unit_price'
												label='Unit Price (RM)'
												isFloating>
												<input
													id='unit_price'
													className={
														'form-control ' +
														(errors.items?.[itemIndex]?.sub_items?.[subItemIndex]?.unit_price
															? 'is-invalid'
															: '')
													}
													{...register(`items.${itemIndex}.sub_items.${subItemIndex}.unit_price`)}
													type='text'
													placeholder='unit_price'
													disabled={props.isViewMode}
												/>
												<div className='invalid-feedback'>
													{errors.items?.[itemIndex]?.sub_items?.[subItemIndex]?.unit_price?.message}
												</div>
											</FormGroup>
										</div>
										<div className='col-md-4'>
											<FormGroup
												id='total_price'
												label='Total Price (RM)'
												isFloating>
												<input
													id='total_price'
													className={
														'form-control ' +
														(errors.items?.[itemIndex]?.sub_items?.[subItemIndex]?.total_price
															? 'is-invalid'
															: '')
													}
													{...register(`items.${itemIndex}.sub_items.${subItemIndex}.total_price`)}
													type='text'
													placeholder='total_price'
													disabled={props.isViewMode}
												/>
												<div className='invalid-feedback'>
													{
														errors.items?.[itemIndex]?.sub_items?.[subItemIndex]?.total_price
															?.message
													}
												</div>
											</FormGroup>
										</div>
										<div className='col-md-12'></div>
									</div>
								</CardBody>
								<CardFooter>
									<CardFooterRight>
										<Button
											color='info'
											icon='Add'
											tag='a'
											hidden={props.isViewMode}
											onClick={addSubItem}>
											Add Sub-Item
										</Button>
									</CardFooterRight>
								</CardFooter>
							</Card>
						))}
					</AccordionItem>
				</Accordion>
			)}
		</>
	);
};

export default ManageSubItem;
