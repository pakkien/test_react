import React, { useEffect, useState } from 'react';
import Alert from '../../../components/bootstrap/Alert';
import Button from '../../../components/bootstrap/Button';
import Card, {
	CardHeader,
	CardLabel,
	CardTitle,
	CardActions,
	CardBody,
} from '../../../components/bootstrap/Card';
import Modal, {
	ModalHeader,
	ModalTitle,
	ModalBody,
	ModalFooter,
} from '../../../components/bootstrap/Modal';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubheaderSeparator } from '../../../layout/SubHeader/SubHeader';
import { useNavigate } from 'react-router-dom';
import Badge from '../../../components/bootstrap/Badge';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import useSortableData from '../../../hooks/useSortableData';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import { debounce } from '../../../helpers/helpers';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import axios from 'axios';
import QuotationDataType from '../../dataTypes/QuotationDataType';

import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(timezone);



function ReturnBatchColor(state: string) {
	switch (state.toLowerCase()) {
		case 'in progress':
			return 'danger';
		case 'closed':
			return 'dark';
		case 'awarded':
			return 'success';
		default:
			return 'primary';
	}
}

// const quotationData = [
// 	{
// 		id: '1',
// 		prepared_by: 'Gary',
// 		client: 'Tech Group',
// 		quotation_date: '2024-04-04T16:00:00.000Z',
// 		quotation_no: 'Q-012345',
// 		end_user: 'Tech Group',
// 		revision: 0,
// 		quotation_amount: 9800,
// 		cost: 6000,
// 		margin: 3500,
// 		percent: 27,
// 		status: 'In Progress',
// 		site_location: 'Penang',
// 		building: 'Lab 1',
// 	},
// 	{
// 		id: '2',
// 		prepared_by: 'Gary',
// 		client: 'Tech Group',
// 		quotation_date: '2024-04-03T16:00:00.000Z',
// 		quotation_no: 'Q-012345',
// 		end_user: 'Tech Group',
// 		revision: 0,
// 		quotation_amount: 9800.0,
// 		cost: 6000.0,
// 		margin: 3500.0,
// 		percent: 27.96,
// 		status: 'Closed',
// 		site_location: 'Penang',
// 		building: 'Lab 1',
// 	},
// 	{
// 		id: '3',
// 		prepared_by: 'Gary',
// 		client: 'Tech Group',
// 		quotation_date: '2024-04-02T16:00:00.000Z',
// 		quotation_no: 'Q-012345',
// 		end_user: 'Tech Group',
// 		revision: 0,
// 		quotation_amount: 9800.0,
// 		cost: 6000.1,
// 		margin: 3500.0,
// 		percent: 27.96,
// 		status: 'Awarded',
// 		site_location: 'Penang',
// 		building: 'Lab 1',
// 	},
// 	{
// 		id: '4',
// 		prepared_by: 'Gary',
// 		client: 'Tech Group',
// 		quotation_date: '2024-04-01T16:00:00.000Z',
// 		quotation_no: 'Q-012345',
// 		end_user: 'Tech Group',
// 		revision: 0,
// 		quotation_amount: 9800.0,
// 		cost: 6000.03,
// 		margin: 3500.0,
// 		percent: 27.96,
// 		status: 'Awarded',
// 		site_location: 'Penang',
// 		building: 'Lab 1',
// 	},
// 	{
// 		id: '5',
// 		prepared_by: 'Gary',
// 		client: 'Tech Group',
// 		quotation_date: '2023-04-04T16:00:00.000Z',
// 		quotation_no: 'Q-012345',
// 		end_user: 'Tech Group',
// 		revision: 0,
// 		quotation_amount: 9800.0,
// 		cost: 6000.0,
// 		margin: 3500.0,
// 		percent: 27.96,
// 		status: 'Awarded',
// 		site_location: 'Penang',
// 		building: 'Lab 1',
// 	},
// 	{
// 		id: '6',
// 		prepared_by: 'Gary',
// 		client: 'Tech Group',
// 		quotation_date: '2025-04-04T16:00:00.000Z',
// 		quotation_no: 'Q-012345',
// 		end_user: 'Tech Group',
// 		revision: 0,
// 		quotation_amount: 9800.0,
// 		cost: 6000.0,
// 		margin: 3500.0,
// 		percent: 27.96,
// 		status: 'Awarded',
// 		site_location: 'Penang',
// 		building: 'Lab 1',
// 	},
// 	{
// 		id: '7',
// 		prepared_by: 'Gary',
// 		client: 'Tech Group',
// 		quotation_date: '2022-04-04T16:00:00.000Z',
// 		quotation_no: 'Q-012345',
// 		end_user: 'Tech Group',
// 		revision: 0,
// 		quotation_amount: 9800.0,
// 		cost: 6000.0,
// 		margin: 3500.0,
// 		percent: 27.96,
// 		status: 'Awarded',
// 		site_location: 'Penang',
// 		building: 'Lab 1',
// 	},
// 	{
// 		id: '8',
// 		prepared_by: 'Gary',
// 		client: 'Tech Group',
// 		quotation_date: '2024-04-04T16:00:00.000Z',
// 		quotation_no: 'Q-012345',
// 		end_user: 'Tech Group',
// 		revision: 0,
// 		quotation_amount: 9800.0,
// 		cost: 6000.0,
// 		margin: 3500.0,
// 		percent: 27.96,
// 		status: 'Awarded',
// 		site_location: 'Penang',
// 		building: 'Lab 1',
// 	},
// 	{
// 		id: '9',
// 		prepared_by: 'Gary',
// 		client: 'Tech Group',
// 		quotation_date: '2024-04-04T16:00:00.000Z',
// 		quotation_no: 'Q-012345',
// 		end_user: 'Tech Group',
// 		revision: 0,
// 		quotation_amount: 9800.0,
// 		cost: 6000.0,
// 		margin: 3500.0,
// 		percent: 27.96,
// 		status: 'Awarded',
// 		site_location: 'Penang',
// 		building: 'Lab 1',
// 	},
// 	{
// 		id: '10',
// 		prepared_by: 'Gary',
// 		client: 'Tech Group',
// 		quotation_date: '2024-04-04T16:00:00.000Z',
// 		quotation_no: 'Q-012345',
// 		end_user: 'Tech Group',
// 		revision: 0,
// 		quotation_amount: 9800.0,
// 		cost: 6000.0,
// 		margin: 3500.0,
// 		percent: 27.96,
// 		status: 'Awarded',
// 		site_location: 'Penang',
// 		building: 'Lab 1',
// 	},
// ];

// class QuotationTableDataType {
// 	building!: string;
// 	client!: string;
// 	cost!: number;
// 	end_user!: string;
// 	margin!: number;
// 	prepared_by!: string;
// 	quotation_amount!: number;
// 	quotation_date!: string;
// 	quotation_id!: string;
// 	quotation_no!: string;
// 	quotation_rev_id!: number; //TODO
// 	revision!: number;
// 	site_location!: string;
// 	status!: string;

// 	constructor(s: any
// 	){
// 		this.building = s.building;
// 		this.client = s.client;
// 		this.cost = s.cost;
// 		this.end_user = s.end_user;
// 		this.margin = s.margin;
// 		this.prepared_by = s.prepared_by;
// 		this.quotation_amount = s.quotation_amount;
// 		this.quotation_date = s.quotation_date;
// 		this.quotation_id = s.quotation_id;
// 		this.quotation_no = s.quotation_no;
// 		this.quotation_rev_id = s.quotation_rev_id;
// 		this.revision = s.revision;
// 		this.site_location = s.site_location;
// 		this.status = s.status;
// 	}

// }

const QuotationList = () => {
	const navigate = useNavigate();
	const [isAlertVisible, setIsAlertVisible] = useState(false);
	const [quotationData, setQuotationData] = useState([]);
	const [tableData, setTableData] = useState([]);

	const fetchData = async () => {
		const config = {
			headers: { Authorization: `${localStorage.getItem('bts_token')}` },
		};

		axios
			.get('http://127.0.0.1:5000/quotation/all_quotations_table', config)
			.then((response) => {
				setQuotationData(response.data.quotations);
				setTableData(response.data.quotations);
				//console.log(response.data.quotations);
			});
	};

	//Get Quotation table data
	useEffect(() => {
		fetchData();
	}, []);

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);

	const { items, requestSort, getClassNamesFor } = useSortableData(tableData);

	const onFormSubmit = (values: { search: any }) => {
		const searchValue = values.search.toString().toLowerCase();
		const newData = searchAndFilterData(searchValue);

		if (!values.search) {
			setTableData(quotationData);
		} else {
			setTableData(newData);
		}
	};

	const formik = useFormik({
		initialValues: {
			search: '',
		},
		onSubmit: onFormSubmit,
		onReset: () => setTableData(quotationData),
	});

	const searchAndFilterData = (search_string: string) => {
		return quotationData.filter((item: any) => {
			return (
				item.prepared_by.toLowerCase().includes(search_string) ||
				item.client.toLowerCase().includes(search_string) ||
				dayjs(`${item.quotation_date}`).format('DD-MM-YYYY').includes(search_string) ||
				item.quotation_no.toLowerCase().includes(search_string) ||
				item.end_user.toLowerCase().includes(search_string) ||
				item.revision.toString().toLowerCase().includes(search_string) ||
				item.quotation_amount.toFixed(2).toString().toLowerCase().includes(search_string) ||
				item.cost.toFixed(2).toString().toLowerCase().includes(search_string) ||
				item.margin.toFixed(2).toString().toLowerCase().includes(search_string) ||
				//item.percent.toFixed(2).toString().toLowerCase().includes(search_string) ||
				item.status.toLowerCase().includes(search_string) ||
				item.site_location.toLowerCase().includes(search_string) ||
				item.building.toLowerCase().includes(search_string)
			);
		});
	};

	const goToViewQuotationPage = (quotation_rev_id: string) => {
		//navigate('view-quotation');

		navigate('view-quotation', {
			state: {
				quotation_rev_id: quotation_rev_id,
			},
		});
	};

	const goToEditQuotationPage = (quotation_id: string, quotation_rev_id: string) => {
		//navigate('edit-quotation');

		navigate('edit-quotation', {
			state: {
				quotation_id: quotation_id,
				quotation_rev_id: quotation_rev_id,
			},
		});
	};

	const goToCreateQuotationPage = () => {
		navigate('create-quotation');
	};

	return (
		<PageWrapper title='Quotation'>
			<SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => navigate(-1)}>
						Back
					</Button>
					<SubheaderSeparator />
					<strong className='fs-5'>Quotation</strong>
				</SubHeaderLeft>
			</SubHeader>
			<Page container='fluid'>
				{isAlertVisible && (
					<Alert color='success' isLight icon='Create' isDismissible>
						Create Success
					</Alert>
				)}
				<Card stretch>
					{/* <CardHeader>
						<CardLabel>
							<CardTitle tag='div' className='h3'>
								Quotation
							</CardTitle>
						</CardLabel>
						<CardActions>
							<Button
								color='success'
								icon='Create'
								tag='a'
								onClick={() => goToCreateQuotationPage()}>
								Create
							</Button>
						</CardActions>
					</CardHeader> */}

					<CardBody className='table-responsive' isScrollable>
						<div className='row g-4'>
							<div className='col-md-4'>
								<CardHeader>
									<CardLabel>
										<CardTitle tag='div' className='h3'>
											Quotation
										</CardTitle>
									</CardLabel>
								</CardHeader>
							</div>
							<div className='col-md-4'>
								<Alert color='light' isLight>
									<form onSubmit={formik.handleSubmit}>
										<FormGroup>
											<div className='d-flex' data-tour='search'>
												<label className='border-0 bg-transparent'>
													<Icon icon='Search' size='2x' color='primary' />
												</label>
												<Input
													id='search'
													placeholder='Search...'
													className='border-0 shadow-none bg-transparent'
													onChange={(e: {
														target: { value: string | any[] };
													}) => {
														formik.handleChange(e);

														if (e.target.value.length > 2)
															debounce(
																() =>
																	onFormSubmit({
																		...formik.values,
																		search: e.target.value,
																	}),
																1000,
															)();

														if (e.target.value.length === 0)
															formik.resetForm();
													}}
													value={formik.values.search}
												/>
											</div>
										</FormGroup>
									</form>
								</Alert>
							</div>
							<div className='col-md-4'>
								<Button
									color='success'
									className='float-end'
									icon='Create'
									tag='a'
									onClick={() => goToCreateQuotationPage()}>
									Create
								</Button>
							</div>
							<div className='col-md-12'>
								<table className='table table-modern'>
									<thead>
										<tr>
											<th>No.</th>
											<th>Prepared By</th>
											<th>Client</th>
											<th
												onClick={() => requestSort('quotation_date')}
												className='cursor-pointer text-decoration-underline'>
												Quotation Date
												<Icon
													size='lg'
													className={getClassNamesFor('quotation_date')}
													icon='FilterList'
												/>
											</th>
											<th>Quotation No.</th>
											<th>End User</th>
											<th>Revision</th>
											<th>Quotation Amount</th>
											<th>Cost</th>
											<th>Margin</th>
											{/* <th>%</th> */}
											<th>Status</th>
											<th>Site Location</th>
											<th>Building</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{dataPagination(items, currentPage, perPage).map(
											(item, i) => (
												<tr key={item.id}>
													<td>{i + 1}</td>
													<td>{item.prepared_by}</td>
													<td>{item.client}</td>
													<td>
														{dayjs.utc(`${item.quotation_date}`).local().format(
															'DD-MM-YYYY HH:mm:ss',
														)}
													</td>
													<td>{item.quotation_no}</td>
													<td>{item.end_user}</td>
													<td>{item.revision}</td>
													<td>{item.quotation_amount.toFixed(2)}</td>
													<td>{item.cost.toFixed(2)}</td>
													<td>{item.margin.toFixed(2)}</td>
													{/* <td>{item.percent.toFixed(2)}%</td> */}
													<td>
														<Badge
															className='statusBadge'
															color={ReturnBatchColor(item.status)}>
															<h6>{item.status}</h6>
														</Badge>
													</td>
													<td>{item.site_location}</td>
													<td>{item.building}</td>
													<td>
														<div className='row'>
															<div className='col-auto'>
																<Button
																	color='primary'
																	icon='RemoveRedEye'
																	shadow='none'
																	hoverShadow='lg'
																	tag='a'
																	onClick={() =>
																		goToViewQuotationPage(
																			item.quotation_rev_id,
																		)
																	}></Button>
															</div>
															<div className='col-auto'>
																<Button
																	color='primary'
																	icon='Edit'
																	shadow='none'
																	hoverShadow='lg'
																	tag='a'
																	onClick={() =>
																		goToEditQuotationPage(
																			item.quotation_id,
																			item.quotation_rev_id,
																		)
																	}></Button>
															</div>
														</div>
													</td>
												</tr>
											),
										)}
									</tbody>
								</table>
							</div>
						</div>
					</CardBody>
					<PaginationButtons
						data={items}
						label='items'
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
						perPage={perPage}
						setPerPage={setPerPage}
					/>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default QuotationList;
