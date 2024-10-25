import React from 'react';
import Card, {
	CardHeader,
	CardLabel,
	CardTitle,
	CardBody,
} from '../../../../components/bootstrap/Card';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import SubItemDetails from './SubItemDetails';
import Input from '../../../../components/bootstrap/forms/Input';
import Badge from '../../../../components/bootstrap/Badge';
import QuotationDataType from '../../../dataTypes/QuotationDataType';
import Accordion, { AccordionItem } from '../../../../components/bootstrap/Accordion';

type ItemProps = {
	item: QuotationDataType.Item;
};

const ItemDetails = (ItemProps: ItemProps) => {
	return (
		<Card className='rounded-2'>
			<CardBody>
				<div className='row g-4'>
					<div className='col-md-12'>
						<FormGroup
							id='productDesc'
							label='Product Description | Job Scope'
							isFloating>
							<Input placeholder='Name' value={ItemProps.item.product_desc} disabled/>
						</FormGroup>
					</div>
					<div className='col-md-4'>
						<FormGroup id='Brand' label='Brand' isFloating>
							<Input placeholder='Name' value={ItemProps.item.brand} disabled/>
						</FormGroup>
					</div>
					<div className='col-md-4'>
						<FormGroup id='Model' label='Model' isFloating>
							<Input placeholder='Name' value={ItemProps.item.model} disabled/>
						</FormGroup>
					</div>
					<div className='col-md-4'>
						<FormGroup id='Remarks' label='Remarks' isFloating>
							<Input placeholder='Name' value={ItemProps.item.remarks} disabled/>
						</FormGroup>
					</div>
					<div className='col-md-8'>
						<div className='row'>
							<div className='col-4'>
								<FormGroup id='Quantity' label='Quantity' isFloating>
									<Input placeholder='Name' value={ItemProps.item.quantity} disabled/>
								</FormGroup>
							</div>
							<div className='col-4'>
								<FormGroup id='Unit' label='Unit' isFloating>
									<Input placeholder='Name' value={ItemProps.item.unit} disabled/>
								</FormGroup>
							</div>
							<div className='col-4'>
								<FormGroup id='UnitCost' label='Unit Cost' isFloating>
									<Input placeholder='Name' value={ItemProps.item.unit_cost} disabled/>
								</FormGroup>
							</div>
						</div>
					</div>
					<div className='col-md-4'>
						<FormGroup id='TotalCost' label='Total Cost' isFloating>
							<Input placeholder='Name' value={ItemProps.item.total_cost} disabled/>
						</FormGroup>
					</div>
					<div className='col-md-4'>
						<FormGroup id='Margin' label='Margin' isFloating>
							<Input placeholder='Name' value={ItemProps.item.margin} disabled/>
						</FormGroup>
					</div>
					<div className='col-md-4'>
						<FormGroup id='UnitPrice' label='Unit Price (RM)' isFloating>
							<Input placeholder='Name' value={ItemProps.item.unit_price} disabled/>
						</FormGroup>
					</div>
					<div className='col-md-4'>
						<FormGroup id='TotalPrice' label='Total Price (RM)' isFloating>
							<Input placeholder='Name' value={ItemProps.item.total_price} disabled/>
						</FormGroup>
					</div>

					{/* sub item details */}
					<div className='col-md-12'>
						{ItemProps.item.sub_item.length > 0 && (
							<Accordion
								id='subitemAccordion'
								activeItemId='subitemAccordionitem'
								color='dark'>
								<AccordionItem
									id='subitemAccordionitem'
									title={ItemProps.item.product_desc + ' - Breakdown'}
									icon='List'>
									{ItemProps.item.sub_item.map((sub_item, idx) => (
										<SubItemDetails sub_item={sub_item} />
									))}
								</AccordionItem>
							</Accordion>
						)}
					</div>
					<div className='col-md-12'></div>

					<div className='col-md-12'></div>
				</div>
			</CardBody>
		</Card>
	);
};

export default ItemDetails;
