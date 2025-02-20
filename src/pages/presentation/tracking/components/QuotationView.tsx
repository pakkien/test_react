import { title } from 'process';
import React, { useEffect, useState } from 'react';

import Button from '../../../../components/bootstrap/Button';
import Card, {
	CardHeader,
	CardLabel,
	CardTitle,
	CardBody,
	CardFooter,
} from '../../../../components/bootstrap/Card';
import Dropdown, {
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from '../../../../components/bootstrap/Dropdown';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Nav, { NavItem, NavLinkDropdown } from '../../../../components/bootstrap/Nav';

import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubheaderSeparator,
	SubHeaderRight,
} from '../../../../layout/SubHeader/SubHeader';
import ManageItem from './ManageItem';
import QuotationDataType from '../../../dataTypes/QuotationDataType';
import QUOTATION_STATUS from '../../../../common/data/enumQuotationStatus';
import { useNavigate } from 'react-router-dom';
import Badge from '../../../../components/bootstrap/Badge';
import Input from '../../../../components/bootstrap/forms/Input';
import AttachmentsView from './AttachmentsView';
import RevisionsView from './RevisionsView';
import axios from 'axios';
import fileDownload from 'js-file-download';
import ManageSection from './ManageSection';
import TrackingDetailsView from './TrackingDetailsView';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import Icon from '../../../../components/icon/Icon';
import showNotification from '../../../../components/extras/showNotification';

type QuotationViewProps = {
	data: any;
	variance?: string;
	quotation_id?: string;
};

const QuotationView = (qv_props: QuotationViewProps) => {
	//console.log("QuotationData" + JSON.stringify(qv_props.data));
	const navigate = useNavigate();

	// const [currentVariance, setCurrentVariance] = useState({
	// 	name: 'Quotation',
	// 	variance: qv_props.variance ? Number(qv_props.variance) : 0,
	// });

	const [currentVariance, setCurrentVariance] = useState(Number(qv_props.variance));
	const [currentQuotationRevId, setCurentQuotationRevId] = useState();

	const [props, setProps] = useState<any>(qv_props.data[0]);

	useEffect(() => {
		if (qv_props.data) {
			const curentQuotationRev = qv_props.data.filter(
				(x: any) => x.variance == currentVariance,
			)[0];
			//console.log(JSON.stringify(props));

			const key = curentQuotationRev.status.toUpperCase() as keyof typeof QUOTATION_STATUS;
			var enum_val = QUOTATION_STATUS[key];
			if (enum_val == null) {
				enum_val = QUOTATION_STATUS.NONE;
			}
			setStatus(
				enum_val
			);
			//console.log("curr" + JSON.stringify(curentQuotationRev));

			setCurentQuotationRevId(curentQuotationRev.quotation_revision_id);
		}
	}, [currentVariance]);

	const title = 'Tracking View';

	//status
	const key = props?.status?.toUpperCase() as keyof typeof QUOTATION_STATUS;
	var enum_val = QUOTATION_STATUS[key];
	if (enum_val == null) {
		enum_val = QUOTATION_STATUS.NONE;
	}
	const [status, setStatus] = useState<any>(enum_val);

	//to trigger status overwrite of the QuotationRev if user changed the status
	const handleStatusOverwrite = async (status: any) => {
		console.log("status changed to: " + status.name);
		axios
			.put(
				import.meta.env.VITE_BASE_URL +
					`/quotation/update_status/${currentQuotationRevId}`, 
					{
						status: status.name
					},
					{
						headers: { Authorization: `${localStorage.getItem('bts_token')}`},			
					}
			)
			.then((response) => {
				console.log("success");
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Info' size='lg' className='me-1' />
						<span>Quotation saved</span>
					</span>,
					'Quotation status overwrite successfully',
				);
				//navigate(`../tracking/view/${qv_props.quotation_id}/${currentVariance}`);
				navigate(`../tracking`);
			});

	};

	//tab
	const [activeTab, setActiveTab] = useState('Quotation');

	const goToEditQuotationPage = (create_new_variance: boolean) => {
		navigate(`../quotation/edit/${props.quotation_revision_id}`, {
			state: { create_new_variance: create_new_variance },
		});
	};

	const handleDownloadPDF = async (
		quotation_id?: string,
		quotation_revision_id?: string,
		quotation_no?: string,
        with_watermark?: boolean
	) => {
		axios
			.post(
				import.meta.env.VITE_BASE_URL +
					`/quotation/${quotation_id}/pdf/${quotation_revision_id}`, 
					{},
					{
						headers: { Authorization: `${localStorage.getItem('bts_token')}`},
						params: { with_watermark: `${with_watermark}` },
						responseType: 'blob'				
					}
			)
			.then((response) => {
				//console.log(response.data);
				//fileDownload(response.data, quotation_no + '.pdf');
				const filename = quotation_no + '.pdf';
				const file = new File([response.data], filename, { type: 'application/pdf' });
				const fileURL = URL.createObjectURL(file);
				let encoded_file_url = base64_encode(fileURL);
				let encoded_file_name = base64_encode(filename);
				window.open(`../../../pdf-viewer/${encoded_file_url}/${encoded_file_name}`, "_blank");
			});
	};

	return (
		// <>{JSON.stringify(props)}</>
		<>
			<PageWrapper title={title}>
				<SubHeader>
					<SubHeaderLeft>
						<Button color='info' isLink icon='ArrowBack' onClick={() => navigate(-1)}>
							Back
						</Button>
						<SubheaderSeparator />
						<strong className='fs-5'>{title}</strong>
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
					</SubHeaderLeft>
					<SubHeaderRight>
						<Button color='info' onClick={() => goToEditQuotationPage(true)}>
							Create New Variation
						</Button>
					</SubHeaderRight>
				</SubHeader>
				<Page container='fluid'>
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
									<FormGroup id='QuotationDate' label='Quotation Date' isFloating>
										<Input value={props.created_at} disabled />
									</FormGroup>
								</div>
								<div className='col-md-3'>
									<FormGroup id='client_code' label='Client Code' isFloating>
										<Input value={props.client_code} disabled />
									</FormGroup>
								</div>
								<div className='col-md-6'>
									<FormGroup id='client' label='Client' isFloating>
										<Input value={props.client} disabled />
									</FormGroup>
								</div>

								<div className='col-md-4'>
									<FormGroup id='end_user' label='End User' isFloating>
										<Input value={props.end_user} disabled />
									</FormGroup>
								</div>
								<div className='col-md-4'>
									<FormGroup id='site_location' label='Site Location' isFloating>
										<Input value={props.site_location} disabled />
									</FormGroup>
								</div>
								<div className='col-md-4'>
									<FormGroup id='building' label='Building' isFloating>
										<Input value={props.building} disabled />
									</FormGroup>
								</div>
								<div className='col-md-4'>
									<FormGroup id='pic' label='PIC' isFloating>
										<Input value={props.pic} disabled />
									</FormGroup>
								</div>
								<div className='col-md-8'>
									<FormGroup id='pic_email' label='PIC Email' isFloating>
										<Input value={props.pic_email} disabled />
									</FormGroup>
								</div>
								<div className='col-md-4'>
									<FormGroup
										id='pic_contact_number'
										label='PIC Contact No.'
										isFloating>
										<Input value={props.pic_contact_number} disabled />
									</FormGroup>
								</div>
								<div className='col-md-8'>
									<FormGroup
										id='project_ref'
										label='Project Reference'
										isFloating>
										<Input value={props.project_reference} disabled />
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
							<Nav design='pills'>
								<NavItem isActive={activeTab == 'Quotation' ? true : false}>
									<Dropdown isButtonGroup>
										{/* <DropdownToggle>
                                    <NavLinkDropdown className={activeTab == 'Quotation' ? 'btn active' : 'btn'} onClick={() => setActiveTab('Quotation')}>
                                        {(currentVariance == 0)? 'Quotation': 'Variation ' + currentVariance}
                                    </NavLinkDropdown>
                                </DropdownToggle> */}
										<div
											className={
												activeTab == 'Quotation'
													? 'btn active nav-link'
													: 'btn nav-link'
											}
											onClick={() => setActiveTab('Quotation')}>
											{currentVariance == 0
												? 'Quotation'
												: 'Variation ' + currentVariance}
										</div>
										<DropdownToggle>
											<Button
												className={
													activeTab == 'Quotation'
														? 'btn active nav-link'
														: 'btn nav-link'
												}></Button>
										</DropdownToggle>
										<DropdownMenu>
											{qv_props.data.map((rev: any) => {
												return (
													<DropdownItem
														onClick={() => {
															setCurrentVariance(rev.variance);
															setActiveTab('Quotation');
														}}>
														{rev.variance == 0
															? 'Quotation'
															: 'Variation ' + rev.variance}
													</DropdownItem>
												);
											})}
										</DropdownMenu>
									</Dropdown>
								</NavItem>
								<NavItem
									onClick={() => setActiveTab('Attachments')}
									isActive={activeTab == 'Attachments' ? true : false}>
									<Button>Attachments</Button>
								</NavItem>
								<NavItem
									onClick={() => setActiveTab('Revisions')}
									isActive={activeTab == 'Revisions' ? true : false}>
									<Button>Revisions</Button>
								</NavItem>
								<NavItem
									onClick={() => setActiveTab('TrackingDetails')}
									isActive={activeTab == 'TrackingDetails' ? true : false}>
									<Button>Tracking Details</Button>
								</NavItem>
							</Nav>
							<hr />

							<div
								hidden={activeTab != 'Attachments'}
								key={'attachmentsTab' + currentVariance}>
								<AttachmentsView
									quotation_id={qv_props.quotation_id}
									variance={currentVariance}
								/>
							</div>
							<div
								hidden={activeTab != 'Revisions'}
								key={'revisionsTab' + currentVariance}>
								<RevisionsView
									quotation_id={qv_props.quotation_id}
									variance={currentVariance}
								/>
							</div>
							<div hidden={activeTab != 'TrackingDetails'} key={'trackingDetailsTab'}>
								{/* <TrackingDetailsForm quotation_id={qv_props.quotation_id} /> */}
								<TrackingDetailsView quotation_id={qv_props.quotation_id}/>
							</div>

							<div hidden={activeTab != 'Quotation'}>
								<div className='row gt-4'>
									<div className='col-md-6 d-flex'>
										<div className='row'>
											<div className='col-md-12'>
												<span>
													Quotation No: {props.quotation_no} &nbsp;&nbsp;
												</span>
												<Badge className='statusBadge' color={status.color}>
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
													//onClick={() => handleDownloadPDF(qv_props.quotation_id, props.quotation_revision_id, props.quotation_no)}
												>
													PDF
												</Button>
											</DropdownToggle>
											<DropdownMenu>
												<DropdownItem>
													<span
														onClick={() => handleDownloadPDF(qv_props.quotation_id, props.quotation_revision_id, props.quotation_no, false)}>
														Customer View
													</span>
												</DropdownItem>
												<DropdownItem
													onClick={() => handleDownloadPDF(qv_props.quotation_id, props.quotation_revision_id, props.quotation_no, true)}>
													Internal View
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
														//isDisable={isViewMode}
														//hidden={!allowStatusUpdate}
														>
														{status.name}
													</Button>
												</DropdownToggle>
												<DropdownMenu>
													{Object.keys(QUOTATION_STATUS).map((key) => (
														<DropdownItem
															key={key}
															onClick={() => {
																setStatus(QUOTATION_STATUS[key]);
																handleStatusOverwrite(QUOTATION_STATUS[key]);
															}
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

											<div className='order-2 float-end'>&nbsp;&nbsp;&nbsp;&nbsp;</div>
										<Button
											color='info'
											className='order-2 float-end'
											onClick={() => goToEditQuotationPage(false)}>
											Create Revision
										</Button>
									</div>
								</div>
								<br />
								{/* <ManageItem items={props.items} /> */}
								<ManageSection
									sections={props.sections}
									//sectionMode={props.is_section_valid}
							
								/>
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

								<div className='col-md-2'>
									<FormGroup id='payment_terms' label='Payment Terms'>
										<Input value={props.payment_terms} disabled />
									</FormGroup>
								</div>

								<div className='col-md-2'>
									<FormGroup id='validity' label='Validity'>
										<Input value={props.validity} disabled />
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
										<Input value={props.reference_status} disabled />
									</FormGroup>
								</div>
								<div className='col-md-4'>
									<FormGroup id='total' label='Total' isFloating>
										<Input value={props.total_cost} disabled />
									</FormGroup>
								</div>
								<div className='col-md-8'>
									<FormGroup id='note' label='Note' isFloating>
										<Input value={props.note} disabled />
									</FormGroup>
								</div>
								<div className='col-md-4'>
									<FormGroup id='g_total' label='G/Total (RM)' isFloating>
										<Input value={props.grand_total} disabled />
									</FormGroup>
								</div>
							</div>
						</CardBody>
						<CardFooter>
							<></>
						</CardFooter>
					</Card>
				</Page>
			</PageWrapper>
		</>
	);
};

export default QuotationView;
