import React from 'react';
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
import Input from '../../../../components/bootstrap/forms/Input';

type SubItemProps = {
	mode: string;
	data: sub_item;
};

type sub_item = {
	sub_item_id: string;
	product_desc: string;
	brand: string;
	model: string;
	remarks: string;
	quantity: number;
	unit: string;
	unit_cost: number;
	total_cost: number;
	margin: number;
	unit_price: number;
	total_price: number;
};

const SingleSubItem = (SubItemProps: SubItemProps) => {
	const isViewMode = SubItemProps.mode.toLowerCase() === 'view' ? true : false;

	return (
		<Card>
			<CardHeader>
				<CardLabel>
					<CardTitle tag='div' className='h3'>
						Add Sub-Item Details
					</CardTitle>
				</CardLabel>
				<CardActions>
					<Button color='danger' icon='Delete' tag='a' hidden={isViewMode ? true : false}>
						Delete Sub-Item
					</Button>
				</CardActions>
			</CardHeader>
			<CardBody>
				<div className='row g-4'>
					<div className='col-md-12'>
						<FormGroup
							id='productDesc'
							label='Product Description | Job Scope'
							isFloating>
							<Input placeholder='Name' defaultValue='' />
						</FormGroup>
					</div>
					<div className='col-md-4'>
						<FormGroup id='Brand' label='Brand' isFloating>
							<Input placeholder='Name' defaultValue='' />
						</FormGroup>
					</div>
					<div className='col-md-4'>
						<FormGroup id='Model' label='Model' isFloating>
							<Input placeholder='Name' defaultValue='' />
						</FormGroup>
					</div>
					<div className='col-md-4'>
						<FormGroup id='Remarks' label='Remarks' isFloating>
							<Input placeholder='Name' defaultValue='' />
						</FormGroup>
					</div>
					<div className='col-md-8'>
						<div className='row'>
							<div className='col-4'>
								<FormGroup id='Quantity' label='Quantity' isFloating>
									<Input placeholder='Name' defaultValue='' />
								</FormGroup>
							</div>
							<div className='col-4'>
								<FormGroup id='Unit' label='Unit' isFloating>
									<Input placeholder='Name' defaultValue='' />
								</FormGroup>
							</div>
							<div className='col-4'>
								<FormGroup id='UnitCost' label='Unit Cost' isFloating>
									<Input placeholder='Name' defaultValue='' />
								</FormGroup>
							</div>
						</div>
					</div>
					<div className='col-md-4'>
						<FormGroup id='TotalCost' label='Total Cost' isFloating>
							<Input placeholder='Name' defaultValue='' />
						</FormGroup>
					</div>
					<div className='col-md-4'>
						<FormGroup id='Margin' label='Margin' isFloating>
							<Input placeholder='Name' defaultValue='' />
						</FormGroup>
					</div>
					<div className='col-md-4'>
						<FormGroup id='UnitPrice' label='Unit Price (RM)' isFloating>
							<Input placeholder='Name' defaultValue='' />
						</FormGroup>
					</div>
					<div className='col-md-4'>
						<FormGroup id='TotalPrice' label='Total Price (RM)' isFloating>
							<Input placeholder='Name' defaultValue='' />
						</FormGroup>
					</div>
				</div>
			</CardBody>
			<CardFooter>
				<></>
			</CardFooter>
		</Card>
	);
};

export default SingleSubItem;
