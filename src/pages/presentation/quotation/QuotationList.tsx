import React, { useState } from 'react';
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

const QuotationList = () => {
	const navigate = useNavigate();
	const [isAlertVisible, setIsAlertVisible] = useState(false);

	const QuotationData = [
		{
			id: '1',
			prepared_by: 'Gary',
			client: 'Tech Group',
			quotation_date: '31/01/2024',
			quotation_no: 'Q-012345',
			end_user: 'Tech Group',
			revision: 0,
			quotation_amount: 9800.0,
			cost: 6000.0,
			margin: 3500.0,
			percent: 27.96,
			status: 'In Progress',
			site_location: 'Penang',
			building: 'Lab 1',
		},
		{
			id: '2',
			prepared_by: 'Gary',
			client: 'Tech Group',
			quotation_date: '31/01/2024',
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
			quotation_date: '31/01/2024',
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

	const goToViewQuotationPage = () => {
		navigate('view-quotation');
	};

	const goToEditQuotationPage = () => {
		navigate('edit-quotation');
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
					<CardHeader>
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
					</CardHeader>

					<CardBody className='table-responsive' isScrollable>
						<table className='table table-modern'>
							<thead>
								<tr>
									<th>No.</th>
									<th>Prepared By</th>
									<th>Client</th>
									<th>Quotation Date</th>
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
								{QuotationData.map((item, i) => (
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
															goToViewQuotationPage()
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
															goToEditQuotationPage()
														}></Button>
												</div>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</CardBody>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default QuotationList;
