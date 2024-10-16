import React, { useState } from 'react';
import Card, {
	CardHeader,
	CardLabel,
	CardTitle,
	CardBody,
	CardFooter,
	CardActions,
} from '../../../../components/bootstrap/Card';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import { useFormik } from 'formik';
import Button from '../../../../components/bootstrap/Button';
import Icon from '../../../../components/icon/Icon';
import Input from '../../../../components/bootstrap/forms/Input';
import Collapse from '../../../../components/bootstrap/Collapse';
import { SubheaderSeparator } from '../../../../layout/SubHeader/SubHeader';
import Accordion, { AccordionItem } from '../../../../components/bootstrap/Accordion';

const SubItemDetails = () => {
	// const [isOpen, setIsOpen] = useState(true);
	// const setFirstElement = () => setIsOpen(!isOpen);

	return (
		<Accordion id='subitemAccordion' activeItemId='subitemAccordionitem' color='dark'>
			<AccordionItem
				id='subitemAccordionitem'
				title='10" Active Full Range Monitor Loudspeaker - Breakdown'
				icon='List'>
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
			</AccordionItem>
		</Accordion>
	);
};

export default SubItemDetails;
