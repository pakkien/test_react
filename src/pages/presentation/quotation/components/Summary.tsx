import React from 'react';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../../components/bootstrap/Card';

const Summary = () => {
	return (
		<Card>
			<CardHeader>
				<CardLabel>
					<CardTitle tag='div' className='h3'>
						Summary
					</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody className='pb-0'>
				<div className='row g-4'>
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
			<CardFooter>
				<></>
			</CardFooter>
		</Card>
	);
};

export default Summary;
