import React from 'react';
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

type ItemProps = {
	isViewMode: boolean
};


const ManageItem = (props: ItemProps) => {
	
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
				<div className='col-md-12' hidden={props.isViewMode||fields.length > 0 ? true:false}>
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
											Item - {itemIndex + 1}/{fields.length}{' '}
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
														(errors.items?.[itemIndex]?.product_desc
															? 'is-invalid'
															: '')
													}
													{...register(`items.${itemIndex}.product_desc`)}
													type='text'
													placeholder='product_desc'
													disabled={props.isViewMode}
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
													disabled={props.isViewMode}
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
													disabled={props.isViewMode}
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
													disabled={props.isViewMode}
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
															disabled={props.isViewMode}
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
															disabled={props.isViewMode}
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
															disabled={props.isViewMode}
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
													disabled={props.isViewMode}
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
													disabled={props.isViewMode}
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
													disabled={props.isViewMode}
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
													disabled={props.isViewMode}
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
											<ManageSubItem itemIndex={itemIndex} isViewMode={props.isViewMode}/>
										</div>
										<div className='col-md-12'>
											<Button
												color='info'
												icon='Add'
												tag='a'
												onClick={addItem}
												className='float-end'
												hidden={props.isViewMode}>
												Add Item					
											</Button>
										</div>

										<div className='col-md-12'></div>
									</div>
								</CardBody>
								{/* <CardFooter>
									<></>
								</CardFooter> */}
								{/* <CardFooter>
									<CardFooterRight>
										<Button
											color='info'
											icon='Add'
											tag='a'
											hidden={false}
											onClick={addItem}>
											Add Item
										</Button>
									</CardFooterRight>
								</CardFooter> */}
							</Card>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ManageItem;
