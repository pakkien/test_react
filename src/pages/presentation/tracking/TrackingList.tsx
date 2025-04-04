import React, { useContext, useEffect, useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import SubHeader, { SubHeaderLeft, SubheaderSeparator } from '../../../layout/SubHeader/SubHeader';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Badge from '../../../components/bootstrap/Badge';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import useSortableData from '../../../hooks/useSortableData';
import Icon from '../../../components/icon/Icon';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import classNames from 'classnames';
import Select from '../../../components/bootstrap/forms/Select';
import Input from '../../../components/bootstrap/forms/Input';
import { debounce } from '../../../helpers/helpers';
import { InputGroupText } from '../../../components/bootstrap/forms/InputGroup';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Alert from '../../../components/bootstrap/Alert';
import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
	OffCanvasTitle,
} from '../../../components/bootstrap/OffCanvas';
import PlaceholderImage from '../../../components/extras/PlaceholderImage';
//import AdditionalInfoForm from './components/AdditionalInfoForm';
import { TModalFullScreen, TModalSize } from '../../../type/modal-type';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import axios from 'axios';
import QUOTATION_STATUS from '../../../common/data/enumQuotationStatus';
import AuthContext from '../../../contexts/authContext';

import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import {calculateMargin, calculateMarginPercentage} from '../../../common/calculations';
import showNotification from '../../../components/extras/showNotification';

dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(timezone);

function ReturnBatchColor(state: string) {
	const key = state?.toUpperCase() as keyof typeof QUOTATION_STATUS;
	var enum_val = QUOTATION_STATUS[key];
	if (enum_val == null) {
		enum_val = QUOTATION_STATUS.NONE;
	}
	return enum_val.color;
}

interface IValues {
	name: string;
	price: number;
	stock: number;
	category: string;
	image?: string | null;
}

// const trackingListData = [
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

const TrackingList = () => {
	const { userData } = useContext(AuthContext);
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			po_no: '',
			po_date: '',
			po_amount: '',
			po_attach_file: '',
			so_no: '',
			so_attach_file: '',
			invoice_no: '',
			invoice_date: '',
			payment_terms: '',
			invoice_amount: '',
			invoice_attach_file: '',
			remarks: '',
			status_overwrite: '',
		},

		//validate,
		onSubmit: (values) => {
			console.log(JSON.stringify(values));
			//alert(JSON.stringify(values, null, 2));
		},
	});

	const [quotationData, setQuotationData] = useState([]);
	const [tableData, setTableData] = useState([]);

	const fetchData = async () => {
		const config = {
			headers: { Authorization: `${localStorage.getItem('bts_token')}` },
		};

		axios
			.get(import.meta.env.VITE_BASE_URL + '/quotation/all_quotations_table', config)
			.then((response) => {
				setQuotationData(response.data.quotations);
				setTableData(response.data.quotations);
				//console.log(response.data.quotations);
			}).catch((err) => {
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Info' size='lg' className='me-1' />
						<span>Error</span>
					</span>,
					'Error: ' + err,
				);
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

	const formik_search = useFormik({
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
				dayjs(`${item.quotation_date}`).format('DD/MM/YYYY').includes(search_string) ||
				item.quotation_no.toLowerCase().includes(search_string) ||
				item.end_user.toLowerCase().includes(search_string) ||
				item.revision.toString().toLowerCase().includes(search_string) ||
				item.quotation_amount.toFixed(2).toString().toLowerCase().includes(search_string) ||
				item.cost.toFixed(2).toString().toLowerCase().includes(search_string) ||
				//item.margin.toFixed(2).toString().toLowerCase().includes(search_string) ||
				//item.percent.toFixed(2).toString().toLowerCase().includes(search_string) ||
				item.status.toLowerCase().includes(search_string) ||
				item.site_location.toLowerCase().includes(search_string) ||
				item.building.toLowerCase().includes(search_string) ||
				item.project_reference.toLowerCase().includes(search_string)
			);
		});
	};

	const goToViewQuotationPage = (quotation_id: string, variance: number) => {
		navigate(`view/${quotation_id}/${variance}`);
	};

	return (
		<PageWrapper title='Tracking List'>
			<SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => navigate(-1)}>
						Back
					</Button>
					<SubheaderSeparator />
					<strong className='fs-5'>Tracking List</strong>
				</SubHeaderLeft>
			</SubHeader>
			<Page container='fluid'>
				<Card stretch>
					<CardBody className='table-responsive' isScrollable>
						<div className='row g-4'>
							<div className='col-md-4'>
								<CardHeader>
									<CardLabel>
										<CardTitle tag='div' className='h3'>
											Tracking List
										</CardTitle>
									</CardLabel>
								</CardHeader>
							</div>
							<div className='col-md-4'>
								<Alert color='light' isLight>
									<form onSubmit={formik_search.handleSubmit}>
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
														formik_search.handleChange(e);

														if (e.target.value.length > 2)
															debounce(
																() =>
																	onFormSubmit({
																		...formik_search.values,
																		search: e.target.value,
																	}),
																1000,
															)();

														if (e.target.value.length === 0)
															formik_search.resetForm();
													}}
													value={formik_search.values.search}
												/>
											</div>
										</FormGroup>
									</form>
								</Alert>
							</div>
							<div className='col-md-4'></div>
							<div className='col-md-12'>
								<table className='table table-modern'>
									<thead>
										<tr>
											<th>No.</th>
											<th
												onClick={() => requestSort('created_by')}
												className='cursor-pointer text-decoration-underline'>
												Prepared By
												<Icon
													size='lg'
													className={getClassNamesFor('created_by')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('client')}
												className='cursor-pointer text-decoration-underline'>
												Client
												<Icon
													size='lg'
													className={getClassNamesFor('client')}
													icon='FilterList'
												/>
											</th>
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
											<th
												onClick={() => requestSort('quotation_no')}
												className='cursor-pointer text-decoration-underline'>
												Quotation No.
												<Icon
													size='lg'
													className={getClassNamesFor('quotation_no')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('end_user')}
												className='cursor-pointer text-decoration-underline'>
												End User
												<Icon
													size='lg'
													className={getClassNamesFor('end_user')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('revision')}
												className='cursor-pointer text-decoration-underline'>
												Revision
												<Icon
													size='lg'
													className={getClassNamesFor('revision')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('quotation_amount')}
												className='cursor-pointer text-decoration-underline'>
												Quotation Amount
												<Icon
													size='lg'
													className={getClassNamesFor('quotation_amount')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('cost')}
												className='cursor-pointer text-decoration-underline'>
												Cost
												<Icon
													size='lg'
													className={getClassNamesFor('cost')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('margin')}
												className='cursor-pointer text-decoration-underline'>
												Margin
												<Icon
													size='lg'
													className={getClassNamesFor('margin')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('margin_percentage')}
												className='cursor-pointer text-decoration-underline'>
												%
												<Icon
													size='lg'
													className={getClassNamesFor('margin_percentage')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('status')}
												className='cursor-pointer text-decoration-underline'>
												Status
												<Icon
													size='lg'
													className={getClassNamesFor('status')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('site_location')}
												className='cursor-pointer text-decoration-underline'>
												Site Location
												<Icon
													size='lg'
													className={getClassNamesFor('site_location')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('building')}
												className='cursor-pointer text-decoration-underline'>
												Building
												<Icon
													size='lg'
													className={getClassNamesFor('building')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('project_reference')}
												className='cursor-pointer text-decoration-underline'>
												Project Reference
												<Icon
													size='lg'
													className={getClassNamesFor('project_reference')}
													icon='FilterList'
												/>
											</th>
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
														{dayjs
															.utc(`${item.quotation_date}`)
															.local()
															.format('DD-MM-YYYY HH:mm:ss')}
													</td>
													<td>{item.quotation_no}</td>
													<td>{item.end_user}</td>
													<td>{item.revision}</td>
													<td>
														{item.quotation_amount
															? item.quotation_amount.toFixed(2)
															: null}
													</td>
													<td>
														{item.cost ? item.cost.toFixed(2) : null}
													</td>
													<td>
														{item.quotation_amount && item.cost
															? calculateMargin(
																	item.cost,
																	item.quotation_amount,
																)
															: null}
													</td>
													<td>
														{item.quotation_amount && item.cost
															? calculateMarginPercentage(
																	item.cost,
																	item.quotation_amount,
																)
															: null}
													</td>
													<td>
														<Badge
															className='statusBadge'
															color={ReturnBatchColor(item.status)}>
															<h6>{item.status}</h6>
														</Badge>
													</td>
													<td>{item.site_location}</td>
													<td>{item.building}</td>
													<td>{item.project_reference}</td>
													<td>
														<div className='row'>
															<div className='col-auto'>
																<Button
																	color='primary'
																	icon='RemoveRedEye'
																	shadow='none'
																	hoverShadow='lg'
																	tag='a'
																	hidden={!userData?.view_quotation}
																	onClick={() =>
																		goToViewQuotationPage(
																			item.quotation_id,
																			item.variance,
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

export default TrackingList;
