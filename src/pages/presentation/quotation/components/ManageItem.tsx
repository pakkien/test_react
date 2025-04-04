import React, { useEffect } from 'react';
import { useFormContextQuotation } from '../components/QuotationForm'
import { useFieldArray } from 'react-hook-form';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Button from '../../../../components/bootstrap/Button';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import ManageSubItem from './ManageSubItem';
import Accordion, { AccordionItem } from '../../../../components/bootstrap/Accordion';
import Nav, { NavItem } from '../../../../components/bootstrap/Nav';
import {calculateMargin, calculateMarginPercentage, calculateTotalCost, calculateTotalPrice, calculateUnitPriceByMargin, calculateUnitPriceByMarginPercentage } from '../../../../common/calculations';

type ItemProps = {
	sectionIndex: number;
	isViewMode: boolean;
	sectionMode: boolean;
	//addItem: () => void;
};


const ManageItem = (props: ItemProps) => {
	const sectionIndex = props.sectionIndex;
	
	const {
		register,
		control,
		formState: { errors },
		watch,
		setValue,
	} = useFormContextQuotation();
	const formData = watch();

	const { append, remove, fields } = useFieldArray({
		name: `sections.${sectionIndex}.items`,
		control,
	});



	const addItem = () => {
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
			//estimated_cost: false,
			unit_price: 0,
			total_price: 0,
			order: fields.length + 1,
			sub_items: [],
			lead_time: 0,
			by_others: false,
			by_inclusive: false,
		});
	};


	//auto calculation
	useEffect(() => {
		formData.sections[sectionIndex].items.map((item, itemIndex) => {
			setValue(`sections.${sectionIndex}.items.${itemIndex}.total_cost`, calculateTotalCost(item.unit_cost, item.quantity));
			setValue(`sections.${sectionIndex}.items.${itemIndex}.total_price`, calculateTotalPrice(item.unit_price, item.quantity));
			setValue(`sections.${sectionIndex}.items.${itemIndex}.margin`, calculateMargin(item.unit_cost, item.unit_price));
			setValue(`sections.${sectionIndex}.items.${itemIndex}.margin_percentage`, calculateMarginPercentage(item.unit_cost, item.unit_price));
		});
	}, [JSON.stringify(formData.sections[sectionIndex].items.map(item => {return item.quantity+item.unit_cost}))]);


	fields.sort((a,b) => a.order < b.order ? -1 : a.order > b.order ? 1 : 0);

	return (
		<div className='pb-0'>
			<div className='row g-4'>
				
				<div className='col-md-12'><div className='row g-4'>
					{fields.map((item, itemIndex) => {
						return (
							//TODO: decide 
							<div className='col-xl-12'> 
							<Accordion id='ItemAccordion' color='dark' activeItemId={'ItemAccordionItem_'+ itemIndex}>
							<AccordionItem id={'ItemAccordionItem_'+ itemIndex} title={props.sectionMode?`${sectionIndex+1}.${itemIndex+1} Item ${itemIndex+1}`:
																							// `${itemIndex+1}.0 Item ${itemIndex+1}`}>
																							`${sectionIndex+1}.0 Item ${itemIndex+1}`}>
								<Card id={'#item_card_id#' + itemIndex} key={item.id} shadow='none' borderSize={1} borderColor='light' >
									<CardHeader>
										<CardLabel>
											<CardTitle tag='div' className='h3'>
												Item {itemIndex + 1}
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
													remove(itemIndex);
												}}>
												Delete Item
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
															(errors.sections?.[sectionIndex]?.items?.[itemIndex]?.product_description
																? 'is-invalid'
																: '')
														}
														{...register(`sections.${sectionIndex}.items.${itemIndex}.product_description`)}
														type='text'
														placeholder='product_desc'
														disabled={props.isViewMode}
													/>
													<div className='invalid-feedback'>
														{
															errors.sections?.[sectionIndex]?.items?.[itemIndex]?.product_description
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
															(errors.sections?.[sectionIndex]?.items?.[itemIndex]?.brand
																? 'is-invalid'
																: '')
														}
														{...register(`sections.${sectionIndex}.items.${itemIndex}.brand`)}
														type='text'
														placeholder='brand'
														disabled={props.isViewMode}
													/>
													<div className='invalid-feedback'>
														{errors.sections?.[sectionIndex]?.items?.[itemIndex]?.brand?.message}
													</div>
												</FormGroup>
											</div>
											<div className='col-md-4'>
												<FormGroup id='model' label='Model' isFloating>
													<input
														id='model'
														className={
															'form-control ' +
															(errors.sections?.[sectionIndex]?.items?.[itemIndex]?.model
																? 'is-invalid'
																: '')
														}
														{...register(`sections.${sectionIndex}.items.${itemIndex}.model`)}
														type='text'
														placeholder='model'
														disabled={props.isViewMode}
													/>
													<div className='invalid-feedback'>
														{errors.sections?.[sectionIndex]?.items?.[itemIndex]?.model?.message}
													</div>
												</FormGroup>
											</div>
											<div className='col-md-4'>
												<FormGroup id='remarks' label='Remarks' isFloating>
													<input
														id='remarks'
														className={
															'form-control ' +
															(errors.sections?.[sectionIndex]?.items?.[itemIndex]?.remarks
																? 'is-invalid'
																: '')
														}
														{...register(`sections.${sectionIndex}.items.${itemIndex}.remarks`)}
														type='text'
														placeholder='remarks'
														disabled={props.isViewMode}
													/>
													<div className='invalid-feedback'>
														{errors.sections?.[sectionIndex]?.items?.[itemIndex]?.remarks?.message}
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
																	(errors.sections?.[sectionIndex]?.items?.[itemIndex]?.quantity
																		? 'is-invalid'
																		: '')
																}
																{...register(
																	`sections.${sectionIndex}.items.${itemIndex}.quantity`,
																)}
																type='text'												
																placeholder='quantity'
																disabled={props.isViewMode}
															/>
															<div className='invalid-feedback'>
																{
																	errors.sections?.[sectionIndex]?.items?.[itemIndex]?.quantity
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
																	(errors.sections?.[sectionIndex]?.items?.[itemIndex]?.unit
																		? 'is-invalid'
																		: '')
																}
																{...register(`sections.${sectionIndex}.items.${itemIndex}.unit`)}
																type='text'
																placeholder='unit'
																disabled={props.isViewMode}
															/>
															<div className='invalid-feedback'>
																{
																	errors.sections?.[sectionIndex]?.items?.[itemIndex]?.unit
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
																	(errors.sections?.[sectionIndex]?.items?.[itemIndex]
																		?.unit_cost
																		? 'is-invalid'
																		: '')
																}
																{...register(
																	`sections.${sectionIndex}.items.${itemIndex}.unit_cost`,
																)}
																type='text'
																placeholder='unit_cost'
																disabled={props.isViewMode}
															/>
															<div className='invalid-feedback'>
																{
																	errors.sections?.[sectionIndex]?.items?.[itemIndex]?.unit_cost
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
															(errors.sections?.[sectionIndex]?.items?.[itemIndex]?.total_cost
																? 'is-invalid'
																: '')
														}
														{...register(`sections.${sectionIndex}.items.${itemIndex}.total_cost`)}
														type='text'
														placeholder='total_cost'
														//disabled={props.isViewMode}
														disabled
													/>
													<div className='invalid-feedback'>
														{errors.sections?.[sectionIndex]?.items?.[itemIndex]?.total_cost?.message}
													</div>
												</FormGroup>
											</div>
											<div className='col-md-8'>
												<div className='row'>
											<div className='col-4'>
												<FormGroup id='margin' label='Margin' isFloating>
													<input
														id='margin'
														className={
															'form-control ' +
															(errors.sections?.[sectionIndex]?.items?.[itemIndex]?.margin
																? 'is-invalid'
																: '')
														}
														{...register(`sections.${sectionIndex}.items.${itemIndex}.margin`)}
														type='text'
														placeholder='margin'
														disabled={props.isViewMode}
														onChange={
															(e) => {
																setValue(`sections.${sectionIndex}.items.${itemIndex}.unit_price`, calculateUnitPriceByMargin(formData.sections?.[sectionIndex]?.items[itemIndex].unit_cost, parseFloat(e.target.value)));
																setValue(`sections.${sectionIndex}.items.${itemIndex}.total_price`, calculateTotalPrice(formData.sections?.[sectionIndex]?.items[itemIndex].unit_price, formData.sections?.[sectionIndex]?.items[itemIndex].quantity));
																setValue(`sections.${sectionIndex}.items.${itemIndex}.margin_percentage`, calculateMarginPercentage(formData.sections?.[sectionIndex]?.items[itemIndex].unit_cost, formData.sections?.[sectionIndex]?.items[itemIndex].unit_price));
															}
														}
													/>
													<div className='invalid-feedback'>
														{errors.sections?.[sectionIndex]?.items?.[itemIndex]?.margin?.message}
													</div>
												</FormGroup>
											</div>
											<div className='col-4'>
												<FormGroup id='margin_percentage' label='Margin Percentage' isFloating>
													<input
														id='margin_percentage'
														className={
															'form-control ' +
															(errors.sections?.[sectionIndex]?.items?.[itemIndex]?.margin_percentage
																? 'is-invalid'
																: '')
														}
														{...register(`sections.${sectionIndex}.items.${itemIndex}.margin_percentage`)}
														type='text'
														placeholder='margin_percentage'
														disabled={props.isViewMode}
														onChange={
															(e) => {
																setValue(`sections.${sectionIndex}.items.${itemIndex}.unit_price`, calculateUnitPriceByMarginPercentage(formData.sections?.[sectionIndex]?.items[itemIndex].unit_cost, parseFloat(e.target.value)));
																setValue(`sections.${sectionIndex}.items.${itemIndex}.total_price`, calculateTotalPrice(formData.sections?.[sectionIndex]?.items[itemIndex].unit_price, formData.sections?.[sectionIndex]?.items[itemIndex].quantity));
																setValue(`sections.${sectionIndex}.items.${itemIndex}.margin`, calculateMargin(formData.sections?.[sectionIndex]?.items[itemIndex].unit_cost, formData.sections?.[sectionIndex]?.items[itemIndex].unit_price));
															}
															}
													/>
													<div className='invalid-feedback'>
														{errors.sections?.[sectionIndex]?.items?.[itemIndex]?.margin_percentage?.message}
													</div>
												</FormGroup>
											</div>
											<div className='col-4'>
												<FormGroup
													id='unit_price'
													label='Unit Price (RM)'
													isFloating>
													<input
														id='unit_price'
														className={
															'form-control ' +
															(errors.sections?.[sectionIndex]?.items?.[itemIndex]?.unit_price
																? 'is-invalid'
																: '')
														}
														{...register(`sections.${sectionIndex}.items.${itemIndex}.unit_price`)}
														type='text'
														placeholder='unit_price'
														disabled={props.isViewMode}
														onChange={
																(e) => {
																	setValue(`sections.${sectionIndex}.items.${itemIndex}.margin`, calculateMargin(formData.sections?.[sectionIndex]?.items[itemIndex].unit_cost, parseFloat(e.target.value)));
																	setValue(`sections.${sectionIndex}.items.${itemIndex}.margin_percentage`, calculateMarginPercentage(formData.sections?.[sectionIndex]?.items[itemIndex].unit_cost, parseFloat(e.target.value)));
																	setValue(`sections.${sectionIndex}.items.${itemIndex}.total_price`, calculateTotalPrice(parseFloat(e.target.value), formData.sections?.[sectionIndex]?.items[itemIndex].quantity));
																}
																
														}
													/>
													<div className='invalid-feedback'>
														{errors.sections?.[sectionIndex]?.items?.[itemIndex]?.unit_price?.message}
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
															(errors.sections?.[sectionIndex]?.items?.[itemIndex]?.total_price
																? 'is-invalid'
																: '')
														}
														{...register(`sections.${sectionIndex}.items.${itemIndex}.total_price`)}
														type='text'
														placeholder='total_price'
														//disabled={props.isViewMode}
														disabled
													/>
													<div className='invalid-feedback'>
														{
															errors.sections?.[sectionIndex]?.items?.[itemIndex]?.total_price
																?.message
														}
													</div>
												</FormGroup>
											</div>
											<div className='col-md-8'>
												<div className='row'>
													<div className='col-md-4'>
													<FormGroup id='lead_time' label='Lead Time' isFloating>
															<input
																id='lead_time'
																className={
																	'form-control ' +
																	(errors.sections?.[sectionIndex]?.items?.[itemIndex]?.lead_time
																		? 'is-invalid'
																		: '')
																}
																{...register(`sections.${sectionIndex}.items.${itemIndex}.lead_time`)}
																type='text'
																placeholder='lead_time'
																disabled={props.isViewMode}
															/>
															<div className='invalid-feedback'>
																{
																	errors.sections?.[sectionIndex]?.items?.[itemIndex]?.lead_time
																		?.message
																}
															</div>
														</FormGroup>
													</div>

													<div className='col-2 d-flex align-items-center'>
														<FormGroup
															id='by_others'
															label='By others'
															className='form-check form-check-inline'>
															<input
																id='by_others'
																className={
																	'form-check-input ' +
																	(errors.sections?.[sectionIndex]?.items?.[itemIndex]?.by_others
																		? 'is-invalid'
																		: '')
																}
																{...register(
																	`sections.${sectionIndex}.items.${itemIndex}.by_others`,
																)}
																type='checkbox'
																placeholder='by_others'
																disabled={props.isViewMode}
																onChange={
																	(e) => {
																		//console.log(e.target.checked);
																		if(e.target.checked){
																			setValue(`sections.${sectionIndex}.items.${itemIndex}.by_others`, true);
																			if(formData.sections?.[sectionIndex]?.items?.[itemIndex]?.by_inclusive){
																				setValue(`sections.${sectionIndex}.items.${itemIndex}.by_inclusive`, false);
																			}
																		}else{
																			setValue(`sections.${sectionIndex}.items.${itemIndex}.by_others`, false);
																		}
																	}
																}
															/>
															<div className='invalid-feedback'>
																{
																	errors.sections?.[sectionIndex]?.items?.[itemIndex]						
																		?.by_others?.message
																}
															</div>
														</FormGroup>
													</div>
													<div className='col-2 d-flex align-items-center'>
														<FormGroup
															id='by_inclusive'
															label='By Inclusive'
															className='form-check form-check-inline'>
															<input
																id='inclusive'
																className={
																	'form-check-input ' +
																	(errors.sections?.[sectionIndex]?.items?.[itemIndex]?.by_inclusive
																		? 'is-invalid'
																		: '')
																}
																{...register(
																	`sections.${sectionIndex}.items.${itemIndex}.by_inclusive`,
																)}
																type='checkbox'
																placeholder='by_inclusive'
																disabled={props.isViewMode}
																onChange={
																	(e) => {
																		//console.log(e.target.checked);
																		if(e.target.checked){
																			setValue(`sections.${sectionIndex}.items.${itemIndex}.by_inclusive`, true);
																			if(formData.sections?.[sectionIndex]?.items?.[itemIndex]?.by_others){
																				setValue(`sections.${sectionIndex}.items.${itemIndex}.by_others`, false);
																			}
																		}else{
																			setValue(`sections.${sectionIndex}.items.${itemIndex}.by_inclusive`, false);
																		}
																	}
																	
																}
															/>
															<div className='invalid-feedback'>
																{
																	errors.sections?.[sectionIndex]?.items?.[itemIndex]						
																		?.by_inclusive?.message
																}
															</div>
														</FormGroup>
													</div>
												</div>
											</div>

											
											

											<div className='col-md-12'></div>
										</div>
									</CardBody>
								</Card>
								<div className='col-md-12'>
												{/* sub_item here */}
												<ManageSubItem itemIndex={itemIndex} sectionIndex={sectionIndex} isViewMode={props.isViewMode} sectionMode={props.sectionMode}/>
											</div>
							</AccordionItem>
							</Accordion>
							</div>
						);
					})}
					</div>
				</div>
				<div className='col-md-12' hidden={props.isViewMode||!props.sectionMode}>
					<Button color='info' icon='Add' tag='a' onClick={addItem} className='float-end'>
						Add Item
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ManageItem;
