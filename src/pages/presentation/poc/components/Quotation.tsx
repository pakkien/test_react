import React from 'react';

import { FormTypeQuotation, useFormContextQuotation } from '../QuotationForm';
import { SubmitHandler, useFieldArray } from 'react-hook-form';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Card, {
	CardBody,
	CardFooter,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Button from '../../../../components/bootstrap/Button';
import ManageItem from './ManageItem';
import Alert from '../../../../components/bootstrap/Alert';

export const Quotation = () => {
	const {
		register,
		formState: { errors },
		watch,
		handleSubmit,
	} = useFormContextQuotation();
	const formData = watch();

	//console.log('formData', formData)
	//console.log('errors', errors)

	return (
		<form
			onSubmit={handleSubmit((data) => {
				console.log('Form submitted: ', data);
			})}>
			<Card>
				<CardHeader>
					<CardLabel>
						<CardTitle tag='div' className='h3'>
							Quotation
						</CardTitle>
					</CardLabel>
				</CardHeader>
				<CardBody className='pb-0'>
					<div className='row g-4'>
						<div className='col-md-12'>
							<FormGroup id='client' label='Client' isFloating>
								<input
									id='client'
									className={
										'form-control ' + (errors.client ? 'is-invalid' : '')
									}
									{...register('client')}
									type='text'
									placeholder='client'
								/>
								<>
									{errors.client ? (
										<div className='invalid-feedback'>
											{errors.client.message}
										</div>
									) : (
										''
									)}
								</>
							</FormGroup>
						</div>
						<div className='col-md-4'>
							<FormGroup id='end_user' label='End User' isFloating>
								<input
									id='end_user'
									className={
										'form-control ' + (errors.end_user ? 'is-invalid' : '')
									}
									{...register('end_user')}
									type='text'
									placeholder='end_user'
								/>
								<>
									{errors.end_user ? (
										<div className='invalid-feedback'>
											{errors.end_user.message}
										</div>
									) : (
										''
									)}
								</>
							</FormGroup>
						</div>
						<div className='col-md-4'>
							<FormGroup id='site_location' label='Site Location' isFloating>
								<input
									id='site_location'
									className={
										'form-control ' + (errors.site_location ? 'is-invalid' : '')
									}
									{...register('site_location')}
									type='text'
									placeholder='site_location'
								/>
								<>
									{errors.site_location ? (
										<div className='invalid-feedback'>
											{errors.site_location.message}
										</div>
									) : (
										''
									)}
								</>
							</FormGroup>
						</div>
						<div className='col-md-4'>
							<FormGroup id='building' label='Building' isFloating>
								<input
									id='building'
									className={
										'form-control ' + (errors.building ? 'is-invalid' : '')
									}
									{...register('building')}
									type='text'
									placeholder='building'
								/>
								<>
									{errors.building ? (
										<div className='invalid-feedback'>
											{errors.building.message}
										</div>
									) : (
										''
									)}
								</>
							</FormGroup>
						</div>
						<div className='col-md-4'>
							<FormGroup id='pic' label='PIC' isFloating>
								<input
									id='pic'
									className={'form-control ' + (errors.pic ? 'is-invalid' : '')}
									{...register('pic')}
									type='text'
									placeholder='pic'
								/>
								<>
									{errors.pic ? (
										<div className='invalid-feedback'>{errors.pic.message}</div>
									) : (
										''
									)}
								</>
							</FormGroup>
						</div>
						<div className='col-md-8'>
							<FormGroup id='email' label='Email' isFloating>
								<input
									id='email'
									className={'form-control ' + (errors.email ? 'is-invalid' : '')}
									{...register('email')}
									type='text'
									placeholder='email'
								/>
								<>
									{errors.email ? (
										<div className='invalid-feedback'>
											{errors.email.message}
										</div>
									) : (
										''
									)}
								</>
							</FormGroup>
						</div>
						<div className='col-md-12'>
							<FormGroup id='project_ref' label='Project Reference' isFloating>
								<input
									id='project_ref'
									className={
										'form-control ' + (errors.project_ref ? 'is-invalid' : '')
									}
									{...register('project_ref')}
									type='text'
									placeholder='project_ref'
								/>
								<>
									{errors.project_ref ? (
										<div className='invalid-feedback'>
											{errors.project_ref.message}
										</div>
									) : (
										''
									)}
								</>
							</FormGroup>
						</div>
					</div>
				</CardBody>
				<CardFooter>
						<></>
				</CardFooter>
			</Card>

            <ManageItem/>

			{/* Summary */}
			<Card>
				<CardHeader>
					<CardLabel>
						<CardTitle tag='div' className='h3'>
							Summary
						</CardTitle>
					</CardLabel>
				</CardHeader>
				<CardBody className='pb-0'>
					<></>
					<div className='row g-4'>
						<div className='col-md-8'>
							<FormGroup id='reference_status' label='Reference Status' isFloating>
								<input
									id='reference_status'
									className={
										'form-control ' +
										(errors.reference_status ? 'is-invalid' : '')
									}
									{...register('reference_status')}
									type='text'
									placeholder='reference_status'
								/>
								<>
									{errors.reference_status ? (
										<div className='invalid-feedback'>
											{errors.reference_status.message}
										</div>
									) : (
										''
									)}
								</>
							</FormGroup>
						</div>
						<div className='col-md-4'>
							<FormGroup id='total' label='Total (RM)' isFloating>
								<input
									id='total'
									className={'form-control ' + (errors.total ? 'is-invalid' : '')}
									{...register('total')}
									type='text'
									placeholder='total'
								/>
								<>
									{errors.total ? (
										<div className='invalid-feedback'>
											{errors.total.message}
										</div>
									) : (
										''
									)}
								</>
							</FormGroup>
						</div>
						<div className='col-md-8'>
							<FormGroup id='note' label='Note' isFloating>
								<input
									id='note'
									className={'form-control ' + (errors.note ? 'is-invalid' : '')}
									{...register('note')}
									type='text'
									placeholder='note'
								/>
								<>
									{errors.note ? (
										<div className='invalid-feedback'>
											{errors.note.message}
										</div>
									) : (
										''
									)}
								</>
							</FormGroup>
						</div>
						<div className='col-md-4'>
							<FormGroup id='g_total' label='G/Total (RM)' isFloating>
								<input
									id='g_total'
									className={
										'form-control ' + (errors.g_total ? 'is-invalid' : '')
									}
									{...register('g_total')}
									type='text'
									placeholder='g_total'
								/>
								<>
									{errors.g_total ? (
										<div className='invalid-feedback'>
											{errors.g_total.message}
										</div>
									) : (
										''
									)}
								</>
							</FormGroup>
						</div>
					</div>
				</CardBody>
				<CardFooter>
					<CardFooterRight>
						<Button color='dark' icon='Edit' hidden={false}>
							Draft
						</Button>
						<Button type='submit' color='success'>
							Submit
						</Button>
					</CardFooterRight>
				</CardFooter>
			</Card>
           

            <Card>
           {errors.items?.message}
           </Card>
		</form>
	);
};

