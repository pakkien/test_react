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
import Button from '../../../../components/bootstrap/Button';

type SummaryProps = {
	mode: string;
};

const Summary = (SummaryProps: SummaryProps) => {
	const isViewMode = SummaryProps.mode.toLowerCase() === 'view' ? true : false;

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
				<CardFooterRight>
					<Button color='dark' icon='Edit' tag='a' hidden={isViewMode ? true : false}>
						Draft
					</Button>
					<Button color='success' icon='Save' tag='a' hidden={isViewMode ? true : false}>
						Save
					</Button>
				</CardFooterRight>
			</CardFooter>
		</Card>
	);
};

export default Summary;
