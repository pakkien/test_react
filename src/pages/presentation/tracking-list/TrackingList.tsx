import React, { useState } from 'react';
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
import PaginationButtons, { dataPagination, PER_COUNT } from '../../../components/PaginationButtons';
import useSortableData from '../../../hooks/useSortableData';
import Icon from '../../../components/icon/Icon';
import dayjs from 'dayjs';


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


const trackingListData = [
	{
		id: '1',
		prepared_by: 'Gary',
		client: 'Tech Group',
		quotation_date: '2024-04-04T16:00:00.000Z',
		quotation_no: 'Q-012345',
		end_user: 'Tech Group',
		revision: 0,
		quotation_amount: 9800,
		cost: 6000,
		margin: 3500,
		percent: 27,
		status: 'In Progress',
		site_location: 'Penang',
		building: 'Lab 1',
	},
	{
		id: '2',
		prepared_by: 'Gary',
		client: 'Tech Group',
		quotation_date: '2024-04-03T16:00:00.000Z',
		quotation_no: 'Q-012345',
		end_user: 'Tech Group',
		revision: 0,
		quotation_amount: 9800.0,
		cost: 6000.0,
		margin: 3500.0,
		percent: 27.96,
		status: 'Closed',
		site_location: 'Penang',
		building: 'Lab 1',
	},
	{
		id: '3',
		prepared_by: 'Gary',
		client: 'Tech Group',
		quotation_date: '2024-04-02T16:00:00.000Z',
		quotation_no: 'Q-012345',
		end_user: 'Tech Group',
		revision: 0,
		quotation_amount: 9800.0,
		cost: 6000.1,
		margin: 3500.0,
		percent: 27.96,
		status: 'Awarded',
		site_location: 'Penang',
		building: 'Lab 1',
	},
	{
		id: '4',
		prepared_by: 'Gary',
		client: 'Tech Group',
		quotation_date: '2024-04-01T16:00:00.000Z',
		quotation_no: 'Q-012345',
		end_user: 'Tech Group',
		revision: 0,
		quotation_amount: 9800.0,
		cost: 6000.03,
		margin: 3500.0,
		percent: 27.96,
		status: 'Awarded',
		site_location: 'Penang',
		building: 'Lab 1',
	},
	{
		id: '5',
		prepared_by: 'Gary',
		client: 'Tech Group',
		quotation_date: '2023-04-04T16:00:00.000Z',
		quotation_no: 'Q-012345',
		end_user: 'Tech Group',
		revision: 0,
		quotation_amount: 9800.0,
		cost: 6000.0,
		margin: 3500.0,
		percent: 27.96,
		status: 'Awarded',
		site_location: 'Penang',
		building: 'Lab 1',
	},
	{
		id: '6',
		prepared_by: 'Gary',
		client: 'Tech Group',
		quotation_date: '2025-04-04T16:00:00.000Z',
		quotation_no: 'Q-012345',
		end_user: 'Tech Group',
		revision: 0,
		quotation_amount: 9800.0,
		cost: 6000.0,
		margin: 3500.0,
		percent: 27.96,
		status: 'Awarded',
		site_location: 'Penang',
		building: 'Lab 1',
	},
	{
		id: '7',
		prepared_by: 'Gary',
		client: 'Tech Group',
		quotation_date: '2022-04-04T16:00:00.000Z',
		quotation_no: 'Q-012345',
		end_user: 'Tech Group',
		revision: 0,
		quotation_amount: 9800.0,
		cost: 6000.0,
		margin: 3500.0,
		percent: 27.96,
		status: 'Awarded',
		site_location: 'Penang',
		building: 'Lab 1',
	},
	{
		id: '8',
		prepared_by: 'Gary',
		client: 'Tech Group',
		quotation_date: '2024-04-04T16:00:00.000Z',
		quotation_no: 'Q-012345',
		end_user: 'Tech Group',
		revision: 0,
		quotation_amount: 9800.0,
		cost: 6000.0,
		margin: 3500.0,
		percent: 27.96,
		status: 'Awarded',
		site_location: 'Penang',
		building: 'Lab 1',
	},
	{
		id: '9',
		prepared_by: 'Gary',
		client: 'Tech Group',
		quotation_date: '2024-04-04T16:00:00.000Z',
		quotation_no: 'Q-012345',
		end_user: 'Tech Group',
		revision: 0,
		quotation_amount: 9800.0,
		cost: 6000.0,
		margin: 3500.0,
		percent: 27.96,
		status: 'Awarded',
		site_location: 'Penang',
		building: 'Lab 1',
	},
	{
		id: '10',
		prepared_by: 'Gary',
		client: 'Tech Group',
		quotation_date: '2024-04-04T16:00:00.000Z',
		quotation_no: 'Q-012345',
		end_user: 'Tech Group',
		revision: 0,
		quotation_amount: 9800.0,
		cost: 6000.0,
		margin: 3500.0,
		percent: 27.96,
		status: 'Awarded',
		site_location: 'Penang',
		building: 'Lab 1',
	},
];

const TrackingList = () => {
	const navigate = useNavigate();

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);
	const { items, requestSort, getClassNamesFor } = useSortableData(trackingListData);

	const goToViewQuotationPage = () => {
		navigate('view-quotation');
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
					<CardHeader>
						<CardLabel>
							<CardTitle tag='div' className='h3'>
								Tracking List
							</CardTitle>
						</CardLabel>
					</CardHeader>
					<CardBody className='table-responsive' isScrollable>
						<table className='table table-modern'>
							<thead>
								<tr>
									<th>No.</th>
									<th>Prepared By</th>
									<th>Client</th>
									<th onClick={() => requestSort('quotation_date')}
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
									<th>%</th>
									<th>Status</th>
									<th>Site Location</th>
									<th>Building</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{/* {trackingListData.map((item, i) => (
									<tr key={item.id}>
										<td>{i + 1}</td>
										<td>{item.prepared_by}</td>
										<td>{item.client}</td>
										<td>{item.quotation_date}</td>
										<td>{item.quotation_no}</td>
										<td>{item.end_user}</td>
										<td>{item.revision}</td>
										<td>{item.quotation_amount}</td>
										<td>{item.cost}</td>
										<td>{item.margin}</td>
										<td>{item.percent}%</td>
										<td>
											<Badge
												className='statusBadge'
												color={ReturnStateColor(item.status)}>
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
															goToViewQuotationPage()
														}></Button>
												</div>
											</div>
										</td>
									</tr>
								))} */}

								{dataPagination(items, currentPage, perPage).map((item, i) => (
									<tr key={item.id}>
									<td>{i + 1}</td>
									<td>{item.prepared_by}</td>
									<td>{item.client}</td>
									<td>{dayjs(`${item.quotation_date}`).format(
													'DD/MM/YYYY',
												)}</td>
									<td>{item.quotation_no}</td>
									<td>{item.end_user}</td>
									<td>{item.revision}</td>
									<td>{item.quotation_amount.toFixed(2)}</td>
									<td>{item.cost.toFixed(2)}</td>
									<td>{item.margin.toFixed(2)}</td>
									<td>{item.percent.toFixed(2)}%</td>
									<td>
										<Badge
											className='statusBadge'
											color={ReturnStateColor(item.status)}>
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
														goToViewQuotationPage()
													}></Button>
											</div>
										</div>
									</td>
								</tr>
								))}
							</tbody>
						</table>
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
