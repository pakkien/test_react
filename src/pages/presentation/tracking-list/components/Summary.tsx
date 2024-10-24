import React from 'react';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Card, { CardBody } from '../../../../components/bootstrap/Card';

const Summary = () => {
	return (
		<Card className='rounded-2'>
			<CardBody>
				<div className='row g-4'>
					<div className='col-md-12'>
						<h4>Summary</h4>
					</div>
					<div className='col-md-8'>
						<FormGroup id='referenceStatus' label='Reference Status' isFloating>
							<Input placeholder='Name' defaultValue='' />
						</FormGroup>
					</div>
					<div className='col-md-4'>
						<FormGroup id='total' label='Total (RM)' isFloating>
							<Input placeholder='Name' defaultValue='' />
						</FormGroup>
					</div>
					<div className='col-md-8'>
						<FormGroup id='note' label='Note' isFloating>
							<Input placeholder='Name' defaultValue='' />
						</FormGroup>
					</div>
					<div className='col-md-4'>
						<FormGroup id='gtotal' label='G/Total (RM)' isFloating>
							<Input placeholder='Name' defaultValue='' />
						</FormGroup>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default Summary;
