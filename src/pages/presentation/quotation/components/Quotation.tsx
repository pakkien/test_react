import React, { useState } from 'react';

import { FormTypeQuotation, useFormContextQuotation } from '../components/QuotationForm';
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
import QuotationDataType from '../../../dataTypes/QuotationDataType';
import SubHeader, {
	SubHeaderLeft,
	SubheaderSeparator,
} from '../../../../layout/SubHeader/SubHeader';
import { useNavigate } from 'react-router-dom';
import Page from '../../../../layout/Page/Page';
import Spinner from '../../../../components/bootstrap/Spinner';
import showNotification from '../../../../components/extras/showNotification';
import Icon from '../../../../components/icon/Icon';
import Input from '../../../../components/bootstrap/forms/Input';
import Dropzone from '../uploadFileComponents/Dropzone';
import axios from 'axios';
import ViewAttachment from '../uploadFileComponents/ViewAttachment';

type QuotationProps = {
	mode: 'create' | 'view' | 'edit';
	quotation_id?: string;
	quotation_rev_id?: string
};

export const Quotation = (props: QuotationProps) => {
	const {
		register,
		formState: { errors, isSubmitting },
		watch,
		handleSubmit,
	} = useFormContextQuotation();
	const formData = watch();

	//console.log('formData', formData)
	//console.log('errors', errors)

	const isViewMode = props.mode.toLowerCase() == 'view' ? true : false;
	const title =
		props.mode.charAt(0).toUpperCase() + props.mode.slice(1).toLowerCase() + ' Quotation ';
	

	// upload file
	const [attachmentIDs, setAttachmentIds] = useState<string[]>();

	const updateAttachmentID = (ids: string[]) => {
		setAttachmentIds(ids);
		
	};



	function timeout(delay: number) {
		return new Promise((res) => setTimeout(res, delay));
	}

	const navigate = useNavigate();


	const showSuccessNotification = () => {
		showNotification(
			<span className='d-flex align-items-center'>
				<Icon icon='Info' size='lg' className='me-1' />
				<span>Quotation saved</span>
			</span>,
			'Quotation saved successfully',
		);
	}

	const goToViewQuotationListPage = () => {
		//navigate('view-quotation');

		navigate('../quotation');

	};

	const config = {
		headers: {Authorization: `${localStorage.getItem('bts_token')}`}
	}

	const postCreateQuotation = async (payload: any) => {
		axios.post(`http://127.0.0.1:5000/quotation/`, payload, config).then((response) => {

			console.log(response.data);
			showSuccessNotification();
			goToViewQuotationListPage();
			
		});
	}

	const postUpdateQuotation = async (quotation_id: string, payload: any) => {
		axios.put(`http://127.0.0.1:5000/quotation/${quotation_id}`, payload, config).then((response) => {

			console.log(response.data);
			showSuccessNotification();
			goToViewQuotationListPage();
		  });
	}


	return (
		<PageWrapper title={title}>
			<SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => navigate(-1)}>
						Back
					</Button>
					<SubheaderSeparator />
					<strong className='fs-5'>{title}</strong>
				</SubHeaderLeft>
			</SubHeader>
			<Page container='fluid'>
				<form
					onSubmit={handleSubmit(async (data) => {
						//API CALL

						//await timeout(1000);
						
						// console.log('Form submitted: ', data);

						const payload = Object.assign(
							{ attachment_list: attachmentIDs,
								//created_by: "tester1@email.com",
								status: "submitted"

							 },
							data						
						);

						if(props.quotation_id){
							//update only since quotation_id exists
							postUpdateQuotation(props.quotation_id, payload);
						}else{
							postCreateQuotation(payload);
						}

						console.log('Form submitted (attachment): ', JSON.stringify(payload));


					})}>
					<Card>
						<CardHeader>
							<CardLabel>
								<CardTitle tag='div' className='h3'>
									{title}
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
												'form-control ' +
												(errors.client ? 'is-invalid' : '')
											}
											{...register('client')}
											type='text'
											placeholder='client'
											disabled={isViewMode}
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
												'form-control ' +
												(errors.end_user ? 'is-invalid' : '')
											}
											{...register('end_user')}
											type='text'
											placeholder='end_user'
											disabled={isViewMode}
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
												'form-control ' +
												(errors.site_location ? 'is-invalid' : '')
											}
											{...register('site_location')}
											type='text'
											placeholder='site_location'
											disabled={isViewMode}
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
												'form-control ' +
												(errors.building ? 'is-invalid' : '')
											}
											{...register('building')}
											type='text'
											placeholder='building'
											disabled={isViewMode}
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
											className={
												'form-control ' + (errors.pic ? 'is-invalid' : '')
											}
											{...register('pic')}
											type='text'
											placeholder='pic'
											disabled={isViewMode}
										/>
										<>
											{errors.pic ? (
												<div className='invalid-feedback'>
													{errors.pic.message}
												</div>
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
											className={
												'form-control ' + (errors.email ? 'is-invalid' : '')
											}
											{...register('email')}
											type='text'
											placeholder='email'
											disabled={isViewMode}
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
									<FormGroup
										id='project_ref'
										label='Project Reference'
										isFloating>
										<input
											id='project_ref'
											className={
												'form-control ' +
												(errors.project_reference ? 'is-invalid' : '')
											}
											{...register('project_reference')}
											type='text'
											placeholder='project_ref'
											disabled={isViewMode}
										/>
										<>
											{errors.project_reference ? (
												<div className='invalid-feedback'>
													{errors.project_reference.message}
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

					<ManageItem isViewMode={isViewMode} />

					{/* Test upload */}
					{/* <UploadFiles/> */}
					{isViewMode? 
					<ViewAttachment quotation_rev_id={props.quotation_rev_id}/>
					: 
					<Dropzone setAttachmentIds={updateAttachmentID} className={''}/>
					}							


					
					{/* <Card>
						<CardHeader>
							<CardLabel>
								<CardTitle tag='div' className='h3'>
									Upload PDF
								</CardTitle>
							</CardLabel>
						</CardHeader>
						<CardBody className='pb-0'>
							<div className='row g-4'>
								<div className='col-md-4'></div>
								<div className='col-md-4'>
									<div className='col-md-12'>
										<FormGroup
											//className='col-12'
											id='uploadfile'
											//label='Upload PDF'
										>
											<Input
												type='file'
												accept='.pdf'
												multiple
												//onChange={formik.handleChange}
												// value={formik.values.uploadfile}
												// disabled={isViewMode ? true : false}
												onChange={(
													e: React.ChangeEvent<HTMLInputElement>,
												) => {
													handleFileChange(e);
													//formik.handleChange(e);
												}}
											/>
										</FormGroup>
									</div>
									<div className='col-md-12'>
										{files &&
											[...files].map((file, index) => (
												<section key={file.name}>
													File number {index + 1} details:
													<ul>
														<li>Name: {file.name}</li>
														<li>Type: {file.type}</li>
														<li>Size: {file.size} bytes</li>
													</ul>
												</section>
											))}
									</div>
								</div>
								<div className='col-md-4'></div>
								<div className='col-md-12'></div>
							</div>
						</CardBody>
						<CardFooter>
							<></>
						</CardFooter>
					</Card> */}

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
									<FormGroup
										id='reference_status'
										label='Reference Status'
										isFloating>
										<input
											id='reference_status'
											className={
												'form-control ' +
												(errors.reference_status ? 'is-invalid' : '')
											}
											{...register('reference_status')}
											type='text'
											placeholder='reference_status'
											disabled={isViewMode}
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
											className={
												'form-control ' + (errors.total ? 'is-invalid' : '')
											}
											{...register('total')}
											type='text'
											placeholder='total'
											disabled={isViewMode}
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
											className={
												'form-control ' + (errors.note ? 'is-invalid' : '')
											}
											{...register('note')}
											type='text'
											placeholder='note'
											disabled={isViewMode}
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
												'form-control ' +
												(errors.g_total ? 'is-invalid' : '')
											}
											{...register('g_total')}
											type='text'
											placeholder='g_total'
											disabled={isViewMode}
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
								<Button color='dark' icon='Edit' hidden={isViewMode}>
									Draft
								</Button>
								<Button
									type='submit'
									color='success'
									icon='Save'
									hidden={isViewMode}
									isDisable={isSubmitting}>
									{isSubmitting ? (
										<Spinner isSmall inButton='onlyIcon' />
									) : (
										'Save'
									)}
								</Button>
							</CardFooterRight>
						</CardFooter>
					</Card>

					{/* <Card>{errors.items?.message}</Card> */}
				</form>
			</Page>
		</PageWrapper>
	);
};
