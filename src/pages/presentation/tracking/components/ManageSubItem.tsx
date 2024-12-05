import React from 'react';
import QuotationDataType from '../../../dataTypes/QuotationDataType';
import Accordion, { AccordionItem } from '../../../../components/bootstrap/Accordion';
import Input from '../../../../components/bootstrap/forms/Input';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Checks from '../../../../components/bootstrap/forms/Checks';
import Card, {
	CardHeader,
	CardLabel,
	CardTitle,
	CardBody,
} from '../../../../components/bootstrap/Card';

type SubItemProps = {
	itemIndex: number;
	sub_items: QuotationDataType.Sub_item[];
};

const ManageSubItem = (props: SubItemProps) => {
	return (
		<div className='pb-0'>
			<div className='col-xl-12' key={props.itemIndex}>
				<Accordion
					id='SubItemAccordion'
					color='dark'
					activeItemId={'SubItemAccordionItem_' + props.itemIndex}>
					<AccordionItem
						id={'SubItemAccordionItem_' + props.itemIndex}
						title='Sub Items'>
						{props.sub_items.map((sub_item, subItemIndex) => {
							return (
								<>
									<Card
										id={'#subItem_card_id#' + subItemIndex}
										key={sub_item.sub_item_id}>
										<CardHeader>
											<CardLabel>
												<CardTitle tag='div' className='h3'>
													Sub Item {props.itemIndex + 1}.{subItemIndex+1}{' '}
													&nbsp;&nbsp;
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
															value={sub_item.product_description}
															disabled
														/>
													</FormGroup>
												</div>
												<div className='col-md-4'>
													<FormGroup id='brand' label='Brand' isFloating>
														<Input value={sub_item.brand} disabled />
													</FormGroup>
												</div>
												<div className='col-md-4'>
													<FormGroup id='model' label='Model' isFloating>
														<Input value={sub_item.model} disabled />
													</FormGroup>
												</div>
												<div className='col-md-4'>
													<FormGroup
														id='remarks'
														label='Remarks'
														isFloating>
														<Input value={sub_item.remarks} disabled />
													</FormGroup>
												</div>
												<div className='col-md-8'>
													<div className='row'>
														<div className='col-3'>
															<FormGroup
																id='quantity'
																label='Quantity'
																isFloating>
																<Input
																	value={sub_item.quantity}
																	disabled
																/>
															</FormGroup>
														</div>
														<div className='col-3'>
															<FormGroup
																id='unit'
																label='Unit'
																isFloating>
																<Input
																	value={sub_item.unit}
																	disabled
																/>
															</FormGroup>
														</div>
														<div className='col-4'>
															<FormGroup
																id='unit_cost'
																label='Unit Cost'
																isFloating>
																<Input
																	value={sub_item.unit_cost}
																	disabled
																/>
															</FormGroup>
														</div>
														<div className='col-2 d-flex align-items-center'>
															<FormGroup
																id='estimated_cost'
																label='Estimated Cost'>
																<Checks
																	checked={
																		sub_item.estimated_cost
																	}
																	disabled
																	type='checkbox'
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
														<Input
															value={sub_item.total_cost}
															disabled
														/>
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
																	value={sub_item.margin}
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
																	value={
																		sub_item.margin_percentage
																	}
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
																	value={sub_item.unit_price}
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
														<Input
															value={sub_item.total_price}
															disabled
														/>
													</FormGroup>
												</div>
												<div className='col-md-12'></div>
											</div>
										</CardBody>
									</Card>
								</>
							);
						})}
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
};

export default ManageSubItem;
