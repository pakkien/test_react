import React from 'react';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';

const Summary = () => {
	return (
		<React.Fragment>
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
		</React.Fragment>
	);
};

export default Summary;
