import React, { useEffect, useState } from 'react';

import { FormTypeQuotation, useFormContextQuotation } from '../components/QuotationForm';
import { SubmitHandler, useFieldArray, Controller } from 'react-hook-form';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Card, {
	CardBody,
	CardFooter,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTabItem,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Button from '../../../../components/bootstrap/Button';
import ManageItem from './ManageItem';
import Alert from '../../../../components/bootstrap/Alert';
import QuotationDataType from '../../../dataTypes/QuotationDataType';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../../layout/SubHeader/SubHeader';
import { useNavigate } from 'react-router-dom';
import Page from '../../../../layout/Page/Page';
import Spinner from '../../../../components/bootstrap/Spinner';
import showNotification from '../../../../components/extras/showNotification';
import Icon from '../../../../components/icon/Icon';
import Input from '../../../../components/bootstrap/forms/Input';
import Dropzone from '../attachmentComponents/Dropzone';
import axios from 'axios';
import Badge from '../../../../components/bootstrap/Badge';
import Select from 'react-select';
import Nav, { NavItem } from '../../../../components/bootstrap/Nav';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../components/bootstrap/Dropdown';
import QUOTATION_STATUS from '../../../../common/data/enumQuotationStatus';
import RevisionsView from './RevisionsView';
import AttachmentsView from '../attachmentComponents/AttachmentsView';
import fileDownload from 'js-file-download';
import ManageSection from './ManageSection';

type QuotationProps = {
	mode: 'create' | 'view' | 'edit';
	quotation_id?: string;
	quotation_rev_id?: string;
	quotation_no?: string;
	status?: string;
	revision?: number;
	variance?: number;
	create_new_variance?: boolean;
	section_mode?: boolean;
};

export const Quotation = (props: QuotationProps) => {
	const {
		register,
		formState: { errors, isSubmitting },
		watch,
		handleSubmit,
		setValue,
		control,
	} = useFormContextQuotation();
	const formData = watch();

	//console.log('formData', formData)
	//console.log('errors', errors)

	//save as new variation
	const [isCreateVariation, setIsCreateVariation] = useState(
		props.create_new_variance ? props.create_new_variance : false,
	);

	const isViewMode = props.mode.toLowerCase() == 'view' ? true : false;
	const title =
		props.mode.charAt(0).toUpperCase() + props.mode.slice(1).toLowerCase() + ' Quotation ';

	//hide status change button when status initially = awarded, completed, cancelled
	const [allowStatusUpdate, setAllowStatusUpdate] = useState(
		props.status?.toLowerCase() == QUOTATION_STATUS.AWARDED.name.toLowerCase() ||
			props.status?.toLowerCase() == QUOTATION_STATUS.COMPLETED.name.toLowerCase() ||
			props.status?.toLowerCase() == QUOTATION_STATUS.REJECTED.name.toLowerCase()
			? false
			: true,
	);

	useEffect(() => {
		if (isCreateVariation) {
			setAllowStatusUpdate(true);
		}
	}, [isCreateVariation]);

	//status
	const key = props.status?.toUpperCase() as keyof typeof QUOTATION_STATUS;
	var enum_val = QUOTATION_STATUS[key];
	if (enum_val == null) {
		enum_val = QUOTATION_STATUS.NONE;
	}
	const [status, setStatus] = useState<any>(enum_val);

	useEffect(() => {
		setValue('status', status.name);
	}, [status]);

	// upload file
	const [attachmentIDs, setAttachmentIds] = useState<string[]>();

	const updateAttachmentID = (ids: string[]) => {
		setAttachmentIds(ids);
	};

	const navigate = useNavigate();

	const showSuccessNotification = () => {
		showNotification(
			<span className='d-flex align-items-center'>
				<Icon icon='Info' size='lg' className='me-1' />
				<span>Quotation saved</span>
			</span>,
			'Quotation saved successfully',
		);
	};

	const goToViewQuotationListPage = () => {
		navigate('../quotation');
	};

	const goToEditQuotationPage = (create_new_variance: boolean) => {
		navigate(`../quotation/edit/${props.quotation_rev_id}`, {
			state: { create_new_variance: create_new_variance },
		});
	};

	const config = {
		headers: { Authorization: `${localStorage.getItem('bts_token')}` },
	};

	const postCreateQuotation = async (payload: any) => {
		axios
			.post(import.meta.env.VITE_BASE_URL + `/quotation/`, payload, config)
			.then((response) => {
				//console.log(response.data);
				showSuccessNotification();
				goToViewQuotationListPage();
			});
	};

	const postUpdateQuotation = async (quotation_id: string, payload: any) => {
		axios
			.put(
				import.meta.env.VITE_BASE_URL + `/quotation/${quotation_id}/${isCreateVariation}`,
				payload,
				config,
			)
			.then((response) => {
				//console.log(response.data);
				showSuccessNotification();
				goToViewQuotationListPage();
			});
	};

	//OPTIONS
	const leadTimeOptions = [
		'',
		'30 Working days from the date of payment received',
		'60 Working days from the date of payment received',
		'90 Working days from the date of payment received',
	];

	const paymentTermsOptions = [
		'',
		'30 Days upon Invoice Date',
		'60 Days upon Invoice Date',
		'Cash on delivery',
	];

	const validityOptions = [
		'',
		'30 Days from the date of this quotation',
		'60 Days from the date of this quotation',
		'90 Days from the date of this quotation',
	];

	// useEffect(() => {
	// 	//console.log(formData.status);
	// 	setStatus(formData.status);
	// }, [formData.status]);

	const [activeTab, setActiveTab] = useState('Quotation');

	//auto-calculation total and gtotal
	//TODO:
	useEffect(() => {
		var total = 0;
		var gtotal = 0;

		for (const section of formData.sections){
		for (const item of section.items) {
			total += item.total_cost;
			gtotal += item.total_price;
			for (const sub_item of item.sub_items) {
				total += sub_item.total_cost;
				gtotal += sub_item.total_price;
			}
		}
	}
		setValue('total_cost', total);
		setValue('grand_total', gtotal);
	}, [
		JSON.stringify(formData.sections)
	]);

	const handleDownloadPDF = async (
		quotation_id?: string,
		quotation_revision_id?: string,
		quotation_no?: string,
		with_watermark?: boolean
	) => {
		axios
			.get(
				import.meta.env.VITE_BASE_URL +
					`/quotation/${quotation_id}/pdf/${quotation_revision_id}`,
				{
					responseType: 'blob',
					headers: { Authorization: `${localStorage.getItem('bts_token')}` },
					params: {with_watermark: `${with_watermark}`},
				},
			)
			.then((response) => {
				//console.log(response.data);
				fileDownload(response.data, quotation_no + '.pdf');
			});
	};


	//drop down for client and pic
	const [clientData, setClientData] = useState([]);
	const [picData, setPicData] = useState([]);

	const fetchClientData = async () => {
		const config = {
			headers: { Authorization: `${localStorage.getItem('bts_token')}` },
		};

		axios
			.get(import.meta.env.VITE_BASE_URL + '/quotation/clients', config)
			.then((response) => {
				setClientData(response.data.clients);
			});
	};

	const fetchPicData = async () => {
		const config = {
			headers: { Authorization: `${localStorage.getItem('bts_token')}` },
		};

		axios
			.get(import.meta.env.VITE_BASE_URL + '/quotation/pic', config)
			.then((response) => {
				setPicData(response.data.pics);
			});
	};

	//Get client and pic dropdown
	useEffect(() => {
		fetchClientData();
		fetchPicData();
	}, []);


	// useEffect(() => {
	// 	setValue('client', total);
	// 	setValue('client_code', gtotal);
	// }, [
	// 	JSON.stringify(formData.client+formData.client_code)
	// ]);


	// useEffect(() => {
	// 	setValue('pic', total);
	// 	setValue('pic_email', gtotal);
	// 	setValue('pic_contact_number', gtotal);
	// }, [
	// 	JSON.stringify(formData.pic+formData.pic_email+formData.pic_contact_number)
	// ]);

	return (
		<PageWrapper title={title}>
			<SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => navigate(-1)}>
						Back
					</Button>
					<SubheaderSeparator />
					<strong className='fs-5'>{title}</strong>

					{(props.mode == 'view' || props.mode == 'edit') && (
						<>
							<SubheaderSeparator />
							<div className='row'>
								<div className='col-md-12'>
									<span>
										Quotation No: {props.quotation_no} &nbsp;&nbsp;&nbsp;
										<Badge className='statusBadge' color={status.color}>
											{status.name}
										</Badge>
									</span>
								</div>
								<div className='col-md-12'>
									<span>Revision: {props.revision}</span>
								</div>
							</div>
						</>
					)}
				</SubHeaderLeft>
				<SubHeaderRight>
					{props.mode == 'edit' && (
						<div>
							{isCreateVariation ? (
								// <div
								// 	onClick={() =>{
								// 		setIsCreateVariation(isCreateVariation ? false : true);
								// 	}
								// 	}
								// 	>
								// 	<span className='text-muted'>Cancel save as new variation</span>
								// </div>
								<></>
							) : (
								<Button
									color='info'
									onClick={() => {
										setIsCreateVariation(isCreateVariation ? false : true);
									}}
									isLight={isCreateVariation ? true : false}>
									Create New Variation
								</Button>
							)}
						</div>
					)}

					{props.mode == 'view' && (
						<div>
							<Button color='info' onClick={() => goToEditQuotationPage(true)}>
								Create New Variation
							</Button>
						</div>
					)}
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<form
					onSubmit={handleSubmit(async (data) => {
						//API CALL

						//await timeout(1000);

						//console.log('Form submitted1: ', data);

						//set order
						for (var i = 0; i< data.sections.length; i++) {
							data.sections[i].order = i;
							for (var j = 0; j< data.sections[i].items.length; j++) {
								data.sections[i].items[j].order = j;
								for (var k = 0; k< data.sections[i].items[j].sub_items.length; k++) {
									data.sections[i].items[j].sub_items[k].order = k;
								}
							}
						}

						const payload = Object.assign(
							{
								attachment_list: attachmentIDs,
								variance: props.variance,
								is_section_valid: props.section_mode,
							},
							data,
						);


						if (props.quotation_id) {
							//update only since quotation_id exists
							postUpdateQuotation(props.quotation_id, payload);
						} else {
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
								<div className='col-md-3'>
									<FormGroup id='client_code' label='Client Code' isFloating>
										<input
											id='client_code'
											className={
												'form-control ' +
												(errors.client_code ? 'is-invalid' : '')
											}
											{...register('client_code')}
											type='text'
											placeholder='client_code'
											disabled={isViewMode}
											list="client_code_list"
										/>
										<datalist id="client_code_list">
											{clientData.map((client: any) => {return(
												<option value={client.client_code}/>
											)}) }
										</datalist>
										<>
											{errors.client_code ? (
												<div className='invalid-feedback'>
													{errors.client_code.message}
												</div>
											) : (
												''
											)}
										</>
									</FormGroup>
								</div>
								<div className='col-md-9'>
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
											list='client_list'
										/>
										<datalist id="client_list">
											{clientData.map((client: any) => {return(
												<option value={client.client}/>
											)}) }
										</datalist>
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
											list="pic_list"
										/>
										<datalist id="pic_list">
											{picData.map((pic: any) => {return(
												<option value={pic.pic}/>
											)}) }
										</datalist>
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
									<FormGroup id='pic_email' label='PIC Email' isFloating>
										<input
											id='pic_email'
											className={
												'form-control ' +
												(errors.pic_email ? 'is-invalid' : '')
											}
											{...register('pic_email')}
											type='text'
											placeholder='pic_email'
											disabled={isViewMode}
											list='pic_email_list'
										/>
										<datalist id="pic_email_list">
											{picData.map((pic: any) => {return(
												<option value={pic.email}/>
											)}) }
										</datalist>
										<>
											{errors.pic_email ? (
												<div className='invalid-feedback'>
													{errors.pic_email.message}
												</div>
											) : (
												''
											)}
										</>
									</FormGroup>
								</div>
								<div className='col-md-4'>
									<FormGroup
										id='pic_contact_number'
										label='PIC Contact No.'
										isFloating>
										<input
											id='pic_contact_number'
											className={
												'form-control ' +
												(errors.pic_contact_number ? 'is-invalid' : '')
											}
											{...register('pic_contact_number')}
											type='text'
											placeholder='pic_contact_number'
											disabled={isViewMode}
											list='pic_contact_number_list'
										/>
										<datalist id="pic_contact_number_list">
											{picData.map((pic: any) => {return(
												<option value={pic.pic_contact_number}/>
											)}) }
										</datalist>
										<>
											{errors.pic_contact_number ? (
												<div className='invalid-feedback'>
													{errors.pic_contact_number.message}
												</div>
											) : (
												''
											)}
										</>
									</FormGroup>
								</div>
								<div className='col-md-8'>
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

					<Card>
						<CardBody>
							<Nav>
								<NavItem
									onClick={() => setActiveTab('Quotation')}
									isActive={activeTab == 'Quotation' ? true : false}>
									<Button>Quotation</Button>
								</NavItem>
								<NavItem
									onClick={() => setActiveTab('Attachments')}
									isActive={activeTab == 'Attachments' ? true : false}>
									<Button>Attachments</Button>
								</NavItem>
								<NavItem
									onClick={() => setActiveTab('Revisions')}
									isActive={activeTab == 'Revisions' ? true : false}
									hidden={props.mode == 'create'}>
									<Button>Revisions</Button>
								</NavItem>
							</Nav>
							<hr />
							<div hidden={activeTab != 'Quotation'}>
								<>
									<div className='row gt-4'>
										<div className='col-md-6 d-flex'>
											<div className='row' hidden={props.mode == 'create'}>
												<div className='col-md-12'>
													<span>
														Quotation No: {props.quotation_no}{' '}
														&nbsp;&nbsp;
													</span>
													<Badge
														className='statusBadge'
														color={status.color}>
														{status.name}
													</Badge>
													&nbsp;&nbsp;&nbsp;
													<br />
													<span>Revision: {props.revision}</span>
												</div>
											</div>

											<Dropdown>
												<DropdownToggle hasIcon={false}>
													<Button
														color='info'
														isLight
														icon='Download'
														hidden={!isViewMode}
														>
														PDF
													</Button>
												</DropdownToggle>
												<DropdownMenu>
													<DropdownItem>
														<span
															onClick={() =>
															handleDownloadPDF(
																props.quotation_id,
																props.quotation_rev_id,
																props.quotation_no,
																false
															)
														}
															>
															No Watermark
														</span>
													</DropdownItem>
													<DropdownItem
														onClick={() =>
															handleDownloadPDF(
																props.quotation_id,
																props.quotation_rev_id,
																props.quotation_no,
																true
															)
														}
														>
														With Watermark
													</DropdownItem>
												</DropdownMenu>
											</Dropdown>
										</div>

										<div className='col-md-6 d-flex justify-content-end'>
											<Dropdown>
												<DropdownToggle hasIcon={false}>
													<Button
														isLink
														color={status.color}
														icon='Circle'
														className='text-nowrap order-0 float-end'
														isDisable={isViewMode}
														hidden={!allowStatusUpdate}>
														{status.name}
													</Button>
												</DropdownToggle>
												<DropdownMenu>
													{Object.keys(QUOTATION_STATUS).map((key) => (
														<DropdownItem
															key={key}
															onClick={() =>
																setStatus(QUOTATION_STATUS[key])
															}>
															<div>
																<Icon
																	icon='Circle'
																	color={
																		QUOTATION_STATUS[key].color
																	}
																/>
																{QUOTATION_STATUS[key].name}
															</div>
														</DropdownItem>
													))}
												</DropdownMenu>
											</Dropdown>

											<div className='order-2 float-end'>&nbsp;</div>
											<Button
												color='info'
												//icon='Edit'
												hidden={!isViewMode}
												className='order-2 float-end'
												onClick={() => goToEditQuotationPage(false)}
												//isLight
											>
												Create Revision
											</Button>
										</div>
									</div>
								</>
								<br />
								{/* <ManageItem isViewMode={isViewMode} /> */}
								<ManageSection
									isViewMode={isViewMode}
									sectionMode={props.section_mode}
								/>
								<br />
							</div>
							<div hidden={activeTab != 'Attachments'}>
								{isViewMode ? (
									<AttachmentsView
										quotation_id={props.quotation_id}
										variance={props.variance}
									/>
								) : (
									<Dropzone
										setAttachmentIds={updateAttachmentID}
										className={''}
										quotation_rev_id={props.quotation_rev_id}
										isViewMode={isViewMode}
									/>
								)}
							</div>
							<div hidden={activeTab != 'Revisions'}>
								{props.mode != 'create' && (
									<RevisionsView
										quotation_id={props.quotation_id}
										variance={props.variance}
									/>
								)}
							</div>
						</CardBody>
					</Card>

					{/* Options */}
					<Card hidden={activeTab != 'Quotation'}>
						<CardHeader>
							<CardLabel>
								<CardTitle tag='div' className='h3'>
									Options
								</CardTitle>
							</CardLabel>
						</CardHeader>
						<CardBody className='pb-0'>
							<div className='row g-4'>
								<div className='col-md-4'>
									<FormGroup id='lead_time' label='Lead Time'>
										<select
											id='lead_time'
											className={
												'form-control ' +
												(errors.lead_time ? 'is-invalid' : '')
											}
											{...register('lead_time')}
											disabled={isViewMode}>
											{paymentTermsOptions.map((op) => (
												<option value={op}>{op}</option>
											))}
										</select>
										<>
											{errors.lead_time ? (
												<div className='invalid-feedback'>
													{errors.lead_time.message}
												</div>
											) : (
												''
											)}
										</>
									</FormGroup>
								</div>

								<div className='col-md-4'>
									<FormGroup id='payment_terms' label='Payment Terms'>
										<select
											id='payment_terms'
											className={
												'form-control ' +
												(errors.lead_time ? 'is-invalid' : '')
											}
											{...register('payment_terms')}
											disabled={isViewMode}>
											{paymentTermsOptions.map((op) => (
												<option value={op}>{op}</option>
											))}
										</select>
										<>
											{errors.payment_terms ? (
												<div className='invalid-feedback'>
													{errors.payment_terms.message}
												</div>
											) : (
												''
											)}
										</>
									</FormGroup>
								</div>

								<div className='col-md-4'>
									<FormGroup id='validity' label='Validity'>
										<select
											id='validity'
											className={
												'form-control ' +
												(errors.validity ? 'is-invalid' : '')
											}
											{...register('validity')}
											disabled={isViewMode}>
											{validityOptions.map((op) => (
												<option value={op}>{op}</option>
											))}
										</select>
										<>
											{errors.validity ? (
												<div className='invalid-feedback'>
													{errors.validity.message}
												</div>
											) : (
												''
											)}
										</>
									</FormGroup>
								</div>

								<div></div>
							</div>
						</CardBody>
						<CardFooter>
							<></>
						</CardFooter>
					</Card>

					{/* Summary */}
					<Card hidden={activeTab != 'Quotation'}>
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
									<FormGroup id='total_cost' label='Total (RM)' isFloating>
										<input
											id='total_cost'
											className={
												'form-control ' +
												(errors.total_cost ? 'is-invalid' : '')
											}
											{...register('total_cost')}
											type='text'
											placeholder='total_cost'
											disabled={isViewMode}
										/>
										<>
											{errors.total_cost ? (
												<div className='invalid-feedback'>
													{errors.total_cost.message}
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
									<FormGroup id='grand_total' label='G/Total (RM)' isFloating>
										<input
											id='grand_total'
											className={
												'form-control ' +
												(errors.grand_total ? 'is-invalid' : '')
											}
											{...register('grand_total')}
											type='text'
											placeholder='grand_total'
											disabled={isViewMode}
										/>
										<>
											{errors.grand_total ? (
												<div className='invalid-feedback'>
													{errors.grand_total.message}
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
								<Button
									color='dark'
									icon='Edit'
									type='submit'
									hidden={isViewMode || !allowStatusUpdate}
									isDisable={isSubmitting}
									onClick={() => {
										setValue('status', 'Draft');
									}}>
									{isSubmitting ? (
										<Spinner isSmall inButton='onlyIcon' />
									) : (
										<span>Draft</span>
									)}
								</Button>
								<Button
									type='submit'
									color='success'
									icon={isCreateVariation ? 'null' : 'Save'}
									hidden={isViewMode}
									isDisable={isSubmitting}
									//nClick={() => console.log("hihi")}
									>
									{isSubmitting ? (
										<Spinner isSmall inButton='onlyIcon' />
									) : //<span>Save</span>
									isCreateVariation ? (
										<span>
											Save{' '}
											<small className='text-decoration-underline'>
												(as New Variation)
											</small>
										</span>
									) : (
										<span>Save</span>
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
