import React, { useState } from 'react';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import { NavLink, useNavigate } from 'react-router-dom';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTabItem,
	CardTitle,
} from '../../../components/bootstrap/Card';

import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import { getActiveElement, useFormik } from 'formik';
import Badge from '../../../components/bootstrap/Badge';
import SubItemDetails from './components/SubItemDetails';
import ItemDetails from './components/ItemDetails';
import Summary from './components/Summary';
import Dropdown, {
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from '../../../components/bootstrap/Dropdown';
import Nav, { NavItem, NavLinkDropdown } from '../../../components/bootstrap/Nav';

const Quotation = {
	quotation_id: "ad399d47-a038-4fb4-9f31-2f142c143611",
	quotation_data: [
	  {
		quotation_no: "24001S1-TGH",
		quotation_rev_id: "c33d08b9-8ec3-41a1-8b0a-66033a3c7214",
		rev: 0,
		quotation_date: "31/01/2024",
		client: "client_name",
		end_user: "someEndUserName",
		site_location: "Penang",
		building: "PG1",
		pic: "123",
		email: "sometester@gmail.com",
		project_ref: "abcProject",
		state: "awarded",
		item: [
		  {
			item_id: "09ee02e9-8115-42ad-8648-74c901b96940",
			product_desc: "item1",
			brand: "prodtBrand",
			model: "ModelX",
			remarks: "dummyRemarks",
			quantity: "300",
			unit: "Unit",
			unit_cost: "300.0",
			total_cost: "3000.0",
			margin: "0.8",
			unit_price: "375",
			total_price: "3750",
			sub_item: [
			  {
				sub_item_id: "60c07ea8-f677-4e0c-b232-8756842ee174",
				item_id: "09ee02e9-8115-42ad-8648-74c901b96940",
				product_desc: "item1_subItem1",
				brand: "prodtBrand",
				model: "ModelX44",
				remarks: "dummyRemarks",
				quantity: "222",
				unit: "Unit",
				unit_cost: "300.0",
				total_cost: "3000.0",
				margin: "0.8",
				unit_price: "375",
				total_price: "3750",
			  },
			  {
				sub_item_id: "d23c57b7-38c1-45c4-a253-f8f7affe0447",
				item_id: "09ee02e9-8115-42ad-8648-74c901b96940",
				product_desc: "item1_subItem2",
				brand: "prodtBrand",
				model: "ModelX55",
				remarks: "dummyRemarks",
				quantity: "444",
				unit: "Unit",
				unit_cost: "300.0",
				total_cost: "3000.0",
				margin: "0.8",
				unit_price: "375",
				total_price: "3750",
			  },
			],
		  },
		  {
			item_id: "7043ac52-22c1-474c-898c-ae4a3d8d44aa",
			product_desc: "item2",
			brand: "prodtBrand2",
			model: "ModelX2",
			remarks: "dummyRemarks2",
			quantity: "3",
			unit: "Unit2",
			unit_cost: "300.0",
			total_cost: "3000.0",
			margin: "0.8",
			unit_price: "375",
			total_price: "3750",
			sub_item: [
			  {
				sub_item_id: "24e651fe-720e-4aa3-bd25-95398b39e440",
				item_id: "7043ac52-22c1-474c-898c-ae4a3d8d44aa",
				product_desc: "item2_subItem1",
				brand: "prodtBrand",
				model: "ModelX444",
				remarks: "dummyRemarks",
				quantity: "3",
				unit: "Unit",
				unit_cost: "300.0",
				total_cost: "3000.0",
				margin: "0.8",
				unit_price: "375",
				total_price: "3750",
			  },
			],
		  },
		  {
			item_id: "fca38a36-659a-4e68-84f5-3c95eea6e9cb",
			product_desc: "item3",
			brand: "prodtBrand2",
			model: "ModelX2",
			remarks: "dummyRemarks2",
			quantity: "3",
			unit: "Unit2",
			unit_cost: "300.0",
			total_cost: "3000.0",
			margin: "0.8",
			unit_price: "375",
			total_price: "3750",
			sub_item: [],
		  },
		],
		summary: {
		  reference_status: "-",
		  note: "-",
		  total: "12400.0",
		  g_total: "12400.0",
		},
	  },
	  {
		  quotation_no: "24001S1-TGH-Variation-01",
		  quotation_rev_id: "998bf269-5741-4445-83ca-f251cb608c5e",
		  quotation_date: "31/01/2024",
		  rev: 1,
		  client: "client_name1",
		  end_user: "someEndUserName1",
		  site_location: "Penang1",
		  building: "PG11",
		  pic: "1231",
		  email: "sometester@gmail.com1",
		  project_ref: "abcProject1",
		  state: "closed",
		  item: [
			{
			  item_id: "09ee02e9-8115-42ad-8648-74c901b96940",
			  product_desc: "item1",
			  brand: "prodtBrand",
			  model: "ModelX",
			  remarks: "dummyRemarks",
			  quantity: "300",
			  unit: "Unit",
			  unit_cost: "300.0",
			  total_cost: "3000.0",
			  margin: "0.8",
			  unit_price: "375",
			  total_price: "3750",
			  sub_item: [
				{
				  sub_item_id: "60c07ea8-f677-4e0c-b232-8756842ee174",
				  item_id: "09ee02e9-8115-42ad-8648-74c901b96940",
				  product_desc: "item1_subItem1",
				  brand: "prodtBrand",
				  model: "ModelX44",
				  remarks: "dummyRemarks",
				  quantity: "222",
				  unit: "Unit",
				  unit_cost: "300.0",
				  total_cost: "3000.0",
				  margin: "0.8",
				  unit_price: "375",
				  total_price: "3750",
				},
				{
				  sub_item_id: "d23c57b7-38c1-45c4-a253-f8f7affe0447",
				  item_id: "09ee02e9-8115-42ad-8648-74c901b96940",
				  product_desc: "item1_subItem2",
				  brand: "prodtBrand",
				  model: "ModelX55",
				  remarks: "dummyRemarks",
				  quantity: "444",
				  unit: "Unit",
				  unit_cost: "300.0",
				  total_cost: "3000.0",
				  margin: "0.8",
				  unit_price: "375",
				  total_price: "3750",
				},
			  ],
			},
			{
			  item_id: "7043ac52-22c1-474c-898c-ae4a3d8d44aa",
			  product_desc: "item2",
			  brand: "prodtBrand2",
			  model: "ModelX2",
			  remarks: "dummyRemarks2",
			  quantity: "3",
			  unit: "Unit2",
			  unit_cost: "300.0",
			  total_cost: "3000.0",
			  margin: "0.8",
			  unit_price: "375",
			  total_price: "3750",
			  sub_item: [
				{
				  sub_item_id: "24e651fe-720e-4aa3-bd25-95398b39e440",
				  item_id: "7043ac52-22c1-474c-898c-ae4a3d8d44aa",
				  product_desc: "item2_subItem1",
				  brand: "prodtBrand",
				  model: "ModelX444",
				  remarks: "dummyRemarks",
				  quantity: "3",
				  unit: "Unit",
				  unit_cost: "300.0",
				  total_cost: "3000.0",
				  margin: "0.8",
				  unit_price: "375",
				  total_price: "3750",
				},
			  ],
			},
			{
			  item_id: "fca38a36-659a-4e68-84f5-3c95eea6e9cb",
			  product_desc: "item3",
			  brand: "prodtBrand2",
			  model: "ModelX2",
			  remarks: "dummyRemarks2",
			  quantity: "3",
			  unit: "Unit2",
			  unit_cost: "300.0",
			  total_cost: "3000.0",
			  margin: "0.8",
			  unit_price: "375",
			  total_price: "3750",
			  sub_item: [],
			},
		  ],
		  summary: {
			reference_status: "-",
			note: "-",
			total: "12400.0",
			g_total: "12400.0",
		  },
		}
	],
  };
  
function ReturnStateColor(state: string) {
	switch (state.toLowerCase().trim()) {
		case 'inprogress':
			return 'danger';
		case 'closed':
			return 'dark';
		case 'awarded':
			return 'success';
		default:
			return 'primary';
	}
}

const ViewQuotation = () => {
	const navigate = useNavigate();

	const [quotationRev, setQuotationRev] = useState(0);

	return (
		<PageWrapper title='View Quotation'>
			<SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => navigate(-1)}>
						Back
					</Button>
					<SubheaderSeparator />
					<div className='row g-6'>
						<div className='col-md-12'>
							<strong className='fs-5'>
								Quotation No: {Quotation.quotation_data[quotationRev].quotation_no}
								&nbsp;&nbsp;&nbsp;
								<Badge
									className='statusBadge'
									color={ReturnStateColor(
										Quotation.quotation_data[quotationRev].state,
									)}>
									<h6>{Quotation.quotation_data[quotationRev].state}</h6>
								</Badge>
							</strong>
						</div>
						<div className='col-md-12'>
							<div className='fs-8'>
								Revision: 1.{Quotation.quotation_data[quotationRev].rev}
							</div>
						</div>
					</div>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Button color='info' isLight icon='Download' onClick={() => navigate(-1)}>
						PDF
					</Button>
					<Button color='info' onClick={() => navigate(-1)}>
						Create Variation
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<div className='row'>
					<div className='col-xl-12 col-lg-12 col-md-12'>
						<Card tag='form'>
							<CardHeader>
								<CardLabel>
									<CardTitle tag='div' className='h3'>
										View Quotation
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody className='pb-0'>
								<div className='row g-4'>
									<div className='col-md-4'>
										<FormGroup
											id='QuotationDate'
											label='Quotation Date'
											isFloating>
											<Input
												placeholder='Name'
												value={
													Quotation.quotation_data[quotationRev]
														.quotation_date
												}
												disabled
											/>
										</FormGroup>
									</div>
									<div className='col-md-8'>
										<FormGroup id='Client' label='Client' isFloating>
											<Input
												placeholder='Name'
												value={
													Quotation.quotation_data[quotationRev].client
												}
												disabled
											/>
										</FormGroup>
									</div>
									<div className='col-md-4'>
										<FormGroup id='EndUser' label='End User' isFloating>
											<Input
												placeholder='Name'
												value={
													Quotation.quotation_data[quotationRev].end_user
												}
												disabled
											/>
										</FormGroup>
									</div>
									<div className='col-md-4'>
										<FormGroup
											id='SiteLocation'
											label='Site Location'
											isFloating>
											<Input
												placeholder='Name'
												value={
													Quotation.quotation_data[quotationRev]
														.site_location
												}
												disabled
											/>
										</FormGroup>
									</div>
									<div className='col-md-4'>
										<FormGroup id='Building' label='Building' isFloating>
											<Input
												placeholder='Name'
												value={
													Quotation.quotation_data[quotationRev].building
												}
												disabled
											/>
										</FormGroup>
									</div>
									<div className='col-md-4'>
										<FormGroup id='PIC' label='PIC' isFloating>
											<Input
												placeholder='Name'
												value={Quotation.quotation_data[quotationRev].pic}
												disabled
											/>
										</FormGroup>
									</div>
									<div className='col-md-8'>
										<FormGroup id='Email' label='Email' isFloating>
											<Input
												placeholder='Name'
												value={Quotation.quotation_data[quotationRev].email}
												disabled
											/>
										</FormGroup>
									</div>
								</div>
							</CardBody>
							<CardFooter>
								<></>
							</CardFooter>
						</Card>
					</div>
					<div className='col-xl-12 col-lg-12 col-md-12'>
						<Card>
							<CardBody>
								<Nav>
									{Quotation.quotation_data.map((item, idx) => (
										<NavItem
											onClick={() => setQuotationRev(idx)}
											isActive={idx == quotationRev ? true : false}>
											<Button>
												{idx == 0 ? 'Quotation' : 'Variation ' + idx}
											</Button>
										</NavItem>
									))}
								</Nav>
								<hr />
								<div className='row'>
									<div className='col-xl-12 col-lg-12 col-md-12'>
										Quotation No:{' '}
										{Quotation.quotation_data[quotationRev].quotation_no}
										&nbsp;&nbsp;&nbsp;
										<Badge
											className='statusBadge'
											color={ReturnStateColor(
												Quotation.quotation_data[quotationRev].state,
											)}>
											<h6>{Quotation.quotation_data[quotationRev].state}</h6>
										</Badge>
									</div>
									<h6>Revision: 1.{quotationRev}</h6>
								</div>
								<ItemDetails />
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default ViewQuotation;
