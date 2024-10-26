import React, { useState } from 'react';

import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import { TModalSize, TModalFullScreen } from '../../../type/modal-type';
import Alert from '../../../components/bootstrap/Alert';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import { useFormik } from 'formik';
import useSortableData from '../../../hooks/useSortableData';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../../components/PaginationButtons';
import { debounce } from '../../../helpers/helpers';

function returnTrueFalseIconisTrue(isTrue: Boolean) {
	if (isTrue) {
		return (
			<Icon
				icon='CheckCircleOutline'
				className=''
				color='success'
				size='2x'
				forceFamily='material'
			/>
		);
	} else {
		return <Icon icon='Cancel' className='' color='danger' size='2x' forceFamily='material' />;
	}
}

const AdminPage = () => {
	const userData = [
		{
			user_id: '1',
			role: 'Admin',
			name: 'John Doe',
			email: 'user1@gmail.com',
			view_quotation: true,
			create_edit_quotation: true,
			view_mccr: true,
			create_edit_mccr: true,
		},
		{
			user_id: '2',
			role: 'Admin',
			name: 'John2',
			email: 'user1@gmail.com',
			view_quotation: false,
			create_edit_quotation: false,
			view_mccr: false,
			create_edit_mccr: false,
		},
		{
			user_id: '3',
			role: 'Admin',
			name: 'John3',
			email: 'user1@gmail.com',
			view_quotation: true,
			create_edit_quotation: true,
			view_mccr: true,
			create_edit_mccr: true,
		},
		{
			user_id: '4',
			role: 'Admin',
			name: 'John4',
			email: 'user1@gmail.com',
			view_quotation: true,
			create_edit_quotation: true,
			view_mccr: true,
			create_edit_mccr: true,
		},
		{
			user_id: '5',
			role: 'Admin',
			name: 'John5',
			email: 'user1@gmail.com',
			view_quotation: true,
			create_edit_quotation: true,
			view_mccr: true,
			create_edit_mccr: true,
		},
		{
			user_id: '6',
			role: 'Admin',
			name: 'John6',
			email: 'user1@gmail.com',
			view_quotation: true,
			create_edit_quotation: true,
			view_mccr: true,
			create_edit_mccr: true,
		},
		{
			user_id: '7',
			role: 'Admin',
			name: 'John7',
			email: 'user1@gmail.com',
			view_quotation: true,
			create_edit_quotation: true,
			view_mccr: true,
			create_edit_mccr: true,
		},
		{
			user_id: '8',
			role: 'Admin',
			name: 'John8',
			email: 'user1@gmail.com',
			view_quotation: true,
			create_edit_quotation: true,
			view_mccr: true,
			create_edit_mccr: true,
		},
		{
			user_id: '9',
			role: 'Admin',
			name: 'John9',
			email: 'user1@gmail.com',
			view_quotation: true,
			create_edit_quotation: true,
			view_mccr: true,
			create_edit_mccr: true,
		},
		{
			user_id: '10',
			role: 'User',
			name: 'John10',
			email: 'user1@gmail.com',
			view_quotation: true,
			create_edit_quotation: true,
			view_mccr: true,
			create_edit_mccr: true,
		},
	];

	const [lists, setList] = useState(userData);

	function handleRemove(user_id: string) {
		const newList = lists.filter((item) => item.user_id !== user_id);
		setList(newList);
	}

	const navigate = useNavigate();

	const goToEditPage = () => {
		navigate('manage-user');
	};

	const [userToDelete, setUserToDelete] = useState({ name: '', id: '' });
	const [state, setState] = useState(false);
	const [staticBackdropStatus, setStaticBackdropStatus] = useState(false);
	const [scrollableStatus, setScrollableStatus] = useState(false);
	const [centeredStatus, setCenteredStatus] = useState(false);
	const [sizeStatus, setSizeStatus] = useState<TModalSize>(null);
	const [fullScreenStatus, setFullScreenStatus] = useState<TModalFullScreen | undefined>(
		undefined,
	);
	const [animationStatus, setAnimationStatus] = useState(true);
	const [longContentStatus, setLongContentStatus] = useState(false);
	const [headerCloseStatus, setHeaderCloseStatus] = useState(true);

	const initialStatus = () => {
		setStaticBackdropStatus(false);
		setScrollableStatus(false);
		setCenteredStatus(false);
		setSizeStatus(null);
		setFullScreenStatus(false);
		setAnimationStatus(true);
		setLongContentStatus(false);
		setHeaderCloseStatus(true);
	};
	// 	<>
	// 		<p>
	// 			Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
	// 			facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
	// 			vestibulum at eros.
	// 		</p>
	// 		<p>
	// 			Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
	// 			lacus vel augue laoreet rutrum faucibus dolor auctor.
	// 		</p>
	// 		<p>
	// 			Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
	// 			scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non
	// 			metus auctor fringilla.
	// 		</p>
	// 		<p>
	// 			Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
	// 			facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
	// 			vestibulum at eros.
	// 		</p>
	// 		<p>
	// 			Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
	// 			lacus vel augue laoreet rutrum faucibus dolor auctor.
	// 		</p>
	// 		<p>
	// 			Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
	// 			scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non
	// 			metus auctor fringilla.
	// 		</p>
	// 		<p>
	// 			Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
	// 			facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
	// 			vestibulum at eros.
	// 		</p>
	// 		<p>
	// 			Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
	// 			lacus vel augue laoreet rutrum faucibus dolor auctor.
	// 		</p>
	// 		<p>
	// 			Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
	// 			scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non
	// 			metus auctor fringilla.
	// 		</p>
	// 		<p>
	// 			Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
	// 			facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
	// 			vestibulum at eros.
	// 		</p>
	// 		<p>
	// 			Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
	// 			lacus vel augue laoreet rutrum faucibus dolor auctor.
	// 		</p>
	// 		<p>
	// 			Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
	// 			scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non
	// 			metus auctor fringilla.
	// 		</p>
	// 		<p>
	// 			Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
	// 			facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
	// 			vestibulum at eros.
	// 		</p>
	// 		<p>
	// 			Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
	// 			lacus vel augue laoreet rutrum faucibus dolor auctor.
	// 		</p>
	// 		<p>
	// 			Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
	// 			scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non
	// 			metus auctor fringilla.
	// 		</p>
	// 		<p>
	// 			Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
	// 			facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
	// 			vestibulum at eros.
	// 		</p>
	// 		<p>
	// 			Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
	// 			lacus vel augue laoreet rutrum faucibus dolor auctor.
	// 		</p>
	// 		<p>
	// 			Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
	// 			scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non
	// 			metus auctor fringilla.
	// 		</p>
	// 	</>
	// ) : (
	// 	<p>
	// 		Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
	// 		in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
	// 	</p>
	// );

	const [isAlertVisible, setIsAlertVisible] = useState(false);

	const handleButtonClick_deleteUser = (id: string) => {
		handleRemove(id);

		setIsAlertVisible(true);

		setTimeout(() => {
			setIsAlertVisible(false);
		}, 3000);
	};


	//search
	const [tableData, setTableData] = useState(userData);

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);
	const { items, requestSort, getClassNamesFor } = useSortableData(tableData);

	const onFormSubmit = (values: { search: any }) => {
		const searchValue = values.search.toString().toLowerCase();
		const newData = searchAndFilterData(searchValue);

		if (!values.search) {
			setTableData(userData);
		} else {
			setTableData(newData);
		}
	};

	const formik = useFormik({
		initialValues: {
			search: '',
		},
		onSubmit: onFormSubmit,
		onReset: () => setTableData(userData),
	});

	const searchAndFilterData = (search_string: string) => {
		return tableData.filter((item) => {
			return (
				item.name.toLowerCase().includes(search_string) ||
				item.role.toLowerCase().includes(search_string) ||
				item.email.toLowerCase().includes(search_string)
			);
		});
	};


	return (
		<PageWrapper title='Admin'>
			<SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => navigate(-1)}>
						Back
					</Button>
					<SubheaderSeparator />
					<strong className='fs-5'>User Management</strong>
				</SubHeaderLeft>
			</SubHeader>
			<Page container='fluid'>
				{isAlertVisible && (
					<Alert color='success' isLight icon='VerifiedUser' isDismissible>
						Delete Success
					</Alert>
				)}
				<Card stretch>
					<CardBody className='table-responsive' isScrollable>
						<div className='row g-4'>
							<div className='col-md-4'>
								<CardHeader>
									<CardLabel>
										<CardTitle tag='div' className='h3'>
											User Management
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
									// onClick={() => goToCreateQuotationPage()}
									>
									Create
								</Button>
							</div>
							<div className='col-md-12'>
								<table className='table table-modern'>
									<thead>
										<tr>
											<th>#</th>
											<th>Role</th>
											<th>Name</th>
											<th>Email</th>
											<th>View Quotation</th>
											<th>Create / Edit Quotation</th>
											<th>View MCCR</th>
											<th>Create / Edit MCCR</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
									{dataPagination(items, currentPage, perPage).map(
											(item, i) => (
											<tr key={item.user_id}>
												<td>{i+1}</td>
												<td>{item.role}</td>
												<td>{item.name}</td>
												<td>{item.email}</td>
												<td>
													{returnTrueFalseIconisTrue(item.view_quotation)}
												</td>
												<td>
													{returnTrueFalseIconisTrue(
														item.create_edit_quotation,
													)}
												</td>
												<td>{returnTrueFalseIconisTrue(item.view_mccr)}</td>
												<td>
													{returnTrueFalseIconisTrue(
														item.create_edit_mccr,
													)}
												</td>
												<td>
													<div className='row'>
														<div className='col-auto'>
															<Button
																color='primary'
																icon='Edit'
																shadow='none'
																hoverShadow='lg'
																tag='a'
																target='_blank'
																onClick={() =>
																	goToEditPage()
																}></Button>
														</div>
														<div className='col-auto'>
															<Button
																className='me-4'
																color='danger'
																isLight
																icon='Delete'
																onClick={() => {
																	setUserToDelete({
																		name: item.name,
																		id: item.user_id,
																	});
																	initialStatus();
																	setCenteredStatus(true);
																	setState(true);
																}}></Button>
														</div>
													</div>
												</td>
											</tr>
										))}
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

				<Modal
					isOpen={state}
					setIsOpen={setState}
					titleId='exampleModalLabel'
					isStaticBackdrop={staticBackdropStatus}
					isScrollable={scrollableStatus}
					isCentered={centeredStatus}
					size={sizeStatus}
					fullScreen={fullScreenStatus}
					isAnimation={animationStatus}>
					<ModalHeader setIsOpen={headerCloseStatus ? setState : undefined}>
						<ModalTitle id='confirmDeleteUserModal'>
							Confirm Delete User - {userToDelete.name}
						</ModalTitle>
					</ModalHeader>
					<ModalBody>Confirm to delete {userToDelete.name}</ModalBody>
					<ModalFooter>
						<Button
							color='danger'
							icon='Delete'
							onClick={() => {
								setState(false);
								handleButtonClick_deleteUser(userToDelete.id);
							}}>
							Delete
						</Button>
						<Button
							color='info'
							isOutline
							className='border-0'
							onClick={() => setState(false)}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</Page>
		</PageWrapper>
	);
};

export default AdminPage;
