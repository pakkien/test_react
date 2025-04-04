import React, { useContext, useEffect, useState } from 'react';
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
import QUOTATION_STATUS from '../../../common/data/enumQuotationStatus';
import {calculateMargin, calculateMarginPercentage } from '../../../common/calculations';
import AuthContext from '../../../contexts/authContext';


import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone'
import showNotification from '../../../components/extras/showNotification';

dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(timezone);



function ReturnBatchColor(state: string) {
	const key = state?.toUpperCase() as keyof typeof QUOTATION_STATUS;
	var enum_val = QUOTATION_STATUS[key];
	if (enum_val == null){
		enum_val = QUOTATION_STATUS.NONE;
	}
	return enum_val.color;
}


const QuotationList = () => {
	const navigate = useNavigate();
	const { userData } = useContext(AuthContext);
	const [isAlertVisible, setIsAlertVisible] = useState(false);
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
				//item.margin.toFixed(2).toString().toLowerCase().includes(search_string) ||
				//item.percent.toFixed(2).toString().toLowerCase().includes(search_string) ||
				item.status.toLowerCase().includes(search_string) ||
				item.site_location.toLowerCase().includes(search_string) ||
				item.building.toLowerCase().includes(search_string) ||
				item.project_reference.toLowerCase().includes(search_string)
			);
		});
	};

	const goToViewQuotationPage = (quotation_rev_id: string) => {
		navigate(`view/${quotation_rev_id}`);
	};

	const goToEditQuotationPage = (quotation_rev_id: string) => {
		navigate(`edit/${quotation_rev_id}`);
	};

	const goToCreateQuotationPage = () => {
		navigate('create');
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
									hidden={!userData?.write_quotation}
									onClick={() => goToCreateQuotationPage()}>
									Create
								</Button>
							</div>
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
														{dayjs.utc(`${item.quotation_date}`).local().format(
															'DD-MM-YYYY HH:mm:ss',
														)}
													</td>
													<td>{item.quotation_no}</td>
													<td>{item.end_user}</td>
													<td>{item.revision}</td>
													<td>{item.quotation_amount? item.quotation_amount.toFixed(2): null}</td>
													<td>{item.cost? item.cost.toFixed(2): null}</td>
													<td>{(item.quotation_amount && item.cost)?
													calculateMargin(item.cost, item.quotation_amount): null}</td>
													<td>{(item.quotation_amount && item.cost)?
													calculateMarginPercentage(item.cost, item.quotation_amount): null}</td>
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
																	hidden={!userData?.write_quotation}
																	onClick={() =>
																		goToEditQuotationPage(
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
