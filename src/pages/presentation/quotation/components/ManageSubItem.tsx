import React, { useEffect } from 'react';
import { useFormContextQuotation } from '../components/QuotationForm';
import { useFieldArray } from 'react-hook-form';
import Accordion, { AccordionItem } from '../../../../components/bootstrap/Accordion';
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
import { calculateTotalCost, calculateTotalPrice, calculateMarginPercentage, calculateUnitPriceByMarginPercentage, calculateMargin, calculateUnitPriceByMargin } from '../../../../common/calculations';

type SubItemProps = {
	sectionIndex: number;
	itemIndex: number;
	isViewMode: boolean;
	sectionMode: boolean;
};

const ManageSubItem = (props: SubItemProps) => {
	const itemIndex = props.itemIndex;
	const sectionIndex = props.sectionIndex;
	const {
		register,
		control,
		formState: { errors },
		setValue,
		watch,
	} = useFormContextQuotation();
	const formData = watch();

	const { append, remove, fields } = useFieldArray({
		name: `sections.${sectionIndex}.items.${itemIndex}.sub_items`,
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
			//estimated_cost: false,
			unit_price: 0,
			total_price: 0,
			order: 0,
			lead_time: 0,
			by_others: false,
			inclusive: false,
		});
	};

	useEffect(() => {
		formData.sections[sectionIndex].items[itemIndex].sub_items.map((sub_item, subItemIndex) => {
			setValue(`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.total_cost`, calculateTotalCost(sub_item.unit_cost, sub_item.quantity));
			setValue(`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.total_price`, calculateTotalPrice(sub_item.unit_price, sub_item.quantity));
			setValue(`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.margin`, calculateMargin(sub_item.unit_cost, sub_item.unit_price));
			setValue(`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.margin_percentage`, calculateMarginPercentage(sub_item.unit_cost, sub_item.unit_price));
		});
	}, [
		JSON.stringify(
			formData.sections[sectionIndex].items[itemIndex].sub_items.map((sub_item) => {
				return sub_item.quantity + sub_item.unit_cost;
			}),
		),
	]);

	return (
		<>
			<div
				className='col-md-12'
				hidden={props.isViewMode || fields.length > 0 ? true : false}>
				<Button color='info' icon='Add' tag='a' onClick={addSubItem} className='float-end'>
					Add Sub Item
				</Button>
				<br />
				<br />
			</div>

			{fields.length > 0 && (
				<>
					<Accordion
						id='SubItemAccordion'
						color='dark'
						activeItemId={'SubItemAccordionItem_' + itemIndex}>
						<AccordionItem id={'SubItemAccordionItem_' + itemIndex} title='Sub Items'>
							{fields.map((sub_item, subItemIndex) => (
								<Card
									shadow='none'
									key={sub_item.id}
									borderColor='light'
									borderSize={1}>
									<CardHeader>
										<CardLabel>
											<CardTitle tag='div' className='h3'>
											    {/* {sectionIndex+1}.{itemIndex+1}.{subItemIndex+1}  Sub Item {subItemIndex + 1}{' '}
												&nbsp;&nbsp; */}
												{props.sectionMode==true? `${sectionIndex+1}.${itemIndex+1}.${subItemIndex+1}  Sub Item ${subItemIndex + 1}`
												// : `${itemIndex+1}.${subItemIndex+1}   Sub Item ${subItemIndex + 1}`}
												: `${sectionIndex+1}.${subItemIndex+1}   Sub Item ${subItemIndex + 1}`}
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
															(errors.sections?.[sectionIndex]?.items?.[itemIndex]?.sub_items?.[
																subItemIndex
															]?.product_description
																? 'is-invalid'
																: '')
														}
														{...register(
															`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.product_description`,
														)}
														type='text'
														placeholder='product_desc'
														disabled={props.isViewMode}
													/>
													<div className='invalid-feedback'>
														{
															errors.sections?.[sectionIndex]?.items?.[itemIndex]?.sub_items?.[
																subItemIndex
															]?.product_description?.message
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
															(errors.sections?.[sectionIndex]?.items?.[itemIndex]?.sub_items?.[
																subItemIndex
															]?.brand
																? 'is-invalid'
																: '')
														}
														{...register(
															`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.brand`,
														)}
														type='text'
														placeholder='brand'
														disabled={props.isViewMode}
													/>
													<div className='invalid-feedback'>
														{
															errors.sections?.[sectionIndex]?.items?.[itemIndex]?.sub_items?.[
																subItemIndex
															]?.brand?.message
														}
													</div>
												</FormGroup>
											</div>
											<div className='col-md-4'>
												<FormGroup id='model' label='Model' isFloating>
													<input
														id='model'
														className={
															'form-control ' +
															(errors.sections?.[sectionIndex]?.items?.[itemIndex]?.sub_items?.[
																subItemIndex
															]?.model
																? 'is-invalid'
																: '')
														}
														{...register(
															`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.model`,
														)}
														type='text'
														placeholder='model'
														disabled={props.isViewMode}
													/>
													<div className='invalid-feedback'>
														{
															errors.sections?.[sectionIndex]?.items?.[itemIndex]?.sub_items?.[
																subItemIndex
															]?.model?.message
														}
													</div>
												</FormGroup>
											</div>
											<div className='col-md-4'>
												<FormGroup id='remarks' label='Remarks' isFloating>
													<input
														id='remarks'
														className={
															'form-control ' +
															(errors.sections?.[sectionIndex]?.items?.[itemIndex]?.sub_items?.[
																subItemIndex
															]?.remarks
																? 'is-invalid'
																: '')
														}
														{...register(
															`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.remarks`,
														)}
														type='text'
														placeholder='remarks'
														disabled={props.isViewMode}
													/>
													<div className='invalid-feedback'>
														{
															errors.sections?.[sectionIndex]?.items?.[itemIndex]?.sub_items?.[
																subItemIndex
															]?.remarks?.message
														}
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
																	(errors.sections?.[sectionIndex]?.items?.[itemIndex]
																		?.sub_items?.[subItemIndex]
																		?.quantity
																		? 'is-invalid'
																		: '')
																}
																{...register(
																	`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.quantity`,
																)}
																type='text'
																placeholder='quantity'
																disabled={props.isViewMode}
															/>
															<div className='invalid-feedback'>
																{
																	errors.sections?.[sectionIndex]?.items?.[itemIndex]
																		?.sub_items?.[subItemIndex]
																		?.quantity?.message
																}
															</div>
														</FormGroup>
													</div>
													<div className='col-4'>
														<FormGroup
															id='unit'
															label='Unit'
															isFloating>
															<input
																id='unit'
																className={
																	'form-control ' +
																	(errors.sections?.[sectionIndex]?.items?.[itemIndex]
																		?.sub_items?.[subItemIndex]
																		?.unit
																		? 'is-invalid'
																		: '')
																}
																{...register(
																	`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.unit`,
																)}
																type='text'
																placeholder='unit'
																disabled={props.isViewMode}
															/>
															<div className='invalid-feedback'>
																{
																	errors.sections?.[sectionIndex]?.items?.[itemIndex]
																		?.sub_items?.[subItemIndex]
																		?.unit?.message
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
																		?.sub_items?.[subItemIndex]
																		?.unit_cost
																		? 'is-invalid'
																		: '')
																}
																{...register(
																	`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.unit_cost`,
																)}
																type='text'
																placeholder='unit_cost'
																disabled={props.isViewMode}
															/>
															<div className='invalid-feedback'>
																{
																	errors.sections?.[sectionIndex]?.items?.[itemIndex]
																		?.sub_items?.[subItemIndex]
																		?.unit_cost?.message
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
															(errors.sections?.[sectionIndex]?.items?.[itemIndex]?.sub_items?.[
																subItemIndex
															]?.total_cost
																? 'is-invalid'
																: '')
														}
														{...register(
															`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.total_cost`,
														)}
														type='text'
														placeholder='total_cost'
														//disabled={props.isViewMode}
														disabled
													/>
													<div className='invalid-feedback'>
														{
															errors.sections?.[sectionIndex]?.items?.[itemIndex]?.sub_items?.[
																subItemIndex
															]?.total_cost?.message
														}
													</div>
												</FormGroup>
											</div>
											<div className='col-md-8'>
												<div className='row'>
													<div className='col-md-4'>
														<FormGroup
															id='margin'
															label='Margin'
															isFloating>
															<input
																id='margin'
																className={
																	'form-control ' +
																	(errors.sections?.[sectionIndex]?.items?.[itemIndex]
																		?.sub_items?.[subItemIndex]
																		?.margin
																		? 'is-invalid'
																		: '')
																}
																{...register(
																	`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.margin`,
																)}
																type='text'
																placeholder='margin'
																disabled={props.isViewMode}
																onChange={
																	(e) => {
																		setValue(`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.unit_price`, calculateUnitPriceByMargin(formData.sections?.[sectionIndex]?.items[itemIndex].sub_items[subItemIndex].unit_cost, parseFloat(e.target.value)));
																		setValue(`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.total_price`, calculateTotalPrice(formData.sections?.[sectionIndex]?.items[itemIndex].sub_items[subItemIndex].unit_price, formData.sections?.[sectionIndex]?.items[itemIndex].sub_items[subItemIndex].quantity));
																		setValue(`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.margin_percentage`, calculateMarginPercentage(formData.sections?.[sectionIndex]?.items[itemIndex].sub_items[subItemIndex].unit_cost, formData.sections?.[sectionIndex]?.items[itemIndex].sub_items[subItemIndex].unit_price));
																	}
																	}
															/>
															<div className='invalid-feedback'>
																{
																	errors.sections?.[sectionIndex]?.items?.[itemIndex]
																		?.sub_items?.[subItemIndex]
																		?.margin?.message
																}
															</div>
														</FormGroup>
													</div>
													<div className='col-md-4'>
														<FormGroup
															id='margin_percentage'
															label='Margin Percentage'
															isFloating>
															<input
																id='margin_percentage'
																className={
																	'form-control ' +
																	(errors.sections?.[sectionIndex]?.items?.[itemIndex]
																		?.sub_items?.[subItemIndex]
																		?.margin_percentage
																		? 'is-invalid'
																		: '')
																}
																{...register(
																	`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.margin_percentage`,
																)}
																type='text'
																placeholder='margin_percentage'
																disabled={props.isViewMode}
																onChange={(e) => {
																	setValue(`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.unit_price`, calculateUnitPriceByMarginPercentage(formData.sections?.[sectionIndex]?.items[itemIndex].sub_items[subItemIndex].unit_cost, parseFloat(e.target.value)));
																	setValue(`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.total_price`, calculateTotalPrice(formData.sections?.[sectionIndex]?.items[itemIndex].sub_items[subItemIndex].unit_price, formData.sections?.[sectionIndex]?.items[itemIndex].sub_items[subItemIndex].quantity));
																	setValue(`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.margin`, calculateMargin(formData.sections?.[sectionIndex]?.items[itemIndex].sub_items[subItemIndex].unit_cost, formData.sections?.[sectionIndex]?.items[itemIndex].sub_items[subItemIndex].unit_price));
																}}
															/>
															<div className='invalid-feedback'>
																{
																	errors.sections?.[sectionIndex]?.items?.[itemIndex]
																		?.sub_items?.[subItemIndex]
																		?.margin_percentage?.message
																}
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
																	(errors.sections?.[sectionIndex]?.items?.[itemIndex]
																		?.sub_items?.[subItemIndex]
																		?.unit_price
																		? 'is-invalid'
																		: '')
																}
																{...register(
																	`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.unit_price`,
																)}
																type='text'
																placeholder='unit_price'
																disabled={props.isViewMode}
																onChange={(e) => {
																	setValue(`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.margin`, calculateMargin(formData.sections?.[sectionIndex]?.items[itemIndex].sub_items[subItemIndex].unit_cost, parseFloat(e.target.value)));
																	setValue(`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.margin_percentage`, calculateMarginPercentage(formData.sections?.[sectionIndex]?.items[itemIndex].sub_items[subItemIndex].unit_cost, parseFloat(e.target.value)));
																	setValue(`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.total_price`, calculateTotalPrice(parseFloat(e.target.value), formData.sections?.[sectionIndex]?.items[itemIndex].sub_items[subItemIndex].quantity));
																}}
															/>
															<div className='invalid-feedback'>
																{
																	errors.sections?.[sectionIndex]?.items?.[itemIndex]
																		?.sub_items?.[subItemIndex]
																		?.unit_price?.message
																}
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
															(errors.sections?.[sectionIndex]?.items?.[itemIndex]?.sub_items?.[
																subItemIndex
															]?.total_price
																? 'is-invalid'
																: '')
														}
														{...register(
															`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.total_price`,
														)}
														type='text'
														placeholder='total_price'
														//disabled={props.isViewMode}
														disabled
													/>
													<div className='invalid-feedback'>
														{
															errors.sections?.[sectionIndex]?.items?.[itemIndex]?.sub_items?.[
																subItemIndex
															]?.total_price?.message
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
																	(errors.sections?.[sectionIndex]?.items?.[itemIndex]?.sub_items?.[subItemIndex]?.lead_time
																		? 'is-invalid'
																		: '')
																}
																{...register(`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.lead_time`)}
																type='text'
																placeholder='lead_time'
																disabled={props.isViewMode}
															/>
															<div className='invalid-feedback'>
																{
																	errors.sections?.[sectionIndex]?.items?.[itemIndex]?.sub_items?.[subItemIndex]?.lead_time
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
																	(errors.sections?.[sectionIndex]?.items?.[itemIndex]?.sub_items?.[subItemIndex]?.by_others
																		? 'is-invalid'
																		: '')
																}
																{...register(
																	`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.by_others`,
																)}
																type='checkbox'
																placeholder='by_others'
																disabled={props.isViewMode}
																onChange={
																	(e) => {
																		//console.log(e.target.checked);
																		if(e.target.checked){
																			setValue(`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.by_others`, true);
																			if(formData.sections?.[sectionIndex]?.items?.[itemIndex]?.sub_items?.[subItemIndex]?.inclusive){
																				setValue(`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.inclusive`, false);
																			}
																		}else{
																			setValue(`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.by_others`, false);
																		}
																	}
																}
															/>
															<div className='invalid-feedback'>
																{
																	errors.sections?.[sectionIndex]?.items?.[itemIndex]?.sub_items?.[subItemIndex]					
																		?.by_others?.message
																}
															</div>
														</FormGroup>
													</div>
													<div className='col-2 d-flex align-items-center'>
														<FormGroup
															id='inclusive'
															label='Inclusive'
															className='form-check form-check-inline'>
															<input
																id='inclusive'
																className={
																	'form-check-input ' +
																	(errors.sections?.[sectionIndex]?.items?.[itemIndex]?.sub_items?.[subItemIndex]?.inclusive
																		? 'is-invalid'
																		: '')
																}
																{...register(
																	`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.inclusive`,
																)}
																type='checkbox'
																placeholder='inclusive'
																disabled={props.isViewMode}
																onChange={
																	(e) => {
																		//console.log(e.target.checked);
																		if(e.target.checked){
																			setValue(`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.inclusive`, true);
																			if(formData.sections?.[sectionIndex]?.items?.[itemIndex]?.sub_items?.[subItemIndex]?.by_others){
																				setValue(`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.by_others`, false);
																			}
																		}else{
																			setValue(`sections.${sectionIndex}.items.${itemIndex}.sub_items.${subItemIndex}.inclusive`, false);
																		}
																	}
																}
															/>
															<div className='invalid-feedback'>
																{
																	errors.sections?.[sectionIndex]?.items?.[itemIndex]?.sub_items?.[subItemIndex]						
																		?.inclusive?.message
																}
															</div>
														</FormGroup>
													</div>
												</div>
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
					<br />
				</>
			)}
		</>
	);
};

export default ManageSubItem;
