import React from 'react';
import QuotationDataType from '../../../dataTypes/QuotationDataType';
import Accordion, { AccordionItem } from '../../../../components/bootstrap/Accordion';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Button from '../../../../components/bootstrap/Button';
import { register } from 'module';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import ManageSubItem from '../components/ManageSubItem';
import Input from '../../../../components/bootstrap/forms/Input';
import Checks from '../../../../components/bootstrap/forms/Checks';

type ItemProps = {
	items: QuotationDataType.Item[];
	sectionMode: boolean;
	sectionIndex: number;
};

const ManageItem = (props: ItemProps) => {
	props.items.sort((a, b) => (a.order < b.order ? -1 : a.order > b.order ? 1 : 0));

	return (
		<div className='pb-0'>
			{props.items.map((item, itemIndex) => {
				return (
					<>
						<div className='col-xl-12'>
							<Accordion
								id='ItemAccordion'
								color='dark'
								activeItemId={'ItemAccordionItem_' + itemIndex}>
								<AccordionItem
									id={'ItemAccordionItem_' + itemIndex}
									title={
										props.sectionMode
											? `${props.sectionIndex + 1}.${itemIndex + 1} Item ${itemIndex + 1}`
											: `${itemIndex + 1}.0 Item ${itemIndex + 1}`
									}>
									<Card
										id={'#item_card_id#' + itemIndex}
										key={item.item_id}
										shadow='none'
										borderSize={1}
										borderColor='light'>
										<CardHeader>
											<CardLabel>
												<CardTitle tag='div' className='h3'>
													Item {itemIndex + 1} &nbsp;&nbsp;
												</CardTitle>
											</CardLabel>
										</CardHeader>
										<CardBody className='pb-0'>
											<div className='row g-4'>
												<div className='col-md-12'>
													<FormGroup
														id='product_desc'
														label='Product Description | Job Scope'
														isFloating>
														<Input
															value={item.product_description}
															disabled
														/>
													</FormGroup>
												</div>
												<div className='col-md-4'>
													<FormGroup id='brand' label='Brand' isFloating>
														<Input value={item.brand} disabled />
													</FormGroup>
												</div>
												<div className='col-md-4'>
													<FormGroup id='model' label='Model' isFloating>
														<Input value={item.model} disabled />
													</FormGroup>
												</div>
												<div className='col-md-4'>
													<FormGroup
														id='remarks'
														label='Remarks'
														isFloating>
														<Input value={item.remarks} disabled />
													</FormGroup>
												</div>
												<div className='col-md-8'>
													<div className='row'>
														<div className='col-4'>
															<FormGroup
																id='quantity'
																label='Quantity'
																isFloating>
																<Input
																	value={item.quantity}
																	disabled
																/>
															</FormGroup>
														</div>
														<div className='col-4'>
															<FormGroup
																id='unit'
																label='Unit'
																isFloating>
																<Input value={item.unit} disabled />
															</FormGroup>
														</div>
														<div className='col-4'>
															<FormGroup
																id='unit_cost'
																label='Unit Cost'
																isFloating>
																<Input
																	value={item.unit_cost}
																	disabled
																/>
															</FormGroup>
														</div>
													</div>
												</div>
												<div className='col-md-4'>
													<FormGroup
														id='total_cost'
														label='Total Cost'
														isFloating>
														<Input value={item.total_cost} disabled />
													</FormGroup>
												</div>
												<div className='col-md-8'>
													<div className='row'>
														<div className='col-4'>
															<FormGroup
																id='margin'
																label='Margin'
																isFloating>
																<Input
																	value={item.margin}
																	disabled
																/>
															</FormGroup>
														</div>
														<div className='col-4'>
															<FormGroup
																id='margin_percentage'
																label='Margin Percentage'
																isFloating>
																<Input
																	value={item.margin_percentage}
																	disabled
																/>
															</FormGroup>
														</div>
														<div className='col-4'>
															<FormGroup
																id='unit_price'
																label='Unit Price'
																isFloating>
																<Input
																	value={item.unit_price}
																	disabled
																/>
															</FormGroup>
														</div>
													</div>
												</div>
												<div className='col-md-4'>
													<FormGroup
														id='total_price'
														label='Total Price'
														isFloating>
														<Input value={item.total_price} disabled />
													</FormGroup>
												</div>
												<div className='col-md-8'>
													<div className='row'>
														<div className='col-md-4'>
															<FormGroup
																id='lead_time'
																label='Lead Time'
																isFloating>
																<Input
																	value={item.lead_time}
																	disabled
																/>
															</FormGroup>
														</div>
														<div className='col-2 d-flex align-items-center'>
															<FormGroup
																id='by_others'
																label='By others'
																className='form-check form-check-inline'>
																<input
																	checked={item.by_others}
																	disabled
																	type='checkbox'
																	className='form-check-input'
																/>
															</FormGroup>
														</div>
														<div className='col-2 d-flex align-items-center'>
															<FormGroup
																id='by_inclusive'
																label='By Inclusive'
																className='form-check form-check-inline'>
																<input
																	checked={item.by_inclusive}
																	disabled
																	type='checkbox'
																	className='form-check-input'
																/>
															</FormGroup>
														</div>
													</div>
												</div>

												<div className='col-md-12'></div>

												<div className='col-md-12'>
													<ManageSubItem
														itemIndex={itemIndex}
														sub_items={item.sub_items}
														sectionMode={props.sectionMode}
														sectionIndex={props.sectionIndex}
													/>
												</div>
												<div className='col-md-12'></div>
											</div>
										</CardBody>
									</Card>
								</AccordionItem>
							</Accordion>
						</div>
						<div className='col-md-12'></div>
					</>
				);
			})}
		</div>
	);
};

export default ManageItem;
