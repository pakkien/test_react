import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/bootstrap/Button';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import QUOTATION_STATUS from '../../../common/data/enumQuotationStatus';
import Badge from '../../../components/bootstrap/Badge';
import Page from '../../../layout/Page/Page';
import Card, {
	CardBody,
	CardFooter,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Nav, { NavItem, NavLinkDropdown } from '../../../components/bootstrap/Nav';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import ManageItem from './components/ManageItem';
import AttachmentsView from './components/AttachmentsView';
import RevisionsView from './components/RevisionsView';
import Dropdown, {
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from '../../../components/bootstrap/Dropdown';
import QuotationDataType from '../../dataTypes/QuotationDataType';

// const Quotation = {
// 	quotation_id: 'ad399d47-a038-4fb4-9f31-2f142c143611',
// 	quotation_data: [
// 		{
// 			quotation_no: '24001S1-TGH',
// 			quotation_id: 'ad399d47-a038-4fb4-9f31-2f142c143611',
// 			quotation_rev_id: 'c33d08b9-8ec3-41a1-8b0a-66033a3c7214',
// 			revision: 1,
// 			variance: 1,
// 			quotation_date: '31/01/2024',
// 			client: 'client_name',
// 			end_user: 'someEndUserName',
// 			site_location: 'Penang',
// 			building: 'PG1',
// 			pic: '123',
// 			//email: 'sometester@gmail.com',
// 			project_ref: 'abcProject',
// 			state: 'awarded',
// 			items: [
// 				{
// 					item_id: '09ee02e9-8115-42ad-8648-74c901b96940',
// 					quotation_rev_id: 'c33d08b9-8ec3-41a1-8b0a-66033a3c7214',
// 					product_desc: 'item1',
// 					brand: 'prodtBrand',
// 					model: 'ModelX',
// 					remarks: 'dummyRemarks',
// 					quantity: '300',
// 					unit: 'Unit',
// 					unit_cost: '300.0',
// 					total_cost: '3000.0',
//                     estimated_cost: 300,
// 					margin: '0.8',
// 					unit_price: '375',
// 					total_price: '3750',
// 					sub_items: [
// 						{
// 							sub_item_id: '60c07ea8-f677-4e0c-b232-8756842ee174',
// 							item_id: '09ee02e9-8115-42ad-8648-74c901b96940',
// 							product_desc: 'item1_subItem1',
// 							brand: 'prodtBrand',
// 							model: 'ModelX44',
// 							remarks: 'dummyRemarks',
// 							quantity: '222',
// 							unit: 'Unit',
// 							unit_cost: '300.0',
// 							total_cost: '3000.0',
// 							margin: '0.8',
// 							unit_price: '375',
// 							total_price: '3750',
// 						},
// 						{
// 							sub_item_id: 'd23c57b7-38c1-45c4-a253-f8f7affe0447',
// 							item_id: '09ee02e9-8115-42ad-8648-74c901b96940',
// 							product_desc: 'item1_subItem2',
// 							brand: 'prodtBrand',
// 							model: 'ModelX55',
// 							remarks: 'dummyRemarks',
// 							quantity: '444',
// 							unit: 'Unit',
// 							unit_cost: '300.0',
// 							total_cost: '3000.0',
// 							margin: '0.8',
// 							unit_price: '375',
// 							total_price: '3750',
// 						},
// 					],
// 				},
// 			],
// 			reference_status: '-',
// 			note: '-',
// 			total: '12400.0',
// 			g_total: '12400.0',
// 			status: 'completed',
// 			client_code: 'cliencode',
// 			pic_contact_number: '123',
// 			pic_email: 'email',
// 		},
// 	],
// };

const Quotation = {
	building: 'password1212',
	client: 'password112',
	client_code: 'test_client_code',
	created_at: 'Wed, 04 Dec 2024 02:40:11 GMT',
	created_by: 'tester1',
	end_user: 'Ade1234412',
	grand_total: 1000,
	items: [
		{
			brand: 'Emeka123412',
			estimated_cost: false,
			margin: 0.8,
			margin_percentage: 20.0,
			model: 'Ade1234412',
			product_description: '12345',
			quantity: 1,
			remarks: 'Quotation retrieved.',
			item_id: '09ee02e9-8115-42ad-8648-74c901b96940',
			quotation_revision_id: 'ebeec1eb-008e-4586-bfa8-db39213e2691',
			sub_items: [
				{
					sub_item_id: '60c07ea8-f677-4e0c-b232-8756842ee174',
					item_id: '09ee02e9-8115-42ad-8648-74c901b96940',
					brand: 'Emeka123412',
					estimated_cost: false,
					margin: 0.8,
					margin_percentage: 20.0,
					model: 'Ade1234412',
					product_description: '12345',
					quantity: 1,
					remarks: 'Quotation retrieved.',
					total_cost: 1.2,
					total_price: 1.2,
					unit: '1',
					unit_cost: 1.2,
					unit_price: 1.2,
				},
			],
			total_cost: 1.2,
			total_price: 1.2,
			unit: '1',
			unit_cost: 1.2,
			unit_price: 1.2,
		},
	],
	lead_time: 'dummy_lead_time',
	message: 'Quotation ebeec1eb-008e-4586-bfa8-db39213e2691 created.',
	note: '12312',
	payment_terms: 'dummypayment',
	pic: 'Ade1234212',
	pic_contact_number: '1234567',
	pic_email: 'picEmail@email.com',
	project_reference: 'Emeka123412',
	quotation_id: '9e999f60-27fd-436d-925d-2c0e83f8b3b2',
	quotation_no: 'Quotation-20240001-password112-R0',
	quotation_revision_id: 'ebeec1eb-008e-4586-bfa8-db39213e2691',
	reference_status: '34234',
	revision: 0,
	site_location: 'Emeka1234512',
	status: 'submitted',
	total_cost: 1000,
	validity: 'dummyvalidity',
	variance: 1,
};

const ViewQuotation = () => {
	const { quotation_id, variance } = useParams();
	const navigate = useNavigate();

	//testing purpose
	//const props = Quotation;

	const [revisionData, setRevisionData] = useState<any>([]);

	const fetchRevisions = async (quotation_id?: string, variance?: number) => {
		const config = {
			headers: { Authorization: `${localStorage.getItem('bts_token')}` },
			//params: { variance: `${variance}` },
		};
		axios
			.get(import.meta.env.VITE_BASE_URL + `/quotation/revisions/${quotation_id}`, config)
			.then((response) => {
				//console.log(response.data.data);
				setRevisionData(response.data.data);
			});
	};

	

	const [props, setProps] = useState<any>();
	// const [quotationRevData, setQuotationRevData] = useState<any>();

	const fetchQuotationRevData = async (quotation_rev_id: string) => {
		const config = {
			headers: { Authorization: `${localStorage.getItem('bts_token')}` },
		};
		axios
			.get(import.meta.env.VITE_BASE_URL + `/quotation/revision/${quotation_rev_id}`, config)
			.then((response) => {
				//console.log(response.data);
				setProps(response.data);
			});
	};

    useEffect(() => {
		fetchRevisions(quotation_id);
	}, []);

    useEffect(() => {

        fetchQuotationRevData("6791897b-a41e-4d1a-9fc5-da0de317508d");
       //console.log(revisionData[0].quotation_revision_id);

	}, []);


	const title = 'Tracking View';

	//status
	const key = props?.status?.toUpperCase() as keyof typeof QUOTATION_STATUS;
	var enum_val = QUOTATION_STATUS[key];
	if (enum_val == null) {
		enum_val = QUOTATION_STATUS.NONE;
	}
	const [status, setStatus] = useState<any>(enum_val);

	//tab
	const [activeTab, setActiveTab] = useState('Quotation');

    const [currentVariance, setCurrentVariance] = useState({name:"Quotation", variance:0});


    const goToEditQuotationPage = (create_new_variance: boolean) => {
		navigate(`../quotation/edit/${props.quotation_revision_id}`, {
			state: { create_new_variance: create_new_variance },
		});
	};

	return (     
        <> 
        {props==null? <></>:
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
							<span>
								Revision: {props.variance}.{props.revision}
							</span>
						</div>
					</div>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Button
						color='info'
						onClick={() => goToEditQuotationPage(true)}
					>
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
								<FormGroup id='project_ref' label='Project Reference' isFloating>
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
						<Nav>							
							<NavItem isActive={activeTab == 'Quotation' ? true : false}>
								<Dropdown>
									<DropdownToggle>
										<NavLinkDropdown>{currentVariance.name}</NavLinkDropdown>
									</DropdownToggle>
									<DropdownMenu>
										<DropdownItem onClick={() => {setCurrentVariance({name:"Quotation", variance:0}); setActiveTab("Quotation")}}>
											Quotation
										</DropdownItem>
										<DropdownItem onClick={() => {setCurrentVariance({name:"Variance 1", variance:1}); setActiveTab("Quotation")}}>
											Variation 1
										</DropdownItem>
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
						</Nav>
						<hr />

						<div hidden={activeTab != 'Attachments'}>
							<AttachmentsView
								quotation_id={props.quotation_id}
								variance={props.variance}
							/>
						</div>
						<div hidden={activeTab != 'Revisions'}>
							<RevisionsView
								quotation_id={props.quotation_id}
								variance={props.variance}
							/>
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
											<span>
												Revision: {props.variance}.{props.revision}
											</span>
										</div>
									</div>
									<Button
										color='info'
										isLight
										icon='Download'
										onClick={() => navigate(-1)}>
										PDF
									</Button>
								</div>
								<div className='col-md-6 d-flex justify-content-end'>
									<Button color='info' className='order-2 float-end'
                                    onClick={() => goToEditQuotationPage(false)}
                                    >
										Create Revision
									</Button>
								</div>
							</div>
							<br />
							<ManageItem items={props.items} />
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
									<Input value={props.lead_time} disabled />
								</FormGroup>
							</div>

							<div className='col-md-4'>
								<FormGroup id='payment_terms' label='Payment Terms'>
									<Input value={props.payment_terms} disabled />
								</FormGroup>
							</div>

							<div className='col-md-4'>
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
            }
        </> 
	);

};

export default ViewQuotation;
