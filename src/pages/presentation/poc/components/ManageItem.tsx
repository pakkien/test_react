import React from 'react';
import { useFormContextQuotation } from '../QuotationForm';
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

const ManageItem = () => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContextQuotation();

	const { append, remove, fields } = useFieldArray({
		name: 'items',
		control,
	});

	const addItem = () => {
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
			total_price: '',
			sub_items: [],
		});
	};

	return (
		<div className='pb-0'>
			<div className='row g-4'>
				<div className='col-md-12' hidden={fields.length == 0 ? false : true}>
					<Button color='info' icon='Add' tag='a' onClick={addItem} className='float-end'>
						Add Item
					</Button>
				</div>
				<div className='col-md-12'>
					{fields.map((item, itemIndex) => {
						return (
							<Card id={'#item_card_id#' + itemIndex} key={item.id}>
								<CardHeader>
									<CardLabel>
										<CardTitle tag='div' className='h3'>
											Item Details {itemIndex + 1}/{fields.length}{' '}
											&nbsp;&nbsp;
										</CardTitle>
									</CardLabel>
									<CardActions>
										<Button
											color='danger'
											icon='Delete'
											tag='a'
											hidden={false}
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
														(errors.items?.[itemIndex]?.product_desc
															? 'is-invalid'
															: '')
													}
													{...register(`items.${itemIndex}.product_desc`)}
													type='text'
													placeholder='product_desc'
												/>
												<div className='invalid-feedback'>
													{
														errors.items?.[itemIndex]?.product_desc
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
														(errors.items?.[itemIndex]?.brand
															? 'is-invalid'
															: '')
													}
													{...register(`items.${itemIndex}.brand`)}
													type='text'
													placeholder='brand'
												/>
												<div className='invalid-feedback'>
													{errors.items?.[itemIndex]?.brand?.message}
												</div>
											</FormGroup>
										</div>
										<div className='col-md-4'>
											<FormGroup id='model' label='Model' isFloating>
												<input
													id='model'
													className={
														'form-control ' +
														(errors.items?.[itemIndex]?.model
															? 'is-invalid'
															: '')
													}
													{...register(`items.${itemIndex}.model`)}
													type='text'
													placeholder='model'
												/>
												<div className='invalid-feedback'>
													{errors.items?.[itemIndex]?.model?.message}
												</div>
											</FormGroup>
										</div>
										<div className='col-md-4'>
											<FormGroup id='remarks' label='Remarks' isFloating>
												<input
													id='remarks'
													className={
														'form-control ' +
														(errors.items?.[itemIndex]?.remarks
															? 'is-invalid'
															: '')
													}
													{...register(`items.${itemIndex}.remarks`)}
													type='text'
													placeholder='remarks'
												/>
												<div className='invalid-feedback'>
													{errors.items?.[itemIndex]?.remarks?.message}
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
																(errors.items?.[itemIndex]?.quantity
																	? 'is-invalid'
																	: '')
															}
															{...register(
																`items.${itemIndex}.quantity`,
															)}
															type='text'
															placeholder='quantity'
														/>
														<div className='invalid-feedback'>
															{
																errors.items?.[itemIndex]?.quantity
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
																(errors.items?.[itemIndex]?.unit
																	? 'is-invalid'
																	: '')
															}
															{...register(`items.${itemIndex}.unit`)}
															type='text'
															placeholder='unit'
														/>
														<div className='invalid-feedback'>
															{
																errors.items?.[itemIndex]?.unit
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
																	?.unit_cost
																	? 'is-invalid'
																	: '')
															}
															{...register(
																`items.${itemIndex}.unit_cost`,
															)}
															type='text'
															placeholder='unit_cost'
														/>
														<div className='invalid-feedback'>
															{
																errors.items?.[itemIndex]?.unit_cost
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
														(errors.items?.[itemIndex]?.total_cost
															? 'is-invalid'
															: '')
													}
													{...register(`items.${itemIndex}.total_cost`)}
													type='text'
													placeholder='total_cost'
												/>
												<div className='invalid-feedback'>
													{errors.items?.[itemIndex]?.total_cost?.message}
												</div>
											</FormGroup>
										</div>
										<div className='col-md-4'>
											<FormGroup id='margin' label='Margin' isFloating>
												<input
													id='margin'
													className={
														'form-control ' +
														(errors.items?.[itemIndex]?.margin
															? 'is-invalid'
															: '')
													}
													{...register(`items.${itemIndex}.margin`)}
													type='text'
													placeholder='margin'
												/>
												<div className='invalid-feedback'>
													{errors.items?.[itemIndex]?.margin?.message}
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
														(errors.items?.[itemIndex]?.unit_price
															? 'is-invalid'
															: '')
													}
													{...register(`items.${itemIndex}.unit_price`)}
													type='text'
													placeholder='unit_price'
												/>
												<div className='invalid-feedback'>
													{errors.items?.[itemIndex]?.unit_price?.message}
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
														(errors.items?.[itemIndex]?.total_price
															? 'is-invalid'
															: '')
													}
													{...register(`items.${itemIndex}.total_price`)}
													type='text'
													placeholder='total_price'
												/>
												<div className='invalid-feedback'>
													{
														errors.items?.[itemIndex]?.total_price
															?.message
													}
												</div>
											</FormGroup>
										</div>
										<div className='col-md-12'>
											{/* sub_item here */}
                                            <ManageSubItem itemIndex={itemIndex}/>
											{/* {ItemProps.data.sub_item.length > 0 && (
												<Accordion
													id='accSample'
													activeItemId={ItemProps.data.item_id}
													color='dark'>
													<AccordionItem
														id={ItemProps.data.item_id}
														title='Sub Item'>
														{ItemProps.data.sub_item.map((sub_item) => (
															<SingleSubItem
																key={sub_item.sub_item_id}
																mode={ItemProps.mode}
																data={sub_item}
																deleteSubItemfunc={
																	handleDeleteSubItem
																}
																editSubItemfunc={handleEditSubItem}
															/>
														))}
													</AccordionItem>
												</Accordion>
											)} */}
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
											hidden={false}
											onClick={addItem}>
											Add Item
										</Button>
										<Button
											color='info'
											icon='Add'
											tag='a'
											hidden={false}
											onClick={() => {
												//handleButtonClick_addSubItem(ItemProps.data.item_id);
											}}>
											Add Sub-Item
										</Button>
									</CardFooterRight>
								</CardFooter>
							</Card>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ManageItem;
