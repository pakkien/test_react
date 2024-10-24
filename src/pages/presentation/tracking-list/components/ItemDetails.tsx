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
import Summary from './Summary';

const ItemDetails = () => {
	return (
		<>
		{/* <div className='row'>
			<div className='col-xl-12 col-lg-12 col-md-12'>
					Quotation No: 245001S1-TGH-Variation-01&nbsp;&nbsp;&nbsp;
					<Badge className='statusBadge' color='dark'>
				<h6>Closed</h6>
			</Badge>
			</div>
			<h6>Revision: 1.1</h6>
	
		</div> */}
		<Card className='rounded-2'>
			{/* <CardHeader>
				<CardLabel>
					<CardTitle>
						Item #1
					</CardTitle>				
				</CardLabel>
			</CardHeader> */}
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

					{/* sub item details */}
					<div className='col-md-12'>
						<SubItemDetails />
					</div>
					<div className='col-md-12'></div>
					
					<div className='col-md-12'></div>
				</div>
			</CardBody>
		</Card>

		<Summary />
		</>
	);
};

export default ItemDetails;
