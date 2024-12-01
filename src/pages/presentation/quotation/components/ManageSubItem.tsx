import React, { useEffect } from 'react';
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
		setValue,
		watch,
	} = useFormContextQuotation();
	const formData = watch();

	const { append, remove, fields } = useFieldArray({
		name: `items.${itemIndex}.sub_items`,
		control,
	});

	const addSubItem = () => {
		append({
			product_description: '',
			brand: '',
			model: '',
			remarks: '',
			quantity: 0,
			unit: '',
			unit_cost: 0,
			total_cost: 0,
			margin: 0,
			margin_percentage: 0,
			estimated_cost: false,
			unit_price: 0,
			total_price: 0
		});
	};

	useEffect(() => {
		formData.items[itemIndex].sub_items.map((sub_item, subItemIndex) => {
			setValue(`items.${itemIndex}.sub_items.${subItemIndex}.total_cost`, parseFloat((sub_item.quantity * sub_item.unit_cost).toFixed(2)));
			setValue(`items.${itemIndex}.sub_items.${subItemIndex}.total_price`, parseFloat((sub_item.quantity * sub_item.unit_price).toFixed(2)));
			setValue(`items.${itemIndex}.sub_items.${subItemIndex}.margin`, parseFloat(((sub_item.unit_price / sub_item.unit_cost - 1)*100).toFixed(2)) );
		});
	}, [JSON.stringify(formData.items[itemIndex].sub_items.map(sub_item => {return sub_item.quantity+sub_item.unit_cost}))]);

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
							<Card shadow='lg' key={sub_item.id}>
								<CardHeader>
									<CardLabel>
										<CardTitle tag='div' className='h3'>
											Sub Item {itemIndex+1}.{subItemIndex + 1}{' '}
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
														(errors.items?.[itemIndex]?.sub_items?.[subItemIndex]?.product_description
															? 'is-invalid'
															: '')
													}
													{...register(`items.${itemIndex}.sub_items.${subItemIndex}.product_description`)}
													type='text'
													placeholder='product_desc'
													disabled={props.isViewMode}
												/>
												<div className='invalid-feedback'>
													{
														errors.items?.[itemIndex]?.sub_items?.[subItemIndex]?.product_description
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
												<div className='col-3'>
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
												<div className='col-3'>
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
												<div className='col-2 d-flex align-items-center'>
												<FormGroup
														id='unit_cost'
														label='Estimated Cost'
														className='form-check form-check-inline'
														>
														<input
															id='unit_cost'
															className={
																'form-check-input ' +
																(errors.items?.[itemIndex]
																	?.sub_items?.[subItemIndex]?.unit_cost
																	? 'is-invalid'
																	: '')
															}
															{...register(
																`items.${itemIndex}.sub_items.${subItemIndex}.unit_cost`,
															)}
															type='checkbox'
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
													//disabled={props.isViewMode}
													disabled
												/>
												<div className='invalid-feedback'>
													{errors.items?.[itemIndex]?.sub_items?.[subItemIndex]?.total_cost?.message}
												</div>
											</FormGroup>
										</div>
										<div className='col-md-8'>
												<div className='row'>
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
													onChange={
														(e) => {
															setValue(`items.${itemIndex}.sub_items.${subItemIndex}.unit_price`, parseFloat((formData.items[itemIndex].sub_items[subItemIndex].unit_cost * (100+parseFloat(e.target.value)) / 100).toFixed(2)));
															setValue(`items.${itemIndex}.sub_items.${subItemIndex}.total_price`, parseFloat((formData.items[itemIndex].sub_items[subItemIndex].quantity * formData.items[itemIndex].sub_items[subItemIndex].unit_price).toFixed(2)));	}
														}
												/>
												<div className='invalid-feedback'>
													{errors.items?.[itemIndex]?.sub_items?.[subItemIndex]?.margin?.message}
												</div>
											</FormGroup>
										</div>
										<div className='col-md-4'>
											<FormGroup id='margin' label='Margin Percentage' isFloating>
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
													onChange={
														(e) => {
															setValue(`items.${itemIndex}.sub_items.${subItemIndex}.unit_price`, parseFloat((formData.items[itemIndex].sub_items[subItemIndex].unit_cost * (100+parseFloat(e.target.value)) / 100).toFixed(2)));
															setValue(`items.${itemIndex}.sub_items.${subItemIndex}.total_price`, parseFloat((formData.items[itemIndex].sub_items[subItemIndex].quantity * formData.items[itemIndex].sub_items[subItemIndex].unit_price).toFixed(2)));	}
														}
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
													onChange={
														(e) => {
															setValue(`items.${itemIndex}.sub_items.${subItemIndex}.margin`, parseFloat(((parseFloat(e.target.value)/ formData.items[itemIndex].sub_items[subItemIndex].unit_cost - 1)*100).toFixed(2)));
															setValue(`items.${itemIndex}.sub_items.${subItemIndex}.total_price`, parseFloat((formData.items[itemIndex].sub_items[subItemIndex].quantity * parseFloat(e.target.value)).toFixed(2)));	}
														
												}
												/>
												<div className='invalid-feedback'>
													{errors.items?.[itemIndex]?.sub_items?.[subItemIndex]?.unit_price?.message}
												</div>
											</FormGroup>
										</div>
										</div>
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
													//disabled={props.isViewMode}
													disabled
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
