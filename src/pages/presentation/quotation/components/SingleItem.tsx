import { type } from 'os';
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
import SingleSubItem from './SingleSubItem';
import SubItemSection from './SubItemSection';

type ItemProps = {
	mode: string;
	data: item;
};

type item = {
	item_id: string;
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
	sub_item: sub_item[];
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

const SingleItem = (ItemProps: ItemProps) => {
	const isViewMode = ItemProps.mode.toLowerCase() === 'view' ? true : false;

	return (
		<Card tag='form'>
			<CardHeader>
				<CardLabel>
					<CardTitle tag='div' className='h3'>
						Add Item Details
					</CardTitle>
				</CardLabel>
				<CardActions>
					<Button color='danger' icon='Delete' tag='a' hidden={isViewMode ? true : false}>
						Delete Item
					</Button>
				</CardActions>
			</CardHeader>
			<CardBody className='pb-0'>
				<div className='row g-4'>
					<div className='col-md-12'>
						<FormGroup
							id='ProductDesc'
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

					<SubItemSection mode={ItemProps.mode} data={ItemProps.data.sub_item} />
				</div>
			</CardBody>
			<CardFooter>
				<CardFooterRight>
					<Button color='info' icon='Add' tag='a' hidden={isViewMode ? true : false}>
						Add Item
					</Button>
					<Button color='info' icon='Delete' tag='a' hidden={isViewMode ? true : false}>
						Add Sub-Item
					</Button>
				</CardFooterRight>
			</CardFooter>
		</Card>
	);
};

export default SingleItem;
